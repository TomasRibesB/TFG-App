import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MiSaludScreen} from '../screens/saludScreens/MiSaludScreen';
import {ProfesionalesScreen} from '../screens/saludScreens/ProfesionalesScreen';
import {MainLayout} from '../layouts/MainLayout';
import {MD3DarkTheme, MD3LightTheme} from 'react-native-paper';
import {useColorScheme} from 'react-native';

export type RootTabParams = {
  MiSalud: undefined;
  Profesionales: undefined;
};

const Tab = createMaterialTopTabNavigator<RootTabParams>();

export const TopTabSalud = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <MainLayout title="Salud" stylesChild={{paddingHorizontal: 0}}>
      <Tab.Navigator
        initialRouteName="MiSalud"
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
          name="MiSalud"
          component={MiSaludScreen}
          options={{tabBarLabel: 'Mi Salud'}}
        />
        <Tab.Screen
          name="Profesionales"
          component={ProfesionalesScreen}
          options={{tabBarLabel: 'Profesionales'}}
        />
      </Tab.Navigator>
    </MainLayout>
  );
};
