import React, {useEffect, useState} from 'react';
import {MainLayout} from '../../layouts/MainLayout';
import {Button, Chip, Modal, Text} from 'react-native-paper';
import {DesplegableCard} from '../../components/DesplegableCard';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalTheme} from '../../../config/theme/global-theme';
import {PlanNutricional} from '../../../infrastructure/interfaces/plan-nutricional';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';
import {EmptySection} from '../../components/EmptySection';
import {User} from '../../../infrastructure/interfaces/user';
import {VisibilityComponent} from '../../components/VisibilidadComponent';
import { setAsignarVisivilidadPlanNutricionalRequest } from '../../../services/nutricion';

export const PlanNutricionalScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState('');
  const [planNutricional, setPlanNutricional] = useState<PlanNutricional[]>([]);
  const [profesionales, setProfesionales] = useState<User[]>([]);

  const handleNotePress = (nota: string) => {
    setSelectedNote(nota);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedNote('');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const planData = await StorageAdapter.getItem('planNutricional');
    const profesionalesData = await StorageAdapter.getItem('profesionales');
    setPlanNutricional(planData);
    setProfesionales(profesionalesData);
  };

  const updatePlanNutricional = async (updatedPlan: PlanNutricional) => {
    const profesionalesIds = updatedPlan.visibilidad.map(prof => prof.id);
    try {
      await setAsignarVisivilidadPlanNutricionalRequest(
        updatedPlan.id,
        profesionalesIds,
      );
      setPlanNutricional(prevPlans =>
        prevPlans.map(plan =>
          plan.id === updatedPlan.id ? updatedPlan : plan,
        ),
      );
    } catch (error) {
      console.error('Error al asignar visibilidad al plan nutricional:', error);
    }
  };

  return (
    <>
      <MainLayout>
        {planNutricional.length === 0 ? (
          <EmptySection
            label="No se encontraron planes nutricionales"
            icon="nutrition"
          />
        ) : (
          planNutricional.map(item => (
            <DesplegableCard
              key={item.id}
              title={item.nombre}
              icon="restaurant-outline"
              subtitle={
                item.fechaCreacion &&
                new Date(item.fechaCreacion).toLocaleDateString()
              }>
              <View style={styles.cardContent}>
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
                        {item.macronutrientes && item.macronutrientes[key]}{' '}
                        {key}
                      </Chip>
                    ))}
                </View>
                <Button
                  icon="document-text-outline"
                  mode="outlined"
                  onPress={() => {
                    item.notasAdicionales &&
                      handleNotePress(item.notasAdicionales);
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
                {/* Integración del componente de visibilidad */}
                <VisibilityComponent
                  item={item}
                  profesionales={profesionales}
                  onUpdate={updatePlanNutricional}
                />
              </View>
            </DesplegableCard>
          ))
        )}
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

const styles = StyleSheet.create({
  cardContent: {
    paddingVertical: 8,
  },
});
