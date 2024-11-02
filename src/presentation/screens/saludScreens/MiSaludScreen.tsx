import React, {useState, useRef} from 'react';
import {MainLayout} from '../../layouts/MainLayout';
import {
  Text,
  Button,
  Divider,
  IconButton,
  Menu,
  Checkbox,
  Portal,
} from 'react-native-paper';
import {DesplegableCard} from '../../components/DesplegableCard';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Documentos = [
  {
    title: 'Historial Clínico',
    date: '12/12/2021',
    time: '12:00',
    description:
      'Historial clínico del paciente, realizado por el Dr. Juan Perez, el dia 12/12/2021 a las 12:00. Se observa una leve arritmia en el paciente cuando este se esfuerza al maximo. Se recomienda realizar un electrocardiograma para mayor detalle y no realizar actividades de tipo fisico de alta intensidad.',
    profesional: {
      id: 1,
      name: 'Dr. Juan Perez',
      especialidad: 'Cardiología',
    },
    archivos: [
      {
        name: 'Archivo 1',
        url: 'https://www.google.com',
      },
      {
        name: 'Archivo 2',
        url: 'https://www.google.com',
      },
    ],
    visibilidad: [
      {
        id: 1,
        name: 'Dr. Juan Perez',
        especialidad: 'Cardiología',
      },
      {
        id: 2,
        name: 'Dr. Marcos Perez',
        especialidad: 'Nutriciónista',
      },
    ],
  },
  {
    title: 'Receta',
    date: '12/12/2021',
    time: '12:00',
    description:
      'Receta medica del paciente, realizada por el Dr. Juan Perez, el dia 12/12/2021 a las 12:00. Se receta un medicamento para la arritmia que presenta el paciente.',
    profesional: {
      id: 1,
      name: 'Dr. Juan Perez',
      especialidad: 'Cardiología',
    },
    archivos: [
      {
        name: 'Archivo 1',
        url: 'https://www.google.com',
      },
      {
        name: 'Archivo 2',
        url: 'https://www.google.com',
      },
    ],
    visibilidad: [
      {
        id: 1,
        name: 'Dr. Juan Perez',
        especialidad: 'Cardiología',
      },
      {
        id: 2,
        name: 'Dr. Marcos Perez',
        especialidad: 'Nutriciónista',
      },
    ],
  },
  {
    title: 'Estudios',
    date: '12/12/2021',
    time: '12:00',
    description:
      'Estudios del paciente, realizados por el Dr. Juan Perez, el dia 12/12/2021 a las 12:00. Se observa una leve arritmia en el paciente cuando este se esfuerza al maximo. Se recomienda realizar un electrocardiograma para mayor detalle y no realizar actividades de tipo fisico de alta intensidad.',
    profesional: {
      id: 1,
      name: 'Dr. Juan Perez',
      especialidad: 'Cardiología',
    },
    visibilidad: [
      {
        id: 1,
        name: 'Dr. Juan Perez',
        especialidad: 'Cardiología',
      },
      {
        id: 2,
        name: 'Dr. Marcos Perez',
        especialidad: 'Nutriciónista',
      },
    ],
  },
];

const Profesionales = [
  {id: 1, name: 'Dr. Juan Perez', especialidad: 'Cardiología'},
  {id: 2, name: 'Dr. Marcos Perez', especialidad: 'Nutriciónista'},
  {id: 3, name: 'Dr. Ana Lopez', especialidad: 'Pediatría'},
  {id: 4, name: 'Dr. Carlos Ruiz', especialidad: 'Dermatología'},
];

export const MiSaludScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [anchorPosition, setAnchorPosition] = useState({x: 0, y: 0});

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const toggleProfesional = (profesional: {
    id: number;
    name: string;
    especialidad: string;
  }) => {
    if (selectedDocument) {
      const index = selectedDocument.visibilidad.findIndex(
        (p: {id: number; name: string; especialidad: string}) =>
          p.id === profesional.id,
      );
      if (index > -1) {
        selectedDocument.visibilidad.splice(index, 1);
      } else {
        selectedDocument.visibilidad.push(profesional);
      }
      setSelectedDocument({...selectedDocument});
    }
  };

  const handleIconButtonPress = (event: any, documento: any) => {
    setSelectedDocument(documento);
    setAnchorPosition({x: event.nativeEvent.pageX, y: event.nativeEvent.pageY});
    openMenu();
  };

  return (
    <MainLayout>
      {Documentos.map((documento, index) => (
        <DesplegableCard
          key={index}
          title={documento.title}
          subtitle={`${documento.date} ${documento.time}`}
          icon="folder-open-outline">
          <View style={styles.cardContent}>
            <Text variant="bodyMedium" style={styles.description}>
              {documento.description}
            </Text>
            {documento.archivos && documento.archivos.length > 0 && (
              <>
                <Divider style={{marginVertical: 8}} />
                <Text variant="bodySmall" style={styles.attachmentsTitle}>
                  Archivos adjuntos:
                </Text>
                <View style={styles.attachments}>
                  {documento.archivos.map((archivo, idx) => (
                    <Button
                      key={idx}
                      mode="outlined"
                      icon="cloud-download-outline"
                      onPress={() => {
                        // Lógica para descargar el archivo
                      }}
                      style={styles.attachmentButton}>
                      {archivo.name}
                    </Button>
                  ))}
                </View>
              </>
            )}
            {documento.profesional && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                  justifyContent: 'flex-end',
                }}>
                <Text style={{marginRight: 3}}>Subido por</Text>
                <Icon
                  name="person-circle-outline"
                  size={24}
                  style={{marginRight: 3}}
                />
                <Text>{documento.profesional.name}</Text>
              </View>
            )}
            <Divider style={{marginVertical: 8}} />
            <View style={styles.visibilityHeader}>
              <Text variant="bodySmall" style={styles.visibilityTitle}>
                Visibilidad:
              </Text>
              <IconButton
                icon="menu-outline"
                size={24}
                onPress={event => handleIconButtonPress(event, documento)}
              />
            </View>
          </View>
          <View style={styles.visibility}>
            {documento.visibilidad.map((profesional, idx) => (
              <View key={idx} style={styles.profesionalInfo}>
                <Icon
                  name="person-circle-outline"
                  size={24}
                  style={{marginRight: 3}}
                />
                <Text>{profesional.name}</Text>
              </View>
            ))}
          </View>
        </DesplegableCard>
      ))}
      <Portal>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={{x: anchorPosition.x, y: anchorPosition.y}}>
          {Profesionales.map(profesional => (
            <Menu.Item
              key={profesional.id}
              onPress={() => toggleProfesional(profesional)}
              title={profesional.name}
              trailingIcon={() => (
                <Checkbox
                  status={
                    selectedDocument?.visibilidad.some(
                      (p: any) => p.id === profesional.id,
                    )
                      ? 'checked'
                      : 'unchecked'
                  }
                />
              )}
            />
          ))}
        </Menu>
      </Portal>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    paddingVertical: 8,
  },
  description: {
    marginBottom: 12,
  },
  attachmentsTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  attachments: {
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  attachmentButton: {
    marginRight: 8,
    marginBottom: 8,
  },
  visibilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  visibilityTitle: {
    fontWeight: 'bold',
  },
  visibility: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    alignItems: 'center',
  },
  profesionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
});
