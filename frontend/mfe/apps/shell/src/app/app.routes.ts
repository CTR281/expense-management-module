import { Route } from '@angular/router';
import { Dashboard } from './dashboard/dashboard.component';
import { Home } from './dashboard/home/home';
import { PageTitleService } from '@mfe/page-title';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () => import('login/Routes'),
  },
  {
    path: '',
    component: Dashboard,
    providers: [PageTitleService],
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'expenses',
        loadChildren: () =>
          import('expense/Routes'),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
