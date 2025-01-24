import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import {CardContainer} from './CardContainer';
import {useTheme, Text, Button, Portal, Dialog} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalVariables} from '../../config/theme/global-theme';

interface Props {
  recordatorios: {
    id: number;
    title: string;
    description: string;
    date?: string;
    time?: string;
    profesional?: string;
  }[];
}

export const RecordatorioComponent = ({recordatorios}: Props) => {
  const [currentRecordatorio, setCurrentRecordatorio] = useState<Props['recordatorios']>([]);
  const [visible, setVisible] = useState(false);
  const [recordatorioSeleccionado, setRecordatorioSeleccionado] = useState<number | null>(null);
  const screenWidth = Dimensions.get('window').width - 32;
  const theme = useTheme();

  useEffect(() => {
    setCurrentRecordatorio(recordatorios);
  }, [recordatorios]);

  const showDialog = (id: number) => {
    setRecordatorioSeleccionado(id);
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
    setRecordatorioSeleccionado(null);
  };

  const eliminarRecordatorio = () => {
    if (recordatorioSeleccionado !== null) {
      // Lógica para eliminar el recordatorio
    }
    hideDialog();
  };

  return (
    <>
      <CardContainer title="Recordatorios" icon="notifications-outline">
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{width: screenWidth - globalVariables.padding * 1.9}}>
          {currentRecordatorio.map((recordatorio, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                // Navegar al detalle del recordatorio
              }}
              onLongPress={() => showDialog(recordatorio.id)}
              style={{
                width: screenWidth - globalVariables.padding * 1.9,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: theme.colors.surface,
                  borderRadius: globalVariables.containerBorderRadius,
                  padding: globalVariables.padding,
                  marginVertical: 8,
                  marginHorizontal: 8,
                  width: screenWidth - globalVariables.padding * 3,
                }}>
                <View style={{flex: 1, paddingRight: 8}}>
                  {(recordatorio.date || recordatorio.time) && (
                    <Text
                      variant="labelSmall"
                      style={{color: theme.colors.onSurface}}>
                      {recordatorio.date} {recordatorio.time}
                    </Text>
                  )}
                  <Text
                    variant="titleSmall"
                    style={{color: theme.colors.onSurface, marginVertical: 4}}>
                    {recordatorio.title}
                  </Text>
                  {recordatorio.profesional && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 4,
                      }}>
                      <Icon
                        name="person-circle-outline"
                        size={16}
                        color={theme.colors.onSurface}
                        style={{marginRight: 4}}
                      />
                      <Text
                        variant="labelSmall"
                        style={{color: theme.colors.onSurface}}>
                        {recordatorio.profesional}
                      </Text>
                    </View>
                  )}
                  <Text
                    variant="bodySmall"
                    style={{color: theme.colors.onSurface, textAlign: 'left'}}>
                    {recordatorio.description}
                  </Text>
                </View>
                <Icon
                  name="notifications-outline"
                  size={24}
                  color={theme.colors.onSurface}
                  style={{marginLeft: 8}}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </CardContainer>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Eliminar Recordatorio</Dialog.Title>
          <Dialog.Content>
            <Text>¿Estás seguro de que deseas eliminar este recordatorio?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancelar</Button>
            <Button onPress={eliminarRecordatorio}>Eliminar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
