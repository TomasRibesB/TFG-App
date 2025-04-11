import { useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { getProfesionalesRequest } from '../../services/user';
import { StorageAdapter } from '../../config/adapters/storage-adapter';
import { getPlanNutricionalRequest } from '../../services/nutricion';

export const refreshAllData = async () => {
    const planNutricional = await getPlanNutricionalRequest();
    const profesionales = await getProfesionalesRequest();
    await StorageAdapter.setItem('planNutricional', planNutricional);
    await StorageAdapter.setItem('profesionales', profesionales);
};

export const useRefreshNutricion = (fetchCallback: () => void) => {
    useEffect(() => {
        const subscription = DeviceEventEmitter.addListener('refreshDataNutricion', async () => {
            await refreshAllData();
            fetchCallback();
            DeviceEventEmitter.emit('refreshCompleteNutricion');
        });
        return () => subscription.remove();
    }, [fetchCallback]);
};