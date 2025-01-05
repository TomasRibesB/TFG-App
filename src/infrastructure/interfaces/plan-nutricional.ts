import { User } from "./user";

export interface PlanNutricional {
  id: number;
  fechaCreacion: Date;
  nombre: string;
  descripcion: string;
  nutricionistaId: number;
  pacienteId: number;
  objetivos: string;
  caloriasDiarias: number;
  macronutrientes: { [key: string]: number };
  notasAdicionales?: string;
  nutricionista: User;
  paciente: User;
}