import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { UserResponse, UsersResponse } from '../interfaces/responses.interface';
import { Role, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

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
        return of(null);
      })
    );
  }

  getUsersByRole(role: Role): Observable<User[] | null> {
    return this.http.get<UsersResponse>(`${this.apiUrl}/users/role/${role}`).pipe(
      map((res) => {
        if (res.success) {
          return res.data;
        } else {
          throw new Error(res.message);
        }
      }),
      catchError((err) => {
        console.error('Error al obtener usuarios:', err); // Loguea el error para que sea visible
        return of(null); // Sigue devolviendo null pero ahora puedes ver el error
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
}
