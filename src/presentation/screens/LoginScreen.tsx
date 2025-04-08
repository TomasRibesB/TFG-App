// src/presentation/screens/LoginScreen.tsx

import React, {useState} from 'react';
import {ScrollView, Image, View, StyleSheet} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParams, RootStackParams} from '../navigation/StackNavigator';
import {StorageAdapter} from '../../config/adapters/storage-adapter';
import {BottomNotification} from '../components/BottomNotification';
import {loginRequest, sendPasswordResetEmailRequest} from '../../services/auth';
import {MainLayout} from '../layouts/MainLayout';
import {globalVariables} from '../../config/theme/global-theme';
import {CardContainer} from '../components/CardContainer';
import {useAuth} from '../hooks/useAuth';

export const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const navigationAuth = useNavigation<StackNavigationProp<AuthStackParams>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {login} = useAuth();
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (!email) {
        setError('El correo electrónico es obligatorio');
        setLoading(false);
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('El correo electrónico no es válido');
        setLoading(false);
        return;
      }
      if (email.length > 50) {
        setError('El correo electrónico no puede tener más de 50 caracteres');
        setLoading(false);
        return;
      }
      if (!password) {
        setError('La contraseña es obligatoria');
        setLoading(false);
        return;
      }
      if (password.length < 6 || password.length > 50) {
        setError('La contraseña debe tener entre 6 y 50 caracteres');
        setLoading(false);
        return;
      }

      const response: string = (await login(email, password)) as string;
      setError(response);
      setLoading(false);
    } catch (err) {
      setError('No se pudo iniciar sesión');
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    if (!email) {
      setError('Escribe tu correo electrónico en su campo correspondiente');
      setLoading(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('El correo electrónico no es válido');
      setLoading(false);
      return;
    }
    if (email.length > 50) {
      setError('El correo electrónico no puede tener más de 50 caracteres');
      setLoading(false);
      return;
    }
    const data = await sendPasswordResetEmailRequest(email);
    if (data) {
      setError(
        'Se ha enviado un correo electrónico para restablecer la contraseña',
      );
    } else {
      setError('No se pudo enviar el correo electrónico');
    }
    setLoading(false);
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
            style={styles.input}
            onChangeText={setPassword}
            secureTextEntry={!showNew}
            right={
              <TextInput.Icon
                icon={showNew ? 'eye-off-outline' : 'eye-outline'}
                onPress={() => setShowNew(!showNew)}
              />
            }
          />
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleLogin}
            loading={loading}
            disabled={loading}>
            Entrar
          </Button>
          <View style={styles.registerContainer}>
            <Button
              mode="text"
              style={styles.registerButton}
              disabled={loading}
              onPress={() => navigationAuth.navigate('RegisterScreen')}>
              ¿No tienes una cuenta? Regístrate
            </Button>
            <Button
              mode="text"
              style={styles.registerButton}
              disabled={loading}
              onPress={handleForgotPassword}>
              ¿Olvidaste tu contraseña?
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
    flexDirection: 'column',
    justifyContent: 'center',
  },
  registerButton: {
    padding: 0,
  },
});
