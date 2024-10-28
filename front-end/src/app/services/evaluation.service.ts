import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Evaluation, Observation } from '../interfaces/evaluation.interface';
import { Qualification } from '../interfaces/qualification.interface';
import { EvaluationResponse, ObservationResponse, QualificationResponse } from '../interfaces/responses.interface';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private http = inject(HttpClient)
  private apiUrl = environment.apiUrl

  // Datos mock directamente en el servicio
  private MOCK_EVALUATIONS: Evaluation[] = [
    {
      id: 1,
      subject: 'Matemáticas 1',
      evaluationDate: new Date('2024-10-01'),
      topics: 'Álgebra, Geometría',
      califications: [],
      comments: 'Evaluación inicial del trimestre.'
    },
    {
      id: 2,
      subject: 'Matematica 2',
      evaluationDate: new Date('2024-10-10'),
      topics: 'Revolución Francesa, Segunda Guerra Mundial',
      califications: [],
      comments: 'Evaluación sobre los eventos más importantes.'
    },
    {
      id: 3,
      subject: 'Matematica 3',
      evaluationDate: new Date('2024-10-15'),
      topics: 'Células, Genética',
      califications: [],
      comments: 'Evaluación de mitad de trimestre.'
    }
  ];

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

  /* Método para obtener evaluaciones
  getEvaluations(): Observable<Evaluation[]> {
    return this.http.get<EvaluationResponse>(`${this.apiUrl}/evaluation`).pipe(
      map((res) => {
        if (res.success) {
          return res.data; // Asegúrate de que res.data sea un array de Evaluation[]
        } else {
          throw new Error(res.message);
        }
      }),
      catchError((err) => {
        console.error(err); // Log del error para depuración
        return of([]); // Retorna un array vacío en caso de error
      })
    );
  }
    
  
  // Método para obtener una evaluación por su ID (API)
getEvaluationById(id: number): Observable<Evaluation | null> {
    return this.http.get<EvaluationResponse>(`${this.apiUrl}/evaluations/${id}`).pipe(
        map((res) => {
            if (res.success) {
                return res.data; // Asegúrate de que res.data sea un objeto Evaluation
            } else {
                throw new Error(res.message);
            }
        }),
        catchError((err) => {
            console.error(err); // Log del error para depuración
            return of(null); // Retorna null en caso de error
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

      // **Método updateEvaluation para la API**

  updateEvaluation(id: number, updatedEvaluation: Evaluation): Observable<Evaluation | null> {
    return this.http.put<EvaluationResponse>(`${this.apiUrl}/evaluations/${id}`, updatedEvaluation).pipe(
      map((res) => {
        if (res.success) {
          return res.data; // Asegúrate de que res.data es del tipo Evaluation
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

    */



      // Método para obtener evaluaciones (mock)
  getEvaluations(): Observable<Evaluation[]> {
    // Retorna el mock en lugar de una llamada HTTP
    return of(this.MOCK_EVALUATIONS); // Devuelve un observable con los datos mock
  }
  // Método para obtener una evaluación por su ID (mock)
  getEvaluationById(id: number): Observable<Evaluation | null> {
    const evaluation = this.MOCK_EVALUATIONS.find(e => e.id === id);
    return of(evaluation || null); // Devuelve el objeto de evaluación o null si no se encuentra
  }

    // Eliminar una evaluación por ID (mock)
    deleteEvaluationById(id: number): Observable<boolean> {
      const index = this.MOCK_EVALUATIONS.findIndex(e => e.id === id);
      if (index !== -1) {
        this.MOCK_EVALUATIONS.splice(index, 1);
        return of(true);
      }
      return of(false);
    }


  updateEvaluation(id: number, updatedEvaluation: Evaluation): Observable<Evaluation | null> {
    const index = this.MOCK_EVALUATIONS.findIndex(e => e.id === id);
    if (index !== -1) {
      this.MOCK_EVALUATIONS[index] = { ...this.MOCK_EVALUATIONS[index], ...updatedEvaluation };
      return of(this.MOCK_EVALUATIONS[index]);
    }
    return of(null);
  }
}
