import { User } from "./user.interface";

export interface UserResponse {  // cualquier tipo de usuario individual (get)
    success: boolean,
    message: string,
    data: User
}