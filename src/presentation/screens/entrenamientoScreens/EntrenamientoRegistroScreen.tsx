import React, {useEffect, useState, useMemo} from 'react';
import {ScrollView, View} from 'react-native';
import {Text, useTheme, List, IconButton} from 'react-native-paper';
import {MainLayout} from '../../layouts/MainLayout';
import {getRegistroEjerciciosByUserRequest} from '../../../services/entrenamiento';
import {RutinaEjercicio} from '../../../infrastructure/interfaces/rutina-ejercicio';
import {MaterialCalendar} from '../../components/MaterialCalendar';
import {RadarChart} from 'react-native-gifted-charts';
import {GruposMusculares} from '../../../infrastructure/interfaces/grupos-musculares';
import {CardContainer} from '../../components/CardContainer';
import {UnidadMedida} from '../../../infrastructure/enums/unidadMedida';

export const EntrenamientoRegistroScreen = () => {
  const [rutinaEjercicios, setRutinaEjercicios] = useState<
    Partial<RutinaEjercicio>[]
  >([]);
  const [gruposMusculares, setGruposMusculares] = useState<GruposMusculares[]>(
    [],
  );
  // Si selectedDay es undefined se mostrará el modo "últimos 3 meses"
  const [selectedDay, setSelectedDay] = useState<string | undefined>(undefined);
  const theme = useTheme();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getRegistroEjerciciosByUserRequest();
      // Se asume que el response tiene "registro" y "gruposMusculares"
      setRutinaEjercicios(data.registro);
      setGruposMusculares(data.gruposMusculares);
    } catch (error) {
      console.error(error);
    }
  };

  // Calculamos la información para el RadarChart.
  // Si selectedDay está definido, se filtra por ese día.
  // Si no, se agrupan los datos desde hoy hasta hace 3 meses.
  const radarInfo = useMemo(() => {
    const agg: Record<string, number> = {};
    let filterFunc: (registroDate: Date) => boolean;

    if (selectedDay) {
      filterFunc = (registroDate: Date) =>
        registroDate.toISOString().split('T')[0] === selectedDay;
    } else {
      // Periodo: desde hace 3 meses hasta hoy.
      const today = new Date();
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 3);
      filterFunc = (registroDate: Date) =>
        registroDate >= startDate && registroDate <= today;
    }

    rutinaEjercicios.forEach(item => {
      if (item.registros && item.registros.length > 0) {
        item.registros.forEach(registro => {
          const registroDate = new Date(registro.fecha);
          if (filterFunc(registroDate)) {
            // Volumen = series × repeticiones
            const volume = (item.series || 0) * (item.repeticiones || 0);
            const groups = item.ejercicio?.gruposMusculares;
            if (groups && groups.length > 0) {
              groups.forEach(group => {
                const name = group.name;
                agg[name] = (agg[name] || 0) + volume;
              });
            }
          }
        });
      }
    });

    // Etiquetas de los registros
    const aggregatedLabels = Object.keys(agg);
    // Lista global de grupos musculares
    const globalLabels = Array.from(new Set(gruposMusculares.map(g => g.name)));

    // Usamos las etiquetas acumuladas si hay al menos 2, sino completamos con global.
    let finalLabels = aggregatedLabels.length > 0 ? [...aggregatedLabels] : [];
    if (finalLabels.length < 5) {
      const candidates = globalLabels.filter(
        label => !finalLabels.includes(label),
      );
      while (finalLabels.length < 5 && candidates.length > 0) {
        const randomIndex = Math.floor(Math.random() * candidates.length);
        finalLabels.push(candidates[randomIndex]);
        candidates.splice(randomIndex, 1);
      }
    }
    // Asignamos un mínimo de 1 a cada eje si no hay dato acumulado.
    const finalData = finalLabels.map(label =>
      agg[label] !== undefined ? agg[label] : 1,
    );
    console.log('radarInfo', {labels: finalLabels, data: finalData});
    return {labels: finalLabels, data: finalData};
  }, [rutinaEjercicios, selectedDay, gruposMusculares]);

  // Valor máximo para la escala del radar.
  const maxValue =
    radarInfo.data.length > 0 ? Math.max(...radarInfo.data) * 1.2 : 100;

  // Filtramos los ejercicios realizados en el día seleccionado (solo si hay día seleccionado).
  const ejerciciosDelDia = useMemo(() => {
    if (!selectedDay) return [];
    return rutinaEjercicios.filter(item =>
      item.registros?.some(
        registro =>
          new Date(registro.fecha).toISOString().split('T')[0] === selectedDay,
      ),
    );
  }, [rutinaEjercicios, selectedDay]);

  return (
    <MainLayout title="Registro de entrenamiento" back={true}>
      <ScrollView contentContainerStyle={{padding: 16}}>
        {/* Calendario para seleccionar el día */}
        {rutinaEjercicios.length > 0 && (
          <MaterialCalendar
            exaltedDays={rutinaEjercicios.flatMap(rutinaEjercicio =>
              rutinaEjercicio.registros
                ? rutinaEjercicio.registros.map(
                    registro => new Date(registro.fecha),
                  )
                : [],
            )}
            onTouchDay={day => {
              // Si se toca el mismo día, se deselecciona.
              if (selectedDay === day) {
                setSelectedDay(undefined);
                return;
              }
              setSelectedDay(day);
            }}
          />
        )}

        {/* Mostrar título según el modo */}

        {selectedDay ? (
          // Formateamos la fecha seleccionada.
          (() => {
            const date = new Date(selectedDay);
            const weekday = date.toLocaleDateString('es-ES', {
              weekday: 'long',
            });
            const dayNum = date.toLocaleDateString('es-ES', {day: 'numeric'});
            const month = date.toLocaleDateString('es-ES', {month: 'long'});
            const year = date.toLocaleDateString('es-ES', {year: 'numeric'});
            const capitalize = (s: string) =>
              s.charAt(0).toUpperCase() + s.slice(1);
            const formattedDate = `${capitalize(
              weekday,
            )}, ${dayNum} de ${capitalize(month)} de ${year}`;
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  variant="titleLarge"
                  style={{
                    color: theme.colors.primary,
                    marginVertical: 16,
                    alignSelf: 'center',
                  }}>
                  {formattedDate}
                </Text>
                <IconButton
                  icon="close-outline"
                  size={24}
                  onPress={() => setSelectedDay(undefined)}
                />
              </View>
            );
          })()
        ) : (
          // Cuando no hay día seleccionado, mostramos un título para el periodo.
          <Text
            variant="titleLarge"
            style={{
              color: theme.colors.primary,
              marginVertical: 16,
              alignSelf: 'center',
            }}>
            Últimos 3 meses
          </Text>
        )}

        {/* Radar Chart: Grupos musculares trabajados */}
        {radarInfo.data.some(value => value > 1) ? (
          <CardContainer
            title="Grupos musculares trabajados"
            icon="accessibility-outline">
            <RadarChart
              data={radarInfo.data}
              labels={radarInfo.labels}
              maxValue={maxValue}
              noOfSections={4}
              labelConfig={{fontSize: 12, stroke: theme.colors.primary}}
              dataLabelsConfig={{fontSize: 10, stroke: theme.colors.primary}}
              polygonConfig={{
                stroke: theme.colors.primary,
                fill: theme.colors.primary,
              }}
            />
          </CardContainer>
        ) : (
          <Text
            variant="bodyMedium"
            style={{
              color: theme.colors.onBackground,
              textAlign: 'center',
              marginVertical: 16,
            }}>
            No se han registrado ejercicios en este periodo.
          </Text>
        )}

        {/* Lista de ejercicios realizados ese día (solo si se ha seleccionado un día) */}
        {selectedDay && ejerciciosDelDia.length > 0 && (
          <CardContainer title="Ejercicios realizados" icon="list-outline">
            <List.Section>
              {ejerciciosDelDia.map(item => (
                <List.Item
                  key={item.id?.toString()}
                  title={item.ejercicio?.name || 'Ejercicio'}
                  description={[
                    item.medicion &&
                      `Medición: ${item.medicion}${
                        item.unidadMedida === UnidadMedida.Ninguna
                          ? ''
                          : ' ' + item.unidadMedida
                      }`,
                    item.repeticiones && `Reps: ${item.repeticiones}`,
                    item.series && `Series: ${item.series}`,
                  ]
                    .filter(Boolean)
                    .join(' | ')}
                  left={props => (
                    <List.Icon {...props} icon="checkbox-outline" />
                  )}
                />
              ))}
            </List.Section>
          </CardContainer>
        )}
      </ScrollView>
    </MainLayout>
  );
};
