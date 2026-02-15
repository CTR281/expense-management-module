import { Component, inject, Input, OnInit, signal } from "@angular/core";
import { ExpenseService } from "../expense-service";
import { Router } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CURRENCY_CODE } from "../domain/models/currency";
import { Expense } from "../domain/models/expense.model";
import { EditExpenseCommand } from "../domain/models/edit-expense-command.model";

@Component({
  selector: "mfe-expense-edit",
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: "./expense-edit.html",
  styleUrl: "./expense-edit.css",
  host: {
    class: "flex flex-col flex-1 h-full gap-6",
  },
})
export class ExpenseEdit implements OnInit {
  @Input({ required: true }) expense!: Expense; // resolved in route
  private readonly expenseService = inject(ExpenseService);
  private readonly router = inject(Router);

  readonly categoriesState = this.expenseService.categoriesState;

  readonly submitting = signal<boolean>(false);

  readonly form = new FormGroup({
    amount: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0.01)],
    }),
    categoryId: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
    currencyCode: new FormControl<string>(CURRENCY_CODE.EUR, {
      nonNullable: true,
    }),
  });

  ngOnInit() {
    this.form.patchValue({
      amount: this.expense.amount,
      currencyCode: this.expense.currencyCode,
      categoryId: this.expense.category.id,
    });
  }

  submit(): void {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    this.expenseService
      .editExpense({
        ...this.form.getRawValue(),
        id: this.expense.id,
      } as EditExpenseCommand)
      .subscribe({
        next: () => {
          this.router.navigate(["/expenses"]);
        },
        error: () => this.submitting.set(false),
      });
  }

  back(): void {
    this.router.navigate([`/expenses/${this.expense.id}`]);
  }
}
