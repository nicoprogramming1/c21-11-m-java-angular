import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { UserResponse } from '../interfaces/responses.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private usersKey = 'users'; 

  
  saveUser(user: User): Observable<User | null> {
    return this.http.post<UserResponse>(`${this.apiUrl}/user`, user).pipe(
      map((res) => {
        if (res.success) {
          
          this.storeUserInLocalStorage(user);
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

 
  private storeUserInLocalStorage(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  private getUsers(): User[] {
    const users = localStorage.getItem(this.usersKey);
    return users ? JSON.parse(users) : [];
  }

 
  findUser(dni: number, email: string): User | undefined {
    const users = this.getUsers();
    return users.find(user => user.dni.dni === dni && user.email.toString() === email);
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
}
