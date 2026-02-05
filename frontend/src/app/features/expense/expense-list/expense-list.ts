import { Component, computed, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { ExpenseService } from "../expense-service";
import { ExpenseCard } from "./expense-card/expense-card";
import { ExpenseFilters } from "./expense-filters/expense-filters";
import { ExpensePagination } from "./expense-pagination/expense-pagination";
import { NotEmptyPipe } from "../../../shared/util/not-empty-pipe";

@Component({
  selector: "app-expense-list",
  imports: [
    ExpenseCard,
    ExpenseFilters,
    ExpensePagination,
    RouterLink,
    NotEmptyPipe,
  ],
  templateUrl: "./expense-list.html",
  styleUrl: "./expense-list.css",
  host: {
    class: "flex flex-col flex-1 max-h-full",
  },
})
export class ExpenseList {
  private readonly expenseService = inject(ExpenseService);
  private readonly router = inject(Router);

  readonly expensesState = this.expenseService.expensesState;
  readonly categoriesState = this.expenseService.categoriesState;

  readonly expenses = computed(() =>
    this.expensesState.data() ? this.expensesState.data().data : []
  );

  navigateToDetails(id: string): void {
    this.router.navigate([`/expenses/${id}`]);
  }
}
