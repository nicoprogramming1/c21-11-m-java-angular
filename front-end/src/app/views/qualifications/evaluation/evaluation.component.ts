import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EvaluationService } from '../../../services/evaluation.service';

@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  title: string = '';
  evaluationId: number | null = null;
  evaluationForm: FormGroup;
  isEditable: boolean = false;
  showModal: boolean = false;
  showDeleteModal: boolean = false;
  evaluationData: any;

  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private evaluationService = inject(EvaluationService);

  constructor() {
    this.evaluationForm = this.fb.group({
      subject: [{ value: '', disabled: true }],        // Campo para la asignatura deshabilitado
      topics: [{ value: '', disabled: true }],         // Campo para los temas deshabilitado
      evaluationDate: [{ value: '', disabled: true }], // Campo para la fecha de evaluación deshabilitado
      califications: [{ value: [], disabled: true }],  // Campo para las calificaciones deshabilitado
      comments: [{ value: '', disabled: true }]         // Campo para los comentarios deshabilitado
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.evaluationId = +idParam;
        this.loadEvaluationData();
      } else {
        console.error('No se encontró el ID de evaluación.');
      }
    });
  }

  loadEvaluationData() {
    if (this.evaluationId) {
      this.evaluationService.getEvaluationById(this.evaluationId).subscribe(
        data => {
          this.evaluationData = data;
          this.evaluationForm.patchValue({
            subject: data?.subject,
            topics: data?.topics,
            evaluationDate: data?.evaluationDate,
            califications: data?.califications || [],
            comments: data?.comments || ''
          });
        },
        error => {
          console.error('Error al cargar los datos de la evaluación:', error);
        }
      );
    }
  }

  toggleEditMode() {
    this.isEditable = !this.isEditable;

    if (this.isEditable) {
      this.evaluationForm.enable(); // Habilita todos los campos
    } else {
      this.evaluationForm.disable(); // Deshabilita todos los campos
    }
  }

  abrirConfirmacion() {
    this.showModal = true; // Abre el modal de confirmación
  }

  cancelChanges() {
    this.showModal = false; // Cierra el modal
    this.evaluationForm.patchValue(this.evaluationData); // Restablece los datos originales
    this.isEditable = false; // Deshabilita el modo de edición
    this.evaluationForm.disable(); // Deshabilita todos los campos
  }

  confirmChanges() {
    if (this.evaluationForm.valid && this.evaluationId) {
      const updatedData = this.evaluationForm.value;
      this.evaluationService.updateEvaluation(this.evaluationId, updatedData).subscribe(
        () => {
          this.showModal = false; // Cierra el modal
          this.isEditable = false; // Deshabilita el modo de edición
          this.loadEvaluationData(); // Recarga los datos actualizados
        },
        error => {
          console.error('Error al guardar los cambios:', error);
        }
      );
    }
  }



  abrirDeleteModal() {
    this.showDeleteModal = true; 
  }

  cerrarModal() {
    this.showDeleteModal = false; 
  }

  confirmarEliminacion() {
    if (this.evaluationId) {
      this.evaluationService.deleteEvaluationById(this.evaluationId).subscribe(
        () => {
          this.showDeleteModal = false; 
        },
        error => {
          console.error('Error al eliminar la evaluación:', error);
        }
      );
    }
  }
}
