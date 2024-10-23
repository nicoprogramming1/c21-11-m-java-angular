import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DeleteComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Output() userUpdated = new EventEmitter<{ userId: number; updatedUserData: any }>();

  userForm: FormGroup;
  user!: User | null; 
  isEditable: boolean = false;
  showModal: boolean = false;

  // Inyección de servicios
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder); 

  constructor() {

    this.userForm = this.fb.group({
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      firstName: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      birthDay: [{ value: '', disabled: true }, Validators.required], 
      dni: [{ value: '', disabled: true }, Validators.required],
      address: this.fb.group({
        address: [{ value: '', disabled: true }],
        locality: [{ value: '', disabled: true }]
      }),
      phone: this.fb.group({
        phone: [{ value: '', disabled: true }, Validators.required]
      }),
      role: [{ value: '', disabled: true }, Validators.required],
      legajo: [{ value: '', disabled: true }],
      actualCourse: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        const userId = params.get('id');
        if (userId) {
            const userIdNumber = Number(userId); 
            this.userService.getUserById(userIdNumber).subscribe({
                next: (user: User | null) => { 
                    if (user) {
                        this.user = user; 
                        this.userForm.patchValue({
                            correo: this.user.email.email,
                            firstname: this.user.firstName,
                            lastname: this.user.lastName,
                            birth: this.user.birthDay,
                            dni: this.user.dni.dni,
                            rol: this.user.role,
                            legajo: this.user.legajo ? this.user.legajo.legajo : '',
                            domicilio: this.user.address ? this.user.address.address : '',
                            localidad: this.user.address ? this.user.address.locality.locality : '',
                            telefono: this.user.phone ? this.user.phone.phone : '',
                        });
                    } else {
                        console.error('Usuario no encontrado.');
                    }
                },
                error: (err) => {
                    console.error('Error al obtener el usuario:', err);
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

  getUserId(): number {
    return this.user && this.user.id ? Number(this.user.id) : 0; 
}

  confirmarModificacion() {
    this.userForm.markAllAsTouched();
  
    const userId = this.getUserId(); 
    const updatedUserData: User = this.userForm.value; 
  
    if (this.userForm.valid && userId != null) {
      this.userService.updateUser(userId.toString(), updatedUserData).subscribe({
        next: (data: User | null) => { 
          if (data) { 
            console.log('Usuario modificado con éxito:', data);
            this.cerrarModal();
            this.toggleEditMode();
            this.userUpdated.emit({ userId: userId, updatedUserData });
          } else {
            console.error('No se pudo modificar el usuario: El usuario es nulo');
          }
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
    console.log("Usuario eliminado con éxito (Hacer modal)");
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
  
    
    const userId = this.getUserId();
    if (userId !== null) {
      this.userService.getUserById(userId).subscribe((data: User | null) => { 
        if (data) { 
          this.user = data; 
          this.userForm.patchValue(this.user); 
        } else {
          console.error('No se encontró el usuario'); 
        }
      }, (error) => {
        console.error('Error al recuperar el usuario:', error); 
      });
    }
  }
}