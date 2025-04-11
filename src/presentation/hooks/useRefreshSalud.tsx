import {useEffect} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {getProfesionalesRequest} from '../../services/user';
import {StorageAdapter} from '../../config/adapters/storage-adapter';
import {getDocumentosRequest} from '../../services/salud';

export const refreshAllData = async () => {
  const documentos = await getDocumentosRequest();
  const profesionales = await getProfesionalesRequest();
  await StorageAdapter.setItem('documentos', documentos);
  await StorageAdapter.setItem('profesionales', profesionales);
};

export const useRefreshSalud = (fetchCallback: () => void) => {
  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      'refreshDataSalud',
      async () => {
        await refreshAllData();
        fetchCallback();
        DeviceEventEmitter.emit('refreshCompleteSalud');
      },
    );
    return () => subscription.remove();
  }, [fetchCallback]);
};
