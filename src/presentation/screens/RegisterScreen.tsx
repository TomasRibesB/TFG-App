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
import {RootStackParams} from '../navigation/StackNavigator';
import {api} from '../../config/apis/api';
import {StorageAdapter} from '../../config/adapters/storage-adapter';
import { BottomNotification } from '../components/BottomNotification';

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

  const handleRegister = async () => {
    try {
      if (password !== passwordConfirmation) {
        setError('Las contraseñas no coinciden');
        return;
      }
      const {data} = await api.post('/auth/register', {
        email,
        password,
        firstName: firstName,
        lastName: lastName,
        dni,
      });
      navigation.navigate('LoginScreen');
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
              onPress={() => navigation.navigate('LoginScreen')}>
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
