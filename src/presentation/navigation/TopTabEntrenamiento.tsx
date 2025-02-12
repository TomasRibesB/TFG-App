import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RutinaScreen} from '../screens/entrenamientoScreens/RutinaScreen';
import {GimnasioScreen} from '../screens/entrenamientoScreens/GimnasioScreen';
import {MainLayout} from '../layouts/MainLayout';
import {useTheme} from 'react-native-paper';
import {useColorScheme} from 'react-native';

export type RootTabParams = {
  Gym: undefined;
  Rutina: undefined;
};

const Tab = createMaterialTopTabNavigator<RootTabParams>();

export const TopTabEntrenamiento = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useTheme();
  return (
    <MainLayout title="Entrenamiento" stylesChild={{paddingHorizontal: 0}}>
      <Tab.Navigator
        initialRouteName="Rutina"
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
          name="Rutina"
          component={RutinaScreen}
          options={{tabBarLabel: 'Rutinas'}}
        />
        <Tab.Screen
          name="Gym"
          component={GimnasioScreen}
          options={{tabBarLabel: 'Entrenador'}}
        />
      </Tab.Navigator>
    </MainLayout>
  );
};
