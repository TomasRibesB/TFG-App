import React, {Component} from 'react';
import {MainLayout} from '../layouts/MainLayout';
import {ActivityIndicator} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {View} from 'react-native';

export const Loader = () => {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.surfaceVariant,
        padding: 16,
        borderRadius: 50,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator animating={true} size={'large'} />
    </View>
  );
};
