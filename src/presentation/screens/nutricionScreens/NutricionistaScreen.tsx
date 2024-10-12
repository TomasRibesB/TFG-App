import React, {Component} from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { Text } from 'react-native-paper';
import { ProfesionalComponent } from '../../components/ProfesionalComponent';
import { TicketComponent } from '../../components/TicketComponent';

export const NutricionistaScreen = () => {
  return (
    <MainLayout>
      <ProfesionalComponent title="Nutricionista" name="Ignacio" lastName="Baquero" />
      <TicketComponent />
    </MainLayout>
  );
};
