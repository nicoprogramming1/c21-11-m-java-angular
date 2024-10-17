import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { EnrollResponse } from '../interfaces/responses.interface';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  enrollStudentInCourse(idStudent: string, idCourse: string): Observable<EnrollResponse | null> {
    const payload = { idStudent, idCourse };
    
    return this.http.post<EnrollResponse>(`${this.apiUrl}/courses/enroll`, payload).pipe(
      map((res) => {
        if (res.success) {
          return res; // Se devuelve el objeto EnrollResponse
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
