import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./views/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    children: [
      {
        path: 'List',
        title: 'Post user interface',
        loadComponent: () =>
          import('./views/list-user/list-user.component').then(
            (m) => m.ListUserComponent
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
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'dashboard-teacher',
    title: 'Teacher Dashboard',
    loadComponent: () =>
      import('./views/dashboard-teacher/dashboard-teacher.component').then(
        (m) => m.DashboardTeacherComponent
      ),
  },
  {
    path: 'evaluation/:id', 
    title: 'Evaluations interface',
    loadComponent: () =>
        import('./views/qualifications/evaluation/evaluation.component').then(
            (m) => m.EvaluationComponent
        ),
},
  {
    path: 'user/:id',
    title: 'Get user interface',
    loadComponent: () =>
      import('./views/users/user/user.component').then((m) => m.UserComponent),
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
    path: 'login',
    title: 'Iniciar Sesion',
    loadComponent: () =>
      import('./views/login/login.component').then((m) => m.LoginComponent),
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
    path: 'subject/:id',
    title: 'Subject interface',
    loadComponent: () =>
      import('./views/subjects/subject/subject.component').then(
        (m) => m.SubjectComponent
      ),
  },
  {
    path: 'enrollStudent/:id',
    title: 'Inscribir alumno en curso',
    loadComponent: () =>
      import('./views/courses/enroll-student/enroll-student.component').then(
        (m) => m.EnrollStudentComponent
      ),
  },
  {
    path: 'courses/:id',
    title: 'Consultar curso',
    loadComponent: () =>
      import('./views/courses/course/course.component').then(
        (m) => m.CourseComponent
      ),
  },
  {
    path: 'postEvaluation/:subjectId',
    title: 'Post evaluation interface',
    loadComponent: () =>
      import(
        './views/qualifications/save-evaluation/save-evaluation.component'
      ).then((m) => m.SaveEvaluationComponent),
  },
  {
    path: 'postObservation',
    title: 'Post observation interface',
    loadComponent: () =>
      import(
        './views/qualifications/save-observation/save-observation.component'
      ).then((m) => m.SaveObservationComponent),
  },
  {
    path: 'evaluateStudent',
    title: 'Evaluate student interface',
    loadComponent: () =>
      import(
        './views/qualifications/evaluate-student/evaluate-student.component'
      ).then((m) => m.EvaluateStudentComponent),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
