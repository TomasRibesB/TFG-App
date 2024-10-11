import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { TopTabEntrenamiento } from './TopTabEntrenamiento';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';

export type RootTabParams = {
    Home: undefined;
    Entrenamiento: undefined;
};

const Tab = createMaterialBottomTabNavigator<RootTabParams>();

export const BotTabNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      initialRouteName='Home'
      barStyle={{
        backgroundColor: isDarkMode
          ? MD3DarkTheme.colors.background
          : MD3LightTheme.colors.background,
        borderColor: isDarkMode
            ? MD3DarkTheme.colors.surfaceVariant
            : MD3LightTheme.colors.surfaceVariant,
        borderTopWidth: 1,
      }}
      activeColor={isDarkMode ? MD3DarkTheme.colors.primary : MD3LightTheme.colors.primary}
      inactiveColor={isDarkMode ? MD3DarkTheme.colors.onSurface : MD3LightTheme.colors.onSurface}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Entrenamiento" component={TopTabEntrenamiento} />
    </Tab.Navigator>
  );
}