import { Routes } from '@angular/router';
import { Login } from '../login';
import { LoginService } from '../login-service';
import { loginGuard } from '../login-guard';

export default [
  {
    path: '',
    component: Login,
    providers: [LoginService],
    canActivate: [loginGuard],
  },
] satisfies Routes;
