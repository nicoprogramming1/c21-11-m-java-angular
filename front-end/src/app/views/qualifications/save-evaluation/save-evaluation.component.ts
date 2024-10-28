import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Evaluation } from '../../../interfaces/evaluation.interface';
import { Subject } from '../../../interfaces/subject.interface';
import { EvaluationService } from '../../../services/evaluation.service';
import { SubjectService } from '../../../services/subject.service';

@Component({
  selector: 'app-save-evaluation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './save-evaluation.component.html',
  styleUrl: './save-evaluation.component.css'
})
export class SaveEvaluationComponent {
  private fb = inject(FormBuilder)
  private evaluationService = inject(EvaluationService)
  private subjectService = inject(SubjectService)
  private route = inject(ActivatedRoute)

  private subject?: Subject | null
  private subjectId?: string
  public registerForm!: FormGroup
  


  ngOnInit(): void {
    this.subjectId = this.route.snapshot.paramMap.get('subjectId') ?? undefined;
 // Obtener el ID de la ruta
    console.log('El id de la asignatura es: ', this.subjectId);
    if (this.subjectId) {
      this.subjectService.getSubjectById(this.subjectId).subscribe((data) => {
        this.subject = data;
        console.log('La asignatura es: ', this.subject);
      });
    }
    

    this.registerForm = this.fb.group({
      evaluationDate: ['', Validators.required],
      topics: ['', Validators.required],
      comments: [''],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      if (!this.subjectId) {//TUVE Q AGREGAR ESTE IF PQ SINO ME TIRABA ERROR AL NO TENER BACK
        console.error('No se puede registrar la evaluación sin un subjectId.');
        return; 
      }
      const evaluation: Evaluation = {
        id: this.generateId(),//ESTA GENERANDO UN ID PQ NO SABIA COMO LO VAN A TRABAJR DESDE EL BACK
        subject: this.subjectId, 
        evaluationDate: this.registerForm.value.evaluationDate,
        topics: this.registerForm.value.topics,
        comments: this.registerForm.value.comments,
      };


      console.log("Onsubmit id subject", evaluation.subject)

      this.evaluationService.saveEvaluation(evaluation).subscribe({
        next: (response) => {
          console.log('Evaluation registered successfully', response);
        },
        error: (error) => {
          console.error('Error registering evaluation', error.message);
        },
        complete: () => {
          this.resetForm(); // Reseteamos el formulario
        },
      });
    }
  }

  private generateId(): number {//NO CREO QUE LO USEN, ASI Q ME LO DIO FULL CHATGPT, es para que funcione el id de evaluacion
    return Math.floor(Math.random() * 1000); // Genera un ID aleatorio entre 0 y 999
}

  resetForm(): void {
    this.registerForm.reset();
  }

}
