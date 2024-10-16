import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubjectService } from '../../../services/subject.service';
import { UserService } from '../../../services/user.service';
import { Role } from '../../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { Subject, WeekDays } from '../../../interfaces/subject.interface';

@Component({
  selector: 'app-save-subject',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './save-subject.component.html',
  styleUrl: './save-subject.component.css',
})
export class SaveSubjectComponent {
  private fb = inject(FormBuilder);
  private subjectService = inject(SubjectService);
  private userService = inject(UserService);

  registerForm!: FormGroup;
  days = Object.values(WeekDays);
  selectedDays: string[] = []

  // Observable para los profesores
  teachers$ = this.userService.getUsersByRole(Role.PROFESOR);
  

  ngOnInit(): void {
    this.teachers$.subscribe((teachers) => {
      console.log('Profesores recibidos en el cliente:', teachers);
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      topics: [''],
      description: [''],
      schedule: ['', Validators.required],
      days: [[], Validators.required],
      teacher: ['', Validators.required],
    });
  }

  // Método para manejar los cambios de las checkboxes
  onCheckboxChange(event: any) {
    const day = event.target.value;
    if (event.target.checked) {
      this.selectedDays.push(day);  // dia seleccionado
    } else {
      this.selectedDays = this.selectedDays.filter(d => d !== day); // deseleccionar dia
    }
    this.registerForm.controls['days'].setValue(this.selectedDays);
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const subject: Subject = {
        name: this.registerForm.value.name,
        topics: this.registerForm.value.topics,
        description: this.registerForm.value.description,
        schedule: this.registerForm.value.schedule,
        days: this.registerForm.value.days,
        teacher: this.registerForm.value.teacher, // tiene el id de teacher
      };

      console.log("Onsubmit id teacher", subject.teacher)

      this.subjectService.saveSubject(subject).subscribe({
        next: (response) => {
          console.log('Subject registered successfully', response);
        },
        error: (error) => {
          console.error('Error registering subject', error);
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
