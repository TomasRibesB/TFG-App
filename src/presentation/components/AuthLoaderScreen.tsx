import React, { useEffect } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { ActivityIndicator } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { View } from 'react-native';
import { StorageAdapter } from '../../config/adapters/storage-adapter';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../navigation/StackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { initialFetch } from '../../services/fetch';

export const AuthLoaderScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  useEffect(() => {
    authRedirection();
  }, []);

  const authRedirection = async () => {
    const user = await StorageAdapter.getItem('user');
    console.log("user", user);

    if (user && user.token) {
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
