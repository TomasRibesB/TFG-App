import React from 'react';
import {ScrollView} from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  Text,
  useTheme,
  List,
  Divider,
} from 'react-native-paper';
import {globalTheme} from '../../config/theme/global-theme';
import {EjercicioElement} from '../screens/entrenamientoScreens/RutinaType';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  exercise: EjercicioElement | null;
}

export const ExerciseDialog = ({visible, onDismiss, exercise}: Props) => {
  const theme = useTheme();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{exercise?.ejercicio.nombre}</Dialog.Title>
        <Dialog.Content>
          {exercise && (
            <ScrollView>
              <Text style={globalTheme.modalDescription}>
                {exercise.ejercicio.descripcion}
              </Text>
              <Divider style={{marginVertical: 8}} />
              <List.Item
                title="Series"
                description={`${exercise.series}`}
                left={() => <List.Icon icon="repeat-outline" />}
              />
              <List.Item
                title="Repeticiones"
                description={`${exercise.repeticiones}`}
                left={() => <List.Icon icon="timer-outline" />}
              />
              <List.Item
                title={exercise.ejercicio.unidadMedida}
                description={`${exercise.medicion}`}
                left={() => <List.Icon icon="analytics-outline" />}
              />
              <List.Item
                title="Grupos musculares"
                description={exercise.ejercicio.gruposMuscularesId.join(', ')}
                left={() => <List.Icon icon="accessibility-outline" />}
              />
              <List.Item
                title="Categorías"
                description={exercise.ejercicio.categoriasId.join(', ')}
                left={() => <List.Icon icon="folder-open-outline" />}
              />
              {exercise.ejercicio.video && (
                <>
                  <Divider style={{marginVertical: 8}} />
                  <Button
                    icon="play-circle-outline"
                    mode="contained"
                    onPress={() => {
                      /* manejar reproducción de video */
                    }}>
                    Ver Video
                  </Button>
                </>
              )}
            </ScrollView>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cerrar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
