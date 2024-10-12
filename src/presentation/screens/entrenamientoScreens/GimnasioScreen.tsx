import React from 'react';
import {MainLayout} from '../../layouts/MainLayout';
import {StyleSheet} from 'react-native';
import { TicketComponent } from '../../components/TicketComponent';
import { ProfesionalComponent } from '../../components/ProfesionalComponent';

export const GimnasioScreen = () => {
  return (
    <MainLayout>
      <ProfesionalComponent title="Entrenador" name="Tomás" lastName="Ribes" />
      <TicketComponent />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  avatar: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});