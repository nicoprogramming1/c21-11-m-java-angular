import { EstadoUsuario } from '../models/usuario/estadoUsuario.enum';
import { Rol } from '../models/usuario/rol.enum';

export interface Usuario {
  nombre: string;
  apellido: string;
  dni: Dni;
  domicilio: Domicilio;
  email: Email;
  fechaNacimiento: Date;
  fotoPerfil: string;
  telefono: Telefono;
  rol: Rol;
  estadoUsuario: EstadoUsuario;
}

export interface Telefono {
  telefono: string
}

export interface Domicilio {
    domicilio: string,
    localidad: Localidad
}

export interface Localidad {
  localidad: string
}

export interface Email {
  email: string
}

export interface Dni {
  dni: number;
}