import { inject, Injectable } from "@angular/core";
import { ExpensesHttpService } from "../data-access/expenses-http.service";
import { Category } from "./models/category.model";
import { catchError, map, Observable, switchMap, throwError } from "rxjs";
import { GetExpensesQueryDto } from "../data-access/models/get-expenses/get-expenses-query.dto";
import {
  CREATE_EXPENSE_ERRORS,
  CreateExpenseResultDto,
} from "../data-access/models/create-expense/create-expense-result.dto";
import { CreateExpenseBodyDto } from "../data-access/models/create-expense/create-expense-body.dto";
import {
  EDIT_EXPENSE_ERRORS,
  EditExpenseBodyDto,
} from "../data-access/models/edit-expense/edit-expense-body";
import { HttpErrorResponse } from "@angular/common/http";
import {
  BadRequestError,
  NotFoundError,
} from "../../../core/http/errors.model";
import { Paginated, toPaginatedExpense } from "./models/expense-view.model";
import { DELETE_EXPENSE_ERRORS } from "../data-access/models/delete-expense/delete-expense.dto";
import { SUBMIT_EXPENSE_ERRORS } from "../data-access/models/submit-expense/submit-expense.dto";
import { CheckExpenseUniquenessQueryDto } from "../data-access/models/check-expense-uniqueness/check-expense-uniqueness-query.dto";
import { CategoriesHttpService } from "../data-access/categories-http.service";
import { Expense, toExpense } from "./models/expense.model";

/**
 * Translate DTO models into Domain models and map errors to the domain
 *
 */
@Injectable()
export class ExpenseRepositoryService {
  private readonly expensesHttpService = inject(ExpensesHttpService);
  private readonly categoriesHttpService = inject(CategoriesHttpService);

  getCategories(): Observable<Category[]> {
    return this.categoriesHttpService
      .getCategories()
      .pipe(map((res) => res.items));
  }

  getExpenses(
    query: GetExpensesQueryDto,
    categories: Category[] | null
  ): Observable<Paginated<Expense>> {
    const fetchExpenses = (categories: Category[]) =>
      this.expensesHttpService
        .getExpenses(query)
        .pipe(map((result) => toPaginatedExpense(result, categories)));
    if (categories !== null) {
      return fetchExpenses(categories);
    } else {
      return this.getCategories().pipe(
        switchMap((categories) => fetchExpenses(categories))
      );
    }
  }

  getExpenseById(
    id: string,
    categories: Category[] | null
  ): Observable<Expense> {
    const fetchExpense = (categories: Category[]) =>
      this.expensesHttpService
        .getExpenseById(id)
        .pipe(map((result) => toExpense(result, categories)));
    if (categories !== null) {
      return fetchExpense(categories);
    } else {
      return this.getCategories().pipe(
        switchMap((categories) => fetchExpense(categories))
      );
    }
  }

  checkExpenseUniqueness(
    query: CheckExpenseUniquenessQueryDto
  ): Observable<boolean> {
    return this.expensesHttpService.checkExpenseUniqueness(query);
  }

  createExpenses(
    request: CreateExpenseBodyDto
  ): Observable<CreateExpenseResultDto> {
    return this.expensesHttpService.createExpense(request).pipe(
      catchError((err) => {
        if (!(err instanceof HttpErrorResponse)) {
          return throwError(() => err);
        }
        switch (err.status) {
          case CREATE_EXPENSE_ERRORS.BAD_REQUEST:
            return throwError(() => new BadRequestError());
          default:
            return throwError(() => err);
        }
      })
    );
  }

  editExpense(id: string, body: EditExpenseBodyDto): Observable<void> {
    return this.expensesHttpService.editExpense(id, body).pipe(
      catchError((err) => {
        if (!(err instanceof HttpErrorResponse)) {
          return throwError(() => err);
        }
        switch (err.status) {
          case EDIT_EXPENSE_ERRORS.BAD_REQUEST:
            return throwError(() => new BadRequestError());
          case EDIT_EXPENSE_ERRORS.NOT_FOUND:
            return throwError(() => new NotFoundError());
          default:
            return throwError(() => err);
        }
      })
    );
  }

  deleteExpense(id: string): Observable<void> {
    return this.expensesHttpService.deleteExpense(id).pipe(
      catchError((err) => {
        if (!(err instanceof HttpErrorResponse)) {
          return throwError(() => err);
        }
        switch (err.status) {
          case DELETE_EXPENSE_ERRORS.BAD_REQUEST:
            return throwError(() => new BadRequestError());
          case DELETE_EXPENSE_ERRORS.NOT_FOUND:
            return throwError(() => new NotFoundError());
          default:
            return throwError(() => err);
        }
      })
    );
  }

  submitExpense(id: string): Observable<void> {
    return this.expensesHttpService.submitExpense(id).pipe(
      catchError((err) => {
        if (!(err instanceof HttpErrorResponse)) {
          return throwError(() => err);
        }
        switch (err.status) {
          case SUBMIT_EXPENSE_ERRORS.NOT_FOUND:
            return throwError(() => new NotFoundError());
          default:
            return throwError(() => err);
        }
      })
    );
  }
}
