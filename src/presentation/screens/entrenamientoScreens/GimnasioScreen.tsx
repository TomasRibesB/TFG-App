import React, {useEffect, useState} from 'react';
import {MainLayout} from '../../layouts/MainLayout';
import {StyleSheet} from 'react-native';
import {TicketComponent} from '../../components/TicketComponent';
import {ProfesionalComponent} from '../../components/ProfesionalComponent';
import {User} from '../../../infrastructure/interfaces/user';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';
import {Role} from '../../../infrastructure/enums/roles';

export const GimnasioScreen = () => {
  const [entrenador, setEntrenador] = useState<User[]>([]);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const data: User[] = await StorageAdapter.getItem('profesionales');
    console.log(data);
    const entrenador = data.filter(
      profesional => profesional.role === Role.Entrenador,
    );
    setEntrenador(entrenador);
  };

  return (
    <MainLayout>
      {entrenador.length > 0 &&
        entrenador.map(profesional => (
          <ProfesionalComponent
            key={profesional.id}
            title="Entrenador"
            name={profesional.firstName}
            lastName={profesional.lastName}
          />
        ))}
      <TicketComponent />
    </MainLayout>
  );
};
