import React, {Component, useContext} from 'react';
import {MainLayout} from '../layouts/MainLayout';
import {Avatar, Button, Card, Text, TextInput} from 'react-native-paper';
import {CardContainer} from '../components/CardContainer';
import {ScrollView} from 'react-native-gesture-handler';
import {globalTheme, globalVariables} from '../../config/theme/global-theme';
import {View} from 'react-native';

export const RegisterScreen = () => {

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
        <Avatar.Icon
          icon="person-outline"
          size={150}
          style={{marginBottom: globalVariables.padding}}
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
            label="Email"
            mode="outlined"
            keyboardType="email-address"
            style={{
              marginBottom: globalVariables.padding,
            }}
          />
          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            style={{marginBottom: globalVariables.padding * 2}}
          />
          <Button
            mode="contained"
            style={{
              borderRadius: globalVariables.innerBorderRadius,
              marginBottom: globalVariables.padding,
            }}
            children="Entrar"
          />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button mode="text" style={{padding: 0}}>¿Ya tienes una cuenta? Iniciar Sesión</Button>
          </View>
        </CardContainer>
      </ScrollView>
    </MainLayout>
  );
};
