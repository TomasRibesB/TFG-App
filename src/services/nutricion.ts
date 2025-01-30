// src/services/authService.ts
import {api} from '../config/apis/api';
import {StorageAdapter} from '../config/adapters/storage-adapter';

export const getPlanNutricionalRequest = async () => {
  const {data} = await api.get(`/plan-nutricional`);
  return data;
};
