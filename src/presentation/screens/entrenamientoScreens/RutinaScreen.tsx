import React, {useState} from 'react';
import {MainLayout} from '../../layouts/MainLayout';
import {Card, Checkbox, List, Text} from 'react-native-paper';
import {DesplegableCard} from '../../components/DesplegableCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import rutinasData from './Rutinas.json';
import { View } from 'react-native';
import { globalVariables } from '../../../config/theme/global-theme';

export const RutinaScreen = () => {
  const [checked, setChecked] = useState<{[key: number]: boolean}>({});

  const handleCheckboxPress = (id: number) => {
    setChecked(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <MainLayout>
      {rutinasData.rutinas.map(rutina => (
        <DesplegableCard key={rutina.rutinaId} title={rutina.nombre} icon="barbell-outline">
          <View style={{paddingBottom: globalVariables.padding}}>
            {rutina.ejercicios.map(ejercicio => (
              <List.Item
                style={{paddingVertical: 0}}
                key={ejercicio.rutinaEjercicioId}
                title={ejercicio.ejercicio.nombre}
                description={`${ejercicio.series}x${ejercicio.repeticiones}`}
                right={() => (
                  <Checkbox
                    status={checked[ejercicio.rutinaEjercicioId] ? 'checked' : 'unchecked'}
                    onPress={() => handleCheckboxPress(ejercicio.rutinaEjercicioId)}
                  />
                )}
              />
            ))}
          </View>
        </DesplegableCard>
      ))}
    </MainLayout>
  );
};