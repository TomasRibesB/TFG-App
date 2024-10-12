export interface Rutinas {
    rutinas: RutinaElement[];
}

export interface RutinaElement {
    rutinaId:      number;
    fechaCreacion: Date;
    nombre:        string;
    descripcion:   string;
    entrenadorId:  number;
    usuarioId:     number;
    ejercicios:    EjercicioElement[];
}

export interface EjercicioElement {
    rutinaEjercicioId: number;
    fechaBaja:         null;
    rutinaId:          number;
    ejercicio:         EjercicioEjercicio;
    series:            number;
    repeticiones:      number;
    medicion:          number;
}

export interface EjercicioEjercicio {
    ejercicioId:        number;
    nombre:             string;
    descripcion:        string;
    gruposMuscularesId: number[];
    categoriasId:       number[];
    video:              string;
    unidadMedida:       string;
}
