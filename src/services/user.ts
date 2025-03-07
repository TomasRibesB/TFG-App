// src/services/authService.ts
import {api} from '../config/apis/api';
import {StorageAdapter} from '../config/adapters/storage-adapter';

export const getProfesionalesRequest = async () => {
  const {data} = await api.get(`/users/profesionales`);
  console.log(JSON.stringify(data, null, 2));
  return data;
};