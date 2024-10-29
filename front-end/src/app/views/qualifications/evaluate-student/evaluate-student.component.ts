import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Grades, Qualification } from '../../../interfaces/qualification.interface';
import { Role } from '../../../interfaces/user.interface';
import { EvaluationService } from '../../../services/evaluation.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-evaluate-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './evaluate-student.component.html',
  styleUrls: ['./evaluate-student.component.css']
})
export class EvaluateStudentComponent {
  @Input() evaluationId: string = '1'; // le tengo que mandar un id de evaluacion sí o sí, porque los botones estan en el listado

  private fb = inject(FormBuilder);
  private evaluationService = inject(EvaluationService);
  private userService = inject(UserService);

  registerForm!: FormGroup;
  modalVisible: boolean = false; 
  grades = Object.values(Grades);
  students$ = this.userService.getUsersByRole(Role.ALUMNO); 

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      student: ['', Validators.required],
      comment: ['', Validators.required],
      grade: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const qualification: Qualification = {
        student: this.registerForm.value.student,
        comment: this.registerForm.value.comment,
        grade: this.registerForm.value.grade,
      };

      console.log('Onsubmit ID del alumno', qualification.student);

      this.evaluationService.evaluateStudent(qualification, this.evaluationId).subscribe({
        next: (response) => {
          console.log('Calificación registrada exitosamente', response);
          this.closeModal(); // Cierra el modal después del éxito
        },
        error: (error) => {
          console.error('Error al registrar calificación', error);
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
    this.modalVisible = false; // Cierra el modal
  }
}
