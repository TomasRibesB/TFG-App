import React, {useState} from 'react';
import {MainLayout} from '../../layouts/MainLayout';
import {Text, List, Dialog, Portal, Button, Avatar} from 'react-native-paper';
import {CardContainer} from '../../components/CardContainer';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Profesionales = [
  {
    id: 1,
    name: 'Dr. Juan Perez',
    especialidad: 'Cardiología',
    telefono: '123456789',
    email: 'example@gmail.com',
    isUser: true,
  },
  {
    id: 2,
    name: 'Dr. Marcos Perez',
    especialidad: 'Nutriciónista',
    telefono: '123456789',
    email: 'example2@gmail.com',
    isUser: false,
  },
  {
    id: 3,
    name: 'Dr. Carlos Perez',
    especialidad: 'Traumatología',
    telefono: '123456789',
    email: 'prueba@gmail.com',
    isUser: false,
  },
];

export const ProfesionalesScreen = () => {
  const [selectedProfesional, setSelectedProfesional] = useState<any>(null);
  const [dialogVisible, setDialogVisible] = useState(false);

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
        {Profesionales.map(profesional => (
          <List.Item
            key={profesional.id}
            title={profesional.name}
            description={profesional.especialidad}
            onPress={
              profesional.isUser
                ? () => handleLongPress(profesional)
                : undefined
            }
            right={() =>
              profesional.isUser ? (
                <Icon name="document-outline" size={24} />
              ) : (
                <Icon name="person-remove-outline" size={24} />
              )
            }
            left={() => <Avatar.Text size={48} label={profesional.name[0]} />}
          />
        ))}
      </CardContainer>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={closeDialog}>
          <Dialog.Title>Información del Profesional</Dialog.Title>
          <Dialog.Content>
            {selectedProfesional && (
              <View style={styles.modalContent}>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Nombre:</Text>
                  <Text style={styles.modalText}>
                    {selectedProfesional.name}
                  </Text>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Especialidad:</Text>
                  <Text style={styles.modalText}>
                    {selectedProfesional.especialidad}
                  </Text>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Teléfono:</Text>
                  <Text style={styles.modalText}>
                    {selectedProfesional.telefono}
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
