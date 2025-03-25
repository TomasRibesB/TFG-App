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
        {planes.map(plan => {
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
            carbohidratos: theme.colors.primaryContainer,
            grasas: theme.colors.tertiaryContainer,
          };
          const pieData = Object.keys(plan.macronutrientes).map(key => ({
            value: plan.macronutrientes ? plan.macronutrientes[key] : 0,
            color: colorMapping[key] || '#000',
            text: key,
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
                Volumen de macronutrientes
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
                    {plan.caloriasDiarias} Calorias × Dia
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
        })}
      </ScrollView>
    </MainLayout>
  );
};
