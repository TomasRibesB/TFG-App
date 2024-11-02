import React, {useState, useEffect, useRef} from 'react';
import {View, ScrollView} from 'react-native';
import {
  Text,
  Divider,
  TextInput,
  useTheme,
  IconButton,
  FAB,
} from 'react-native-paper';
import {MainLayout} from '../../layouts/MainLayout';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {globalVariables} from '../../../config/theme/global-theme';

interface Props extends StackScreenProps<RootStackParams, 'TicketScreen'> {}

export const TicketScreen = ({route}: Props) => {
  const {ticket} = route.params;
  const [mensajes, setMensajes] = useState(ticket.mensajes);
  const [mensaje, setMensaje] = useState('');
  const {colors} = useTheme();

  // Referencia al ScrollView
  const scrollViewRef = useRef<ScrollView>(null);

  // Estado para controlar la visibilidad del FAB
  const [showFAB, setShowFAB] = useState(false);

  // Agrupar mensajes por fecha
  const groupedMensajes = mensajes.reduce(
    (groups: {[key: string]: any[]}, mensaje) => {
      const date = mensaje.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(mensaje);
      return groups;
    },
    {},
  );

  const handleSend = () => {
    if (mensaje.trim() === '') return;
    const newMensaje = {
      id: mensajes.length + 1,
      usuario: {id: 1, nombre: 'Yo'},
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      content: mensaje,
    };
    setMensajes([...mensajes, newMensaje]);
    setMensaje('');
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

  return (
    <MainLayout title={ticket.titulo} scrolleable={false} back={true}>
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
                key={mensaje.id}
                style={{
                  alignSelf:
                    mensaje.usuario.nombre === 'Yo' ? 'flex-end' : 'flex-start',
                  backgroundColor:
                    mensaje.usuario.nombre === 'Yo'
                      ? colors.primaryContainer
                      : colors.secondaryContainer,
                  borderRadius: 10,
                  marginVertical: 5,
                  padding: 10,
                  maxWidth: '80%',
                  position: 'relative',
                  marginBottom: globalVariables.margin,
                }}>
                <Text>{mensaje.content}</Text>
                <Text style={{fontSize: 10, textAlign: 'right'}}>
                  {mensaje.usuario.nombre} - {mensaje.time}
                </Text>
                <View
                  style={{
                    position: 'absolute',
                    bottom: -10,
                    left: mensaje.usuario.nombre === 'Yo' ? 'auto' : 10,
                    right: mensaje.usuario.nombre === 'Yo' ? 10 : 'auto',
                    width: 0,
                    height: 0,
                    borderLeftWidth: 10,
                    borderRightWidth: 10,
                    borderTopWidth: 10,
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderTopColor:
                      mensaje.usuario.nombre === 'Yo'
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
          backgroundColor: 'white',
        }}>
        <TextInput
          style={{flex: 1}}
          value={mensaje}
          onChangeText={setMensaje}
          placeholder="Escribe un mensaje"
          mode="outlined"
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
