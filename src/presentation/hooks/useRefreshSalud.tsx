import {useEffect} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {getProfesionalesRequest} from '../../services/user';
import {StorageAdapter} from '../../config/adapters/storage-adapter';
import {getDocumentosRequest, getPermisoDocumentoRequest} from '../../services/salud';

export const refreshAllData = async () => {
  const documentos = await getDocumentosRequest();
  const profesionales = await getProfesionalesRequest();
  const permiso = await getPermisoDocumentoRequest()
  await StorageAdapter.setItem('documentos', documentos);
  await StorageAdapter.setItem('profesionales', profesionales);
  await StorageAdapter.setItem('permisos', permiso);
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
