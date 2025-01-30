import { User } from "./user";
import { TipoDocumento } from "../enums/tipoDocumentos";

export interface Documento {
  id: number;
  tipo: TipoDocumento;
  titulo: string;
  descripcion: string;
  archivo?: string | null;
  directorio?: string | null;
  fechaSubida: Date;
  nombreProfesional?: string | null;
  apellidoProfesional?: string | null;
  profesional?: User | null;
  usuario: User;
  visibilidad: User[];
}