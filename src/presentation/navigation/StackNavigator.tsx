import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from '@react-navigation/stack';
import {AuthLoaderScreen} from '../components/AuthLoaderScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {BotTabNavigator} from './BotTabNavigator';
import {TicketListScreen} from '../screens/ticketsScreens/TicketListScreen';
import {TicketScreen} from '../screens/ticketsScreens/TicketScreen';
import { EntrenamientoRegistroScreen } from '../screens/entrenamientoScreens/EntrenamientoRegistroScreen';

export type AuthStackParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

export type MainStackParams = {
  BotTabNavigator: undefined;
  TicketListScreen: undefined;
  TicketScreen: {ticketId: number;};
  EntrenamientoRegistroScreen: undefined;
};

export type RootStackParams = {
  AuthLoaderScreen: undefined;
  AuthFlow: undefined;
  MainFlow: undefined;
};

const AuthStack = createStackNavigator<AuthStackParams>();
const MainStack = createStackNavigator<MainStackParams>();
const RootStack = createStackNavigator<RootStackParams>();

const fadeanimation: StackCardStyleInterpolator = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

// Stack con Login y Register
const AuthStackNavigator = () => (
  <AuthStack.Navigator screenOptions={{headerShown: false}}>
    <AuthStack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{cardStyleInterpolator: fadeanimation}}
    />
    <AuthStack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{cardStyleInterpolator: fadeanimation}}
    />
  </AuthStack.Navigator>
);

// Stack principal con Tabs y Tickets
const MainStackNavigator = () => (
  <MainStack.Navigator screenOptions={{headerShown: false}}>
    <MainStack.Screen
      name="BotTabNavigator"
      component={BotTabNavigator}
      options={{cardStyleInterpolator: fadeanimation}}
    />
    <MainStack.Screen
      name="TicketListScreen"
      component={TicketListScreen}
      options={{cardStyleInterpolator: fadeanimation}}
    />
    <MainStack.Screen
      name="TicketScreen"
      component={TicketScreen}
      options={{cardStyleInterpolator: fadeanimation}}
    />
    <MainStack.Screen
      name="EntrenamientoRegistroScreen"
      component={EntrenamientoRegistroScreen}
      options={{cardStyleInterpolator: fadeanimation}}
    />
  </MainStack.Navigator>
);

// Root que decide login o app principal
export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen
          name="AuthLoaderScreen"
          component={AuthLoaderScreen}
          options={{cardStyleInterpolator: fadeanimation}}
        />
        <RootStack.Screen
          name="AuthFlow"
          component={AuthStackNavigator}
          options={{cardStyleInterpolator: fadeanimation}}
        />
        <RootStack.Screen
          name="MainFlow"
          component={MainStackNavigator}
          options={{cardStyleInterpolator: fadeanimation}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};