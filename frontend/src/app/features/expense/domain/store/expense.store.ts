import { inject, Injectable, signal } from "@angular/core";
import {
  Expense,
  ExpenseFilters,
  allHaveCategory,
  MaybeExpense,
} from "../models/expense.model";
import { finalize, map, Observable, of, switchMap, tap } from "rxjs";
import { CategoryStore } from "./category.store";
import { toExpense, toGetExpensesDto } from "../expense.mapper";
import { AuthService } from "../../../../core/auth/auth.service";
import { Category } from "../models/category.model";
import { ExpenseRepositoryService } from "../expense-repository.service";

@Injectable()
export class ExpenseStore {
  private readonly expenseService = inject(ExpenseRepositoryService);
  private readonly categoriesStore = inject(CategoryStore);
  private readonly authService = inject(AuthService);

  private readonly _expenses = signal<Expense[] | null>(null);
  private readonly _filters = signal<ExpenseFilters | null>(null);
  private readonly _loading = signal<boolean>(false);

  readonly expenses = this._expenses.asReadonly();
  readonly filters = this._filters.asReadonly();
  readonly loading = this._loading.asReadonly();

  setFilters(filters: ExpenseFilters): void {
    this._filters.set(filters);
    this.invalidate();
  }

  invalidate(): void {
    this._expenses.set(null);
  }

  load(): Observable<Expense[]> {
    if (this._expenses()) {
      return of(this._expenses());
    }

    return this.fetch();
  }

  fetch(): Observable<Expense[]> {
    this._loading.set(true);

    return this.categoriesStore.load().pipe(
      switchMap((categories) =>
        this.loadExpensesOnce(categories)
          .pipe(
            switchMap((maybeExpenses) => {
              if (allHaveCategory(maybeExpenses)) {
                return of(maybeExpenses);
              }

              return this.categoriesStore // categories are stale, refetch them + derived data (expenses)
                .refresh()
                .pipe(
                  switchMap(
                    (categories) =>
                      this.loadExpensesOnce(categories) as Observable<Expense[]>
                  )
                );
            })
          )
          .pipe(
            tap((expenses) => this._expenses.set(expenses)),
            finalize(() => this._loading.set(false))
          )
      )
    );
  }

  private loadExpensesOnce(categories: Category[]): Observable<MaybeExpense[]> {
    return this.expenseService
      .getExpenses(
        toGetExpensesDto(this._filters(), this.authService.user().id)
      )
      .pipe(
        map((expensesDto) =>
          expensesDto.map((expenseDto) => toExpense(expenseDto, categories))
        )
      );
  }
}
