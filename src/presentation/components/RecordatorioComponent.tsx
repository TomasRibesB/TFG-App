import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { CardContainer } from './CardContainer';
import { useTheme, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalVariables } from '../../config/theme/global-theme';

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

export const RecordatorioComponent = ({ recordatorios }: Props) => {
  const [currentRecordatorio, setCurrentRecordatorio] = useState<Props['recordatorios']>([]);
  const theme = useTheme();

  useEffect(() => {
    setCurrentRecordatorio(recordatorios);
  }, [recordatorios]);

  const screenWidth = Dimensions.get('window').width * 0.85;

  return (
    <CardContainer title="Recordatorios" icon="notifications-outline">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ width: screenWidth }}
      >
        {currentRecordatorio.map((recordatorio, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              // Navegar al detalle del recordatorio
            }}
            onLongPress={() => {
              // Acción al mantener presionado
            }}
            style={{
              width: screenWidth,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: theme.colors.surface,
                borderRadius: globalVariables.containerBorderRadius,
                padding: globalVariables.padding,
                marginVertical: 8,
                marginHorizontal: 16,
                width: screenWidth * 0.9,
              }}
            >
              {(recordatorio.date || recordatorio.time) && (
                <Text variant="labelSmall" style={{ color: theme.colors.onSurface }}>
                  {recordatorio.date} {recordatorio.time}
                </Text>
              )}
              <Text
                variant="titleSmall"
                style={{ color: theme.colors.onSurface, marginVertical: 4 }}
              >
                {recordatorio.title}
              </Text>
              {recordatorio.profesional && (
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}
                >
                  <Icon
                    name="person-circle-outline"
                    size={16}
                    color={theme.colors.onSurface}
                    style={{ marginRight: 4 }}
                  />
                  <Text variant="labelSmall" style={{ color: theme.colors.onSurface }}>
                    {recordatorio.profesional}
                  </Text>
                </View>
              )}
              <Text
                variant="bodySmall"
                style={{ color: theme.colors.onSurface, textAlign: 'center' }}
              >
                {recordatorio.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </CardContainer>
  );
};