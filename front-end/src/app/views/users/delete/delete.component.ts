import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  @Input() id!: number;
  buttonText: string = 'Eliminar';
  mostrarModal: boolean = false;

  @Output() eliminar = new EventEmitter<void>(); 

  private userService = inject(UserService) // Esta forma es mas actual y es buena práctica

  abrirConfirmacion() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  confirmarEliminacion() {
    this.userService.deleteUser(this.id).subscribe({
      next: () => {
        console.log("Usuario eliminado con éxito");
        this.eliminar.emit();
        this.cerrarModal();
      },
      error: (error: any) => {
        console.error("Ha ocurrido un error", error);
      },
      complete: () => {
        console.log("Eliminación completada");
      }
    });
  }
}
