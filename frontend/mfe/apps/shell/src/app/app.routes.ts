import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () => import('login/Routes'),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
