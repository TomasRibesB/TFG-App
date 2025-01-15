import React, {Component} from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { ActivityIndicator } from 'react-native-paper';

export const LoadingScreen = () => {
  return (
    <MainLayout stylesChild={{justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator animating={true} size={'large'} />
    </MainLayout>
  );
};
