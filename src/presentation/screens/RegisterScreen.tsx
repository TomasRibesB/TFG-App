import React from 'react';
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

export const RegisterScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
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
            label="Nombre"
            mode="outlined"
            style={{
              marginBottom: globalVariables.padding,
            }}
          />
          <TextInput
            label="Apellido"
            mode="outlined"
            style={{
              marginBottom: globalVariables.padding,
            }}
          />
          <TextInput
            label="Correo Electrónico"
            mode="outlined"
            keyboardType="email-address"
            style={{
              marginBottom: globalVariables.padding,
            }}
          />
          <TextInput
            label="Contraseña"
            mode="outlined"
            secureTextEntry
            style={{marginBottom: globalVariables.padding}}
          />
          <TextInput
            label="Confirmar Contraseña"
            mode="outlined"
            secureTextEntry
            style={{marginBottom: globalVariables.padding * 2}}
          />
          <Button
            mode="contained"
            style={{
              marginBottom: globalVariables.padding,
            }}
            onPress={() => navigation.navigate('LoginScreen')}
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
      </ScrollView>
    </MainLayout>
  );
};
