import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RutinaScreen} from '../screens/entrenamientoScreens/RutinaScreen';
import {GimnasioScreen} from '../screens/entrenamientoScreens/GimnasioScreen';
import {MainLayout} from '../layouts/MainLayout';
import {MD3DarkTheme, MD3LightTheme} from 'react-native-paper';
import {useColorScheme} from 'react-native';

export type RootTabParams = {
  Gym: undefined;
  Rutina: undefined;
};

const Tab = createMaterialTopTabNavigator<RootTabParams>();

export const TopTabEntrenamiento = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <MainLayout title="Entrenamiento" stylesChild={{paddingHorizontal: 0}}>
      <Tab.Navigator
        initialRouteName="Gym"
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
          name="Gym"
          component={GimnasioScreen}
          options={{tabBarLabel: 'Gimnasio'}}
        />
        <Tab.Screen
          name="Rutina"
          component={RutinaScreen}
          options={{tabBarLabel: 'Rutinas'}}
        />
      </Tab.Navigator>
    </MainLayout>
  );
};
