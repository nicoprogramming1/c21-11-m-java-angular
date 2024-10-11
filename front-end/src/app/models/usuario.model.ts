import { Dni } from '../interfaces/usuario/dni.interface';
import { Domicilio } from '../interfaces/usuario/domicilio.interface';
import { Email } from '../interfaces/usuario/email.interface';
import { Telefono } from '../interfaces/usuario/telefono.model';
import { EstadoUsuario } from './estadoUsuario.enum';
import { Rol } from './rol.enum';

export class Usuario {
  public nombre: string;
  public apellido: string;
  public dni: Dni;
  public domicilio: Domicilio;
  public email: Email;
  public fechaNacimiento: Date;
  public fotoPerfil: string;
  public telefono: Telefono;
  public rol: Rol;
  public estadoUsuario: EstadoUsuario;

  constructor(
    nombre: string,
    apellido: string,
    dni: Dni,
    domicilio: Domicilio,
    email: Email,
    fechaNacimiento: Date,
    fotoPerfil: string,
    telefono: Telefono,
    rol: Rol,
    estadoUsuario: EstadoUsuario
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.domicilio = domicilio;
    this.email = email;
    this.fechaNacimiento = fechaNacimiento;
    this.fotoPerfil = fotoPerfil;
    this.telefono = telefono;
    this.rol = rol;
    this.estadoUsuario = estadoUsuario;
  }
}
