import { Qualification } from "./qualification.interface";
import { Subject } from "./subject.interface";
import { User } from "./user.interface";

export interface Evaluation {
    id: number;
    subject: Subject["id"],
    evaluationDate: Date,
    topics: string,
    califications?: Qualification[],
    comments?: string
}

export interface Observation {
    student: User,
    teacher: User | string, // el string es solo para pruebas deberia ser solo User
    observationDate: Date,
    comment: string
}