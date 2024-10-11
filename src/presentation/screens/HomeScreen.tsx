import React, {Component} from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Text } from 'react-native-paper';

export const HomeScreen = () => {
  return (
    <MainLayout title='Inicio'>
      <Text>HomeScreen</Text>
    </MainLayout>
  );
};