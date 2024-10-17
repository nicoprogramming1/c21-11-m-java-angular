import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core'; 
import { UserService } from '../../../services/user.service';
import { Role, User } from '../../../interfaces/user.interface';
import { map, Observable } from 'rxjs';
import { CourseService } from '../../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enroll-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enroll-student.component.html',
  styleUrls: ['./enroll-student.component.css'],
})
export class EnrollStudentComponent implements OnInit {
  private userService = inject(UserService);
  private courseService = inject(CourseService);
  private route = inject(ActivatedRoute);

  students$ = this.userService.getUsersByRole(Role.ALUMNO);
  unenrolledStudents$!: Observable<User[]>;
  filteredStudents: User[] = [];  // Lista de estudiantes filtrados
  searchTerm: string = '';  // Término de búsqueda
  courseId!: string;

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id') as string;

    console.log("El id del curso es: ", this.courseId);

    this.unenrolledStudents$ = this.students$.pipe(
      map(students => students!.filter(student => !student.actualCourse))
    );

    // Inicializa la lista de estudiantes no inscritos y filtrados
    this.unenrolledStudents$.subscribe(students => {
      this.filteredStudents = students;
    });
  }

  // Método de búsqueda
  searchStudents(): void {
    this.unenrolledStudents$.subscribe(students => {
      this.filteredStudents = students.filter(student =>
        student.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.dni.toString().includes(this.searchTerm)
      );
    });
  }

  // Limpiar filtros
  clearFilters(): void {
    this.searchTerm = '';  // Reinicia el término de búsqueda
    this.unenrolledStudents$.subscribe(students => {
      this.filteredStudents = students;  // Muestra todos los estudiantes nuevamente
    });
  }

  enrollStudentInCourse(idStudent: string) {
    this.courseService.enrollStudentInCourse(idStudent, this.courseId).subscribe({
      next: (response) => {
        console.log('Alumno inscripto con éxito', response);
      },
      error: (error) => {
        console.error('Error inscribiendo alumno', error);
      },
    });
  }
}
