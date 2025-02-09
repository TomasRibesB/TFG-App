// src/presentation/screens/LoginScreen.tsx

import React, {useState} from 'react';
import {ScrollView, Image, View, StyleSheet} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../navigation/StackNavigator';
import {StorageAdapter} from '../../config/adapters/storage-adapter';
import {BottomNotification} from '../components/BottomNotification';
import {loginRequest} from '../../services/auth';
import {MainLayout} from '../layouts/MainLayout';
import {globalVariables} from '../../config/theme/global-theme';
import {CardContainer} from '../components/CardContainer';

export const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      console.log(data);
      await StorageAdapter.setItem('user', data);
      navigation.reset({
        index: 0,
        routes: [{name: 'AuthLoaderScreen'}],
      });
    } catch (err) {
      setError('No se pudo iniciar sesión');
    }
  };

  return (
    <MainLayout>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <CardContainer>
          <Text variant="displaySmall" style={styles.title}>
            Iniciar Sesión
          </Text>
          <TextInput
            outlineStyle={{borderRadius: 8}}
            label="Correo Electrónico"
            mode="outlined"
            keyboardType="email-address"
            style={styles.input}
            onChangeText={setEmail}
          />
          <TextInput
            outlineStyle={{borderRadius: 8}}
            label="Contraseña"
            mode="outlined"
            secureTextEntry
            style={styles.input}
            onChangeText={setPassword}
          />
          <Button mode="contained" style={styles.button} onPress={handleLogin}>
            Entrar
          </Button>
          <View style={styles.registerContainer}>
            <Button mode="text" style={styles.registerButton}>
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
          message={error}
        />
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'column',
    width: '100%',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 16,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: globalVariables.padding * 2,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    marginBottom: globalVariables.padding,
  },
  input: {
    width: '100%',
    marginBottom: globalVariables.padding,
  },
  button: {
    width: '100%',
    marginBottom: globalVariables.padding,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerButton: {
    padding: 0,
  },
});
