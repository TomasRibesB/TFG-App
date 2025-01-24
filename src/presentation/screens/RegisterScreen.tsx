import React, {useState} from 'react';
import {MainLayout} from '../layouts/MainLayout';
import {Button, Text, TextInput} from 'react-native-paper';
import {Image} from 'react-native';
import {CardContainer} from '../components/CardContainer';
import {ScrollView} from 'react-native-gesture-handler';
import {globalVariables} from '../../config/theme/global-theme';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParams, RootStackParams} from '../navigation/StackNavigator';
import {api} from '../../config/apis/api';
import {StorageAdapter} from '../../config/adapters/storage-adapter';
import {BottomNotification} from '../components/BottomNotification';
import {registerRequest} from '../../services/auth';

export const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const navigationAuth = useNavigation<StackNavigationProp<AuthStackParams>>();

  const handleRegister = async () => {
    try {
      if (!firstName) {
        setError('El nombre es obligatorio');
        return;
      }
      if (firstName.length > 50) {
        setError('El nombre no puede tener más de 50 caracteres');
        return;
      }
      if (!lastName) {
        setError('El apellido es obligatorio');
        return;
      }
      if (lastName.length > 50) {
        setError('El apellido no puede tener más de 50 caracteres');
        return;
      }
      if (!dni) {
        setError('El DNI es obligatorio');
        return;
      }
      if (dni.length > 20) {
        setError('El DNI no puede tener más de 20 caracteres');
        return;
      }
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
      if (password.length < 8 || password.length > 50) {
        setError('La contraseña debe tener entre 8 y 50 caracteres');
        return;
      }
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        setError(
          'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y un carácter especial',
        );
        return;
      }
      if (password !== passwordConfirmation) {
        setError('Las contraseñas no coinciden');
        return;
      }

      const data = await registerRequest({
        email,
        password,
        firstName,
        lastName,
        dni,
      });
      await StorageAdapter.setItem('token', data.token);
      navigation.navigate('MainFlow');
    } catch (error) {
      console.log(error);
      setError('No se pudo iniciar sesión: ' + error);
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
          />
          <TextInput
            outlineStyle={{borderRadius: 8}}
            label="Contraseña"
            mode="outlined"
            secureTextEntry
            style={{marginBottom: globalVariables.padding}}
            onChangeText={setPassword}
          />
          <TextInput
            outlineStyle={{borderRadius: 8}}
            label="Confirmar Contraseña"
            mode="outlined"
            secureTextEntry
            style={{marginBottom: globalVariables.padding * 2}}
            onChangeText={setPasswordConfirmation}
          />
          <Button
            mode="contained"
            style={{
              marginBottom: globalVariables.padding,
            }}
            onPress={handleRegister}
            children="Enviar"
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
