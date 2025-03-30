// src/services/authService.ts
import {api} from '../config/apis/api';
import {StorageAdapter} from '../config/adapters/storage-adapter';
import {PermisoDocumento} from '../infrastructure/interfaces/permiso-documento';
import RNFS from 'react-native-fs';
import {Alert, Linking} from 'react-native';
import FileViewer from 'react-native-file-viewer';

export const getDocumentosRequest = async () => {
  const {data} = await api.get(`/documentos`);
  return data;
};

export const getProfesionalesByUserRequest = async () => {
  const {data} = await api.get(`/users/profesionales`);
  return data;
};

export const setPermisoDocumentoRequest = async () => {
  const {data} = await api.post(`/documentos/permiso`);
  await StorageAdapter.setItem('permisos', data);
  return data;
};

export const getPermisoDocumentoRequest = async () => {
  const {data} = await api.get(`/documentos/permiso/user`);
  return data;
};

export const deletePermisoDocumentoRequest = async () => {
  await api.delete(`/documentos/permiso/user`);
  await StorageAdapter.removeItem('permisos');
  return;
};

export const setAsignarVisivilidadDocumentoRequest = async (
  documentoId: number,
  profesionalesIds: number[],
) => {
  await api.post(`/documentos/visibilidad/${documentoId}`, {profesionalesIds});
  return;
};

export const putReservarTurnoRequest = async (turnoId: number) => {
  const {data} = await api.put(`/turnos/asignar/${turnoId}`);
  return data;
};

export const putCancelarTurnoRequest = async (turnoId: number) => {
  const {data} = await api.put(`/turnos/cancelar/${turnoId}`);
  return data;
};

export const downloadDocumentoRequest = async (documentoId: number) => {
  try {
    const downloadPath = RNFS.DocumentDirectoryPath;
    const fileName = `documento-${documentoId}.pdf`;
    const filePath = `${downloadPath}/${fileName}`;

    // Revisa si el archivo ya existe; si es así, ofrécele al usuario abrirlo.
    const fileExists = await RNFS.exists(filePath);
    if (fileExists) {
      console.log('El archivo ya existe en:', filePath);
      try {
        await FileViewer.open(filePath);
      } catch (err) {
        console.error('Error al abrir el archivo:', err);
      }
      return;
    }

    const url = `${api.defaults.baseURL}/documentos/archivo/${documentoId}`;
    const user = await StorageAdapter.getItem('user');
    const headers: { [key: string]: string } = {};
    if (user && user.token) {
      headers['Authorization'] = `Bearer ${user.token}`;
    }

    const downloadResult = await RNFS.downloadFile({
      fromUrl: url,
      toFile: filePath,
      headers,
    }).promise;

    if (downloadResult.statusCode === 200) {
      console.log('Archivo descargado correctamente en:', filePath);
      try {
        await FileViewer.open(filePath);
      } catch (err) {
        console.error('Error al abrir el archivo:', err);
      }
    } else {
      Alert.alert(
        'Error',
        'No se pudo descargar el documento. Inténtalo de nuevo más tarde.',
        [{ text: 'OK' }],
      );
      throw new Error('Error al descargar el archivo');
    }
  } catch (error) {
    console.error('Error en la descarga:', error);
    Alert.alert(
      'Error',
      'No se pudo descargar el documento. Inténtalo de nuevo más tarde.',
      [{ text: 'OK' }],
    );
  }
};