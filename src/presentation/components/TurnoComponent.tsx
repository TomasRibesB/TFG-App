import React, {useEffect, useState} from 'react';
import {View, ScrollView, Alert} from 'react-native';
import {CardContainer} from './CardContainer';
import {useTheme, Text, Button, Divider} from 'react-native-paper';
import {PaperSelect} from 'react-native-paper-select';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalVariables} from '../../config/theme/global-theme';
import {User} from '../../infrastructure/interfaces/user';
import {Turno} from '../../infrastructure/interfaces/turno';
import {Role} from '../../infrastructure/enums/roles';
import {
  putCancelarTurnoRequest,
  putReservarTurnoRequest,
} from '../../services/salud';
import {EstadoTurno} from '../../infrastructure/enums/estadosTurnos';
import {getProfesionalsAndUpdateStorage} from '../../services/user';

interface Props {
  profesionales: User[];
  onUpdateProfesionales: () => void;
  isLoading: boolean;
}

export const TurnoComponent = ({
  profesionales,
  onUpdateProfesionales,
  isLoading,
}: Props) => {
  const theme = useTheme();
  const [profList, setProfList] = useState<string[]>([]);
  const [allTurnos, setAllTurnos] = useState<any[]>([]);
  const [selectedProfesional, setSelectedProfesional] = useState('Todos');
  const [infoText, setInfoText] = useState('');

  useEffect(() => {
    console.log('useEffect');
    const nombresProfesionales = [
      'Todos',
      ...profesionales.map(
        p =>
          `${p.firstName} ${p.lastName}\n${
            p.role === Role.Profesional
              ? 'Profesional - ' +
                (p.userTipoProfesionales
                  ?.map(tipo => tipo.tipoProfesional?.profesion)
                  .filter(profesion => profesion !== undefined)
                  .join(', ') || 'No especificado')
              : (p.role?.charAt(0).toUpperCase() ?? '') +
                (p.role?.slice(1).toLocaleLowerCase() ?? '')
          }`,
      ),
    ];
    setProfList(nombresProfesionales);

    const turnosDesplegados = profesionales.flatMap(p =>
      (p.turnosProfesional || []).map(turno => ({
        ...turno,
        profesional: `${p.firstName} ${p.lastName}\n${
          p.role === Role.Profesional
            ? 'Profesional - ' +
              (p.userTipoProfesionales
                ?.map(tipo => tipo.tipoProfesional?.profesion)
                .filter(profesion => profesion !== undefined)
                .join(', ') || 'No especificado')
            : (p.role?.charAt(0).toUpperCase() ?? '') +
              (p.role?.slice(1).toLocaleLowerCase() ?? '')
        }`,
        role:
          p.role === Role.Profesional
            ? 'Profesional'
            : (p.role?.charAt(0).toUpperCase() ?? '') +
              (p.role?.slice(1).toLocaleLowerCase() ?? ''),
      })),
    );
    setAllTurnos(turnosDesplegados);
  }, [profesionales]);

  //useeffect para limpiar la infoText
  useEffect(() => {
    if (!infoText) return;
    const timer = setTimeout(() => {
      setInfoText('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [infoText]);

  const handleReservarTurno = async (id: number) => {
    const response: boolean = await putReservarTurnoRequest(id);
    console.log(response);
    if (response) {
      const updatedTurnos = allTurnos.map(turno => {
        if (turno.id === id) {
          return {
            ...turno,
            estado: EstadoTurno.Pendiente,
          };
        }
        return turno;
      });
      setAllTurnos(updatedTurnos);
    } else {
      const updatedTurnos = allTurnos.map(turno => {
        if (turno.id === id) {
          return {...turno, error: true};
        }
        return turno;
      });
      setAllTurnos(updatedTurnos);
      setTimeout(() => {
        setAllTurnos(prevTurnos => prevTurnos.filter(turno => turno.id !== id));
        onUpdateProfesionales();
      }, 5000);
    }
  };

  const handleCancelarTurno = async (id: number) => {
    Alert.alert('Cancelar Turno', '¿Está seguro que desea cancelar el turno?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Sí', onPress: () => cancelarTurno(id)},
    ]);
  };

  const cancelarTurno = async (id: number) => {
    const response: boolean = await putCancelarTurnoRequest(id);
    console.log(response);
    if (response) {
      const updatedTurnos = allTurnos.map(turno => {
        if (turno.id === id) {
          return {
            ...turno,
            estado: EstadoTurno.Cancelado,
          };
        }
        return turno;
      });
      setAllTurnos(updatedTurnos);
    }
  };

  const filteredTurnos: Turno[] =
    selectedProfesional === 'Todos'
      ? allTurnos
      : allTurnos.filter(turno => turno.profesional === selectedProfesional);

  return (
    <CardContainer
      title="Turnos"
      icon="calendar-outline"
      onAction={onUpdateProfesionales}
      actionLabel="Actualizar"
      actionIcon="refresh-outline"
      isLoadingAction={isLoading}>
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
      <Text
        variant="labelSmall"
        style={{color: theme.colors.onSurface, marginBottom: 8}}>
        {infoText}
      </Text>
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
                    formattedDate +=
                      ' - ' +
                      date.toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                      });
                    return formattedDate;
                  })()}
                  {}
                </Text>
                {turno.profesional && (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="person-circle-outline"
                      size={28}
                      color={theme.colors.onSurface}
                      style={{marginRight: 3}}
                    />
                    <Text
                      variant="titleSmall"
                      style={{color: theme.colors.onSurface}}>
                      {turno.profesional.toString()}
                    </Text>
                  </View>
                )}
              </View>
              <Button
                mode={
                  turno.estado === EstadoTurno.Libre && !turno.error
                    ? 'text'
                    : 'contained-tonal'
                }
                onPress={() => {
                  if (turno.estado === EstadoTurno.Libre && !turno.error) {
                    handleReservarTurno(turno.id);
                  } else if (turno.estado === EstadoTurno.Pendiente) {
                    handleCancelarTurno(turno.id);
                  }
                }}
                labelStyle={{
                  fontSize: 14,
                  color: turno.error
                    ? theme.colors.error
                    : theme.colors.primary,
                }}
                disabled={turno.estado === EstadoTurno.Cancelado}
                loading={turno.error}>
                {turno.error
                  ? 'Ocupado'
                  : turno.estado === EstadoTurno.Libre
                  ? 'Reservar'
                  : turno.estado}
              </Button>
            </View>
          ))}
        </View>
      </ScrollView>
    </CardContainer>
  );
};
