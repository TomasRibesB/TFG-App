// src/services/authService.ts
import {api} from '../config/apis/api';
import {StorageAdapter} from '../config/adapters/storage-adapter';
import {PermisoDocumento} from '../infrastructure/interfaces/permiso-documento';

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
