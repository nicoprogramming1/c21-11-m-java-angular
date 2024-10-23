import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EvaluationService } from '../../../services/evaluation.service';
import { environment } from '../../../../environments/environment';
import { Evaluation } from '../../../interfaces/evaluation.interface';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from '../../../services/subject.service';
import { Subject } from '../../../interfaces/subject.interface';

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
      const evaluation: Evaluation = {
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

  resetForm(): void {
    this.registerForm.reset();
  }

}
