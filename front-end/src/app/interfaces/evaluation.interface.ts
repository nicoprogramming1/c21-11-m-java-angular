import { Qualification } from "./qualification.interface";
import { Subject } from "./subject.interface";

export interface Evaluation {
    subject: Subject["id"],
    evaluationDate: Date,
    topics: string,
    califications?: Qualification[],
    comments?: string
}