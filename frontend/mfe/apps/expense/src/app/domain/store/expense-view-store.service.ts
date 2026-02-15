import { inject, Injectable, signal } from "@angular/core";
import { Expense } from "../models/expense.model";
import { finalize, of, switchMap, tap } from "rxjs";
import { CategoryStore } from "./category.store";
import { ExpenseRepositoryService } from "../expense-repository.service";
import { SessionScopedStore } from "@mfe/store";
import { toGetExpensesQueryDto } from "../../data-access/models/get-expenses/get-expenses-query.dto";
import {
  areFiltersEqual,
  ExpenseFilters,
  Paginated,
} from "../models/expense-view.model";
import { User } from "@mfe/user";

@Injectable()
export class ExpenseListViewStore extends SessionScopedStore<
  Paginated<Expense>
> {
  private static readonly INIT_FILTERS = {
    page: 1,
    pageSize: 10,
  };
  private readonly expenseRepositoryService = inject(ExpenseRepositoryService);
  private readonly categoriesStore = inject(CategoryStore);

  private readonly _expenses = signal<Paginated<Expense> | null>(null);
  private readonly _filters = signal<ExpenseFilters>(
    ExpenseListViewStore.INIT_FILTERS
  );
  private readonly _loading = signal<boolean>(false);

  readonly expenses = this._expenses.asReadonly();
  readonly filters = this._filters.asReadonly();
  readonly loading = this._loading.asReadonly();

  setFilters(filters: ExpenseFilters): void {
    if (areFiltersEqual(filters, this._filters())) return;
    this._filters.set(filters);
    this.invalidate();
  }

  load() {
    if (!this.isStale && this._expenses()) {
      return of(this._expenses() as Paginated<Expense>);
    }
    return this.fetch();
  }

  reset() {
    this._expenses.set(null);
    this._filters.set(ExpenseListViewStore.INIT_FILTERS);
  }

  protected fetch() {
    this._loading.set(true);

    return this.categoriesStore.load().pipe(
      switchMap((categories) =>
        this.expenseRepositoryService
          .getExpenses(
            toGetExpensesQueryDto(
              this._filters(),
              (this.authService.user() as User).id
            ),
            categories
          )
          .pipe(
            tap((expenses) => this._expenses.set(expenses)),
            finalize(() => {
              this._loading.set(false);
              this.isStale = false;
            })
          )
      )
    );
  }
}
