import { Component } from '@angular/core';
import { ExpenseShell } from '../expense-shell';

@Component({
  imports: [ExpenseShell],
  selector: 'mfe-expense-entry',
  template: `<mfe-expense-shell></mfe-expense-shell>`,
})
export class RemoteEntry {}
