import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GetCategoriesQueryDto } from "./models/get-categories/get-categories-query.dto";
import { GetExpensesQueryDto } from "./models/get-expenses/get-expenses-query.dto";
import { toHttpParams } from "../../../shared/util/http";
import { GetCategoriesResultDto } from "./models/get-categories/get-categories-result.dto";
import { GetExpensesResultDto } from "./models/get-expenses/get-expenses-result.dto";
import { CreateExpenseRequestDto } from "./models/create-expense/create-expense-request.dto";
import { CreateExpenseResultDto } from "./models/create-expense/create-expense-result.dto";

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
    return this.http.get<GetExpensesResultDto>(`/expenses`, { params });
  }

  createExpense(
    request: CreateExpenseRequestDto
  ): Observable<CreateExpenseResultDto> {
    return this.http.post<CreateExpenseResultDto>(`/expenses`, request);
  }
}
