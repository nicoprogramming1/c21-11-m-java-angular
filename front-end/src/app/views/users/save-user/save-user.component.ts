import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../models/user/user.model';
import { UserService } from '../../../services/user.service';

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
  


