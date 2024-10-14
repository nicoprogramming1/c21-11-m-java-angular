import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { log } from 'console';

@Component({
  selector: 'app-save-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './save-user.component.html',
  styleUrl: './save-user.component.css'
})
export class SaveUserComponent implements OnInit {
  private userService = inject(UserService);
  registerForm!: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      dni: ['', [Validators.required, Validators.minLength(10)]],
      role: ['', Validators.required],
      legajo: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    console.log("pasan cosas")
    if (true) {
      console.log("Valido")
      const user: User = {
        dni: this.registerForm.value.dni,
        email: this.registerForm.value.email,
        role: this.registerForm.value.role,
        legajo: this.registerForm.value.legajo,
        lastName: this.registerForm.value.lastName,
        firstName: this.registerForm.value.firstName,
        birthDay: this.registerForm.value.birthday,
      };
      
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