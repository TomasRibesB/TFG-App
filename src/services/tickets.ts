// src/services/authService.ts
import {api} from '../config/apis/api';
import {StorageAdapter} from '../config/adapters/storage-adapter';

export const getTicketsRequest = async () => {
  const {data} = await api.get(`/tickets`);
  console.log(JSON.stringify(data, null, 2));
  return data;
};

export const getTicketByIdRequest = async (id: number) => {
  const {data} = await api.get(`/tickets/${id}`);
  return data;
};
