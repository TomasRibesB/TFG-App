import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Chip, Text, useTheme} from 'react-native-paper';
import {MainLayout} from '../../layouts/MainLayout';
import {getPlanesAnterioresRequest} from '../../../services/nutricion';
import {PieChart} from 'react-native-gifted-charts';
import {CardContainer} from '../../components/CardContainer';
import {PlanNutricional} from '../../../infrastructure/interfaces/plan-nutricional';
import Icon from 'react-native-vector-icons/Ionicons';

export const PlanesNutricionalesRegistroScreen = () => {
  const theme = useTheme();
  const [planes, setPlanes] = useState<Partial<PlanNutricional>[]>([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const data: Partial<PlanNutricional>[] = await getPlanesAnterioresRequest();
    setPlanes(data);
  };

  return (
    <MainLayout title="Registro de planes nutricionales" back>
      <ScrollView contentContainerStyle={{padding: 16}}>
        {planes.length > 0 ? (
          planes.map(plan => {
            const startDate = new Date(plan.fechaCreacion!);
            const endDate = new Date(plan.fechaBaja!);
            const dateString = `Vigente desde ${startDate.toLocaleDateString(
              'es-ES',
              {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              },
            )} hasta ${endDate.toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}`;
            if (!plan.macronutrientes) return null;
            // Mapeo de colores para cada macronutriente
            const colorMapping: {[key: string]: string} = {
              proteinas: 'rgb(206, 235, 235)',
              carbohidratos: 'rgb(255, 224, 178)',
              grasas: 'rgb(255, 178, 178)',
            };
            const pieData = Object.keys(plan.macronutrientes).map(key => ({
              value: plan.macronutrientes ? plan.macronutrientes[key] : 0,
              color: colorMapping[key] || '#000',
              text: plan.macronutrientes![key] + '%',
            }));
            return (
              <CardContainer
                key={plan.id}
                title={
                  'Plan nutricional ' + plan.nombre ||
                  'Plan nutricional sin nombre'
                }
                icon="pie-chart-outline">
                <Text style={{marginBottom: 16}} variant="titleMedium">
                  Porcentaje de Macronutrientes
                </Text>
                <View style={{alignItems: 'center'}}>
                  <PieChart
                    data={pieData}
                    radius={100}
                    showText
                    textColor="black"
                    textSize={14}
                    showTextBackground={false}
                  />
                </View>
                <View style={{marginTop: 16, flexDirection: 'column'}}>
                  <View>
                    {plan.macronutrientes &&
                      Object.keys(plan.macronutrientes).map(key => (
                        <View
                          key={key}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 5,
                          }}>
                          <View
                            style={{
                              height: 15,
                              width: 15,
                              borderRadius: 100,
                              backgroundColor: colorMapping[key] || '#000',
                            }}
                          />
                          <Text style={{marginLeft: 5}} variant="labelMedium">
                            {plan.macronutrientes![key]}%{' '}
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </Text>
                        </View>
                      ))}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text variant="titleMedium">Objetivos</Text>
                    <Chip
                      icon="restaurant-outline"
                      onPress={() => {}}
                      style={{margin: 5}}>
                      {plan.caloriasDiarias} Calorías diarias
                    </Chip>
                  </View>
                  {plan.objetivos &&
                    plan.objetivos.split(',').map((objective, index) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          marginVertical: 5,
                        }}>
                        <Icon name="chevron-forward-outline" size={20} />
                        <Text style={{marginLeft: 5}}>{objective}</Text>
                      </View>
                    ))}
                  <Text variant="labelMedium">{dateString}</Text>
                </View>
              </CardContainer>
            );
          })
        ) : (
          <CardContainer
            title="No hay planes nutricionales"
            icon="alert-circle-outline">
            <Text>No se han encontrado planes nutricionales anteriores.</Text>
          </CardContainer>
        )}
      </ScrollView>
    </MainLayout>
  );
};
