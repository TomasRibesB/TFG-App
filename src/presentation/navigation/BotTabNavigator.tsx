import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {HomeScreen} from '../screens/HomeScreen';
import {TopTabEntrenamiento} from './TopTabEntrenamiento';
import {TopTabNutricion} from './TopTabNutricion';
import {TopTabSalud} from './TopTabSalud';
import {MD3DarkTheme, MD3LightTheme} from 'react-native-paper';
import {useColorScheme} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importa Ionicons

export type RootTabParams = {
  Home: undefined;
  Entrenamiento: undefined;
  Nutricion: undefined;
  Salud: undefined;
};

const Tab = createMaterialBottomTabNavigator<RootTabParams>();

export const BotTabNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{
        backgroundColor: isDarkMode
          ? MD3DarkTheme.colors.background
          : MD3LightTheme.colors.background,
        borderColor: isDarkMode
          ? MD3DarkTheme.colors.surfaceVariant
          : MD3LightTheme.colors.surfaceVariant,
        borderTopWidth: 1,
      }}
      activeColor={
        isDarkMode ? MD3DarkTheme.colors.primary : MD3LightTheme.colors.primary
      }
      activeIndicatorStyle={{
        backgroundColor: isDarkMode
          ? MD3DarkTheme.colors.primaryContainer
          : MD3LightTheme.colors.primaryContainer,
      }}
      inactiveColor={
        isDarkMode
          ? MD3DarkTheme.colors.onSurface
          : MD3LightTheme.colors.onSurface
      }
      screenOptions={({route}) => ({
        tabBarIcon: ({color, focused}) => {
          let iconName: string = '';

          // Asignación del nombre del icono
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Entrenamiento') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (route.name === 'Nutricion') {
            iconName = focused ? 'nutrition' : 'nutrition-outline';
          } else if (route.name === 'Salud') {
            iconName = focused ? 'medkit' : 'medkit-outline';
          }

          // Devuelve el icono de Ionicons
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Inicio',
        }}
      />
      <Tab.Screen
        name="Entrenamiento"
        component={TopTabEntrenamiento}
        options={{
          tabBarLabel: 'Entrenamiento',
        }}
      />
      <Tab.Screen
        name="Nutricion"
        component={TopTabNutricion}
        options={{
          tabBarLabel: 'Nutrición',
        }}
      />
      <Tab.Screen
        name="Salud"
        component={TopTabSalud}
        options={{
          tabBarLabel: 'Salud',
        }}
      />
    </Tab.Navigator>
  );
};
