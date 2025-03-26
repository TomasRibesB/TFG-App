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
import {Documento} from '../../../infrastructure/interfaces/documento';
import {EmptySection} from '../../components/EmptySection';
import {PermisoComponent} from '../../components/PermisoComponent';
import {getUserImageRequest} from '../../../services/user';

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
    const dataDoc: Documento[] =
      (await StorageAdapter.getItem('documentos')) || [];
    const profesionalesNoRegistrados: Partial<User>[] = dataDoc
      .filter(documento => documento.dniProfesional)
      .map(documento => ({
        firstName: documento.nombreProfesional ?? undefined,
        lastName: documento.apellidoProfesional ?? undefined,
        dni: documento.dniProfesional ?? undefined,
        role: Role.Profesional,
        email: documento.emailProfesional ?? undefined,
        userTipoProfesionales: [
          {
            tipoProfesional: documento.tipoProfesional ?? undefined,
          },
        ],
      }));

    setProfesionalesUsers(data);
    const todosProfesionales: Partial<User>[] = [
      ...data,
      ...profesionalesNoRegistrados,
    ];
    setProfesionales(todosProfesionales);
    console.log('Profesionales', JSON.stringify(todosProfesionales, null, 2));
  };

  const handleProfPress = (profesional: any) => {
    setSelectedProfesional(profesional);
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
    setSelectedProfesional(null);
  };

  return (
    <MainLayout>
      {profesionales && profesionales.length === 0 ? (
        <EmptySection label="No hay profesionales disponibles" icon="person" />
      ) : (
        <>
          <CardContainer title="Mis Profesionales" icon="people-outline">
            {profesionales.map((profesional, index) => (
              <List.Item
                key={index + 'profesional'}
                title={profesional.firstName + ' ' + profesional.lastName}
                description={
                  profesional.role === Role.Profesional
                    ? 'Profesional - ' +
                      (profesional.userTipoProfesionales
                        ?.map(tipo => tipo.tipoProfesional?.profesion)
                        .filter(profesion => profesion !== undefined)
                        .join(', ') || 'No especificado')
                    : (profesional.role?.charAt(0).toUpperCase() ?? '') +
                      (profesional.role?.slice(1).toLocaleLowerCase() ?? '')
                }
                onPress={() => handleProfPress(profesional)}
                right={() =>
                  profesional.id ? (
                    <>
                      <Icon name="person-outline" size={17} />
                    </>
                  ) : (
                    <Icon name="person-remove-outline" size={17} />
                  )
                }
                left={() => {
                  return profesional?.hasImage ? (
                    <Avatar.Image
                      size={48}
                      source={{
                        uri: getUserImageRequest(profesional.id!, new Date()),
                      }}
                    />
                  ) : (
                    <Avatar.Text
                      size={48}
                      label={
                        profesional.firstName ? profesional.firstName[0] : '?'
                      }
                    />
                  );
                }}
              />
            ))}
          </CardContainer>
          <TicketComponent />
          {profesionalesUsers && profesionalesUsers.length > 0 && (
            <TurnoComponent profesionales={profesionalesUsers} />
          )}
          <Portal>
            <Dialog visible={dialogVisible} onDismiss={closeDialog}>
              <Dialog.Title>Información del Profesional</Dialog.Title>
              <Dialog.Content>
                {selectedProfesional &&
                  (() => {
                    const especialidad =
                      selectedProfesional.userTipoProfesionales
                        ?.map(tipo => tipo.tipoProfesional?.profesion)
                        .filter(profesion => profesion !== undefined)
                        .join(', ');
                    const especialidadText =
                      selectedProfesional.role === Role.Profesional
                        ? `Profesional - ${especialidad || 'No especificado'}`
                        : `${
                            selectedProfesional.role?.charAt(0).toUpperCase() ??
                            ''
                          }${
                            selectedProfesional.role
                              ?.slice(1)
                              .toLocaleLowerCase() ?? ''
                          }`;
                    return (
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
                            {especialidadText}
                          </Text>
                        </View>
                        <View style={styles.modalRow}>
                          <Text style={styles.modalLabel}>Email:</Text>
                          <Text style={styles.modalText}>
                            {selectedProfesional.email}
                          </Text>
                        </View>
                      </View>
                    );
                  })()}
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={closeDialog}>Cerrar</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </>
      )}
      <PermisoComponent />
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
