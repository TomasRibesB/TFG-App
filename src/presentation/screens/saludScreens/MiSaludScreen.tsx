import React, {useState, useRef, useEffect} from 'react';
import {MainLayout} from '../../layouts/MainLayout';
import {
  Text,
  Button,
  Divider,
  IconButton,
  Menu,
  Checkbox,
  Portal,
  useTheme,
} from 'react-native-paper';
import {DesplegableCard} from '../../components/DesplegableCard';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Documento} from '../../../infrastructure/interfaces/documento';
import {
  getDocumentosRequest,
  getProfesionalesByUserRequest,
} from '../../../services/salud';
import {User} from '../../../infrastructure/interfaces/user';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';

export const MiSaludScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Documento>();
  const [anchorPosition, setAnchorPosition] = useState({x: 0, y: 0});
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [profesionales, setProfesionales] = useState<User[]>([]);
  const theme = useTheme();

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const documentosData = await StorageAdapter.getItem('documentos');
    const profesionalesData = await StorageAdapter.getItem('profesionales');
    setDocumentos(documentosData);
    setProfesionales(profesionalesData);
  };

  const toggleProfesional = (profesional: User) => {
    if (selectedDocument) {
      selectedDocument.visibilidad = selectedDocument.visibilidad || [];
      const index = selectedDocument.visibilidad.findIndex(
        (p: User) => p.id === profesional.id,
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

  const handleDownload = () => {
    // Download file
  };

  return (
    <MainLayout>
      {documentos.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Icon name="medkit" size={70} style={{opacity: 0.5}} />
          <Text variant="labelLarge" style={{opacity: 0.5}}>
            No se encontraron documentos
          </Text>
        </View>
      ) : (
        documentos.map((documento, index) => (
          <DesplegableCard
            key={index}
            title={documento.titulo}
            subtitle={
              documento.fechaSubida &&
              new Date(documento.fechaSubida).toLocaleDateString()
            }
            icon="folder-open-outline">
            <View style={styles.cardContent}>
              <Text variant="bodyMedium" style={styles.description}>
                {documento.descripcion}
              </Text>
              {documento.archivo && (
                <View style={styles.attachments}>
                  <IconButton
                    icon="cloud-download-outline"
                    size={24}
                    style={[
                      styles.attachmentButton,
                      {backgroundColor: theme.colors.primaryContainer},
                    ]}
                    mode="contained-tonal"
                    onPress={handleDownload}
                  />
                </View>
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
                  <Text>
                    {documento.profesional.firstName}{' '}
                    {documento.profesional.lastName}
                  </Text>
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
              {documento.visibilidad &&
                documento.visibilidad.map((profesional, idx) => (
                  <View key={idx} style={styles.profesionalInfo}>
                    <Icon
                      name="person-circle-outline"
                      size={24}
                      style={{marginRight: 3}}
                    />
                    <Text>
                      {profesional.firstName} {profesional.lastName}
                    </Text>
                  </View>
                ))}
            </View>
          </DesplegableCard>
        ))
      )}
      <Portal>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={{x: anchorPosition.x, y: anchorPosition.y}}>
          {profesionales.length > 0 &&
            profesionales.map(profesional => (
              <Menu.Item
                key={profesional.id}
                onPress={() => toggleProfesional(profesional)}
                title={profesional.firstName + ' ' + profesional.lastName}
                trailingIcon={() => (
                  <Checkbox
                    status={
                      selectedDocument &&
                      selectedDocument.visibilidad &&
                      selectedDocument.visibilidad.some(
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
    bottom: 0,
  },
  attachmentButton: {
    marginRight: 8,
    marginBottom: 8,
    position: 'relative',
    bottom: -25,
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
