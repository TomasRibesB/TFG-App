import React, {Component, useEffect, useState} from 'react';
import {MainLayout} from '../layouts/MainLayout';
import {Button, Dialog, IconButton, Portal, Text} from 'react-native-paper';
import {CardContainer} from '../components/CardContainer';
import {MaterialCalendar} from '../components/MaterialCalendar';
import {View} from 'react-native';
import {TicketComponent} from '../components/TicketComponent';
import {RecordatorioComponent} from '../components/RecordatorioComponent';
import {getRecordatoriosRequest} from '../../services/user';
import {Recordatorio} from '../../infrastructure/interfaces/recordatorio';

export const HomeScreen = () => {
  const [recordatorios, setRecordatorios] = useState<Partial<Recordatorio>[]>(
    [],
  );
  const [visible, setVisible] = useState(false);
  const [selectedDayRecordatorios, setSelectedDayRecordatorios] = useState<
    Partial<Recordatorio>[]
  >([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const result = await getRecordatoriosRequest();
    console.log(result);
    setRecordatorios(result);
  };

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    setSelectedDayRecordatorios([]);
  };

  const handleSelectedDayRecordatorios = (date: Date) => {
    const selectedDayRecordatorios = recordatorios.filter(
      recordatorio =>
        recordatorio.fecha &&
        new Date(recordatorio.fecha).toDateString() === date.toDateString(),
    );
    if (selectedDayRecordatorios.length === 0) {
      return;
    }
    setSelectedDayRecordatorios(selectedDayRecordatorios);
    showDialog();
  };

  return (
    <MainLayout title="Inicio">
      {recordatorios.length > 0 ? (
        <>
          <RecordatorioComponent recordatorios={recordatorios} />
          <CardContainer
            title="Calendario de recordatorios"
            icon="calendar-outline">
            <MaterialCalendar
              exaltedDays={recordatorios
                .filter(recordatorio => recordatorio.fecha)
                .map(recordatorio => new Date(recordatorio.fecha!))}
              onTouchDay={(day: string) => {
                handleSelectedDayRecordatorios(new Date(day));
              }}
            />
          </CardContainer>
        </>
      ) : (
        <>
          <CardContainer
            title="Calendario de recordatorios"
            icon="calendar-outline">
            <MaterialCalendar />
          </CardContainer>
        </>
      )}
      <TicketComponent />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{
            backgroundColor: 'transparent',
            elevation: 0,
            shadowColor: 'transparent',
          }}>
          {selectedDayRecordatorios.length > 0 && (
            <RecordatorioComponent recordatorios={selectedDayRecordatorios} />
          )}
        </Dialog>
      </Portal>
    </MainLayout>
  );
};
