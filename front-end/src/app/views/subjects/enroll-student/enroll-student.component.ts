import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core'; // Asegúrate de implementar OnInit
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Role, User } from '../../../interfaces/user.interface';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-enroll-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './enroll-student.component.html',
  styleUrls: ['./enroll-student.component.css'],
})
export class EnrollStudentComponent implements OnInit {
  private userService = inject(UserService);
  students$ = this.userService.getUsersByRole(Role.ALUMNO);
  unenrolledStudents$!: Observable<User[]>;

  ngOnInit(): void {
    this.unenrolledStudents$ = this.students$.pipe(
      map(students => students!.filter(student => !student.actualCourse)) // Filtra los estudiantes sin curso asignado
    );

    this.unenrolledStudents$.subscribe(unenrolledStudents => {
      console.log("Estudiantes no inscritos:", unenrolledStudents);
    });
  }

  enrollStudentInCourse(student: User) {
    console.log("Inscribiendo estudiante:", student);
  }
}
