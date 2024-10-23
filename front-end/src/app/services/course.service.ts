import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { CourseResponse, EnrollResponse } from '../interfaces/responses.interface';
import { Course } from '../interfaces/course.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getCourseById(id: string): Observable<Course> {
    return this.http.get<CourseResponse>(`${this.apiUrl}/courses/${id}`).pipe(
      map((res) => {
        if (res.success) {
          return res.data; // Devolver solo el curso que está en el campo 'data'
        } else {
          throw new Error(res.message);
        }
      }),
      catchError((err) => {
        console.error('Error al recuperar el curso:', err);
        return of(err.message);
      })
    );
}


  enrollStudentInCourse(idStudent: string, idCourse: string): Observable<User | null> {
    const payload = { idStudent, idCourse };
    
    return this.http.post<EnrollResponse>(`${this.apiUrl}/courses/enroll`, payload).pipe(
      map((res) => {
        if (res.success) {
          return res.data;
        } else {
          throw new Error(res.message);
        }
      }),
      catchError((err) => {
        console.error('Error al inscribir alumno:', err);
        return of(null);
      })
    );
  }
}
