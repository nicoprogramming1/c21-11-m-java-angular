import { Dni, Address, Email, UserState, Role, Phone } from "../../interfaces/user.interface";


export class User {
  public firstName: string;
  public lastName: string;
  public DNI: Dni;
  public address?: Address;
  public email: Email;
  public date: Date;
  public photoProfile?: string;
  public phone?: Phone;
  public Role: Role;
  public userState?: UserState;
  public legojo?: string;

  constructor(
    firstName: string,
    lastName: string,
    DNI: Dni,
    address: Address,
    email: Email,
    date: Date,
    photoProfile: string,
    phone: Phone,
    Role: Role,
    userState: UserState,
    legojo: string
  ) {
    
    this.firstName = firstName;
    this.lastName = lastName;
    this.DNI = DNI;
    this.address = address;
    this.email = email;
    this.date = date;
    this.photoProfile = photoProfile;
    this.phone = phone;
    this.Role = Role;
    this.userState = userState;
    this.legojo = legojo;
  }

}
