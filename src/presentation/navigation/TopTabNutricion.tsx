import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NutricionistaScreen} from '../screens/nutricionScreens/NutricionistaScreen';
import {PlanNutricionalScreen} from '../screens/nutricionScreens/PlanNutricionalScreen';
import {MainLayout} from '../layouts/MainLayout';
import {useTheme} from 'react-native-paper';
import {useColorScheme} from 'react-native';

export type RootTabParams = {
  Nutricionista: undefined;
  PlanNutricional: undefined;
};

const Tab = createMaterialTopTabNavigator<RootTabParams>();

export const TopTabNutricion = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useTheme();
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
    </MainLayout>
  );
};
