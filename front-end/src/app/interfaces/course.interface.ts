import { Subject } from './subject.interface';
import { User } from './user.interface';

export interface Course {
  id: string;
  course: string;
  subjects: Subject[];
  students: User[];
  detalle: string;
}
export interface Califications {
  note: number;
}
