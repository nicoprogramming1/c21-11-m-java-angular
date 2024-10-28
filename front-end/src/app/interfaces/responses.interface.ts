import { Course } from "./course.interface";
import { Evaluation, Observation } from "./evaluation.interface";
import { Qualification } from "./qualification.interface";
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


export interface EvaluationsResponse {
    success: boolean;
    data: Evaluation[];
    message?: string;
}

//INTERFAZ NUEVA Q SERVIRIA PARA TRAER EVALUACION X ID
export interface EvaluationResponse {
    success: boolean;
    data: Evaluation;
    message?: string;
}
export interface ObservationResponse {
    success: boolean,
    message: string,
    data: Observation
}

export interface QualificationResponse {
    success: boolean,
    message: string,
    data: Qualification
}