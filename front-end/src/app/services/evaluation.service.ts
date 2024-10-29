import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Evaluation, Observation } from '../interfaces/evaluation.interface';
import { Qualification } from '../interfaces/qualification.interface';
import { EvaluationResponse, EvaluationsResponse, ObservationResponse, QualificationResponse } from '../interfaces/responses.interface';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private http = inject(HttpClient)
  private apiUrl = environment.apiUrl


  saveEvaluation(evaluation: Evaluation): Observable<Evaluation | null>{
    return this.http.post<EvaluationResponse>(`${this.apiUrl}/evaluations`, evaluation).pipe(
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

  saveObservation(observation: Observation): Observable<Observation | null>{
    return this.http.post<ObservationResponse>(`${this.apiUrl}/observations`, observation).pipe(
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

  evaluateStudent(qualification: Qualification, evaluationId: string): Observable<Qualification | null>{
    const payload = { qualification, evaluationId }

    return this.http.post<QualificationResponse>(`${this.apiUrl}/qualifications`, payload).pipe(
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

  // Método para obtener evaluaciones
  getEvaluations(): Observable<Evaluation[]> {
    return this.http.get<EvaluationsResponse>(`${this.apiUrl}/evaluation`).pipe(
      map((res) => {
        if (res.success) {
          return res.data; 
        } else {
          throw new Error(res.message);
        }
      }),
      catchError((err) => {
        console.error(err);
        return of([]); 
      })
    );
  }
    
  
  // Método para obtener una evaluación por su ID (API)
  getEvaluationById(id: number): Observable<Evaluation | null> {
    return this.http.get<EvaluationResponse>(`${this.apiUrl}/evaluations/${id}`).pipe(
        map((res) => {
            if (res.success) {
                return res.data; 
            } else {
                throw new Error(res.message);
            }
        }),
        catchError((err) => {
            console.error(err);
            return of(null); 
        })
    );
}
      // **Método updateEvaluation para la API**

      updateEvaluation(id: number, updatedEvaluation: Evaluation): Observable<Evaluation | null> {
        return this.http.put<EvaluationResponse>(`${this.apiUrl}/evaluations/${id}`, updatedEvaluation).pipe(
          map((res) => {
            if (res.success) {
              return res.data; 
            } else {
              throw new Error(res.message);
            }
          }),
          catchError((err) => {
            console.error(err);
            return of(null);
          })
        );
      }
    

  // Eliminar una evaluación por ID
  deleteEvaluationById(id: number): Observable<boolean> {
    return this.http.delete<{ success: boolean, message: string }>(`${this.apiUrl}/evaluations/${id}`).pipe(
      map((res) => res.success),
      catchError((err) => {
        console.error(err);
        return of(false);
      })
    );
  }


    
}
