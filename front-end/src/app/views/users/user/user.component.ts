import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserMock, UserService } from '../../../services/user.service';
import { DeleteComponent } from '../delete/delete.component';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [DeleteComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  @Output() userUpdated = new EventEmitter<{ userId: number; updatedUserData: any }>();

  userForm: FormGroup; 
  user!: UserMock | null;//Parte del mock, cuando tengamos el back el tipo de dato que recibe debe cambiar
  isEditable: boolean = false; // Para el estado del botón modificar, que cambia al botón guardar
  showModal: boolean = false;

  // Inyección de servicios
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder); 

  constructor() {
    this.userForm = this.fb.group({
      correo: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      firstname: [{ value: '', disabled: true }, Validators.required],
      lastname: [{ value: '', disabled: true }, Validators.required],
      birth: [{ value: '', disabled: true }, Validators.required],
      dni: [{ value: '', disabled: true }, Validators.required],
      rol: [{ value: '', disabled: true }, Validators.required],
      legajo: [{ value: '', disabled: true }],
      domicilio: [{ value: '', disabled: true }],
      localidad: [{ value: '', disabled: true }],
      telefono: [{ value: '', disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    const userId = '14'; //ESTO ESTA MOCK, PARA QUE RECIBA EL ID DEL PADRE HAY Q PONER UN INPUT:  @Input() userId!: string;
    //Y borrar la constante.
    this.userService.getUserById(userId).subscribe((data) => {
      this.user = data;
      if (this.user) {
        this.userForm.patchValue(this.user); 
      }
    });
  }

  getUserId(): number | null {
    return this.user ? Number(this.user.id) : null; 
  }

  guardarCambios() {
    const userId = this.getUserId();
    const updatedUserData = this.userForm.value;

    if (userId !== null) {
      this.userUpdated.emit({ userId, updatedUserData });
    }
  }

  confirmarModificacion() {
    const userId = this.getUserId(); 
    const updatedUserData = this.userForm.value; 

    if (this.userForm.valid && userId != null) {
      this.userService.updateUser(userId.toString(), updatedUserData).subscribe({
        next: () => {
          console.log('Usuario modificado con éxito');
          this.cerrarModal();
          this.toggleEditMode(); 
        },
        error: (error: any) => {
          console.error('Ha ocurrido un error durante la actualización', error);
        },
        complete: () => {
          console.log('Modificación completada');
        }
      });
    } else {
      console.error('Formulario inválido o no se ha proporcionado un ID de usuario', {
        isValid: this.userForm.valid,
        userId: userId,
      });
    }
  }

  onUserUpdated(event: { userId: number; updatedUserData: any }) {
    console.log('Usuario actualizado:', event.userId, event.updatedUserData);
  }

  onUserDeleted() {
    console.log("Usuario eliminado, realizar acciones necesarias aquí.");
   
  }

  toggleEditMode() {
    this.isEditable = !this.isEditable; 

    if (this.isEditable) {
      this.userForm.enable();  
    } else {
      this.userForm.disable(); 
    }
  }

  abrirConfirmacion() {
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
    this.toggleEditMode(); 
  
     // Restauramos los datos q no se confirmaron(esto me lo dio chatgipiti)
  const userId = this.getUserId();
  if (userId !== null) {
    this.userService.getUserById(userId.toString()).subscribe((data) => {
      this.user = data;
      if (this.user) {
        this.userForm.patchValue(this.user);
      }
    });
  }
  }
}


