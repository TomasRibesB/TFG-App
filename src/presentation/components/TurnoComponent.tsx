import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {CardContainer} from './CardContainer';
import {useTheme, Text, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalVariables} from '../../config/theme/global-theme';

export const TurnoComponent = () => {
  const theme = useTheme();
  const [turnos, setTurnos] = useState([
    {id: 1, fecha: '2023-10-20', hora: '10:00', reservado: false, profesional: 'Dr. Pérez'},
    {id: 2, fecha: '2023-10-21', hora: '11:00', reservado: true, profesional: 'Dra. Gómez'},
    // Agrega más turnos si es necesario
  ]);

  const reservarTurno = (id: number) => {
    // Lógica para reservar el turno
  };

  return (
    <CardContainer title="Turnos" icon="calendar-outline">
      <ScrollView style={{paddingHorizontal: 10}}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}>
          {turnos.map((turno, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                minWidth: '100%',
                backgroundColor: theme.colors.surface,
                borderRadius: globalVariables.containerBorderRadius,
                padding: globalVariables.padding / 2,
                marginBottom: 8,
              }}>
              <View style={{flex: 1, marginRight: 8}}>
                <Text variant="labelSmall" style={{color: theme.colors.onSurface}}>
                  {turno.fecha} {turno.hora}
                </Text>
                <Text variant="titleSmall" style={{color: theme.colors.onSurface}}>
                  Turno {turno.id}
                </Text>
                {turno.profesional && (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="person-circle-outline"
                      size={16}
                      color={theme.colors.onSurface}
                      style={{marginRight: 3}}
                    />
                    <Text variant="labelSmall" style={{color: theme.colors.onSurface}}>
                      {turno.profesional}
                    </Text>
                  </View>
                )}
              </View>
              <Button
                mode="text"
                onPress={() => reservarTurno(turno.id)}
                labelStyle={{fontSize: 14, color: theme.colors.primary}}
              >
                Reservar
              </Button>
            </View>
          ))}
        </View>
      </ScrollView>
    </CardContainer>
  );
};