import React, {useState} from 'react';
import {MainLayout} from '../layouts/MainLayout';
import {Button, Checkbox, Text, TextInput, useTheme} from 'react-native-paper';
import {Image, Linking} from 'react-native';
import {CardContainer} from '../components/CardContainer';
import {ScrollView} from 'react-native-gesture-handler';
import {globalVariables} from '../../config/theme/global-theme';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParams} from '../navigation/StackNavigator';
import {BottomNotification} from '../components/BottomNotification';
import {useAuth} from '../hooks/useAuth';

export const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [error, setError] = useState('');
  const navigationAuth = useNavigation<StackNavigationProp<AuthStackParams>>();
  const {register} = useAuth();
  const [showNew, setShowNew] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleClear = () => {
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
    setFirstName('');
    setLastName('');
    setDni('');
    setTerms(false);
    setShowNew(false);
    setShowRepeat(false);
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      if (!firstName) {
        setError('El nombre es obligatorio');
        return;
      }
      if (firstName.length > 50) {
        setError('El nombre no puede tener más de 50 caracteres');
        setLoading(false);
        return;
      }
      if (!lastName) {
        setError('El apellido es obligatorio');
        setLoading(false);
        return;
      }
      if (lastName.length > 50) {
        setError('El apellido no puede tener más de 50 caracteres');
        setLoading(false);
        return;
      }
      if (!dni) {
        setError('El DNI es obligatorio');
        setLoading(false);
        return;
      }
      if (dni.length > 20) {
        setError('El DNI no puede tener más de 20 caracteres');
        setLoading(false);
        return;
      }
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
      if (password.length < 8 || password.length > 50) {
        setError('La contraseña debe tener entre 8 y 50 caracteres');
        setLoading(false);
        return;
      }
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        setError(
          'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y un carácter especial',
        );
        setLoading(false);
        return;
      }
      if (password !== passwordConfirmation) {
        setError('Las contraseñas no coinciden');
        setLoading(false);
        return;
      }
      if (!terms) {
        setError('Debes leer y aceptar los términos y condiciones');
        setLoading(false);
        return;
      }

      const result = await register(email, password, firstName, lastName, dni);
      if (result) {
        setLoading(false);
        setError('Registro exitoso, verifica tu correo electrónico');
        handleClear();
      } else {
        setLoading(false);
        setError('El email o dni ya están en uso');
      }
    } catch (error) {
      console.log(error);
      setError('No se pudo iniciar sesión: ' + error);
      setLoading(false);
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
            width: 170,
            height: 170,
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
            Registrarse
          </Text>
          <TextInput
            outlineStyle={{borderRadius: 8}}
            label="Nombre"
            mode="outlined"
            style={{
              marginBottom: globalVariables.padding,
            }}
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            outlineStyle={{borderRadius: 8}}
            label="Apellido"
            mode="outlined"
            style={{
              marginBottom: globalVariables.padding,
            }}
            onChangeText={setLastName}
            value={lastName}
          />
          <TextInput
            outlineStyle={{borderRadius: 8}}
            label="DNI"
            mode="outlined"
            keyboardType="number-pad"
            style={{
              marginBottom: globalVariables.padding,
            }}
            onChangeText={setDni}
            value={dni}
          />
          <TextInput
            outlineStyle={{borderRadius: 8}}
            label="Correo Electrónico"
            mode="outlined"
            keyboardType="email-address"
            style={{
              marginBottom: globalVariables.padding,
            }}
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            outlineStyle={{borderRadius: 8}}
            label="Contraseña"
            mode="outlined"
            style={{marginBottom: globalVariables.padding}}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={!showNew}
            right={
              <TextInput.Icon
                icon={showNew ? 'eye-off-outline' : 'eye-outline'}
                onPress={() => setShowNew(!showNew)}
              />
            }
          />
          <TextInput
            outlineStyle={{borderRadius: 8}}
            label="Confirmar Contraseña"
            mode="outlined"
            style={{marginBottom: globalVariables.padding}}
            onChangeText={setPasswordConfirmation}
            value={passwordConfirmation}
            secureTextEntry={!showRepeat}
            right={
              <TextInput.Icon
                icon={showRepeat ? 'eye-off-outline' : 'eye-outline'}
                onPress={() => setShowRepeat(!showRepeat)}
              />
            }
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox
              status={terms ? 'checked' : 'unchecked'}
              onPress={() => {
                setTerms(!terms);
              }}
            />
            <Text variant="bodyMedium" onPress={() => setTerms(!terms)}>
              He leído y acepto los{' '}
            </Text>
            <Text
              style={{
                marginLeft: 5,
                color: theme.colors.primary,
                fontWeight: 'bold',
              }}
              variant="bodyMedium"
              onPress={() =>
                Linking.openURL('http://localhost:5173/auth/terms/privacy')
              }>
              términos y condiciones
            </Text>
          </View>
          <Button
            mode="contained"
            style={{
              marginBottom: globalVariables.padding,
              marginTop: globalVariables.padding * 2,
            }}
            onPress={handleRegister}
            children="Enviar"
            loading={loading}
            disabled={loading}
          />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              mode="text"
              style={{padding: 0}}
              onPress={() => navigationAuth.navigate('LoginScreen')}>
              ¿Ya tienes una cuenta? Iniciar Sesión
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
