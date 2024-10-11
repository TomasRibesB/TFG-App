import 'react-native-gesture-handler';

import React from 'react';
import { Text, View } from 'react-native';
import { ThemecontextProvider } from './presentation/context/ThemeContext';
import { StackNavigator } from './presentation/navigation/StackNavigator';

export const App = () => {
  return (
    <ThemecontextProvider>
      <StackNavigator />
    </ThemecontextProvider>
  );
}