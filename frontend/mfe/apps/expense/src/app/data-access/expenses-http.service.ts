import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GetExpensesQueryDto } from "./models/get-expenses/get-expenses-query.dto";
import { toHttpParams } from "@mfe/http";
import { GetExpensesResultDto } from "./models/get-expenses/get-expenses-result.dto";
import { CreateExpenseBodyDto } from "./models/create-expense/create-expense-body.dto";
import { CreateExpenseResultDto } from "./models/create-expense/create-expense-result.dto";
import { GetExpenseByIdResultDto } from "./models/get-expense-by-id/get-expense-by-id-result.dto";
import { EditExpenseBodyDto } from "./models/edit-expense/edit-expense-body";
import { CheckExpenseUniquenessQueryDto } from "./models/check-expense-uniqueness/check-expense-uniqueness-query.dto";

@Injectable()
export class ExpensesHttpService {
  private readonly http = inject(HttpClient);

  getExpenses(query: GetExpensesQueryDto): Observable<GetExpensesResultDto> {
    const params = toHttpParams(query);
    return this.http.get<GetExpensesResultDto>(`/expenses`, { params });
  }
  getExpenseById(id: string): Observable<GetExpenseByIdResultDto> {
    return this.http.get<GetExpenseByIdResultDto>(`/expenses/${id}`);
  }

  checkExpenseUniqueness(
    query: CheckExpenseUniquenessQueryDto
  ): Observable<boolean> {
    const params = toHttpParams(query);
    return this.http.get<boolean>(`/expenses/unique`, { params });
  }

  createExpense(
    request: CreateExpenseBodyDto
  ): Observable<CreateExpenseResultDto> {
    return this.http.post<CreateExpenseResultDto>(`/expenses`, request);
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
