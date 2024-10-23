import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { DeleteComponent } from '../delete/delete.component';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [DeleteComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],  // CORREGIDO styleUrls
})
export class UserComponent implements OnInit {
  @Output() userUpdated = new EventEmitter<{ userId: number; updatedUserData: any }>();

  userForm: FormGroup; 
  user!: UserMock | null;  // Parte del mock, cuando tengamos el back el tipo de dato que recibe debe cambiar
  isEditable: boolean = false;  // Para el estado del botón modificar, que cambia al botón guardar
  showModal: boolean = false;

  // Inyección de servicios
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder); 

  constructor() {
    // Inicializar el formulario reactivo con campos deshabilitados
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
    // Suscribirnos a los parámetros de la URL para obtener el ID del usuario
    this.route.paramMap.subscribe(params => {
      const userId = params.get('id');
      if (userId) {
        this.userService.getUserById(userId).subscribe((data) => {
          this.user = data;
          if (this.user) {
            this.userForm.patchValue(this.user);  // Parchar el formulario con los datos del usuario
          }
        });
      } else {
        console.error('No se ha proporcionado un ID de usuario válido.');
      }
    });
  }

  getCorreo() {
    return this.userForm.get('correo');
  }


  getFirstname() {
    return this.userForm.get('firstname');
  }

  getLastname() {
    return this.userForm.get('lastname');
  }

  getBirth() {
    return this.userForm.get('birth');
  }

  getDni() {
    return this.userForm.get('dni');
  }

  getRol() {
    return this.userForm.get('rol');
  }

  getLegajo() {
    return this.userForm.get('legajo');
  }

  getDomicilio() {
    return this.userForm.get('domicilio');
  }

  getLocalidad() {
    return this.userForm.get('localidad');
  }

  getTelefono() {
    return this.userForm.get('telefono');
  }

  getUserId(): number | null {
    return this.user ? Number(this.user.id) : null; 
  }

  confirmarModificacion() {
    // Marcar todos los campos del formulario como tocados para activar las validaciones
    this.userForm.markAllAsTouched();

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
    console.log("Usuario eliminado con éxito(Hacer modal)");
  }

  toggleEditMode() {
    this.isEditable = !this.isEditable; 

    if (this.isEditable) {
      this.userForm.enable();  // Habilitar el formulario cuando esté en modo edición
    } else {
      this.userForm.disable(); // Deshabilitar el formulario cuando no esté en modo edición
    }
  }

  abrirConfirmacion() {
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
    this.toggleEditMode();  // Salir del modo de edición si se cierra el modal

    // Restaurar los datos no confirmados
    const userId = this.getUserId();
    if (userId !== null) {
      this.userService.getUserById(userId.toString()).subscribe((data) => {
        this.user = data;
        if (this.user) {
          this.userForm.patchValue(this.user);  // Restaurar el formulario con los valores originales
        }
      });
    }
  }
}
