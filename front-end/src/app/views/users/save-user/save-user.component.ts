import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Role, User } from '../../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser'; // importado a mano

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
    if (this.registerForm.valid) {
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
  }
}
