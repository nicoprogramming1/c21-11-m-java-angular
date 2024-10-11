import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { Alumno } from '../interfaces/alumno.interface';
import { Tutor } from '../interfaces/tutor.interface';
import { Profesor } from '../interfaces/profesor.interface';
import { UsuarioResponse } from '../interfaces/responses.interface';
import { Rol } from '../models/usuario/rol.enum';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = environment.apiUrl
  private http = inject(HttpClient)

  getUsuarioById(id: number): Observable<Alumno | Tutor | Profesor | null> {
    return this.http
    .get<UsuarioResponse>(`${this.apiUrl}/usuario:${id}`)
    .pipe(
      map((res) => {
      if(res.success) {
        const usuario = res.data;
        return this.conocerRol(usuario)
      }
      else {
        throw new Error(res.message)
      }
    }),
    catchError((err) => {
      return of(null)
    })
  )
  }

  conocerRol(usuario: Usuario){ // Dependiendo del rol, devuelves el tipo específico
    switch (usuario.rol) {
      case Rol.ALUMNO:
        return usuario as Alumno; // convierte a Alumno
      case Rol.TUTOR:
        return usuario as Tutor;  // convierte a Tutor
      case Rol.PROFESOR:
        return usuario as Profesor; // convierte a Profesor
      default:
        return null;
    }
  }

  handleError(err: string) {

  }

}
