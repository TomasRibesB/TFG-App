import React, {useEffect, useState} from 'react';
import {MainLayout} from '../layouts/MainLayout';
import {Button, Text, TextInput} from 'react-native-paper';
import {Image, View} from 'react-native';
import {CardContainer} from '../components/CardContainer';
import {ScrollView} from 'react-native-gesture-handler';
import {globalVariables} from '../../config/theme/global-theme';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../navigation/StackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {StorageAdapter} from '../../config/adapters/storage-adapter';
import {api} from '../../config/apis/api';
import {BottomNotification} from '../components/BottomNotification';
import {useAuthContext} from '../context/AuthContext';
import {loginRequest} from '../../services/auth';

export const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {login} = useAuthContext();

  const handleLogin = async () => {
    try {
      if (!email) {
        setError('El correo electrónico es obligatorio');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('El correo electrónico no es válido');
        return;
      }
      if (email.length > 50) {
        setError('El correo electrónico no puede tener más de 50 caracteres');
        return;
      }
      if (!password) {
        setError('La contraseña es obligatoria');
        return;
      }
      if (password.length < 6 || password.length > 50) {
        setError('La contraseña debe tener entre 6 y 50 caracteres');
        return;
      }

      const data = await loginRequest(email, password);
      login(); // usa el contexto
    } catch (err) {
      setError('No se pudo iniciar sesión');
    }
  };

  return (
    <MainLayout>
      <ScrollView
        style={{
          flexDirection: 'column',
          width: '100%',
        }}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Image
          source={require('../../assets/logo.png')}
          style={{
            width: 200,
            height: 200,
            marginBottom: globalVariables.padding * 2,
          }}
        />
        <CardContainer>
          <Text
            variant="displaySmall"
            style={{
              width: '100%',
              textAlign: 'center',
              marginBottom: globalVariables.padding,
            }}>
            Iniciar Sesión
          </Text>
          <TextInput
            outlineStyle={{borderRadius: 8}}
            label="Correo Electrónico"
            mode="outlined"
            keyboardType="email-address"
            style={{
              marginBottom: globalVariables.padding,
            }}
            onChangeText={setEmail}
          />
          <TextInput
            outlineStyle={{borderRadius: 8}}
            label="Contraseña"
            mode="outlined"
            secureTextEntry
            style={{marginBottom: globalVariables.padding * 2}}
            onChangeText={setPassword}
          />
          <Button
            mode="contained"
            style={{
              marginBottom: globalVariables.padding,
            }}
            children="Entrar"
            onPress={() => handleLogin()}
          />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              mode="text"
              style={{padding: 0}}
              onPress={() => navigation.navigate('RegisterScreen')}>
              ¿No tienes una cuenta? Regístrate
            </Button>
          </View>
        </CardContainer>
        <BottomNotification
          visible={!!error}
          onDismiss={() => setError('')}
          action={{
            label: 'Cerrar',
            onPress: () => setError(''),
          }}
          message={error}></BottomNotification>
      </ScrollView>
    </MainLayout>
  );
};
