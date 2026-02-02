import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-expense-shell",
  template: `<router-outlet></router-outlet>`,
  imports: [RouterOutlet],
})
export class ExpenseShell {}
