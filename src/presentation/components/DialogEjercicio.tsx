import React, {useCallback, useState} from 'react';
import {ScrollView, ActivityIndicator, View} from 'react-native';
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
import {RutinaEjercicio} from '../../infrastructure/interfaces/rutina-ejercicio';
import YoutubePlayer from 'react-native-youtube-iframe';
import { UnidadMedida } from '../../infrastructure/enums/unidadMedida';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  exercise: RutinaEjercicio | null;
}

export const ExerciseDialog = ({visible, onDismiss, exercise}: Props) => {
  const theme = useTheme();
  const [playing, setPlaying] = useState(false);
  const [explicationReady, setExplicationReady] = useState(false);
  const [demostrationReady, setDemostrationReady] = useState(false);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const cutLinkToId = (link: string) => {
    const id = link.split('be/')[1].split('?')[0];
    return id;
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{exercise?.ejercicio.name}</Dialog.Title>
        <Dialog.Content style={{height: '85%'}}>
          {exercise && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={globalTheme.modalDescription}>
                {exercise.ejercicio.description}
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
                title={
                  exercise.ejercicio.unidadMedida === UnidadMedida.Ninguna
                    ? 'Medición'
                    : exercise.ejercicio.unidadMedida
                }
                description={`${exercise.medicion}`}
                left={() => <List.Icon icon="analytics-outline" />}
              />
              {/*<List.Item
                title="Grupos musculares"
                description={exercise.ejercicio.gruposMuscularesId.join(', ')}
                left={() => <List.Icon icon="accessibility-outline" />}
              />
              <List.Item
                title="Categorías"
                description={exercise.ejercicio.categoriasId.join(', ')}
                left={() => <List.Icon icon="folder-open-outline" />}
              />*/}
              {exercise.ejercicio.demostration && (
                <>
                  <Divider style={{marginVertical: 8}} />
                  <Text style={globalTheme.modalDescription}>Demostración</Text>
                  {!demostrationReady && (
                    <>
                      <ActivityIndicator
                        size="large"
                        color={theme.colors.primary}
                      />
                      <Text variant="labelSmall" style={{textAlign: 'center'}}>
                        Cargando...
                      </Text>
                    </>
                  )}
                  <YoutubePlayer
                    height={180}
                    play={playing}
                    videoId={cutLinkToId(exercise.ejercicio.demostration)}
                    onChangeState={onStateChange}
                    onReady={() => setDemostrationReady(true)}
                  />
                </>
              )}
              {exercise.ejercicio.explication && (
                <>
                  <Divider style={{marginVertical: 8}} />
                  <Text style={globalTheme.modalDescription}>Explicación</Text>
                  {!explicationReady && (
                    <>
                      <ActivityIndicator
                        size="large"
                        color={theme.colors.primary}
                      />
                      <Text variant="labelSmall" style={{textAlign: 'center'}}>
                        Cargando...
                      </Text>
                    </>
                  )}
                  <YoutubePlayer
                    height={180}
                    play={playing}
                    videoId={cutLinkToId(exercise.ejercicio.explication)}
                    onReady={() => setExplicationReady(true)}
                    onChangeState={onStateChange}
                  />
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
