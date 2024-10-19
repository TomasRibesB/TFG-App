import {View} from 'react-native';
import {Button, IconButton, Text, useTheme} from 'react-native-paper';
import {CardContainer} from './CardContainer';
import DatePicker from 'react-native-date-picker';
import React, {useEffect, useState} from 'react';
import {PaperSelect} from 'react-native-paper-select';
import {PaperSelectProps} from 'react-native-paper-select/lib/typescript/interface/paperSelect.interface';

interface Prop {
  profesionales: PaperSelectProps;
}

export const TurnoComponent = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const singleSelectRef = React.createRef();
  const [profesionales, setProfesionales] = useState<{
    value: string;
    list: { _id: string; value: string; text: string }[];
    selectedList: { _id: string; value: string; text: string }[];
    error: string;
  }>({
    value: '',
    list: [
      {
        _id: '1',
        value: 'Ignacio Baquero Nutricionista',
        text: 'Ignacio Baquero Nutricionista',
      },
    ],
    selectedList: [],
    error: '',
  });

  useEffect(() => {
    setPrimaryColor(rgbaToHex(theme.colors.primary));
  }, [theme.colors.primary]);

  useEffect(() => {
    if (profesionales.list.length === 1) {
      setProfesionales({
        ...profesionales,
        value: profesionales.list[0].value,
        selectedList: profesionales.list,
      });
    }
  }, [profesionales.list]);

  const rgbaToHex = (rgba: string): string => {
    const result = rgba.match(/\d+/g);
    if (result && result.length >= 3) {
      const r = parseInt(result[0]).toString(16).padStart(2, '0');
      const g = parseInt(result[1]).toString(16).padStart(2, '0');
      const b = parseInt(result[2]).toString(16).padStart(2, '0');
      return `#${r}${g}${b}`;
    }
    return '#000000'; // Default return value if input is not valid
  };

  return (
    <>
      <CardContainer title="Turnos" icon="calendar-outline">
        <View
          style={{
            width: '100%',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button mode="text" onPress={() => setOpen(true)} icon={'calendar'}>
              {date
                ? `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
                : 'Seleccionar fecha'}
            </Button>
            {date && <IconButton icon="close" onPress={() => setDate(null)} />}
          </View>

          { profesionales.list.length > 1 ?
            <PaperSelect
              inputRef={singleSelectRef}
              label="Seleccionar Profesional"
              value={profesionales.value}
              onSelection={(value: any) => {
                setProfesionales({
                  ...profesionales,
                  value: value.text,
                  selectedList: value.selectedList,
                  error: '',
                });
              }}
              arrayList={[...profesionales.list]}
              selectedArrayList={[...profesionales.selectedList]}
              errorText={profesionales.error}
              dialogCloseButtonText="Cancelar"
              dialogDoneButtonText="Confirmar"
              multiEnable={false}
              hideSearchBox={true}
              textInputMode="outlined"
            />
            : <Text
            style={{marginLeft: 10}}
            variant='titleMedium'
            >{profesionales.list[0].value}</Text>
          }
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <Button mode="text" onPress={() => {}}>
              Cancelar
            </Button>
            <Button mode="text" onPress={() => {}}>
              Reservar
            </Button>
          </View>
        </View>
      </CardContainer>
      <DatePicker
        modal
        mode="datetime"
        title={'Selecciona la fecha para solicitar turno'}
        open={open}
        date={date || new Date()}
        locale="es"
        confirmText="Confirmar"
        cancelText="Cancelar"
        buttonColor={primaryColor}
        dividerColor={primaryColor}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
