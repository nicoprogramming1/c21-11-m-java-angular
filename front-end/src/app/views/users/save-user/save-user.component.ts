/* import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

import { CommonModule } from '@angular/common';

import { User } from '../../../models/user/user.model';

@Component({
  selector: 'app-save-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './save-user.component.html',
  styleUrl: './save-user.component.css'
})
export class SaveUserComponent implements OnInit {
  private userService = inject(UserService);
  private fb = inject(FormBuilder)

  registerForm!: FormGroup;
  message: string = '';
  private fb = inject(FormBuilder)
  showSuccessMessage: boolean = false;

  

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: [''],
      firstName: [''],
      lastName: [''],
      birthDay: [''],
      dni: [''],
      role: [''],
      legajo: ['']
    });
}


  onSubmit(): void {
    console.log("pasan cosas")
    if (true) {
      console.log("Valido")
      const user: User = {
        DNI: this.registerForm.value.dni,
        email: this.registerForm.value.email,
       Role: this.registerForm.value.role,
        legojo: this.registerForm.value.legajo,
        lastName: this.registerForm.value.lastName,
        firstName: this.registerForm.value.firstName,
        date: this.registerForm.value.birthday,
      };
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
      
      // Save to localStorage
      this.saveToLocalStorage(user);
      
      // Save to service
      this.userService.saveUser(user).subscribe(
        response => {
          console.log('User registered successfully', response);
          this.message = 'Usuario registrado con éxito';
          this.resetForm();
        },
        error => {
          console.error('Error registering user', error);
          this.message = 'Error al registrar usuario';
        }
      );
    } else {
      this.message = 'Por favor, complete todos los campos correctamente';
    }
  }

  saveToLocalStorage(user: User): void {
    console.log("Funciona");
    let users: User[] = [];
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      users = JSON.parse(storedUsers);
    }
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  resetForm(): void {
    this.registerForm.reset();
    this.message = '';
  }
} 
  


<div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl mx-auto" >
    <div class="flex items-center mb-6 place-content-center">
        
        <h1 class="text-2xl font-bold text-custom-purple">Registrar Usuario</h1>
    </div>
    <p class="text-custom-pink text-sm mb-6 text-center">Los campos marcados con * son obligatorios</p>
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <div class="mb-4">
            <label for="email" class="block text-custom-purple text-sm font-medium mb-2">Correo electrónico*</label>
            <input type="email" id="email" name="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-purple" formControlName = "email">
            @if (registerForm.get('email')?.invalid && (registerForm.get('email')?.dirty || registerForm.get('email')?.touched)) {
                <p class="text-custom-pink font-medium text-base">Correo electrónico introducido incorrecto</p>

            }
        </div>
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
                <label for="firstName" class="block text-custom-purple text-sm font-medium mb-2">Nombre/s*</label>
                <input type="text" id="firstName" name="firstName" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-purple" formControlName="firstName">
            </div>
            <div>
                <label for="lastName" class="block text-custom-purple text-sm font-medium mb-2">Apellido/s*</label>
                <input type="text" id="lastName" name="lastName" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-purple" formControlName = "lastName">
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
                <label for="birthDay" class="block text-custom-purple text-sm font-medium mb-2">Fecha de nacimiento*</label>
                <input type="date" id="birthDay" name="birthDay" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-purple" formControlName ="birthDay">
            </div>
            <div>
                <label for="dni" class="block text-custom-purple text-sm font-medium mb-2">DNI*</label>
                <input type="number" id="dni" name="dni" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-purple" formControlName = "dni">
                @if (registerForm.get('dni')?.invalid && (registerForm.get('dni')?.dirty || registerForm.get('dni')?.touched)) {
                    <p class="text-custom-pink font-medium text-base">DNI introducido incorrecto</p>
    
                }
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
                <label for="role" class="block text-custom-purple text-sm font-medium mb-2">Rol*</label>
                <select id="role" name="role" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-purple" formControlName ="role">
                    <option value="">Seleccionar rol</option>
                    <option value="Estudiante">Estudiante</option>
                    <option value="Profesor">Profesor</option>
                </select>
            </div>
            @if(registerForm.get('role')?.value === 'Profesor'){
            <div>
                <label for="legajo" class="block text-custom-purple text-sm font-medium mb-2">Legajo (solo Rol de Profesor)</label>

                <input type="text" id="legajo" name="legajo" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-purple" formControlName = "legajo">

                @if (registerForm.get('legajo')?.invalid && (registerForm.get('legajo')?.dirty || registerForm.get('legajo')?.touched)) {
                    
                    <p class="text-custom-pink font-medium text-base">Legajo introducido incorrecto</p>
    
                }
            </div> }
        </div>
        <button type="submit" class="w-full bg-custom-green text-black font-medium py-2 px-4 rounded-md mb-4 hover:bg-opacity-90 transition duration-300">
            Registrar usuario
        </button>
        <button type="reset" class="w-full bg-custom-gray text-black font-light py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300" >
            Reestablecer usuario
        </button >
    </form>
    @if(showSuccessMessage){


        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
            <div class="bg-white rounded-lg p-6 w-80 h-64 flex flex-col items-center ">
              <div class=" rounded-full p-2 mb-4">
                <img src="garrapata.png" alt="" class="h-16">
                 
              </div>
              <p class="text-center mb-4">Usuario registrado con éxito</p>
              <button
                
                class="bg-custom-green text-black px-6 py-2 rounded-md hover:bg-custom-green transition-colors   w-44 font-Inter"
                        >
                Listo
              </button>
            </div>
          </div>
    }
   
</div>*/