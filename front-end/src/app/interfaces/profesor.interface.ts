import { Usuario } from "./usuario.interface"

export interface Profesor extends Usuario {
    legajo: Legajo,
    asignaturas: string[]   // cuando se desarrolle las stories de asignatura reemplazar
}

export interface Legajo {
    legajo: number
}