import { UnidadMedida } from "../enums/unidadMedida";
import { CategoriaEjercicio } from "./categoria-ejercicio";
import { GruposMusculares } from "./grupos-musculares";
import { RutinaEjercicio } from "./rutina-ejercicio";

export interface Ejercicio {
    id: number;
    name: string;
    description?: string;
    image?: string;
    keywords?: string;
    ejercicioRutina?: RutinaEjercicio[];
    categoriaEjercicio: CategoriaEjercicio;
    gruposMusculares: GruposMusculares[];
    unidadMedida: UnidadMedida;
  }