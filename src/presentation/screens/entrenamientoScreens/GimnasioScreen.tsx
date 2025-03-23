import React, {useEffect, useState} from 'react';
import {MainLayout} from '../../layouts/MainLayout';
import {StyleSheet, View} from 'react-native';
import {TicketComponent} from '../../components/TicketComponent';
import {ProfesionalComponent} from '../../components/ProfesionalComponent';
import {User} from '../../../infrastructure/interfaces/user';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';
import {Role} from '../../../infrastructure/enums/roles';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {EmptySection} from '../../components/EmptySection';

export const GimnasioScreen = () => {
  const [entrenador, setEntrenador] = useState<User[]>([]);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const data: User[] = await StorageAdapter.getItem('profesionales');
    const entrenador = data.filter(
      profesional => profesional.role === Role.Entrenador,
    );
    setEntrenador(entrenador);
  };

  return (
    <MainLayout>
      {entrenador.length === 0 ? (
        <EmptySection label="No hay entrenadores disponibles" icon="person" />
      ) : (
        <>
          {entrenador.map(profesional => (
            <ProfesionalComponent
              key={`pr-${profesional.id}`}
              title="Entrenador"
              name={profesional.firstName ?? ''}
              lastName={profesional.lastName ?? ''}
            />
          ))}
          <TicketComponent />
        </>
      )}
    </MainLayout>
  );
};
