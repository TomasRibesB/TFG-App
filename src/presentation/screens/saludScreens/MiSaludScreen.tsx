import React, {useState, useEffect} from 'react';
import {MainLayout} from '../../layouts/MainLayout';
import {Text, useTheme, Button} from 'react-native-paper';
import {DesplegableCard} from '../../components/DesplegableCard';
import {View, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Documento} from '../../../infrastructure/interfaces/documento';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';
import {EmptySection} from '../../components/EmptySection';
import {User} from '../../../infrastructure/interfaces/user';
import {VisibilityComponent} from '../../components/VisibilidadComponent';
import {
  downloadDocumentoRequest,
  setAsignarVisivilidadDocumentoRequest,
  deleteDocumentoHardRequest,
} from '../../../services/salud';
import { useRefreshSalud } from '../../hooks/useRefreshSalud';

export const MiSaludScreen = () => {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [profesionales, setProfesionales] = useState<User[]>([]);
  const theme = useTheme();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const documentosData = await StorageAdapter.getItem('documentos');
    const profesionalesData = await StorageAdapter.getItem('profesionales');
    setDocumentos(documentosData);
    setProfesionales(profesionalesData);
  };

  const updateDocumento = async (updatedDocumento: Documento) => {
    const profesionalesIds = updatedDocumento.visibilidad.map(prof => prof.id);
    try {
      await setAsignarVisivilidadDocumentoRequest(
        updatedDocumento.id,
        profesionalesIds,
      );
      setDocumentos(prevDocs =>
        prevDocs.map(doc =>
          doc.id === updatedDocumento.id ? updatedDocumento : doc,
        ),
      );
    } catch (error) {
      console.error('Error al asignar visibilidad:', error);
    }
  };

  const handleDownload = async (documentoId: number) => {
    await downloadDocumentoRequest(documentoId);
  };

  const handleHardDelete = async (documentoId: number) => {
    try {
      await deleteDocumentoHardRequest(documentoId);
      setDocumentos(prevDocs => prevDocs.filter(doc => doc.id !== documentoId));
    } catch (error) {
      console.error('Error al eliminar el documento:', error);
    }
  };

  useRefreshSalud(fetch);

  return (
    <MainLayout>
      {documentos.length === 0 ? (
        <EmptySection label="No se encontraron documentos" icon="medkit" />
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
              {documento.hasArchivo && (
                <Button
                  icon="document-attach-outline"
                  style={[
                    {backgroundColor: theme.colors.primaryContainer},
                    {marginBottom: 20},
                  ]}
                  onPress={() => handleDownload(documento.id)}>
                  Abrir archivo adjunto
                </Button>
              )}
              <Button //eliminar documento
                icon="trash-outline"
                mode="contained-tonal"
                style={[{backgroundColor: theme.colors.error}]}
                labelStyle={{color: theme.colors.onError}}
                onPress={() =>
                  Alert.alert(
                    'Eliminar documento',
                    '¿Estás seguro de que deseas eliminar este documento?',
                    [
                      {
                        text: 'Cancelar',
                        style: 'cancel',
                      },
                      {
                        text: 'Eliminar',
                        onPress: () => handleHardDelete(documento.id),
                      },
                    ],
                    {cancelable: false},
                  )
                }>
                Eliminar documento
              </Button>
              {(documento.profesional || documento.dniProfesional) && (
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
                    {documento.profesional?.firstName ??
                      documento.nombreProfesional}{' '}
                    {documento.profesional?.lastName ??
                      documento.apellidoProfesional}
                  </Text>
                </View>
              )}
              <VisibilityComponent
                item={documento}
                profesionales={profesionales.filter(
                  prof => prof.id !== documento.profesional?.id,
                )}
                onUpdate={updateDocumento}
              />
            </View>
          </DesplegableCard>
        ))
      )}
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
});
