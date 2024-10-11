import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';

export type RootStackParams = {
    HomeScreen: undefined;
    LoginScreen: undefined;
    };

const Stack = createStackNavigator<RootStackParams>();

const fadeanimation: StackCardStyleInterpolator = ({ current }) => ({
    cardStyle: {
        opacity: current.progress
    }
})

export const StackNavigator = () => {
  return (
    <Stack.Navigator
    initialRouteName='LoginScreen'
    screenOptions={{
        headerShown: false,
    }}
    >
      <Stack.Screen options={{ cardStyleInterpolator: fadeanimation }} name="HomeScreen" component={HomeScreen} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeanimation }} name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}