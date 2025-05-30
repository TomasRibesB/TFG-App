import React, {useState, useEffect, useRef} from 'react';
import {View, ScrollView} from 'react-native';
import {
  Text,
  Divider,
  TextInput,
  useTheme,
  IconButton,
  FAB,
  Button,
} from 'react-native-paper';
import {MainLayout} from '../../layouts/MainLayout';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {
  MainStackParams,
  RootStackParams,
} from '../../navigation/StackNavigator';
import {globalVariables} from '../../../config/theme/global-theme';
import {Ticket} from '../../../infrastructure/interfaces/ticket';
import {TicketMensaje} from '../../../infrastructure/interfaces/ticket-mensaje';
import {User} from '../../../infrastructure/interfaces/user';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';
import {EstadoMensaje} from '../../../infrastructure/enums/estadoMensaje';
import {v4 as uuidv4} from 'uuid';
import {socket} from '../../../services/socket';
import {
  getTicketByIdRequest,
  deleteTicketRequest,
} from '../../../services/tickets';
import {DesplegableCard} from '../../components/DesplegableCard';
import {useNavigation} from '@react-navigation/native';

interface Props extends StackScreenProps<MainStackParams, 'TicketScreen'> {}

export const TicketScreen = ({route}: Props) => {
  const ticketId: number = route.params.ticketId;
  const [ticket, setTicket] = useState<Ticket>({} as Ticket);
  const [mensajes, setMensajes] = useState<Partial<TicketMensaje>[]>([]);
  const [mensaje, setMensaje] = useState('');
  const [user, setUser] = useState({} as Partial<User>);
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const [loadingBaja, setLoadingBaja] = useState(false);
  const [inputHeight, setInputHeight] = useState(0);
  const minHeight = 40;
  const maxHeight = 160;

  const navigation = useNavigation<StackNavigationProp<MainStackParams>>();

  const theme = useTheme();

  // Referencia al ScrollView
  const scrollViewRef = useRef<ScrollView>(null);

  // Estado para controlar la visibilidad del FAB
  const [showFAB, setShowFAB] = useState(false);

  // Agrupar mensajes por fecha
  const groupedMensajes = mensajes.reduce(
    (groups: {[key: string]: any[]}, mensaje) => {
      const date = new Date(mensaje.fecha!).toISOString().split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(mensaje);
      return groups;
    },
    {},
  );

  useEffect(() => {
    setLoading(true);
    fetch();
    socket.on('message', (data: Partial<TicketMensaje>) => {
      console.log('New message', data);
      setMensajes(prevMensajes => {
        const exists = prevMensajes.some(
          mensaje => mensaje.idRef === data.idRef,
        );
        if (exists) return prevMensajes;
        return [...prevMensajes, data];
      });
    });

    // Limpieza del listener cuando se desmonte el componente
    return () => {
      socket.off('message');
    };
  }, []);

  const fetch = async () => {
    const user = await StorageAdapter.getItem('user');
    setUser(user);
    const ticket = await getTicketByIdRequest(ticketId);
    setTicket(ticket);
    setMensajes(ticket.mensajes || []);
    setLoading(false);
  };

  useEffect(() => {
    if (!ticket.id) return;
    socket.emit('joinChat', ticket.id);
    console.log('Joining chat');
  }, [ticket.id]);

  const handleSend = () => {
    if (mensaje.trim() === '') return;
    const newMensaje: Partial<TicketMensaje> = {
      idRef: uuidv4(),
      ticket: {id: ticket.id},
      fecha: new Date(),
      emisor: {id: user.id!},
      estado: EstadoMensaje.Enviando,
      mensaje: mensaje,
    };
    // Actualiza la UI inmediatamente (optimista)
    setMensajes([...mensajes, newMensaje]);

    // Emitir el mensaje al servidor
    socket.emit('message', newMensaje);

    setMensaje('');
    setInputHeight(0); // Reiniciar la altura del TextInput
  };

  // Desplazarse al final al montar el componente
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  }, []);

  // Desplazarse al final cuando cambien los mensajes
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  }, [mensajes]);

  // Manejador de desplazamiento
  const handleScroll = (event: any) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const distanceFromBottom =
      contentSize.height - (layoutMeasurement.height + contentOffset.y);
    if (distanceFromBottom > 400) {
      setShowFAB(true);
    } else {
      setShowFAB(false);
    }
  };

  const handleDeleteTicket = async (id: number) => {
    setLoadingBaja(true);
    await deleteTicketRequest(id);
    navigation.goBack();
    setLoadingBaja(false);
  };

  if (loading) {
    return <MainLayout title="Cargando..." />;
  }

  return (
    <MainLayout title={'Ticket'} scrolleable={false} back={true} blockTickets>
      <DesplegableCard
        title={ticket?.asunto}
        icon="information-circle-outline"
        isExpanded={false}>
        <View style={{paddingBottom: globalVariables.padding}}>
          <Text variant="titleMedium" style={{fontSize: 14}}>
            Descripción: {ticket?.descripcion}
          </Text>
        </View>
        {ticket?.solicitante?.id === user.id && (
          <Button
            mode="contained-tonal"
            icon="archive-outline"
            loading={loadingBaja}
            disabled={loadingBaja}
            style={{marginBottom: 10, backgroundColor: colors.errorContainer}}
            onPress={() => handleDeleteTicket(ticket.id!)}>
            Archivar ticket
          </Button>
        )}
      </DesplegableCard>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{flex: 1, padding: 10}}
        showsVerticalScrollIndicator={false}>
        {Object.keys(groupedMensajes).map(date => (
          <View key={date}>
            <Divider style={{marginVertical: 10}} />
            <Text style={{textAlign: 'center', marginVertical: 5}}>{date}</Text>
            {groupedMensajes[date].map(mensaje => (
              <View
                key={mensaje.idRef}
                style={{
                  alignSelf:
                    mensaje.emisor?.id === user.id ? 'flex-end' : 'flex-start',
                  backgroundColor:
                    mensaje.emisor?.id === user.id
                      ? colors.primaryContainer
                      : colors.secondaryContainer,
                  borderRadius: 10,
                  marginVertical: 5,
                  padding: 10,
                  maxWidth: '80%',
                  position: 'relative',
                  marginBottom: globalVariables.margin,
                }}>
                <Text>{mensaje.mensaje}</Text>
                <Text style={{fontSize: 10, textAlign: 'right'}}>
                  {mensaje.emisor?.id === user.id
                    ? 'Tú - '
                    : mensaje.emisor?.firstName +
                      ' ' +
                      mensaje.emisor?.lastName +
                      ' - '}
                  {new Date(mensaje.fecha!).toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </Text>
                <View
                  style={{
                    position: 'absolute',
                    bottom: -10,
                    left: mensaje.emisor?.id === user.id ? 'auto' : 10,
                    right: mensaje.emisor?.id === user.id ? 10 : 'auto',
                    width: 0,
                    height: 0,
                    borderLeftWidth: 10,
                    borderRightWidth: 10,
                    borderTopWidth: 10,
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderTopColor:
                      mensaje.emisor?.id === user.id
                        ? colors.primaryContainer
                        : colors.secondaryContainer,
                  }}
                />
              </View>
            ))}
          </View>
        ))}
        <View style={{height: 100}} />
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: theme.colors.background,
          paddingLeft: 63,
        }}>
        <TextInput
          mode="outlined"
          multiline
          numberOfLines={4}
          style={{
            flex: 1,
            minHeight,
            maxHeight,
            height: Math.min(Math.max(inputHeight, minHeight), maxHeight),
          }}
          outlineStyle={{borderRadius: 16}}
          value={mensaje}
          onChangeText={setMensaje}
          placeholder="Escribe un mensaje"
          onContentSizeChange={e => {
            setInputHeight(e.nativeEvent.contentSize.height);
          }}
        />
        <IconButton
          icon={'send-outline'}
          onPress={handleSend}
          mode="contained"
        />
      </View>
      {showFAB && (
        <FAB
          style={{
            position: 'absolute',
            right: 16,
            bottom: 100,
          }}
          size="small"
          icon="arrow-down-outline"
          mode="flat"
          onPress={() => {
            scrollViewRef.current?.scrollToEnd({animated: true});
          }}
        />
      )}
    </MainLayout>
  );
};
