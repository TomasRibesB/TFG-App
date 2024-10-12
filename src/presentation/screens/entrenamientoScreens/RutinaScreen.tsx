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
import {globalVariables} from '../../../config/theme/global-theme';
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
        contentContainerStyle={styles.modalContainer}>
        <View
          style={[
            styles.modalContent,
            {backgroundColor: theme.colors.surface},
          ]}>
          {selectedExercise && (
            <>
              <Text
                style={[styles.modalTitle, {color: theme.colors.onSurface}]}>
                {selectedExercise.ejercicio.nombre}
              </Text>
              <Text
                style={[
                  styles.modalDescription,
                  {color: theme.colors.onSurfaceVariant},
                ]}>
                {selectedExercise.ejercicio.descripcion}
              </Text>
              <View style={styles.modalRow}>
                <Text
                  style={[
                    styles.modalLabel,
                    {color: theme.colors.onSurfaceVariant},
                  ]}>
                  Series:
                </Text>
                <Text
                  style={[
                    styles.modalText,
                    {color: theme.colors.onSurfaceVariant},
                  ]}>
                  {selectedExercise.series}
                </Text>
              </View>
              <View style={styles.modalRow}>
                <Text
                  style={[
                    styles.modalLabel,
                    {color: theme.colors.onSurfaceVariant},
                  ]}>
                  Repeticiones:
                </Text>
                <Text
                  style={[
                    styles.modalText,
                    {color: theme.colors.onSurfaceVariant},
                  ]}>
                  {selectedExercise.repeticiones}
                </Text>
              </View>
              <View style={styles.modalRow}>
                <Text
                  style={[
                    styles.modalLabel,
                    {color: theme.colors.onSurfaceVariant},
                  ]}>
                  {selectedExercise.ejercicio.unidadMedida}:
                </Text>
                <Text
                  style={[
                    styles.modalText,
                    {color: theme.colors.onSurfaceVariant},
                  ]}>
                  {selectedExercise.medicion}
                </Text>
              </View>
              <View style={styles.modalRow}>
                <Text
                  style={[
                    styles.modalLabel,
                    {color: theme.colors.onSurfaceVariant},
                  ]}>
                  Grupos musculares:
                </Text>
                <Text
                  style={[
                    styles.modalText,
                    {color: theme.colors.onSurfaceVariant},
                  ]}>
                  {selectedExercise.ejercicio.gruposMuscularesId.join(', ')}
                </Text>
              </View>
              <View style={styles.modalRow}>
                <Text
                  style={[
                    styles.modalLabel,
                    {color: theme.colors.onSurfaceVariant},
                  ]}>
                  Categorías:
                </Text>
                <Text
                  style={[
                    styles.modalText,
                    {color: theme.colors.onSurfaceVariant},
                  ]}>
                  {selectedExercise.ejercicio.categoriasId.join(', ')}
                </Text>
              </View>
              <Text
                style={[
                  styles.modalText,
                  {color: theme.colors.onSurfaceVariant},
                ]}>
                {selectedExercise.ejercicio.video}
              </Text>
              <Button
                onPress={closeModal}
                mode="contained"
                style={styles.closeButton}>
                Cerrar
              </Button>
            </>
          )}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    padding: globalVariables.padding,
    shadowColor: 'transparent', // Sin sombra
  },
  modalContent: {
    padding: globalVariables.padding * 1.5,
    borderRadius: globalVariables.containerBorderRadius * 1.5, // Bordes más redondeados
  },
  modalTitle: {
    fontSize: 24, // Título más grande y destacable
    fontWeight: 'bold',
    marginBottom: globalVariables.margin,
    textAlign: 'center', // Centrar el título
  },
  modalRow: {
    flexDirection: 'row', // Estilo en fila para etiquetas y valores
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: globalVariables.margin / 2,
  },
  modalLabel: {
    fontSize: 18,
    fontWeight: '600', // Etiquetas más prominentes
  },
  modalText: {
    fontSize: 18,
  },
  modalDescription: {
    fontSize: 16,
    fontStyle: 'italic', // Dar estilo cursivo a la descripción
    marginBottom: globalVariables.margin,
  },
  closeButton: {
    marginTop: globalVariables.margin,
    alignSelf: 'center', // Botón centrado
    width: '50%', // Botón más ancho
  },
});
