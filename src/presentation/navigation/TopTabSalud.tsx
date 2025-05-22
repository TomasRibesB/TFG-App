import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Documentos} from '../screens/saludScreens/Documentos';
import {ProfesionalesScreen} from '../screens/saludScreens/ProfesionalesScreen';
import {MainLayout} from '../layouts/MainLayout';
import {FAB, useTheme} from 'react-native-paper';
import {DeviceEventEmitter} from 'react-native';
import {useEffect, useState} from 'react';

export type RootTabParams = {
  Documentos: undefined;
  Profesionales: undefined;
};

const Tab = createMaterialTopTabNavigator<RootTabParams>();

export const TopTabSalud = () => {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
      const completeSubscription = DeviceEventEmitter.addListener(
        'refreshCompleteSalud',
        () => {
          setRefreshing(false);
        },
      );
      return () => completeSubscription.remove();
    }, []);

  return (
    <MainLayout title="Salud" stylesChild={{paddingHorizontal: 0}}>
      <Tab.Navigator
        initialRouteName="Documentos"
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
          name="Documentos"
          component={Documentos}
          options={{tabBarLabel: 'Documentos'}}
        />
        <Tab.Screen
          name="Profesionales"
          component={ProfesionalesScreen}
          options={{tabBarLabel: 'Profesionales'}}
        />
      </Tab.Navigator>
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
          DeviceEventEmitter.emit('refreshDataSalud');
        }}
      />
    </MainLayout>
  );
};
