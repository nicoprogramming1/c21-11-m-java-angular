import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserMock, UserService } from '../../../services/user.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [DeleteComponent, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {

  //datos mock
  user!: UserMock | null;

  
  // CONSULTAR UN USUARIO
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);


  ngOnInit(): void {
    const userId = '4'; // datos mock
    this.userService.getUserById(userId).subscribe((data) => {
      this.user = data;
    });
  }

  getUserId(): number | null {
    return this.user ? Number(this.user.id) : null; // Devuelve el ID como número o null si no está definido
}
  onUserDeleted() {
    console.log("Usuario eliminado, realizar acciones necesarias aquí.");
    // Aquí puedes realizar cualquier acción adicional que necesites tras la eliminación
}

onRandomButtonClick() {
    console.log("Botón aleatorio clickeado");
    // Aquí puedes implementar la lógica para el botón aleatorio
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
