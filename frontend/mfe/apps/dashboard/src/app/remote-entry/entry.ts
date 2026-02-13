import { Component } from '@angular/core';
import { NxWelcome } from './nx-welcome';

@Component({
  imports: [NxWelcome],
  selector: 'mfe-dashboard-entry',
  template: `<mfe-nx-welcome></mfe-nx-welcome>`,
})
export class RemoteEntry {}
