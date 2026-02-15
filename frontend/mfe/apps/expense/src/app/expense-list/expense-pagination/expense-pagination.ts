import { Component, computed, inject } from "@angular/core";
import { ExpenseService } from "../../expense-service";

@Component({
  selector: "app-expense-pagination",
  imports: [],
  templateUrl: "./expense-pagination.html",
  styleUrl: "./expense-pagination.css",
  host: {
    class: "flex flex-col justify-center items-center",
  },
})
export class ExpensePagination {
  private readonly expenseService = inject(ExpenseService);

  readonly filters = this.expenseService.filters;
  readonly loading = this.expenseService.expensesState.loading;

  readonly totalPages = computed(
    () => this.expenseService.expensesState.data()?.totalPages
  );
  readonly totalCount = computed(
    () => this.expenseService.expensesState.data()?.totalCount
  );
  readonly hasPreviousPage = computed(
    () => this.expenseService.expensesState.data()?.hasPreviousPage
  );
  readonly hasNextPage = computed(
    () => this.expenseService.expensesState.data()?.hasNextPage
  );
  readonly page = computed(() => this.filters().page);

  incrementPage() {
    if (!this.hasNextPage()) return;
    this.expenseService.updateFilters({ page: this.page() + 1 });
  }

  decrementPage() {
    if (!this.hasPreviousPage()) return;
    this.expenseService.updateFilters({ page: this.page() - 1 });
  }

  updatePageSize(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.expenseService.updateFilters({
      page: 1,
      pageSize: parseInt(value, 10),
    });
  }
}
