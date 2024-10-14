import { Dni, Address, Email, UserState, Role, Phone } from "../../interfaces/user.interface";


export class User {
  public nombre: string;
  public apellido: string;
  public dni: Dni;
  public domicilio: Address;
  public email: Email;
  public fechaNacimiento: Date;
  public fotoPerfil?: string;
  public telefono: Phone;
  public rol: Role;
  public estadoUsuario: UserState;

  constructor(
    nombre: string,
    apellido: string,
    dni: Dni,
    domicilio: Address,
    email: Email,
    fechaNacimiento: Date,
    fotoPerfil: string,
    telefono: Phone,
    rol: Role,
    estadoUsuario: UserState
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
