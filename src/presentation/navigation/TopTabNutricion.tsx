import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NutricionistaScreen} from '../screens/nutricionScreens/NutricionistaScreen';
import {PlanNutricionalScreen} from '../screens/nutricionScreens/PlanNutricionalScreen';
import {MainLayout} from '../layouts/MainLayout';
import {FAB, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainStackParams} from './StackNavigator';
import {useEffect, useState} from 'react';
import {DeviceEventEmitter} from 'react-native';

export type RootTabParams = {
  Nutricionista: undefined;
  PlanNutricional: undefined;
};

const Tab = createMaterialTopTabNavigator<RootTabParams>();

export const TopTabNutricion = () => {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<MainStackParams>>();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const completeSubscription = DeviceEventEmitter.addListener(
      'refreshCompleteNutricion',
      () => {
        setRefreshing(false);
      },
    );
    return () => completeSubscription.remove();
  }, []);

  return (
    <MainLayout title="Nutrición" stylesChild={{paddingHorizontal: 0}}>
      <Tab.Navigator
        initialRouteName="PlanNutricional"
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          tabBarLabelStyle: {fontSize: 12},
          tabBarStyle: {
            backgroundColor: theme.colors.background,
          },
          tabBarPressColor: 'transparent',
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.primary,
          },
        }}>
        <Tab.Screen
          name="PlanNutricional"
          component={PlanNutricionalScreen}
          options={{tabBarLabel: 'Plan Nutricional'}}
        />
        <Tab.Screen
          name="Nutricionista"
          component={NutricionistaScreen}
          options={{tabBarLabel: 'Nutricionista'}}
        />
      </Tab.Navigator>
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        mode="flat"
        size="small"
        icon="pie-chart-outline"
        onPress={() => navigation.navigate('PlanesNutricionalesRegistroScreen')}
      />
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          left: 0,
          bottom: 0,
        }}
        mode="flat"
        size="small"
        loading={refreshing}
        disabled={refreshing}
        icon="refresh-outline"
        onPress={() => {
          setRefreshing(true);
          DeviceEventEmitter.emit('refreshDataNutricion');
        }}
      />
    </MainLayout>
  );
};
