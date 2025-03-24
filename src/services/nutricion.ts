// src/services/authService.ts
import {api} from '../config/apis/api';
import {StorageAdapter} from '../config/adapters/storage-adapter';

export const getPlanNutricionalRequest = async () => {
  const {data} = await api.get(`/plan-nutricional`);
  return data;
};

export const setAsignarVisivilidadPlanNutricionalRequest = async (
  planNutricionalId: number,
  profesionalesIds: number[],
) => {
  await api.post(`/plan-nutricional/visibilidad/${planNutricionalId}`, {
    profesionalesIds,
  });
  return;
};
