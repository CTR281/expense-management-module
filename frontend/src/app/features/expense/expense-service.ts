import { inject, Injectable, Signal } from "@angular/core";
import { AuthService } from "../../core/auth/auth.service";
import { ExpenseRepositoryService } from "./domain/expense-repository.service";
import {
  CreateExpenseCommand,
  toCreateExpenseRequestDto,
} from "./domain/models/create-expense-command.model";
import { catchError, Observable, switchMap, tap, throwError } from "rxjs";
import { CreateExpenseResultDto } from "./data-access/models/create-expense/create-expense-result.dto";
import { NotificationService } from "../../core/notification/notification-service";
import { ExpenseListViewStore } from "./domain/store/expense-view-store.service";
import { CategoryStore } from "./domain/store/category.store";
import { Category } from "./domain/models/category.model";
import { Expense } from "./domain/models/expense.model";
import { BadRequestError, NotFoundError } from "../../core/http/errors.model";
import {
  EditExpenseCommand,
  toEditExpenseBodyDto,
} from "./domain/models/edit-expense-command.model";
import { StoreState } from "../../core/store/store.model";
import { ExpenseFilters, Paginated } from "./domain/models/expense-view.model";
import { DeleteExpenseCommand } from "./domain/models/delete-expense-command.model";
import { Router } from "@angular/router";
import { SubmitExpenseCommand } from "./domain/models/submit-expense-command.model";
import { User } from "../user/domain/user.model";

/**
 * Facade service of the Expense Feature
 */
@Injectable()
export class ExpenseService {
  private readonly authService = inject(AuthService);
  private readonly expenseRepositoryService = inject(ExpenseRepositoryService);
  private readonly notificationService = inject(NotificationService);
  private readonly expenseListViewStore = inject(ExpenseListViewStore);
  private readonly categoryStore = inject(CategoryStore);
  private readonly router = inject(Router);

  readonly categoriesState: StoreState<Category[]> = {
    data: this.categoryStore.categories,
    loading: this.categoryStore.loading,
  };

  readonly expensesState: StoreState<Paginated<Expense>> = {
    data: this.expenseListViewStore.expenses,
    loading: this.expenseListViewStore.loading,
  };

  readonly filters: Signal<ExpenseFilters> = this.expenseListViewStore.filters;

  updateFilters(patch: Partial<ExpenseFilters>) {
    this.expenseListViewStore.setFilters({
      ...this.expenseListViewStore.filters(),
      ...patch,
    });
    this.expenseListViewStore.load().subscribe({
      error: () => this.notificationService.error("Failed to load expenses."),
    });
  }

  loadCategories(): Observable<Category[]> {
    return this.categoryStore.load();
  }

  loadExpenses(): Observable<Paginated<Expense>> {
    return this.expenseListViewStore.load();
  }

  loadExpense(id: string): Observable<Expense> {
    return this.categoryStore
      .load()
      .pipe(
        switchMap((categories) =>
          this.expenseRepositoryService.getExpenseById(id, categories)
        )
      );
  }

  checkExpenseUniqueness(date: string): Observable<boolean> {
    return this.expenseRepositoryService.checkExpenseUniqueness({
      userId: (this.authService.user() as User).id,
      date,
    });
  }

  createExpense(
    command: CreateExpenseCommand
  ): Observable<CreateExpenseResultDto> {
    return this.expenseRepositoryService
      .createExpenses(
        toCreateExpenseRequestDto(command, (this.authService.user() as User).id)
      )
      .pipe(
        catchError((err) => {
          if (err instanceof BadRequestError) {
            this.notificationService.error("Could not create expense.");
          }
          return throwError(() => err);
        }),
        tap(() => {
          this.notificationService.success("Expense created successfully.");
          this.expenseListViewStore.invalidate();
        })
      );
  }

  editExpense(command: EditExpenseCommand): Observable<void> {
    return this.expenseRepositoryService
      .editExpense(command.id, toEditExpenseBodyDto(command))
      .pipe(
        catchError((err) => {
          this.notificationService.error("Could not edit expense.");
          if (err instanceof NotFoundError || err instanceof BadRequestError) {
            this.expenseListViewStore.invalidate();
            this.router.navigate(["/expenses"]);
          }
          return throwError(() => err);
        }),
        tap(() => {
          this.notificationService.success("Expense updated successfully.");
          this.expenseListViewStore.invalidate();
        })
      );
  }

  deleteExpense(command: DeleteExpenseCommand): Observable<void> {
    return this.expenseRepositoryService.deleteExpense(command.id).pipe(
      catchError((err) => {
        this.notificationService.error("Could not delete expense.");
        if (err instanceof NotFoundError || err instanceof BadRequestError) {
          this.expenseListViewStore.invalidate();
          this.router.navigate(["/expenses"]);
        }
        return throwError(() => err);
      }),
      tap(() => {
        this.notificationService.success("Expense deleted successfully.");
        this.expenseListViewStore.invalidate();
      })
    );
  }

  submitExpense(command: SubmitExpenseCommand): Observable<void> {
    return this.expenseRepositoryService.submitExpense(command.id).pipe(
      catchError((err) => {
        this.notificationService.error("Could not submit expense.");
        if (err instanceof NotFoundError) {
          this.expenseListViewStore.invalidate();
          this.router.navigate(["/expenses"]);
        }
        return throwError(() => err);
      }),
      tap(() => {
        this.notificationService.success("Expense submitted successfully.");
        this.expenseListViewStore.invalidate();
      })
    );
  }
}
