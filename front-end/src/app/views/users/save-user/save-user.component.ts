import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role } from '../../../interfaces/user.interface';
import { User } from '../../../models/user/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-save-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './save-user.component.html',
  styleUrl: './save-user.component.css',
})
export class SaveUserComponent {
  roles = Object.values(Role); // Obtener los valores del enum de roles
  title: string = 'Registrar nuevo usuario';
  private userService = inject(UserService);
  private fb = inject(FormBuilder);

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDay: ['', Validators.required],
      dni: ['', Validators.required],
      role: ['', Validators.required],
      legajo: [''],
    });
}


  onSubmit(): void {
    console.log("pasan cosas")
    if (true) {
      console.log("Valido")
      const user: User = {
        dni: { dni: Number(this.registerForm.value.dni) },
        email: this.registerForm.value.email,
        role: this.registerForm.value.role,
        legajo: this.registerForm.value.legajo,
        lastName: this.registerForm.value.lastName,
        firstName: this.registerForm.value.firstName,
        birthDay: this.registerForm.value.birthDay,
      };

      this.userService.saveUser(user).subscribe({
        next: (response) => {
          console.log('Subject registered successfully', response);
        },
        error: (error) => {
          console.error('Error registering subject', error);
        },
      });
    }
  }

  resetForm(): void {
    this.registerForm.reset();
    this.message = '';
  }
}
