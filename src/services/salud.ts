// src/services/authService.ts
import {api} from '../config/apis/api';
import {StorageAdapter} from '../config/adapters/storage-adapter';

export const getDocumentosRequest = async () => {
  const {data} = await api.get(`/documentos`);
  return data;
};

export const getProfesionalesByUserRequest = async () => {
  const {data} = await api.get(`/users/profesionales`);
  return data;
}
