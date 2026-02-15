import { Component, inject, Input, signal } from "@angular/core";
import { Expense } from "../domain/models/expense.model";
import { Router, RouterLink } from "@angular/router";
import { StatusBadge } from "../shared/ui/status-badge";
import { ExpenseService } from "../expense-service";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { IconBackComponent } from "@mfe/icons";
import { IsEditablePipe } from "../expense-edit/is-editable.pipe";

@Component({
  selector: "app-expense-details",
  imports: [
    StatusBadge,
    DatePipe,
    CurrencyPipe,
    IconBackComponent,
    RouterLink,
    IsEditablePipe,
  ],
  templateUrl: "./expense-details.html",
  styleUrl: "./expense-details.css",
  host: {
    class: "flex flex-col flex-1 min-h-full",
  },
})
export class ExpenseDetails {
  @Input({ required: true }) expense!: Expense; // resolved in route

  submitting = signal<boolean>(false);

  private readonly router = inject(Router);
  private readonly expenseService = inject(ExpenseService);

  deleteExpense() {
    if (!window.confirm("Are you sure you want to delete this expense?"))
      return;
    this.submitting.set(true);
    this.expenseService.deleteExpense({ id: this.expense.id }).subscribe({
      next: () => {
        this.router.navigate(["/expenses"]);
      },
      error: () => this.submitting.set(false),
    });
  }

  submitExpense() {
    if (!window.confirm("Are you sure you want to submit this expense?"))
      return;
    this.submitting.set(true);
    this.expenseService.submitExpense({ id: this.expense.id }).subscribe({
      next: () => {
        this.router.navigate([`/expenses`]);
      },
      error: () => this.submitting.set(false),
    });
  }
}
