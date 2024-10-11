import React, {Component} from 'react';
import {MainLayout} from '../layouts/MainLayout';
import {Button, IconButton, Text} from 'react-native-paper';
import {CardContainer} from '../components/CardContainer';
import {MaterialCalendar} from '../components/MaterialCalendar';
import {View} from 'react-native';
import { TicketComponent } from '../components/TicketComponent';

export const HomeScreen = () => {
  return (
    <MainLayout title="Inicio">
      <CardContainer title="Calendario" icon="calendar-outline">
        <MaterialCalendar />
      </CardContainer>
      <TicketComponent />
    </MainLayout>
  );
};
