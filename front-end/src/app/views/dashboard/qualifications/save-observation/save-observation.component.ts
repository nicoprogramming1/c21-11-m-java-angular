import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Role } from '../../../interfaces/user.interface';
import { Observation } from '../../../interfaces/evaluation.interface';
import { EvaluationService } from '../../../services/evaluation.service';

@Component({
  selector: 'app-save-observation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './save-observation.component.html',
  styleUrls: ['./save-observation.component.css'],
})
export class SaveObservationComponent implements OnInit {
  private fb = inject(FormBuilder);
  private evaluationService = inject(EvaluationService);
  private userService = inject(UserService);

  registerForm!: FormGroup;
  modalVisible: boolean = false; // Variable para controlar la visibilidad de la modal
  loggedInTeacherId: string = '1'; // Hardcodeado por ahora

  // Observable para los alumnos
  students$ = this.userService.getUsersByRole(Role.ALUMNO);

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      student: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const observation: Observation = {
        student: this.registerForm.value.student,
        comment: this.registerForm.value.comment,
        observationDate: new Date(), // Fecha actual
        teacher: this.loggedInTeacherId, // Hardcodeado por ahora
      };

      console.log('Onsubmit ID del alumno', observation.student);

      this.evaluationService.saveObservation(observation).subscribe({
        next: (response) => {
          console.log('Observación registrada exitosamente', response);
          this.closeModal(); // Cerrar modal después del éxito
        },
        error: (error) => {
          console.error('Error al registrar observación', error);
        },
        complete: () => {
          this.resetForm(); // Reseteamos el formulario
        },
      });
    }
  }

  resetForm(): void {
    this.registerForm.reset();
  }

  closeModal(): void {
    this.modalVisible = false; // Cierra la modal
  }
}
