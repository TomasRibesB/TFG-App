import React, {Component} from 'react';
import {MainLayout} from '../layouts/MainLayout';
import {ActivityIndicator} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {View} from 'react-native';

interface Props{
  showBackground?: boolean;
}

export const Loader = ({showBackground = true}: Props) => {
  const theme = useTheme();

  return (
    <MainLayout
      stylesChild={{justifyContent: 'center', alignItems: 'center'}}
      styles={{
        flex: 1,
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: showBackground ? 'transparent' : theme.colors.surface,
      }}
      scrolleable={false}>
      <View
        style={{
          backgroundColor: theme.colors.surfaceVariant,
          padding: 16,
          borderRadius: 50,
          elevation: 10,
        }}>
        <ActivityIndicator animating={true} size={'large'} />
      </View>
    </MainLayout>
  );
};
