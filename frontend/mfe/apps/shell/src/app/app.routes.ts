import { Route } from '@angular/router';
import { Dashboard } from './dashboard/dashboard.component';
import { Home } from './dashboard/home/home';
import { PageTitleService } from '../../../../libs/core/page-title/src/lib/page-title/page-title.service';

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
