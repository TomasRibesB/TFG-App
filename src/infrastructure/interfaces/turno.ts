import { EstadoTurno } from "../enums/estadosTurnos";
import { User } from "./user";

export interface Turno {
    id: number;
    fecha: Date;
    hora: string;
    pacienteId: number;
    profesionalId: number;
    estado: EstadoTurno;
    notificado: Date | null;
    paciente: User;
    profesional: User;
  }