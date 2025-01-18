import {
  createStackNavigator,
  StackCardStyleInterpolator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {BotTabNavigator} from './BotTabNavigator';
import {TicketListScreen} from '../screens/ticketsScreens/TicketListScreen';
import {TicketScreen} from '../screens/ticketsScreens/TicketScreen';
import {Ticket} from '../screens/ticketsScreens/TicketListScreen';
import {LoadingScreen} from '../screens/LoadingScreen';
import {useEffect} from 'react';
import {StorageAdapter} from '../../config/adapters/storage-adapter';
import {useNavigation} from '@react-navigation/native';

export type RootStackParams = {
  LoadingScreen: undefined;
  HomeScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  BotTabNavigator: undefined;
  TicketListScreen: undefined;
  TicketScreen: {ticket: Ticket};
};

const Stack = createStackNavigator<RootStackParams>();

const fadeanimation: StackCardStyleInterpolator = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export const StackNavigator = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  useEffect(() => {
    const checkToken = async () => {
      const token = await StorageAdapter.getItem('token');
      console.log(token);
      if (token) {
        navigation.navigate('BotTabNavigator');
        navigation.reset({
          index: 0,
          routes: [{name: 'BotTabNavigator'}],
        });
      } else {
        navigation.navigate('LoginScreen');
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      }
    };
    checkToken();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="LoadingScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        options={{cardStyleInterpolator: fadeanimation}}
        name="LoadingScreen"
        component={LoadingScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeanimation}}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeanimation}}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeanimation}}
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeanimation}}
        name="BotTabNavigator"
        component={BotTabNavigator}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeanimation}}
        name="TicketListScreen"
        component={TicketListScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeanimation}}
        name="TicketScreen"
        component={TicketScreen}
      />
    </Stack.Navigator>
  );
};
