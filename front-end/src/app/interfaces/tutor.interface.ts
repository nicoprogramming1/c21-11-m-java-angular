import { Alumno } from "./alumno.interface";
import { Usuario } from "./usuario.interface";

export interface Tutor extends Usuario {
    hijos: Alumno[],
    detalle: string
}