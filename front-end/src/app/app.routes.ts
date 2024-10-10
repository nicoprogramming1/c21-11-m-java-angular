import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    children: [
      {
        path: 'post',
        title: 'Registrar usuario',
        loadComponent: () =>
          import('./dashboard/views/users/post/post.component').then(
            (m) => m.PostComponent
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
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
