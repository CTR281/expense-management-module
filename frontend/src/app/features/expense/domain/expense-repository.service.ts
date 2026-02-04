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
  EDIT_EXPENSE_BODY_ERRORS,
  EditExpenseBodyDto,
} from "../data-access/models/edit-expense/edit-expense-body";
import { HttpErrorResponse } from "@angular/common/http";
import {
  BadRequestError,
  NotFoundError,
} from "../../../core/http/errors.model";
import { Paginated, toPaginatedExpenseDto } from "./models/expense-view.model";

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

  createExpenses(
    request: CreateExpenseBodyDto
  ): Observable<CreateExpenseResultDto> {
    return this.httpService.createExpense(request).pipe(
      catchError((err) => {
        console.log("repo error");
        if (!(err instanceof HttpErrorResponse)) {
          return throwError(() => err);
        }
        console.log("repo error is HttpError");
        switch (err.status) {
          case CREATE_EXPENSE_ERRORS.BAD_REQUEST:
            console.log("repo error is bad request", err);
            return throwError(() => new BadRequestError(err.error));
          default:
            return throwError(() => err);
        }
      })
    );
  }

  editExpense(id: string, body: EditExpenseBodyDto): Observable<void> {
    return this.httpService.editExpense(id, body).pipe(
      catchError((err) => {
        console.log("repo error");
        if (!(err instanceof HttpErrorResponse)) {
          return throwError(() => err);
        }
        switch (err.status) {
          case EDIT_EXPENSE_BODY_ERRORS.BAD_REQUEST:
            return throwError(() => new BadRequestError(err.error));
          case EDIT_EXPENSE_BODY_ERRORS.NOT_FOUND:
            return throwError(() => new NotFoundError(err.error));
          default:
            return throwError(() => err);
        }
      })
    );
  }
}
