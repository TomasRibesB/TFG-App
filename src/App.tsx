import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { AppState, AppStateStatus, Text, View } from 'react-native';
import { ThemecontextProvider } from './presentation/context/ThemeContext';
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { socket } from './services/socket';

export const App = () => {
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        socket.connect();
      } else if (nextAppState.match(/inactive|background/)) {
        socket.disconnect();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <ThemecontextProvider>
      <StackNavigator />
    </ThemecontextProvider>
  );
}