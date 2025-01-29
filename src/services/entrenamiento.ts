// src/services/authService.ts
import {api} from '../config/apis/api';
import {StorageAdapter} from '../config/adapters/storage-adapter';

export const getRoutineRequest = async () => {
  const {data} = await api.get(`/routines`);
  return data;
};
