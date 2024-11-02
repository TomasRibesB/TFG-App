import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Text, Card, Chip, Button} from 'react-native-paper';
import {MainLayout} from '../../layouts/MainLayout';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/StackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import ticketsData from './Tickets.json';

interface Usuario {
  id: number;
  nombre: string;
}

interface Profesional {
  usuario: Usuario;
  profesion: string;
}

interface Mensaje {
  id: number;
  usuario: Usuario;
  date: string;
  time: string;
  content: string;
}

export interface Ticket {
  id: number;
  titulo: string;
  estado: string;
  fechaAbierto: string;
  fechaCerrado?: string;
  solicitante: Profesional;
  receptor: Profesional;
  usuario: Usuario;
  mensajes: Mensaje[];
}

const Tickets: Ticket[] = ticketsData;

export const TicketListScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const handleAccept = (id: number) => {
    // Lógica para aceptar el ticket
  };

  const handleReject = (id: number) => {
    // Lógica para rechazar el ticket
  };

  return (
    <MainLayout title="Tickets" back={true}>
      <ScrollView>
        {Tickets.map(item => (
          <Card key={item.id} style={{margin: 10}}>
            <Card.Title
              title={item.titulo}
              subtitle={`Fecha Abierto: ${item.fechaAbierto}`}
              titleStyle={{fontSize: 18}}
              subtitleStyle={{fontSize: 14}}
            />
            <Card.Content>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 8,
                  flexWrap: 'wrap',
                }}>
                <Chip icon="information" style={{margin: 5}}>
                  {item.estado}
                </Chip>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="person-circle-outline"
                    size={24}
                    style={{margin: 5}}
                  />
                  <Text>{item.solicitante.usuario.nombre}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="person-circle-outline"
                    size={24}
                    style={{margin: 5}}
                  />
                  <Text>{item.receptor.usuario.nombre}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="person-circle-outline"
                    size={24}
                    style={{margin: 5}}
                  />
                  <Text>Yo</Text>
                </View>
              </View>
              {item.estado === 'Pendiente' ? (
                <View
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Button
                    mode="contained"
                    style={{marginRight: 10}}
                    onPress={() => handleAccept(item.id)}>
                    Aceptar
                  </Button>
                  <Button mode="outlined" onPress={() => handleReject(item.id)}>
                    Rechazar
                  </Button>
                </View>
              ) : (
                <Button
                  mode="outlined"
                  onPress={() =>
                    navigation.navigate('TicketScreen', {ticket: item})
                  }>
                  Ver Ticket
                </Button>
              )}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </MainLayout>
  );
};
