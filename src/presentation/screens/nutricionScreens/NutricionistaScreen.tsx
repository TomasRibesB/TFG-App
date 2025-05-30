import React, {useEffect, useState} from 'react';
import {MainLayout} from '../../layouts/MainLayout';
import {Text} from 'react-native-paper';
import {ProfesionalComponent} from '../../components/ProfesionalComponent';
import {TicketComponent} from '../../components/TicketComponent';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';
import {Role} from '../../../infrastructure/enums/roles';
import {User} from '../../../infrastructure/interfaces/user';
import {EmptySection} from '../../components/EmptySection';
import {useRefreshNutricion} from '../../hooks/useRefreshNutricion';

export const NutricionistaScreen = () => {
  const [nutricionista, setNutricionista] = useState<User[]>([]);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const data: User[] = await StorageAdapter.getItem('profesionales');
    const nutricionista = data.filter(
      profesional => profesional.role === Role.Nutricionista,
    );
    setNutricionista(nutricionista);
  };

  useRefreshNutricion(fetch);

  return (
    <MainLayout>
      {nutricionista.length === 0 ? (
        <EmptySection label="No hay nutricionistas disponibles" icon="person" />
      ) : (
        <>
          {nutricionista.map(profesional => (
            <ProfesionalComponent
              key={profesional.id}
              title="Nutricionista"
              profesional={profesional}
            />
          ))}

          <TicketComponent />
        </>
      )}
    </MainLayout>
  );
};
