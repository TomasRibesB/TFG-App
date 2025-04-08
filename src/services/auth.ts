// src/services/authService.ts
import {api} from '../config/apis/api';
import {StorageAdapter} from '../config/adapters/storage-adapter';

export const loginRequest = async (email: string, password: string) => {
  const {data} = await api.post('/auth/login', {email, password});
  await StorageAdapter.setItem('user', data);
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
  await StorageAdapter.setItem('user', data);
  return data;
};

export const deleteUserRequest = async () => {
  const {data} = await api.delete(`/users`);
  return data;
};

export const sendPasswordResetEmailRequest = async (email: string) => {
  const { data } = await api.put(`/auth/sendPasswordResetEmail`, { email });
  return data;
};