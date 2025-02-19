import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Text, Card, Chip, Button} from 'react-native-paper';
import {MainLayout} from '../../layouts/MainLayout';
import {useNavigation} from '@react-navigation/native';
import {
  MainStackParams,
  RootStackParams,
} from '../../navigation/StackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {Ticket} from '../../../infrastructure/interfaces/ticket';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';
import {User} from '../../../infrastructure/interfaces/user';
import { getTicketsRequest } from '../../../services/tickets';

export const TicketListScreen = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackParams>>();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const data: Ticket[] = await getTicketsRequest();
    const user = await StorageAdapter.getItem('user');
    console.log(data);
    setTickets(data);
    setUser(user);
  };

  const handleAccept = (id: number) => {
    // Lógica para aceptar el ticket
  };

  const handleReject = (id: number) => {
    // Lógica para rechazar el ticket
  };

  return (
    <MainLayout title="Tickets" back={true}>
      <ScrollView>
        {tickets.map(item => (
          <Card key={item.id} style={{margin: 10}}>
            <Card.Title
              title={item.asunto}
              subtitle={`Creado: ${new Date(
                item.fechaCreacion!,
              ).toLocaleDateString()}`}
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
                  {item.isAceptado
                    ? item.isAutorizado
                      ? item.isActive
                        ? 'Activo'
                        : 'Inactivo'
                      : 'No Autorizado'
                    : 'Pendiente'}
                </Chip>
                {item.solicitante?.id !== user.id && (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="person-circle-outline"
                      size={24}
                      style={{margin: 5}}
                    />

                    <Text>
                      {item.solicitante?.firstName} {item.solicitante?.lastName}
                    </Text>
                  </View>
                )}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="person-circle-outline"
                    size={24}
                    style={{margin: 5}}
                  />
                  <Text>
                    {item.receptor?.firstName} {item.receptor?.lastName}
                  </Text>
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
              {item.isAceptado === false ? (
                <View
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Button
                    mode="contained"
                    style={{marginRight: 10}}
                    onPress={() => handleAccept(item.id!)}>
                    Aceptar
                  </Button>
                  <Button mode="outlined" onPress={() => handleReject(item.id!)}>
                    Rechazar
                  </Button>
                </View>
              ) : (
                item.isAutorizado && (
                  <Button
                    mode="outlined"
                    onPress={() =>
                      navigation.navigate('TicketScreen', {ticketId: item.id!})
                    }>
                    Ver Ticket
                  </Button>
                )
              )}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </MainLayout>
  );
};
