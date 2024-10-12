import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MiSaludScreen} from '../screens/saludScreens/MiSaludScreen';
import {ProfesionalesScreen} from '../screens/saludScreens/ProfesionalesScreen';
import {MainLayout} from '../layouts/MainLayout';
import {useTheme} from 'react-native-paper';
import {useColorScheme} from 'react-native';

export type RootTabParams = {
  MiSalud: undefined;
  Profesionales: undefined;
};

const Tab = createMaterialTopTabNavigator<RootTabParams>();

export const TopTabSalud = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useTheme();
  return (
    <MainLayout title="Salud" stylesChild={{paddingHorizontal: 0}}>
      <Tab.Navigator
        initialRouteName="MiSalud"
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
