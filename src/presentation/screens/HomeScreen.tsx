import React, {Component} from 'react';
import {MainLayout} from '../layouts/MainLayout';
import {Button, IconButton, Text} from 'react-native-paper';
import {CardContainer} from '../components/CardContainer';
import {MaterialCalendar} from '../components/MaterialCalendar';
import {View} from 'react-native';

export const HomeScreen = () => {
  return (
    <MainLayout title="Inicio">
      <CardContainer title="Calendario" icon="calendar-outline">
        <MaterialCalendar />
      </CardContainer>
      <CardContainer title="Tickets" icon="chatbox-outline">
        <View
          style={{
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <IconButton icon="arrow-forward-outline" size={20} mode='contained' />
        </View>
      </CardContainer>
    </MainLayout>
  );
};
