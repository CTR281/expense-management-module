import { Component } from '@angular/core';
import { Login } from '../login';

@Component({
  imports: [Login],
  selector: 'mfe-login-entry',
  template: `<mfe-login></mfe-login>`,
})
export class RemoteEntry {}
