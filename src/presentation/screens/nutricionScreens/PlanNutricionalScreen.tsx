import React, {Component, useState} from 'react';
import {MainLayout} from '../../layouts/MainLayout';
import {Button, Chip, Modal, Text} from 'react-native-paper';
import {DesplegableCard} from '../../components/DesplegableCard';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalTheme} from '../../../config/theme/global-theme';

export const PlanNutricionalScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState('');

  const handleNotePress = (nota: string) => {
    setSelectedNote(nota);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedNote('');
  };

  const plan = [
    {
      id: 1,
      dateCreated: '2023-05-15',
      name: 'Balanced Nutrition Plan',
      description:
        'A comprehensive plan designed to meet your nutritional needs and fitness goals.',
      nutritionist: {
        name: 'Ignacio Baquero',
        avatar: '/placeholder.svg?height=40&width=40',
        rol: 'Nutritionist',
      },
      objectives: [
        'Maintain a balanced diet',
        'Increase protein intake',
        'Reduce processed sugar consumption',
      ],
      dailyCalories: 2200,
      macronutrients: ['Carbs: 50%', 'Protein: 30%', 'Fats: 20%'],
      additionalNotes:
        'Remember to stay hydrated and adjust portion sizes based on activity level.',
    },
    {
      id: 2,
      dateCreated: '2024-07-20',
      name: 'Weight Loss Plan',
      description:
        'A personalized plan to help you achieve your weight loss goals.',
      nutritionist: {
        name: 'Dr. John Doe',
        avatar: '/placeholder.svg?height=40&width=40',
        rol: 'Nutritionist',
      },
      objectives: [
        'Reduce calorie intake',
        'Increase physical activity',
        'Monitor progress regularly',
      ],
      dailyCalories: 1800,
      macronutrients: ['Carbs: 40%', 'Protein: 30%', 'Fats: 30%'],
      additionalNotes:
        'Focus on whole foods and avoid sugary beverages and snacks.',
    },
  ];

  return (
    <>
      <MainLayout>
        {plan.map(item => (
          <DesplegableCard
            key={item.id}
            title={item.name}
            icon="restaurant-outline"
            subtitle={item.dateCreated}>
            <Text>{item.description}</Text>
            <View style={{marginTop: 16, flexDirection: 'column'}}>
              <Text variant="titleMedium">Objetivos</Text>
              {item.objectives.map((objective, index) => (
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
                {item.dailyCalories} Calorias × Dia
              </Chip>
              {item.macronutrients.map((macro, index) => (
                <Chip onPress={() => {}} key={index} style={{margin: 5}}>
                  {item.macronutrients[index]}
                </Chip>
              ))}
            </View>
            <Button
              icon="document-text-outline"
              mode="outlined"
              onPress={() => {
                handleNotePress(item.additionalNotes);
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
              <Text>{item.nutritionist.name}</Text>
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
