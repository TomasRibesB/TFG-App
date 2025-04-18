import { CategoriaEjercicio } from "./categoria-ejercicio";
import { GruposMusculares } from "./grupos-musculares";
import { RutinaEjercicio } from "./rutina-ejercicio";

export interface Ejercicio {
    id: number;
    name: string;
    demostration?: string;
    explication?: string;
    ejercicioRutina?: RutinaEjercicio[];
    categoriaEjercicio: CategoriaEjercicio[];
    gruposMusculares: GruposMusculares[];
  }