import { Usuario } from "./usuario.interface";

export interface UsuarioResponse {  // cualquier tipo de usuario individual (get)
    success: boolean,
    message: string,
    data: Usuario
}