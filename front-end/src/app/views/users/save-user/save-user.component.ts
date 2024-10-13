import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-save-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './save-user.component.html',
  styleUrl: './save-user.component.css'
})
export class SaveUserComponent {
  private userService = inject(UserService);
  registerForm!: FormGroup;

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
    if (this.registerForm.valid) {
      const user: User = {
        dni: this.registerForm.value.dni,
        email: this.registerForm.value.email,
        role: this.registerForm.value.rol,
        legajo: this.registerForm.value.legajo,
        lastName: this.registerForm.value.lastName,
        firstName: this.registerForm.value.firstName,
        birthDay: this.registerForm.value.birthDay,
      }

      this.userService.saveUser(user).subscribe(
        response => {
          console.log('User registered successfully', response);
        },
        error => {
          console.error('Error registering user', error);
        }
      );
    }
  }

  resetForm(): void {
    this.registerForm.reset();
  }
}