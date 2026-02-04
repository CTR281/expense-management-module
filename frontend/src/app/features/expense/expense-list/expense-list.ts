import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ExpenseService } from "../expense-service";
import { ExpenseCard } from "./expense-card/expense-card";
import { ExpenseFilters } from "./expense-filters/expense-filters";
import { ExpensePagination } from "./expense-pagination/expense-pagination";

@Component({
  selector: "app-expense-list",
  imports: [RouterLink, ExpenseCard, ExpenseFilters, ExpensePagination],
  templateUrl: "./expense-list.html",
  styleUrl: "./expense-list.css",
  host: {
    class: "flex flex-col h-full",
  },
})
export class ExpenseList {
  private readonly expenseService = inject(ExpenseService);

  readonly expensesState = this.expenseService.expenseViewState;
  readonly categoriesState = this.expenseService.categoriesState;
}
