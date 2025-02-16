// Lenguaje: TypeScript
import React, {useEffect} from 'react';
import {MainLayout} from '../layouts/MainLayout';
import {ActivityIndicator} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {View} from 'react-native';
import {StorageAdapter} from '../../config/adapters/storage-adapter';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../navigation/StackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {initialFetch} from '../../services/fetch';
import {isTokenExpired} from '../../utils/tokenUtils';
import {useAuth} from '../hooks/useAuth';

export const AuthLoaderScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const {authRedirection, logout} = useAuth();

  const redirection = async () => {
    await authRedirection();
  };

  useEffect(() => {
    redirection();

    // Chequeo periódico (cada minuto) para detectar expiración del token
    const interval = setInterval(async () => {
      const user = await StorageAdapter.getItem('user');
      if (user && user.token && isTokenExpired(user.token)) {
        await logout();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout
      stylesChild={{justifyContent: 'center', alignItems: 'center'}}
      styles={{
        flex: 1,
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.colors.surface,
      }}
      scrolleable={false}>
      <View
        style={{
          backgroundColor: theme.colors.surfaceVariant,
          padding: 16,
          borderRadius: 50,
          elevation: 10,
        }}>
        <ActivityIndicator animating={true} size={'large'} />
      </View>
    </MainLayout>
  );
};
