import { Component, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { ExpenseService } from "../expense-service";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CURRENCY_CODE } from "../domain/models/currency";
import { UniqueExpenseDateValidator } from "./unique-expense-date-validator.service";

@Component({
  selector: "app-expense-create",
  imports: [ReactiveFormsModule],
  templateUrl: "./expense-create.html",
  styleUrl: "./expense-create.css",
  host: {
    class: "flex flex-col flex-1 h-full gap-6",
  },
})
export class ExpenseCreate {
  private readonly expenseService = inject(ExpenseService);
  private readonly router = inject(Router);
  private readonly uniqueExpenseDateValidator = inject(
    UniqueExpenseDateValidator
  );

  readonly categoriesState = this.expenseService.categoriesState;

  readonly submitting = signal<boolean>(false);

  readonly form = new FormGroup({
    amount: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0.01)],
    }),
    categoryId: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
    date: new FormControl<string | null>(null, {
      validators: [Validators.required],
      asyncValidators: [
        this.uniqueExpenseDateValidator.validate.bind(
          this.uniqueExpenseDateValidator
        ),
      ],
    }),
    currencyCode: new FormControl<string>(CURRENCY_CODE.EUR, {
      nonNullable: true,
    }),
  });

  submit(): void {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    this.expenseService.createExpense(this.form.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(["/expenses"]);
      },
      error: () => this.submitting.set(false),
    });
  }

  back(): void {
    this.router.navigate(["/expenses"]);
  }
}
