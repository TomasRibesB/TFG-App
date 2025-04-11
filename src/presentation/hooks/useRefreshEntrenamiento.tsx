import { useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { getRoutineRequest } from '../../services/entrenamiento';
import { getProfesionalesRequest } from '../../services/user';
import { StorageAdapter } from '../../config/adapters/storage-adapter';

export const refreshAllData = async () => {
    const rutinas = await getRoutineRequest();
    const profesionales = await getProfesionalesRequest();
    await StorageAdapter.setItem('rutinas', rutinas);
    await StorageAdapter.setItem('profesionales', profesionales);
};

export const useRefreshEntrenamiento = (fetchCallback: () => void) => {
    useEffect(() => {
        const subscription = DeviceEventEmitter.addListener('refreshDataEntrenamiento', async () => {
            await refreshAllData();
            fetchCallback();
            DeviceEventEmitter.emit('refreshCompleteEntrenamiento');
        });
        return () => subscription.remove();
    }, [fetchCallback]);
};