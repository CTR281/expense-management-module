import { Component, inject } from "@angular/core";
import { ExpenseService } from "../../expense-service";
import { ExpenseFilters as Filters } from "../../domain/models/expense-view.model";

@Component({
  selector: "mfe-expense-filters",
  templateUrl: "./expense-filters.html",
  styleUrl: "./expense-filters.css",
})
export class ExpenseFilters {
  private readonly expenseService = inject(ExpenseService);

  readonly categoriesState = this.expenseService.categoriesState;
  readonly filters = this.expenseService.filters;

  updateCategory(event: Event) {
    const value = (event.target as HTMLSelectElement).value || undefined;
    this.updateFilters({ categoryId: value });
  }

  updateFromDate(event: Event) {
    const value = (event.target as HTMLInputElement).value || undefined;
    this.updateFilters({ fromDate: value });
  }

  updateToDate(event: Event) {
    const value = (event.target as HTMLInputElement).value || undefined;
    this.updateFilters({ toDate: value });
  }

  private updateFilters(filter: Partial<Filters>): void {
    this.expenseService.updateFilters(filter);
  }
}
