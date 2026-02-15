import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { PageTitleService } from "@mfe/page-title";

@Component({
  selector: "mfe-expense-shell",
  template: `<router-outlet></router-outlet>`,
  imports: [RouterOutlet],
  host: {
    class: "flex flex-col min-h-full h-0",
  },
})
export class ExpenseShell {
  constructor() {
    inject(PageTitleService).setPageTitle("My Expenses");
  }
}
