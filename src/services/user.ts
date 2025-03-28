// src/services/authService.ts
import {api} from '../config/apis/api';
import {StorageAdapter} from '../config/adapters/storage-adapter';

export const getProfesionalesRequest = async () => {
  const {data} = await api.get(`/users/profesionales`);
  return data;
};

export const getProfesionalsAndUpdateStorage = async () => {
  const {data} = await api.get(`/users/profesionales`);
  await StorageAdapter.setItem('profesionales', data);
  return data;
};

export const updateEmailRequest = async (email: string) => {
  const {data} = await api.patch(`/users/email`, {email});
  return data;
};

export const updatePasswordRequest = async (
  password: string,
  newPassword: string,
) => {
  const {data} = await api.patch(`/users/password`, {
    oldPassword: password,
    newPassword,
  });
  return data;
};

export const uploadImageRequest = async (image: any) => {
  try {
    console.log('image', image);
    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      name: image.fileName || 'photo.jpg',
      type: image.type || 'image/jpeg',
    });
    const {data} = await api.post(`/users/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getUserImageRequest = (id: number, flag?: Date): string => {
  const timestamp = flag ? flag.getTime() : new Date().getTime();
  return `${api.defaults.baseURL}/users/image/${id}?t=${timestamp}`;
};

export const getRecordatoriosRequest = async () => {
  const {data} = await api.get(`/users/recordatorios`);
  return data;
};
