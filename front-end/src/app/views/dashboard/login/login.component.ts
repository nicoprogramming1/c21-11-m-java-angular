import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  private userService = inject(UserService);
  errorMessage: string | null = null; 

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  onLogin() {
    this.errorMessage = null; 

    if (this.loginForm.valid) {
      const { dni, email } = this.loginForm.value;
      const user = this.userService.findUser(Number(dni), email);

      if (user) {
        console.log('Login exitoso', user);
        this.router.navigate([`/user/${user.dni.dni}`]); 
      } else {
        this.errorMessage = 'Credenciales incorrectas o no registrado';
        console.error(this.errorMessage);
      }
    } else {
      console.log('Formulario no valido');
    }
  }
}
