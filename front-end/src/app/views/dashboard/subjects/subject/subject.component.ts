import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from '../../../interfaces/subject.interface';
import { SubjectService } from '../../../services/subject.service';
import { DeleteComponent } from '../delete/delete.component';


@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DeleteComponent],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})

export class SubjectComponent implements OnInit {
  title: string = "Nombre de la Asignatura";
  subjectForm: FormGroup;
  subject!: Subject | null;
  isEditable = false;
  showModal = false;

  // Inyección de dependencias
  private subjectService = inject(SubjectService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  private previousSubjectData!: Subject;

  constructor() {
    this.subjectForm = this.fb.group({
      name: [{ value: '', disabled: true }, Validators.required],
      topics: [{ value: '', disabled: true }],
      description: [{ value: '', disabled: true }],
      schedule: [{ value: '', disabled: true }],
      days: [{ value: '', disabled: true }],
      teacher: [{ value: '', disabled: true }],
      evaluations: [{ value: [], disabled: true }], 
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const subjectId = params.get('id');
      if (subjectId) {
        this.subjectService.getSubjectById(subjectId).subscribe({
          next: (subject: Subject | null) => {
            if (subject) {
              this.subject = subject;
             // this.title = subject.name; CUANDO DEJE DE ESTAR HARDCODEADO EL NOMBRE DESCOMENTAR
              this.previousSubjectData = { ...subject };
              this.subjectForm.patchValue({
                name: this.subject.name,
                topics: this.subject.topics,
                description: this.subject.description,
                schedule: this.subject.schedule,
                days: this.subject.days,
                teacher: this.subject.teacher,
                evaluations: this.subject.evaluations,
              });
            } else {
              console.error('Asignatura no encontrada.');
            }
          },
          error: (err) => {
            console.error('Error al obtener la asignatura:', err);
          }
        });
      } else {
        console.error('No se ha proporcionado un ID de asignatura válido.');
      }
    });
  }

  toggleEditMode() {
    this.isEditable = !this.isEditable;

    if (this.isEditable) {
      this.subjectForm.enable();
    } else {
      this.subjectForm.disable();
    }
  }

  abrirConfirmacion() {
    this.showModal = true; 
  }

  confirmChanges() {
    if (this.subjectForm.valid) {
      const updatedSubject: Subject = {
        ...this.subject!,
        ...this.subjectForm.value,
      };

      this.subjectService.updateSubject(updatedSubject).subscribe({
        next: () => {
          console.log('Asignatura actualizada con éxito');
          this.previousSubjectData = { ...updatedSubject }; 
          this.toggleEditMode(); 
          this.showModal = false; 
        },
        error: (err) => {
          console.error('Error al actualizar la asignatura:', err);
        },
      });
    } else {
      console.error('Formulario no válido');
    }
  }

  cancelChanges() {
    this.showModal = false; 
    this.toggleEditMode(); 
    if (this.previousSubjectData) {
      this.subjectForm.patchValue({ ...this.previousSubjectData });
    }
  }

  onSubjectDeleted() {
    if (!this.subject) {
      return; 
    }
    const subjectId = this.subject.id;
    if (subjectId) {
      this.subjectService.deleteSubject(subjectId).subscribe({
        next: () => {
          console.log(`Asignatura con ID ${subjectId} eliminada`);
        },
        error: (err) => {
          console.error('Error al eliminar la asignatura:', err);
        }
      });
    } else {
      console.error('No se puede eliminar la asignatura: ID es null o undefined');
    }
  }
  
}