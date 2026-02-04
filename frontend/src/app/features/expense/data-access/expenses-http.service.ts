import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { GetCategoriesQueryDto } from "./models/get-categories/get-categories-query.dto";
import { GetExpensesQueryDto } from "./models/get-expenses/get-expenses-query.dto";
import { toHttpParams } from "../../../shared/util/http";
import { GetCategoriesResultDto } from "./models/get-categories/get-categories-result.dto";
import { GetExpensesResultDto } from "./models/get-expenses/get-expenses-result.dto";
import { CreateExpenseBodyDto } from "./models/create-expense/create-expense-body.dto";
import { CreateExpenseResultDto } from "./models/create-expense/create-expense-result.dto";
import { GetExpenseByIdResultDto } from "./models/get-expense-by-id/get-expense-by-id-result.dto";
import { EditExpenseBodyDto } from "./models/edit-expense/edit-expense-body";

@Injectable({
  providedIn: "root",
})
export class ExpensesHttpService {
  private readonly http = inject(HttpClient);

  getCategories(
    query?: GetCategoriesQueryDto
  ): Observable<GetCategoriesResultDto> {
    const params = toHttpParams(query);
    return this.http.get<GetCategoriesResultDto>(`/categories`, { params });
  }

  getExpenses(query: GetExpensesQueryDto): Observable<GetExpensesResultDto> {
    const params = toHttpParams(query);
    console.log(params);
    return this.http.get<GetExpensesResultDto>(`/expenses`, { params });
  }
  getExpenseById(id: string): Observable<GetExpenseByIdResultDto> {
    return this.http.get<GetExpenseByIdResultDto>(`/expenses/${id}`);
  }

  createExpense(
    request: CreateExpenseBodyDto
  ): Observable<CreateExpenseResultDto> {
    return this.http.post<CreateExpenseResultDto>(`/expenses`, request).pipe(
      catchError((err) => {
        console.log("http error", err);
        return throwError(() => err);
      })
    );
  }

  editExpense(id: string, body: EditExpenseBodyDto): Observable<void> {
    return this.http.put<void>(`/expenses/${id}`, body);
  }

  deleteExpense(id: string): Observable<void> {
    return this.http.delete<void>(`/expenses/${id}`);
  }

  submitExpense(id: string): Observable<void> {
    return this.http.post<void>(`/expenses/${id}/submit`, {});
  }
}
