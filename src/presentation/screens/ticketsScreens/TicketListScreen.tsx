import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Text, Card, Chip, Button, FAB} from 'react-native-paper';
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
import {
  getTicketsRequest,
  postTicketRequest,
  updateTicketConsentimientoRequest,
} from '../../../services/tickets';
import {EstadoConsentimiento} from '../../../infrastructure/enums/estadoConsentimiento';
import {NewTicketModal} from './NewTicketModal';

export const TicketListScreen = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackParams>>();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [user, setUser] = useState({} as User);
  const [openModal, setOpenModal] = useState(false);
  const [profesionales, setProfesionales] = useState<Partial<User>[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetch();
    });
    return unsubscribe;
  }, [navigation]);

  const fetch = async () => {
    const data: Ticket[] = await getTicketsRequest();
    const user = await StorageAdapter.getItem('user');
    const profesionales = await StorageAdapter.getItem('profesionales');
    setTickets(data);
    setUser(user);
    setProfesionales(profesionales);
  };

  const handleAccept = async (id: number) => {
    await updateTicketConsentimientoRequest(id, EstadoConsentimiento.Aceptado);
    fetch();
  };

  const handleReject = async (id: number) => {
    await updateTicketConsentimientoRequest(id, EstadoConsentimiento.Rechazado);
    fetch();
  };

  const handleCreate = async (ticket: Partial<Ticket>) => {
    ticket.usuario = {id: user.id};
    ticket.solicitante = {id: user.id};
    ticket.fechaCreacion = new Date();
    const data = await postTicketRequest(ticket);
    setOpenModal(false);
    fetch();
  };

  return (
    <MainLayout title="Tickets" back={true} blockTickets>
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
                  {item.consentimientoUsuario === EstadoConsentimiento.Aceptado
                    ? item.consentimientoReceptor ===
                      EstadoConsentimiento.Aceptado
                      ? item.consentimientoSolicitante ===
                        EstadoConsentimiento.Aceptado
                        ? 'Activo'
                        : 'Pendiente de aceptación de los demás'
                      : 'Pendiente de aceptación de los demás'
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
              {item.solicitante?.id !== user?.id &&
              item.usuario?.id === user?.id &&
              item.consentimientoUsuario === EstadoConsentimiento.Pendiente ? (
                <View
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Button
                    mode="contained"
                    style={{marginRight: 10}}
                    onPress={() => handleAccept(item.id!)}>
                    Aceptar
                  </Button>
                  <Button
                    mode="outlined"
                    onPress={() => handleReject(item.id!)}>
                    Rechazar
                  </Button>
                </View>
              ) : (
                item.consentimientoUsuario === EstadoConsentimiento.Aceptado &&
                item.consentimientoReceptor === EstadoConsentimiento.Aceptado &&
                item.consentimientoSolicitante ===
                  EstadoConsentimiento.Aceptado && (
                  <Button
                    mode="outlined"
                    onPress={() =>
                      navigation.navigate('TicketScreen', {
                        ticketId: item.id!,
                      })
                    }>
                    Ver Ticket
                  </Button>
                )
              )}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <FAB
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
        }}
        icon="add-outline"
        onPress={() => setOpenModal(true)}
        mode="flat"
        size="small"
      />
      <NewTicketModal
        visible={openModal}
        onDismiss={() => {
          setOpenModal(false);
        }}
        onCreate={handleCreate}
        profesionales={profesionales}
        tickets={tickets}
        user={user}
      />
    </MainLayout>
  );
};
