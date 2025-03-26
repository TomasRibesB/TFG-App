import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {CardContainer} from './CardContainer'; // [src/presentation/components/CardContainer.tsx](src/presentation/components/CardContainer.tsx)
import {useTheme, Text} from 'react-native-paper';
import {globalVariables} from '../../config/theme/global-theme';
import {Recordatorio} from '../../infrastructure/interfaces/recordatorio';

interface Props {
  recordatorios: Partial<Recordatorio>[];
}

export const RecordatorioComponent = ({recordatorios}: Props) => {
  const [currentRecordatorio, setCurrentRecordatorio] = useState<
    Props['recordatorios']
  >([]);
  const theme = useTheme();

  useEffect(() => {
    setCurrentRecordatorio(recordatorios);
  }, [recordatorios]);

  return (
    <CardContainer title="Recordatorios" icon="alarm-outline">
      {currentRecordatorio.length === 0 ? (
        <Text variant="labelSmall" style={{textAlign: 'center'}}>
          No hay recordatorios
        </Text>
      ) : (
        <ScrollView style={styles.scroll} nestedScrollEnabled>
          {currentRecordatorio.map(recordatorio => (
            <View key={`${recordatorio.id} - ${recordatorio.tipo}`}>
              <View
                style={[
                  styles.card,
                  {backgroundColor: theme.colors.elevation.level2},
                ]}>
                <Text style={styles.title}>{recordatorio.tipo}</Text>
                <Text style={styles.description}>
                  {recordatorio.descripcion}
                </Text>
                {recordatorio.fecha && (
                  <Text style={styles.meta}>
                    Fecha: {new Date(recordatorio.fecha).toLocaleString()}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      )}
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
