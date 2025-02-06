import React, {useEffect, useState} from 'react';
import {MainLayout} from '../../layouts/MainLayout';
import {Text} from 'react-native-paper';
import {ProfesionalComponent} from '../../components/ProfesionalComponent';
import {TicketComponent} from '../../components/TicketComponent';
import {TurnoComponent} from '../../components/TurnoComponent';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';
import {Role} from '../../../infrastructure/enums/roles';
import {User} from '../../../infrastructure/interfaces/user';

export const NutricionistaScreen = () => {
  const [nutricionista, setNutricionista] = useState<User[]>([]);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const data: User[] = await StorageAdapter.getItem('profesionales');
    console.log(data);
    const nutricionista = data.filter(
      profesional => profesional.role === Role.Nutricionista,
    );
    setNutricionista(nutricionista);
  };

  return (
    <MainLayout>
      {nutricionista.length > 0 &&
        nutricionista.map(profesional => (
          <ProfesionalComponent
            key={profesional.id}
            title="Nutricionista"
            name={profesional.firstName}
            lastName={profesional.lastName}
          />
        ))}
      <TicketComponent />
      <TurnoComponent />
    </MainLayout>
  );
};