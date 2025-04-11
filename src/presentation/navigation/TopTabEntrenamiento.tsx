import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RutinaScreen} from '../screens/entrenamientoScreens/RutinaScreen';
import {GimnasioScreen} from '../screens/entrenamientoScreens/GimnasioScreen';
import {MainLayout} from '../layouts/MainLayout';
import {FAB, useTheme} from 'react-native-paper';
import {useColorScheme} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MainStackParams} from './StackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {DeviceEventEmitter} from 'react-native';
import {useEffect, useState} from 'react';

export type RootTabParams = {
  Gym: undefined;
  Rutina: undefined;
};

const Tab = createMaterialTopTabNavigator<RootTabParams>();

export const TopTabEntrenamiento = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<MainStackParams>>();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const completeSubscription = DeviceEventEmitter.addListener(
      'refreshCompleteEntrenamiento',
      () => {
        setRefreshing(false);
      },
    );
    return () => completeSubscription.remove();
  }, []);

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
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        mode="flat"
        size="small"
        icon="bar-chart-outline"
        onPress={() => navigation.navigate('EntrenamientoRegistroScreen')}
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
          DeviceEventEmitter.emit('refreshDataEntrenamiento');
        }}
      />
    </MainLayout>
  );
};
