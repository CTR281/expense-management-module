import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('dashboard/Routes'),
  },
  {
    path: 'login',
    loadChildren: () => import('login/Routes'),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
