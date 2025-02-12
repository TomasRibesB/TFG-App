import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {CardContainer} from './CardContainer';
import {useTheme, Text, Button, Divider} from 'react-native-paper';
import {PaperSelect} from 'react-native-paper-select';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalVariables} from '../../config/theme/global-theme';
import {User} from '../../infrastructure/interfaces/user';
import {Turno} from '../../infrastructure/interfaces/turno';
import {Role} from '../../infrastructure/enums/roles';

interface Props {
  profesionales: User[];
}

export const TurnoComponent = ({profesionales}: Props) => {
  const theme = useTheme();
  const [profList, setProfList] = useState<string[]>([]);
  const [allTurnos, setAllTurnos] = useState<any[]>([]);
  const [selectedProfesional, setSelectedProfesional] = useState('Todos');

  useEffect(() => {
    const nombresProfesionales = [
      'Todos',
      ...profesionales.map(p => `${p.firstName} ${p.lastName}`),
    ];
    setProfList(nombresProfesionales);

    const turnosDesplegados = profesionales.flatMap(p =>
      (p.turnosProfesional || []).map(turno => ({
        ...turno,
        profesional: `${p.firstName} ${p.lastName}`,
        role:
          p.role === Role.Profesional
            ? 'Profesional'
            : (p.role?.charAt(0).toUpperCase() ?? '') +
              (p.role?.slice(1).toLocaleLowerCase() ?? ''),
      })),
    );
    setAllTurnos(turnosDesplegados);
  }, [profesionales]);

  const reservarTurno = (id: number) => {
    // Lógica de reserva
  };

  const filteredTurnos: Turno[] =
    selectedProfesional === 'Todos'
      ? allTurnos
      : allTurnos.filter(turno => turno.profesional === selectedProfesional);

  return (
    <CardContainer title="Turnos" icon="calendar-outline">
      <PaperSelect
        label="Seleccionar Profesional"
        value={selectedProfesional}
        onSelection={value => setSelectedProfesional(value.text)}
        arrayList={profList.map(p => ({_id: p, value: p}))}
        selectedArrayList={[
          {_id: selectedProfesional, value: selectedProfesional},
        ]}
        multiEnable={false}
        textInputOutlineStyle={{borderRadius: 8}}
        dialogTitle="Seleccionar Profesional"
        dialogCloseButtonText="Cerrar"
        textInputMode="outlined"
        dialogDoneButtonText="Hecho"
        hideSearchBox={true}
      />
      <Divider style={{marginVertical: 10}} />
      <ScrollView>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}>
          {filteredTurnos.map((turno, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                minWidth: '100%',
                backgroundColor: theme.colors.elevation.level2,
                borderRadius: globalVariables.containerBorderRadius,
                padding: globalVariables.padding / 2,
                marginBottom: 8,
              }}>
              <View style={{flex: 1, marginRight: 8}}>
                <Text
                  variant="labelSmall"
                  style={{color: theme.colors.onSurface}}>
                  {(() => {
                    const date = new Date(turno.fechaHora);
                    let formattedDate = date.toLocaleDateString('es-ES', {
                      weekday: 'long',
                      day: '2-digit',
                      month: 'long',
                    });
                    formattedDate = formattedDate.replace(/\b\w/g, char =>
                      char.toUpperCase(),
                    );
                    return formattedDate;
                  })()}{' '}
                </Text>
                <Text
                  variant="titleSmall"
                  style={{color: theme.colors.onSurface}}>
                  {(turno as any).role}
                </Text>
                {turno.profesional && (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="person-circle-outline"
                      size={16}
                      color={theme.colors.onSurface}
                      style={{marginRight: 3}}
                    />
                    <Text
                      variant="labelSmall"
                      style={{color: theme.colors.onSurface}}>
                      {turno.profesional.toString()}
                    </Text>
                  </View>
                )}
              </View>
              <Button
                mode="text"
                onPress={() => reservarTurno(turno.id)}
                labelStyle={{fontSize: 14, color: theme.colors.primary}}>
                Reservar
              </Button>
            </View>
          ))}
        </View>
      </ScrollView>
    </CardContainer>
  );
};
