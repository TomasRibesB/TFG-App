// src/services/authService.ts
import {api} from '../config/apis/api';
import {StorageAdapter} from '../config/adapters/storage-adapter';

export const loginRequest = async (email: string, password: string) => {
  const {data} = await api.post('/auth/login', {email, password});
  await StorageAdapter.setItem('token', data.token);
  return data;
};

export const registerRequest = async (body: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dni: string;
}) => {
  const {data} = await api.post('/auth/register', body);
  await StorageAdapter.setItem('token', data.token);
  return data;
};