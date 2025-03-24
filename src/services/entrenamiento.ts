// src/services/authService.ts
import {api} from '../config/apis/api';
import {StorageAdapter} from '../config/adapters/storage-adapter';

export const getRoutineRequest = async () => {
  const {data} = await api.get(`/routines`);
  return data;
};

export const setAsignarVisivilidadRoutineRequest = async (
  routineId: number,
  profesionalesIds: number[],
) => {
  await api.post(`/routines/visibilidad/${routineId}`, {profesionalesIds});
  return;
};

export const setRegistroEjerciciosRequest = async (RuExIds: number[]) => {
  await api.post(`/ejercicio-rutina/registro`, {RuExIds});
  return;
};
