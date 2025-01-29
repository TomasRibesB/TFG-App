import React, {Component, useEffect, useState} from 'react';
import {MainLayout} from '../../layouts/MainLayout';
import {Button, Chip, Modal, Text} from 'react-native-paper';
import {DesplegableCard} from '../../components/DesplegableCard';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalTheme} from '../../../config/theme/global-theme';
import {getPlanNutricional} from '../../../services/nutricion';
import {PlanNutricional} from '../../../infrastructure/interfaces/plan-nutricional';

export const PlanNutricionalScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState('');
  const [planNutricional, setPlanNutricional] = useState<PlanNutricional[]>([]);

  const handleNotePress = (nota: string) => {
    setSelectedNote(nota);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedNote('');
  };

  useEffect(() => {
    getPlanNutricional().then(response => {
      setPlanNutricional(response);
    });
  }, []);

  return (
    <>
      <MainLayout>
        {planNutricional.map(item => (
          <DesplegableCard
            key={item.id}
            title={item.nombre}
            icon="restaurant-outline"
            subtitle={
              item.fechaCreacion &&
              new Date(item.fechaCreacion).toLocaleDateString()
            }>
            <Text>{item.descripcion}</Text>
            <View style={{marginTop: 16, flexDirection: 'column'}}>
              <Text variant="titleMedium">Objetivos</Text>
              {item.objetivos &&
                item.objetivos.split(',').map((objective, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5,
                    }}>
                    <Icon name="chevron-forward-outline" size={20} />
                    <Text style={{marginLeft: 5}}>{objective}</Text>
                  </View>
                ))}
            </View>
            <View
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              <Chip
                icon="restaurant-outline"
                onPress={() => {}}
                style={{margin: 5}}>
                {item.caloriasDiarias} Calorias × Dia
              </Chip>
              {item.macronutrientes &&
                Object.keys(item.macronutrientes).map((key, index) => (
                  <Chip onPress={() => {}} key={index} style={{margin: 5}}>
                    {item.macronutrientes && item.macronutrientes[key]} {key}
                  </Chip>
                ))}
            </View>
            <Button
              icon="document-text-outline"
              mode="outlined"
              onPress={() => {
                {
                  item.notasAdicionales &&
                    handleNotePress(item.notasAdicionales);
                }
              }}
              style={{marginVertical: 10}}>
              Notas Adicionales
            </Button>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
                justifyContent: 'flex-end',
              }}>
              <Text style={{marginRight: 3}}>Diseñado por</Text>
              <Icon
                name="person-circle-outline"
                size={24}
                style={{marginRight: 3}}
              />
              <Text>
                {item.nutricionista && item.nutricionista.firstName}{' '}
                {item.nutricionista && item.nutricionista.lastName}
              </Text>
            </View>
          </DesplegableCard>
        ))}
      </MainLayout>
      <Modal
        visible={modalVisible}
        onDismiss={closeModal}
        contentContainerStyle={globalTheme.modalContainer}>
        <View style={[globalTheme.modalContent]}>
          <Text style={globalTheme.modalTitle}>Notas Adicionales</Text>
          <Text style={[globalTheme.modalDescription, {fontStyle: 'normal'}]}>
            {selectedNote}
          </Text>
          <Button
            mode="contained"
            onPress={closeModal}
            style={globalTheme.modalCloseButton}>
            Cerrar
          </Button>
        </View>
      </Modal>
    </>
  );
};
