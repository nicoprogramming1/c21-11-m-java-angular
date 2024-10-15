import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  userForm: FormGroup; 
  user!: UserMock | null;

  // Inyección de servicios
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder); 

  constructor() {
    this.userForm = this.fb.group({
      correo: [''],
      firstname: [''],
      lastname: [''],
      birth: [''],
      dni: [''],
      rol: [''],
      legajo: [''],
      domicilio: [''],
      localidad: [''],
      telefono: [''],
    });
  }

  ngOnInit(): void {
    const userId = '5'; 
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

  onUserDeleted() {
    console.log("Usuario eliminado, realizar acciones necesarias aquí.");
    
  }

  onRandomButtonClick() {
    console.log("Botón aleatorio clickeado");
    
  }

  /* public product = this.stateService.product;
  public loading = this.stateService.loading;
  public error = this.stateService.error; 

  ngOnInit() {
    setTimeout(() => {
      this.route.params
        .pipe(switchMap(({ id }) => this.userService.getUserById(id)))
        .subscribe();
    }, 2000);
  }*/
}
