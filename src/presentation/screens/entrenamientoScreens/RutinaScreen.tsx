import React, {useState} from 'react';
import {MainLayout} from '../../layouts/MainLayout';
import {
  Checkbox,
  List,
  Modal,
  ProgressBar,
  Text,
  Button,
  useTheme,
} from 'react-native-paper';
import {DesplegableCard} from '../../components/DesplegableCard';
import rutinasData from './Rutinas.json';
import {View, StyleSheet} from 'react-native';
import {globalVariables, globalTheme} from '../../../config/theme/global-theme';
import {EjercicioElement} from './RutinaType';

export const RutinaScreen = () => {
  const [checked, setChecked] = useState<{[key: number]: boolean}>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] =
    useState<EjercicioElement | null>(null);

  const theme = useTheme();

  const handleCheckboxPress = (id: number) => {
    setChecked(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const calculateProgress = (ejercicios: {rutinaEjercicioId: number}[]) => {
    const total = ejercicios.length;
    const completed = ejercicios.filter(
      ejercicio => checked[ejercicio.rutinaEjercicioId],
    ).length;
    return total === 0 ? 0 : completed / total;
  };

  const handleLongPress = (ejercicio: EjercicioElement) => {
    setSelectedExercise(ejercicio);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedExercise(null);
  };

  return (
    <>
      <MainLayout>
        {rutinasData.rutinas.map(rutina => (
          <DesplegableCard
            key={rutina.rutinaId}
            title={rutina.nombre}
            icon="barbell-outline">
            <View style={{paddingBottom: globalVariables.padding}}>
              <Text
                style={{
                  marginBottom: globalVariables.margin,
                  paddingHorizontal: globalVariables.padding,
                }}>
                {rutina.descripcion}
              </Text>
              {rutina.ejercicios.map(ejercicio => (
                <List.Item
                  style={{paddingVertical: 0}}
                  key={ejercicio.rutinaEjercicioId}
                  title={ejercicio.ejercicio.nombre}
                  onLongPress={() => handleLongPress(ejercicio)}
                  onPress={() =>
                    handleCheckboxPress(ejercicio.rutinaEjercicioId)
                  }
                  description={`${ejercicio.series}x${ejercicio.repeticiones}`}
                  right={() => (
                    <Checkbox
                      status={
                        checked[ejercicio.rutinaEjercicioId]
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() =>
                        handleCheckboxPress(ejercicio.rutinaEjercicioId)
                      }
                    />
                  )}
                />
              ))}
              <Text
                variant="bodySmall"
                style={{
                  marginBottom: globalVariables.margin,
                  paddingHorizontal: globalVariables.padding,
                }}>
                Al mantener precionado un ejercicio se mostrará información
                adicional.
              </Text>
              <ProgressBar
                progress={calculateProgress(rutina.ejercicios)}
                style={{
                  marginTop: 10,
                  height: 10,
                  borderRadius: globalVariables.innerBorderRadius,
                }}
              />
            </View>
          </DesplegableCard>
        ))}
      </MainLayout>
      <Modal
        visible={modalVisible}
        onDismiss={closeModal}
        contentContainerStyle={globalTheme.modalContainer}>
        <View
          style={[
            globalTheme.modalContent,
          ]}>
          {selectedExercise && (
            <>
              <Text
                style={[globalTheme.modalTitle, {color: theme.colors.onSurface}]}>
                {selectedExercise.ejercicio.nombre}
              </Text>
              <Text
                style={[
                  globalTheme.modalDescription,
                ]}>
                {selectedExercise.ejercicio.descripcion}
              </Text>
              <View style={globalTheme.modalRow}>
                <Text
                  style={[
                    globalTheme.modalLabel,
                  ]}>
                  Series:
                </Text>
                <Text
                  style={[
                    globalTheme.modalText,
                  ]}>
                  {selectedExercise.series}
                </Text>
              </View>
              <View style={globalTheme.modalRow}>
                <Text
                  style={[
                    globalTheme.modalLabel,
                  ]}>
                  Repeticiones:
                </Text>
                <Text
                  style={[
                    globalTheme.modalText,
                  ]}>
                  {selectedExercise.repeticiones}
                </Text>
              </View>
              <View style={globalTheme.modalRow}>
                <Text
                  style={[
                    globalTheme.modalLabel,
                  ]}>
                  {selectedExercise.ejercicio.unidadMedida}:
                </Text>
                <Text
                  style={[
                    globalTheme.modalText,
                  ]}>
                  {selectedExercise.medicion}
                </Text>
              </View>
              <View style={globalTheme.modalRow}>
                <Text
                  style={[
                    globalTheme.modalLabel,
                  ]}>
                  Grupos musculares:
                </Text>
                <Text
                  style={[
                    globalTheme.modalText,
                  ]}>
                  {selectedExercise.ejercicio.gruposMuscularesId.join(', ')}
                </Text>
              </View>
              <View style={globalTheme.modalRow}>
                <Text
                  style={[
                    globalTheme.modalLabel,
                  ]}>
                  Categorías:
                </Text>
                <Text
                  style={[
                    globalTheme.modalText,
                  ]}>
                  {selectedExercise.ejercicio.categoriasId.join(', ')}
                </Text>
              </View>
              <Text
                style={[
                  globalTheme.modalText,
                ]}>
                {selectedExercise.ejercicio.video}
              </Text>
              <Button
                onPress={closeModal}
                mode="contained"
                style={globalTheme.modalCloseButton}>
                Cerrar
              </Button>
            </>
          )}
        </View>
      </Modal>
    </>
  );
};
