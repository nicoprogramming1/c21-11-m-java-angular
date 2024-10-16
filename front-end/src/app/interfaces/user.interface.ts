import { Califications } from './course.interface';

export interface User {
  id?: string,
  firstName: string;
  lastName: string;
  dni: Dni;
  address?: Address;
  email: Email;
  birthDay: Date;
  fotoPerfil?: string;
  phone?: Phone;
  role: Role;
  userState?: UserState;

  // Si es alumno tiene

  studentState?: StudentState;
  actualCourse?: string; // cuando creemos Curso este sera de tipo Curso
  califications?: Califications[];

  // Si es profesor tiene:

  legajo?: Legajo;
  asignaturas?: string[]; // cuando se desarrolle las stories de asignatura reemplazar

  // Si es tutor tiene

  childrens?: User[],
  tutorDetail?: string
}

export interface Legajo {
  legajo: number;
}

export enum Role {
  PROFESOR = 'PROFESOR',
  ALUMNO = 'ALUMNO',
  ADMINISTRADOR = 'ADMINISTRADOR',
  TUTOR = 'TUTOR',
}

export enum UserState {
  ACTIVO = 'Activo',
  INACTIVO = 'Inactivo',
}

export enum StudentState {
  CURSANDO = 'Cursando',
  MOROSO = 'Moroso',
  EGRESADO = 'Egresado',
  NOINSCRIPTO = 'NoInscripto',
}

export interface Phone {
  phone: string;
}

export interface Address {
  address: string;
  locality: Locality;
}

export interface Locality {
  locality: string;
}

export interface Email {
  email: string;
}

export interface Dni {
  dni: number;
}
