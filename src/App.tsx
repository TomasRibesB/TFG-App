import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import {AppState, AppStateStatus, Text, View} from 'react-native';
import {ThemecontextProvider} from './presentation/context/ThemeContext';
import { RootNavigator } from './presentation/navigation/StackNavigator';
import { connect, disconnect } from './services/socket';

export const App = () => {
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        connect();
      } else if (nextAppState.match(/inactive|background/)) {
        disconnect();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <ThemecontextProvider>
        <RootNavigator />
    </ThemecontextProvider>
  );
};
