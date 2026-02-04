import { inject, Injectable, signal } from "@angular/core";
import { SessionScopedStore } from "../../../../core/store/store.model";
import { Expense, toExpense } from "../models/expense.model";
import { ExpenseRepositoryService } from "../expense-repository.service";
import { CategoryStore } from "./category.store";
import { finalize, map, of, switchMap, tap } from "rxjs";

@Injectable()
export class ExpenseStore extends SessionScopedStore<Expense> {
  private readonly expenseRepositoryService = inject(ExpenseRepositoryService);
  private readonly categoryStore = inject(CategoryStore);

  private readonly _expense = signal<Expense | null>(null);
  private readonly _activeId = signal<string | null>(null);
  private readonly _loading = signal<boolean>(false);

  readonly expense = this._expense.asReadonly();
  readonly activeId = this._activeId.asReadonly();
  readonly loading = this._loading.asReadonly();

  setActiveId(activeId: string) {
    if (activeId === this._activeId()) return;
    this._activeId.set(activeId);
    this.refresh();
  }

  invalidate() {
    this._expense.set(null);
  }

  load() {
    if (this._expense()) {
      return of(this._expense());
    }
    this.fetch();
  }

  protected fetch() {
    this._loading.set(true);
    return this.categoryStore
      .load()
      .pipe(
        switchMap((categories) =>
          this.expenseRepositoryService
            .getExpenseById(this._activeId())
            .pipe(map((expense) => toExpense(expense, categories)))
        )
      )
      .pipe(
        tap((expense: Expense) => this._expense.set(expense)),
        finalize(() => this._loading.set(false))
      );
  }
}
