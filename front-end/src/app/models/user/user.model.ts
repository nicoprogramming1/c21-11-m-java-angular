import { Dni, Domicilio, Email, EstadoUsuario, Rol, Telefono } from "../../interfaces/user.interface";


export class User {
  public nombre: string;
  public apellido: string;
  public dni: Dni;
  public domicilio: Domicilio;
  public email: Email;
  public fechaNacimiento: Date;
  public fotoPerfil?: string;
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
