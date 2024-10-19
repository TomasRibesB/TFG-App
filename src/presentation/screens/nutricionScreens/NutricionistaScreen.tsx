import React, {Component} from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { Text } from 'react-native-paper';
import { ProfesionalComponent } from '../../components/ProfesionalComponent';
import { TicketComponent } from '../../components/TicketComponent';
import { TurnoComponent } from '../../components/TurnoComponent';

export const NutricionistaScreen = () => {
  return (
    <MainLayout>
      <ProfesionalComponent title="Nutricionista" name="Ignacio" lastName="Baquero" />
      <TicketComponent />
      <TurnoComponent />
    </MainLayout>
  );
};
