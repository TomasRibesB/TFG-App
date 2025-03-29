import {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Portal, Dialog, Button, Text, TextInput} from 'react-native-paper';
import {User} from '../../../infrastructure/interfaces/user';
import {Ticket} from '../../../infrastructure/interfaces/ticket';
import {Role} from '../../../infrastructure/enums/roles';
import {PaperSelect} from 'react-native-paper-select';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  onCreate: (ticket: Partial<Ticket>) => void;
  profesionales: Partial<User>[];
  tickets: Partial<Ticket>[];
  user: Partial<User>;
}

export const NewTicketModal = ({
  visible,
  onDismiss,
  onCreate,
  profesionales,
  tickets,
  user,
}: Props) => {
  // Estado para el nuevo ticket, preestableciendo usuario y solicitante como user
  const [newTicket, setNewTicket] = useState<Partial<Ticket>>({});
  // Estado para el profesional seleccionado: id y texto de display
  const [selectedProfesionalId, setSelectedProfesionalId] =
    useState<string>('');
  const [selectedProfesionalText, setSelectedProfesionalText] =
    useState<string>('');
  const [profList, setProfList] = useState<{_id: string; value: string}[]>([]);
  const [error, setError] = useState<string>('');

  const clearDismiss = () => {
    setNewTicket({});
    setSelectedProfesionalId('');
    setSelectedProfesionalText('');
    onDismiss();
  };

  useEffect(() => {
    const list = profesionales.map(p => ({
      _id: p.id?.toString() || '',
      value: `${p.firstName} ${p.lastName}\n${
        p.role === Role.Profesional
          ? 'Profesional - ' +
            (p.userTipoProfesionales
              ?.map(tipo => tipo.tipoProfesional?.profesion)
              .filter(profesion => profesion !== undefined)
              .join(', ') || 'No especificado')
          : (p.role?.charAt(0).toUpperCase() ?? '') +
            (p.role?.slice(1).toLocaleLowerCase() ?? '')
      }`,
    }));
    setProfList(list);
  }, [profesionales]);

  useEffect(() => {
    console.log('NewTicketModal: ', JSON.stringify(newTicket, null, 2));
  }, [newTicket]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);

  const handleVerificarTicket = (ticket: Partial<Ticket>) => {
    // Verificar si existe un ticket con las mismas personas en cualquier configuración
    const exists = tickets.some(t => {
      const solicitanteId = t.solicitante?.id;
      const receptorId = t.receptor?.id;
      return (
        (solicitanteId === ticket.solicitante?.id &&
          receptorId === ticket.receptor?.id) ||
        (solicitanteId === ticket.receptor?.id &&
          receptorId === ticket.solicitante?.id)
      );
    });
    if (exists) {
      setError('Ya existe un ticket con estos integrantes.');
    }
    return exists; // Retorna true si existe un ticket con las mismas personas
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={clearDismiss}>
        <Dialog.Title>Nuevo Ticket</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Asunto"
            value={newTicket.asunto}
            mode="outlined"
            onChangeText={text => setNewTicket({...newTicket, asunto: text})}
            style={{
              marginBottom: 10,
            }}
          />
          <TextInput
            label="Descripción"
            value={newTicket.descripcion}
            mode="outlined"
            multiline={true}
            numberOfLines={4}
            onChangeText={text =>
              setNewTicket({...newTicket, descripcion: text})
            }
            style={{marginBottom: 10}}
          />
          <PaperSelect
            label="Seleccionar Profesional"
            value={selectedProfesionalText}
            onSelection={item => {
              const selectedItem = profList.find(p => p.value === item.text);
              if (selectedItem) {
                setSelectedProfesionalId(selectedItem._id);
                setSelectedProfesionalText(selectedItem.value);
                setNewTicket({
                  ...newTicket,
                  receptor: {id: parseInt(selectedItem._id)} as User,
                });
              }
            }}
            arrayList={profList}
            selectedArrayList={[
              {
                _id: selectedProfesionalId,
                value: selectedProfesionalText,
              },
            ]}
            multiEnable={false}
            textInputOutlineStyle={{borderRadius: 8}}
            dialogTitle="Seleccionar Profesional"
            dialogCloseButtonText="Cerrar"
            textInputMode="outlined"
            dialogDoneButtonText="Hecho"
            hideSearchBox={true}
          />
          {error ? (
            <Text variant="labelSmall" style={{color: 'red', marginBottom: 8}}>
              {error}
            </Text>
          ) : null}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={clearDismiss}>Cancelar</Button>
          <Button
            onPress={() => {
              if (
                newTicket.asunto &&
                newTicket.descripcion &&
                selectedProfesionalId
              ) {
                if (!handleVerificarTicket(newTicket)) {
                  onCreate(newTicket);
                  clearDismiss();
                }
              } else {
                setError('Por favor, completa todos los campos.');
              }
            }}>
            Crear
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
