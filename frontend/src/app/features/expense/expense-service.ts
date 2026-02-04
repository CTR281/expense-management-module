import { inject, Injectable, Signal } from "@angular/core";
import { AuthService } from "../../core/auth/auth.service";
import { ExpenseRepositoryService } from "./domain/expense-repository.service";
import {
  CreateExpenseCommand,
  toCreateExpenseRequestDto,
} from "./domain/models/create-expense-command.model";
import { catchError, EMPTY, Observable, tap, throwError } from "rxjs";
import { CreateExpenseResultDto } from "./data-access/models/create-expense/create-expense-result.dto";
import { NotificationService } from "../../core/notification/notification-service";
import { ExpenseViewStore } from "./domain/store/expense-view-store.service";
import { CategoryStore } from "./domain/store/category.store";
import { Category } from "./domain/models/category.model";
import { Expense } from "./domain/models/expense.model";
import { BadRequestError, NotFoundError } from "../../core/http/errors.model";
import { ExpenseStore } from "./domain/store/expense.store";
import {
  EditExpenseCommand,
  toEditExpenseBodyDto,
} from "./domain/models/edit-expense-command.model";
import { StoreState } from "../../core/store/store.model";
import { ExpenseFilters, Paginated } from "./domain/models/expense-view.model";

@Injectable()
export class ExpenseService {
  private readonly authService = inject(AuthService);
  private readonly repositoryService = inject(ExpenseRepositoryService);
  private readonly notificationService = inject(NotificationService);
  private readonly expenseViewStore = inject(ExpenseViewStore);
  private readonly expenseStore = inject(ExpenseStore);
  private readonly categoryStore = inject(CategoryStore);

  readonly categoriesState: StoreState<Category[]> = {
    data: this.categoryStore.categories,
    loading: this.categoryStore.loading,
  };

  readonly expenseViewState: StoreState<Paginated<Expense>> = {
    data: this.expenseViewStore.expenses,
    loading: this.expenseViewStore.loading,
  };

  readonly expenseState: StoreState<Expense> = {
    data: this.expenseStore.expense,
    loading: this.expenseStore.loading,
  };

  readonly filters: Signal<ExpenseFilters> = this.expenseViewStore.filters;

  updateFilters(patch: Partial<ExpenseFilters>) {
    this.expenseViewStore.setFilters({
      ...this.expenseViewStore.filters(),
      ...patch,
    });
    this.expenseViewStore.load().subscribe({
      error: () => this.notificationService.error("Failed to load expenses."),
    });
  }

  loadCategories() {
    return this.categoryStore.load();
  }

  loadExpenses() {
    return this.expenseViewStore.load();
  }

  loadExpense(id: string) {
    this.expenseStore.setActiveId(id);
    return this.expenseStore.load();
  }

  createExpense(
    command: CreateExpenseCommand
  ): Observable<CreateExpenseResultDto> {
    return this.repositoryService
      .createExpenses(
        toCreateExpenseRequestDto(command, this.authService.user().id)
      )
      .pipe(
        catchError((err) => {
          if (err instanceof BadRequestError) {
            console.log("notify error");
            this.notificationService.error(err.message);
          }
          return throwError(() => err);
        }),
        tap(() => {
          this.notificationService.success("Expense created successfully.");
          this.expenseViewStore.invalidate();
        })
      );
  }

  editExpense(command: EditExpenseCommand): Observable<void> {
    return this.repositoryService
      .editExpense(command.id, toEditExpenseBodyDto(command))
      .pipe(
        catchError((err) => {
          this.notificationService.error(err.message);
          if (err instanceof NotFoundError) {
            this.expenseViewStore.invalidate();
            this.expenseStore.invalidate();
          }
          return throwError(() => err);
        }),
        tap(() => {
          this.expenseViewStore.invalidate();
          this.expenseStore.invalidate();
        })
      );
  }
}
