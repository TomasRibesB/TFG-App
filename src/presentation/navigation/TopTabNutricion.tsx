import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { NutricionistaScreen } from '../screens/nutricionScreens/NutricionistaScreen';
import { PlanNutricionalScreen } from '../screens/nutricionScreens/PlanNutricionalScreen';
import {MainLayout} from '../layouts/MainLayout';
import {MD3DarkTheme, MD3LightTheme} from 'react-native-paper';
import {useColorScheme} from 'react-native';

export type RootTabParams = {
    Nutricionista: undefined;
    PlanNutricional: undefined;
};

const Tab = createMaterialTopTabNavigator<RootTabParams>();

export const TopTabNutricion = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <MainLayout title="Nutrición" stylesChild={{paddingHorizontal: 0}}>
      <Tab.Navigator
        initialRouteName="Nutricionista"
        screenOptions={{
          tabBarActiveTintColor: isDarkMode
            ? MD3DarkTheme.colors.primary
            : MD3LightTheme.colors.primary,
          tabBarLabelStyle: {fontSize: 12},
          tabBarStyle: {
            backgroundColor: isDarkMode
              ? MD3DarkTheme.colors.background
              : MD3LightTheme.colors.background,
          },
          tabBarPressColor: 'transparent',
          tabBarIndicatorStyle: {
            backgroundColor: isDarkMode
              ? MD3DarkTheme.colors.primary
              : MD3LightTheme.colors.primary,
          },
        }}>
        <Tab.Screen
          name="Nutricionista"
          component={NutricionistaScreen}
          options={{tabBarLabel: 'Nutricionista'}}
        />
        <Tab.Screen
          name="PlanNutricional"
          component={PlanNutricionalScreen}
          options={{tabBarLabel: 'Plan Nutricional'}}
        />
      </Tab.Navigator>
    </MainLayout>
  );
};
