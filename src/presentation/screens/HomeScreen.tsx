import React, {Component} from 'react';
import {MainLayout} from '../layouts/MainLayout';
import {Button, IconButton, Text} from 'react-native-paper';
import {CardContainer} from '../components/CardContainer';
import {MaterialCalendar} from '../components/MaterialCalendar';
import {View} from 'react-native';
import {TicketComponent} from '../components/TicketComponent';
import {RecordatorioComponent} from '../components/RecordatorioComponent';

const recordatorios = [
  {
    id: 1,
    title: 'Entrenamiento de Piernas',
    description:
      'Sesión de fuerza para piernas y glúteos. Incluye sentadillas y estocadas.',
    date: '2024-11-01',
    time: '09:00',
  },
  {
    id: 2,
    title: 'Consulta Nutricional',
    description: 'Revisión mensual del plan nutricional.',
    date: '2024-11-01',
    time: '15:30',
    profesional: 'Lic. Ana Pérez',
  },
  {
    id: 3,
    title: 'Clase de Yoga',
    description: 'Clase de yoga para mejorar flexibilidad y reducir el estrés.',
    date: '2024-11-02',
    time: '18:00',
  },
  {
    id: 4,
    title: 'Recordatorio de Hidratación',
    description: 'Recuerda beber agua durante tu entrenamiento.',
    date: '2024-11-02',
  },
  {
    id: 5,
    title: 'Turno Médico',
    description: 'Control general para revisar indicadores de salud.',
    date: '2024-11-03',
    time: '10:00',
    profesional: 'Dr. Carlos López',
  },
  {
    id: 6,
    title: 'Pesaje Semanal',
    description:
      'Control de peso semanal para ajustar el plan de entrenamiento y dieta.',
    date: '2024-11-04',
    time: '07:30',
  },
  {
    id: 7,
    title: 'Entrenamiento de Cardio',
    description:
      'Sesión de alta intensidad para mejorar resistencia cardiovascular.',
    date: '2024-11-04',
    time: '08:00',
  },
  {
    id: 8,
    title: 'Revisión de Objetivos',
    description: 'Evaluación de objetivos alcanzados durante la semana.',
    date: '2024-11-05',
    time: '17:00',
  },
  {
    id: 9,
    title: 'Consulta de Fisioterapia',
    description: 'Chequeo de recuperación muscular y recomendaciones.',
    date: '2024-11-06',
    time: '14:30',
    profesional: 'Lic. Javier Gómez',
  },
  {
    id: 10,
    title: 'Preparación de Comidas',
    description: 'Planifica y prepara las comidas saludables de la semana.',
    date: '2024-11-06',
    time: '19:00',
  },
];

export const HomeScreen = () => {
  return (
    <MainLayout title="Inicio">
      <RecordatorioComponent recordatorios={recordatorios} />
      <CardContainer title="Calendario" icon="calendar-outline">
        <MaterialCalendar />
      </CardContainer>
      <TicketComponent />
    </MainLayout>
  );
};
