import { Component, inject } from '@angular/core';
import { LoginService } from './login-service';
import { Observable } from 'rxjs';
import { User } from '@mfe/user';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'mfe-login',
  imports: [AsyncPipe],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  protected readonly loginService = inject(LoginService);

  protected readonly users$: Observable<User[]> = this.loginService.loadUsers();
}
