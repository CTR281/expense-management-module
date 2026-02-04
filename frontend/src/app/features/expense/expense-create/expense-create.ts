import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { ExpenseService } from "../expense-service";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CURRENCY_CODE } from "./models/currency";

@Component({
  selector: "app-expense-create",
  imports: [ReactiveFormsModule],
  templateUrl: "./expense-create.html",
  styleUrl: "./expense-create.css",
})
export class ExpenseCreate {
  private readonly expenseService = inject(ExpenseService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

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
        this.router.navigate(["..", { relativeTo: this.route }]);
      },
      error: () => this.submitting.set(false),
    });
  }

  back(): void {
    this.router.navigate([".."], { relativeTo: this.route });
  }
}
