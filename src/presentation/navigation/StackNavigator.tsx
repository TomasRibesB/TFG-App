import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {BotTabNavigator} from './BotTabNavigator';
import {TicketListScreen} from '../screens/ticketsScreens/TicketListScreen';
import {TicketScreen} from '../screens/ticketsScreens/TicketScreen';
import { Ticket } from '../screens/ticketsScreens/TicketListScreen';

export type RootStackParams = {
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
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
      }}>
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
