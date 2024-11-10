import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { SubjectService } from '../../../services/subject.service';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  @Input() id!: string;
  buttonText: string = 'Eliminar';
  mostrarModal: boolean = false;

  @Output() eliminar = new EventEmitter<void>(); 

  private subjectService = inject(SubjectService)

  abrirConfirmacion() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  confirmarEliminacion() {
    this.subjectService.deleteSubject(this.id.toString()).subscribe({
        next: () => {
            console.log("Asignatura eliminada con éxito");
            this.eliminar.emit(); 
            this.cerrarModal(); 
        },
        error: (error: any) => {
            console.error("Ha ocurrido un error al eliminar la asignatura", error);
        },
        complete: () => {
            console.log("Eliminación completada");
        }
    });
}
}

