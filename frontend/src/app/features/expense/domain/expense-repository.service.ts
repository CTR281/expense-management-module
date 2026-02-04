import { inject, Injectable } from "@angular/core";
import { ExpensesHttpService } from "../data-access/expenses-http.service";
import { Category } from "./models/category.model";
import { catchError, map, Observable, throwError } from "rxjs";
import { GetExpensesQueryDto } from "../data-access/models/get-expenses/get-expenses-query.dto";
import { ExpenseDto } from "../data-access/models/expense.dto";
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
import { Paginated, toPaginatedExpenseDto } from "./models/expense-view.model";
import { DELETE_EXPENSE_ERRORS } from "../data-access/models/delete-expense/delete-expense.dto";
import { SUBMIT_EXPENSE_ERRORS } from "../data-access/models/submit-expense/submit-expense.dto";
import { CheckExpenseUniquenessQueryDto } from "../data-access/models/check-expense-uniqueness/check-expense-uniqueness-query.dto";

/**
 * Translate DTO models into Domain models and map errors to the domain
 *
 */
@Injectable()
export class ExpenseRepositoryService {
  private readonly httpService = inject(ExpensesHttpService);

  getCategories(): Observable<Category[]> {
    return this.httpService.getCategories().pipe(map((res) => res.items));
  }

  getExpenses(query: GetExpensesQueryDto): Observable<Paginated<ExpenseDto>> {
    return this.httpService.getExpenses(query).pipe(map(toPaginatedExpenseDto));
  }

  getExpenseById(id: string): Observable<ExpenseDto> {
    return this.httpService.getExpenseById(id);
  }

  checkExpenseUniqueness(
    query: CheckExpenseUniquenessQueryDto
  ): Observable<boolean> {
    return this.httpService.checkExpenseUniqueness(query);
  }

  createExpenses(
    request: CreateExpenseBodyDto
  ): Observable<CreateExpenseResultDto> {
    return this.httpService.createExpense(request).pipe(
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
    return this.httpService.editExpense(id, body).pipe(
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
    return this.httpService.deleteExpense(id).pipe(
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
    return this.httpService.submitExpense(id).pipe(
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
