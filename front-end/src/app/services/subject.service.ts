import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { SubjectResponse } from '../interfaces/responses.interface';
import { Subject } from '../interfaces/subject.interface';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getSubjectById(id: string): Observable<Subject | null> {
    return this.http.get<SubjectResponse>(`${this.apiUrl}/subjects/${id}`).pipe(
      map((res) => {
        if (res.success) {
          return res.data;
        } else {
          throw new Error(res.message);
        }
      }),
      catchError((err) => {
        return of(err.message);
      })
    );
  }

  saveSubject(subject: Subject): Observable<Subject | null> {
    return this.http.post<SubjectResponse>(`${this.apiUrl}/subjects`, subject).pipe(
      map((res) => {
        if (res.success) {
          return res.data;
        } else {
          throw new Error(res.message);
        }
      }),
      catchError((err) => {
        return of(err.message);
      })
    );
  }

  updateSubject(subject: Subject): Observable<Subject | null> {
    return this.http.put<SubjectResponse>(`${this.apiUrl}/subjects/${subject.id}`, subject).pipe(
      map((res) => {
        if (res.success) {
          return res.data;
        } else {
          throw new Error(res.message);
        }
      }),
      catchError((err) => {
        return of(err.message);
      })
    );
  }

  deleteSubject(id: string): Observable<Subject | null> {
    return this.http.delete<SubjectResponse>(`${this.apiUrl}/subjects/${id}`).pipe(
      map((res) => {
        if (res.success) {
          return res.data;
        } else {
          throw new Error(res.message);
        }
      }),
      catchError((err) => {
        return of(err.message);
      })
    );
  }
}
