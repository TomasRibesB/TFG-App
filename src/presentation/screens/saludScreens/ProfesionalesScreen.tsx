import React, {useState, useEffect} from 'react';
import {MainLayout} from '../../layouts/MainLayout';
import {Text, List, Dialog, Portal, Button, Avatar} from 'react-native-paper';
import {CardContainer} from '../../components/CardContainer';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TicketComponent} from '../../components/TicketComponent';
import {TurnoComponent} from '../../components/TurnoComponent';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';
import {Role} from '../../../infrastructure/enums/roles';
import {User} from '../../../infrastructure/interfaces/user';

const Profesionales: Partial<User>[] = [
  {
    firstName: 'Juan',
    lastName: 'Perez',
    role: Role.Profesional,
    email: 'example@gmail.com',
  },
  {
    firstName: 'Maria',
    lastName: 'Gonzalez',
    role: Role.Profesional,
    email: 'example2@gmail.com',
  },
  {
    firstName: 'Pedro',
    lastName: 'Gomez',
    role: Role.Profesional,
    email: 'prueba@gmail.com',
  },
];

export const ProfesionalesScreen = () => {
  const [selectedProfesional, setSelectedProfesional] = useState<User | null>(
    null,
  );
  const [dialogVisible, setDialogVisible] = useState(false);
  const [profesionalesUsers, setProfesionalesUsers] = useState<User[]>([]);
  const [profesionales, setProfesionales] = useState<Partial<User>[]>([]);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const data: User[] = (await StorageAdapter.getItem('profesionales')) || [];
    setProfesionalesUsers(data);
    const todosProfesionales: Partial<User>[] = [...data, ...Profesionales];
    setProfesionales(todosProfesionales);
  };

  const handleLongPress = (profesional: any) => {
    setSelectedProfesional(profesional);
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
    setSelectedProfesional(null);
  };

  return (
    <MainLayout>
      <CardContainer title="Mis Profesionales" icon="people-outline">
        {profesionales.map((profesional, index) => (
          <List.Item
            key={index + 'profesional'}
            title={profesional.firstName + ' ' + profesional.lastName}
            description={
              profesional.role === Role.Profesional
                ? 'Profesional'
                : (profesional.role?.charAt(0).toUpperCase() ?? '') +
                  (profesional.role?.slice(1).toLocaleLowerCase() ?? '')
            }
            onPress={
              profesional.id ? () => handleLongPress(profesional) : undefined
            }
            right={() =>
              profesional.id ? (
                <>
                  <Icon
                    name="information-outline"
                    size={26}
                    style={{marginRight: -10}}
                  />
                  <Icon
                    name="person-circle-outline"
                    size={17}
                    style={{top: -7}}
                  />
                </>
              ) : (
                <Icon name="remove-circle-outline" size={17} />
              )
            }
            left={() => (
              <Avatar.Text
                size={48}
                label={profesional.firstName ? profesional.firstName[0] : '?'}
              />
            )}
          />
        ))}
      </CardContainer>
      <TicketComponent />
      <TurnoComponent />
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={closeDialog}>
          <Dialog.Title>Información del Profesional</Dialog.Title>
          <Dialog.Content>
            {selectedProfesional && (
              <View style={styles.modalContent}>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Nombre:</Text>
                  <Text style={styles.modalText}>
                    {selectedProfesional.firstName +
                      ' ' +
                      selectedProfesional.lastName}
                  </Text>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Especialidad:</Text>
                  <Text style={styles.modalText}>
                    {selectedProfesional.role === Role.Profesional
                      ? 'Profesional'
                      : (selectedProfesional.role?.charAt(0).toUpperCase() ??
                          '') +
                        (selectedProfesional.role
                          ?.slice(1)
                          .toLocaleLowerCase() ?? '')}
                  </Text>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Email:</Text>
                  <Text style={styles.modalText}>
                    {selectedProfesional.email}
                  </Text>
                </View>
              </View>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Cerrar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    paddingVertical: 8,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modalLabel: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  modalText: {
    flex: 1,
    textAlign: 'right',
  },
});
