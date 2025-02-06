import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {CardContainer} from './CardContainer'; // [src/presentation/components/CardContainer.tsx](src/presentation/components/CardContainer.tsx)
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
  const [currentRecordatorio, setCurrentRecordatorio] = useState<
    Props['recordatorios']
  >([]);
  const [visible, setVisible] = useState(false);
  const [recordatorioSeleccionado, setRecordatorioSeleccionado] = useState<
    number | null
  >(null);
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
      // Aquí se implementa la lógica para eliminar el recordatorio seleccionado
    }
    hideDialog();
  };

  return (
    <CardContainer title="Recordatorios" icon="alarm-outline">
      <ScrollView style={styles.scroll} nestedScrollEnabled>
        {currentRecordatorio.map(recordatorio => (
          <TouchableOpacity
            key={recordatorio.id}
            onLongPress={() => showDialog(recordatorio.id)}>
            <View
              style={[styles.card, {backgroundColor: theme.colors.elevation.level2}]}>
              <Text style={styles.title}>{recordatorio.title}</Text>
              <Text style={styles.description}>{recordatorio.description}</Text>
              {recordatorio.date && (
                <Text style={styles.meta}>Fecha: {recordatorio.date}</Text>
              )}
              {recordatorio.time && (
                <Text style={styles.meta}>Hora: {recordatorio.time}</Text>
              )}
              {recordatorio.profesional && (
                <Text style={styles.meta}>
                  Profesional: {recordatorio.profesional}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Eliminar Recordatorio</Dialog.Title>
          <Dialog.Content>
            <Text>¿Deseas eliminar este recordatorio?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancelar</Button>
            <Button onPress={eliminarRecordatorio}>Eliminar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  scroll: {
    maxHeight: 300,
  },
  card: {
    padding: globalVariables.padding,
    marginBottom: globalVariables.margin,
    borderRadius: globalVariables.containerBorderRadius,
    elevation: 1,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 1},
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
  },
  meta: {
    fontSize: 12,
    color: 'gray',
  },
});
