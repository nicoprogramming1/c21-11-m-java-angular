import { Course } from "./course.interface";
import { Subject } from "./subject.interface";
import { User } from "./user.interface";

export interface UserResponse {  // cualquier tipo de usuario individual (get)
    success: boolean,
    message: string,
    data: User
}

export interface UsersResponse {  // traer usuarios en plural
    success: boolean,
    message: string,
    data: User[]
}

export interface SubjectResponse {  // cualquier tipo de usuario individual (get)
    success: boolean,
    message: string,
    data: Subject
}

export interface EnrollResponse {   // respuesta a inscribir alumno
    success: boolean;
    message: string;
    data: User
}
  
export interface CourseResponse {
    success: boolean,
    message: string,
    data: Course
}