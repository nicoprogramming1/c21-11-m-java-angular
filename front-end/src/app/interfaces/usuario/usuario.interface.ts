import { EstadoUsuario } from '../../models/estadoUsuario.enum';
import { Rol } from '../../models/rol.enum';
import { Dni } from './dni.interface';
import { Domicilio } from './domicilio.interface';
import { Email } from './email.interface';
import { Telefono } from './telefono.model';

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
