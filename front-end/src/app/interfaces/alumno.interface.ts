import { EstadoAlumno } from "../models/alumno/estadoAlumno.enum";
import { Calificaciones } from "./curso.interface";
import { Usuario } from "./usuario.interface";

export interface Alumno extends Usuario {
    estadoAlumno: EstadoAlumno
    cursoAcutal: string // cuando creemos Curso este sera de tipo Curso
    calificaciones: Calificaciones[]
}


