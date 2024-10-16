import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./views/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'user/:id',
    title: 'Get user interface',
    loadComponent: () =>
      import('./views/users/user/user.component').then(
        (m) => m.UserComponent
      ),
  },
  {
    path: 'delete/:id',
    title: 'Delete user interface',
    loadComponent: () =>
      import('./views/users/delete/delete.component').then(
        (m) => m.DeleteComponent
      ),
  },
  {
    path: 'post',
    title: 'Post user interface',
    loadComponent: () =>
      import('./views/users/save-user/save-user.component').then(
        (m) => m.SaveUserComponent
      ),
  },
  {
    path: 'postSubject',
    title: 'Post subject interface',
    loadComponent: () =>
      import('./views/subjects/save-subject/save-subject.component').then(
        (m) => m.SaveSubjectComponent
      ),
  },
  {
    path: 'postStudentCourse',
    title: 'Inscribir alumno en curso',
    loadComponent: () =>
      import('./views/subjects/enroll-student/enroll-student.component').then(
        (m) => m.EnrollStudentComponent
      ),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
