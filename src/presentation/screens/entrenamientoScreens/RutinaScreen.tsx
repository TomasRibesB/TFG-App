import React, {useEffect, useState} from 'react';
import {MainLayout} from '../../layouts/MainLayout';
import {
  Checkbox,
  List,
  ProgressBar,
  Text,
  Button,
  useTheme,
} from 'react-native-paper';
import {DesplegableCard} from '../../components/DesplegableCard';
import {View, StyleSheet} from 'react-native';
import {globalVariables, globalTheme} from '../../../config/theme/global-theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {ExerciseDialog} from '../../components/DialogEjercicio';
import {Routine} from '../../../infrastructure/interfaces/routine';
import {RutinaEjercicio} from '../../../infrastructure/interfaces/rutina-ejercicio';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';
import {EmptySection} from '../../components/EmptySection';
import {User} from '../../../infrastructure/interfaces/user';
import {VisibilityComponent} from '../../components/VisibilidadComponent';
import {
  setAsignarVisivilidadRoutineRequest,
  setRegistroEjerciciosRequest,
} from '../../../services/entrenamiento';
import {UnidadMedida} from '../../../infrastructure/enums/unidadMedida';
import {useRefreshEntrenamiento} from '../../hooks/useRefreshEntrenamiento';

export const RutinaScreen = () => {
  const [checked, setChecked] = useState<{[key: number]: boolean}>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] =
    useState<RutinaEjercicio | null>(null);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [profesionales, setProfesionales] = useState<User[]>([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const rutinas = await StorageAdapter.getItem('rutinas');
    setRoutines(rutinas);
    const profesionales = await StorageAdapter.getItem('profesionales');
    setProfesionales(profesionales);
  };

  useRefreshEntrenamiento(fetch);

  const updateRoutine = async (updatedRoutine: Routine) => {
    const profesionalesIds = updatedRoutine.visibilidad.map(prof => prof.id);
    try {
      await setAsignarVisivilidadRoutineRequest(
        updatedRoutine.id,
        profesionalesIds,
      );
      setRoutines(prevRoutines =>
        prevRoutines.map(r =>
          r.id === updatedRoutine.id ? updatedRoutine : r,
        ),
      );
    } catch (error) {
      console.error('Error al asignar visibilidad a la rutina:', error);
    }
  };

  const handleCheckboxPress = (id: number) => {
    setChecked(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const calculateProgress = (re: RutinaEjercicio[]) => {
    const total = re.length;
    const completed = re.filter(ejercicio => checked[ejercicio.id]).length;
    return total === 0 ? 0 : completed / total;
  };

  const handleLongPress = (ejercicio: RutinaEjercicio) => {
    setSelectedExercise(ejercicio);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedExercise(null);
  };

  const handleRegisterRoutine = async (routine: Routine) => {
    //obtengo los ejercicios seleccionados
    const selectedExercises = routine?.rutinaEjercicio?.filter(
      re => checked[re.id],
    );

    if (!selectedExercises || selectedExercises.length === 0) {
      return;
    }

    await setRegistroEjerciciosRequest(
      selectedExercises.map(ejercicio => ejercicio.id),
    );
    setChecked({});
  };
  return (
    <>
      <MainLayout>
        {routines.length === 0 ? (
          <EmptySection
            label="No se encontraron rutinas de entrenamiento"
            icon="barbell"
          />
        ) : (
          routines.map(rutina => (
            <DesplegableCard
              key={`ru-${rutina.id}`}
              title={rutina.name}
              icon="barbell-outline">
              <View style={{paddingBottom: globalVariables.padding}}>
                <Text
                  style={{
                    marginBottom: globalVariables.margin,
                    paddingHorizontal: globalVariables.padding,
                  }}>
                  {rutina.description}
                </Text>
                {rutina.rutinaEjercicio &&
                  rutina.rutinaEjercicio.map(re => (
                    <List.Item
                      style={{paddingVertical: 0}}
                      key={`re-${re.id}`}
                      title={re.ejercicio.name}
                      titleNumberOfLines={5}
                      onLongPress={() => handleLongPress(re)}
                      onPress={() => handleCheckboxPress(re.id)}
                      description={`${re.series}x${re.repeticiones}${
                        re.medicion ? ' - ' + re.medicion : ''
                      } ${
                        re.unidadMedida !== UnidadMedida.Ninguna && re.medicion
                          ? re.unidadMedida
                          : re.medicion
                          ? 'unidades'
                          : ''
                      }`}
                      right={() => (
                        <Checkbox
                          status={checked[re.id] ? 'checked' : 'unchecked'}
                          onPress={() => handleCheckboxPress(re.id)}
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
                {rutina.rutinaEjercicio &&
                  rutina.rutinaEjercicio.length > 0 && (
                    <>
                      <ProgressBar
                        progress={calculateProgress(
                          rutina.rutinaEjercicio || [],
                        )}
                        style={{
                          marginTop: 10,
                          height: 10,
                          borderRadius: globalVariables.innerBorderRadius,
                          marginBottom: globalVariables.margin,
                        }}
                      />
                      <Button
                        mode="outlined"
                        onPress={() => handleRegisterRoutine(rutina)}>
                        Registrar
                      </Button>
                    </>
                  )}
                {rutina?.trainer && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                      justifyContent: 'flex-end',
                    }}>
                    <Text style={{marginRight: 3}}>Diseñado por</Text>
                    <Icon
                      name="person-circle-outline"
                      size={24}
                      style={{marginRight: 3}}
                    />
                    <Text>
                      {rutina?.trainer?.firstName} {rutina?.trainer?.lastName}
                    </Text>
                  </View>
                )}
                {/* Integración del componente de visibilidad */}
                <VisibilityComponent
                  item={rutina}
                  profesionales={profesionales.filter(
                    prof => prof.id !== rutina?.trainer?.id,
                  )}
                  onUpdate={updateRoutine}
                />
              </View>
            </DesplegableCard>
          ))
        )}
      </MainLayout>
      <ExerciseDialog
        visible={modalVisible}
        onDismiss={closeModal}
        exercise={selectedExercise}
      />
    </>
  );
};
