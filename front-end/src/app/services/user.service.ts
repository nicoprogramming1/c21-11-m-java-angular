import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';


export interface UserMock {
  firstname: string;
  lastname:  string;
  birth:     number;
  dni:       number;
  rol:       string;
  legajo:    number;
  domicilio: string;
  localidad: string;
  telefono:  number;
  correo:    string;
  id:        string;
}


@Injectable({
  providedIn: 'root',
})
export class UserService {
  //private apiUrl = environment.apiUrl;
  private apiUrl = "https://6708746d8e86a8d9e42ef52c.mockapi.io/users" //Data mock: cambio UserResponse x UserMock(Observables)
  private http = inject(HttpClient);

  
  
  saveUser(user: UserMock): Observable<UserMock | null> {
    return this.http.post<UserMock>(this.apiUrl, user).pipe(
      map((res) => res),
      catchError((err) => {
        console.error('Error al guardar el usuario:', err);
        return of(null);
      })
    );
  }

  getUserById(id: string): Observable<UserMock | null> {
    return this.http.get<UserMock>(`${this.apiUrl}/${id}`).pipe(
      map((res) => res),
      catchError((err) => {
        console.error('Error al obtener el usuario:', err);
        return of(null);
      })
    );
  }

  deleteUser(id: string): Observable<null> {
    return this.http.delete<null>(`${this.apiUrl}/${id}`).pipe(
      map(() => null),
      catchError((err) => {
        console.error('Error al eliminar el usuario:', err);
        return of(null);
      })
    );
  }
}



  /* FUNCION SAVE USER NO MOCK
  saveUser(user: User): Observable<User | null> {
    return this.http.post<UserResponse>(`${this.apiUrl}/user`, user).pipe(
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

  getUserById(id: number): Observable<User | null> {
    return this.http.get<UserResponse>(`${this.apiUrl}/user:${id}`).pipe(
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

  deleteUser(id: number): Observable<null> {
    return this.http.delete<UserResponse>(`${this.apiUrl}/user:${id}`).pipe(
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
    */


