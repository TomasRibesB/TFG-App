import {StorageAdapter} from '../config/adapters/storage-adapter';
import { getRoutineRequest } from './entrenamiento';
import { getPlanNutricionalRequest } from './nutricion';
import { getDocumentosRequest } from './salud';
import { getProfesionalesRequest } from './user';
import { getTicketsRequest } from './tickets';

export const initialFetch = async () => {
    const rutinas = await getRoutineRequest();
    const planNutricional = await getPlanNutricionalRequest();
    const documentos = await getDocumentosRequest();
    const profesionales = await getProfesionalesRequest();
    const tickets = await getTicketsRequest();

    await StorageAdapter.setItem('rutinas', rutinas);
    await StorageAdapter.setItem('planNutricional', planNutricional);
    await StorageAdapter.setItem('documentos', documentos);
    await StorageAdapter.setItem('profesionales', profesionales);
    await StorageAdapter.setItem('tickets', tickets);
    }