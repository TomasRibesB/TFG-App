import React from 'react';
import { Text, View } from 'react-native';
import { ThemecontextProvider } from './presentation/context/ThemeContext';

export const App = () => {
  return (
    <ThemecontextProvider>
      <View>
        <Text>App</Text>
      </View>
    </ThemecontextProvider>
  );
}