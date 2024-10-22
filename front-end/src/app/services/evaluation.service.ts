import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Evaluation, Observation } from '../interfaces/evaluation.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { EvaluationResponse, ObservationResponse, QualificationResponse } from '../interfaces/responses.interface';
import { Qualification } from '../interfaces/qualification.interface';

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
}
