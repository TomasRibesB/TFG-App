import {useNavigation} from '@react-navigation/native';
import {StorageAdapter} from '../../config/adapters/storage-adapter';
import {
  loginRequest,
  registerRequest,
  deleteUserRequest,
} from '../../services/auth';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../navigation/StackNavigator';
import {isTokenExpired} from '../../utils/tokenUtils';
import {initialFetch} from '../../services/fetch';
import {Role} from '../../infrastructure/enums/roles';
import axios from 'axios';

export const useAuth = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const login = async (email: string, password: string) => {
    try {
      const data = await loginRequest(email, password);

      if (data.role !== Role.Usuario) {
        return data.message;
      }
      await StorageAdapter.setItem('user', data);
      navigation.reset({
        index: 0,
        routes: [{name: 'AuthLoaderScreen'}],
      });
      return 'Inicio de sesión exitoso';
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return err.response?.data?.message || 'Error de autenticación';
      }
      return 'Error de autenticación';
    }
  };

  const logout = async () => {
    try {
      await StorageAdapter.clear();
      navigation.reset({
        index: 0,
        routes: [{name: 'AuthFlow'}],
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dni: string,
  ) => {
    try {
      const data = await registerRequest({
        email,
        password,
        firstName,
        lastName,
        dni,
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const authRedirection = async () => {
    const user = await StorageAdapter.getItem('user');
    console.log('user', user);

    if (user && user.token) {
      // Verificamos si el token está expirado
      if (isTokenExpired(user.token)) {
        await StorageAdapter.clear();
        navigation.reset({
          index: 0,
          routes: [{name: 'AuthFlow'}],
        });
        return;
      }
      initialFetch();
      navigation.reset({
        index: 0,
        routes: [{name: 'MainFlow'}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'AuthFlow'}],
      });
    }
  };

  const deleteUser = async () => {
    try {
      const response = await deleteUserRequest();
      if (response) {
        await StorageAdapter.clear();
        navigation.reset({
          index: 0,
          routes: [{name: 'AuthFlow'}],
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {login, logout, register, authRedirection, deleteUser};
};
