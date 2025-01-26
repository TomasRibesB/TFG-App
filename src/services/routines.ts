// src/services/authService.ts
import {api} from '../config/apis/api';
import {StorageAdapter} from '../config/adapters/storage-adapter';

export const getRoutineRequest = async () => {
  const user = await StorageAdapter.getItem('user');
  const {data} = await api.get(`/routines/${user.id}`);
  return data;
};
