import { inject, Injectable } from "@angular/core";
import { ExpensesHttpService } from "../data-access/expenses-http.service";
import { Category } from "./models/category.model";
import { catchError, map, Observable, throwError } from "rxjs";
import { GetExpensesQueryDto } from "../data-access/models/get-expenses/get-expenses-query.dto";
import { ExpenseDto } from "../data-access/models/expense.dto";
import { CreateExpenseResultDto } from "../data-access/models/create-expense/create-expense-result.dto";
import { AuthService } from "../../../core/auth/auth.service";
import { CreateExpenseRequestDto } from "../data-access/models/create-expense/create-expense-request.dto";

@Injectable()
export class ExpenseRepositoryService {
  private readonly httpService = inject(ExpensesHttpService);

  getCategories(): Observable<Category[]> {
    return this.httpService.getCategories().pipe(map((res) => res.items));
  }

  getExpenses(query: GetExpensesQueryDto): Observable<ExpenseDto[]> {
    return this.httpService.getExpenses(query).pipe(map((res) => res.items));
  }

  createExpenses(
    request: CreateExpenseRequestDto
  ): Observable<CreateExpenseResultDto> {
    return this.httpService
      .createExpense(request)
      .pipe(catchError((err) => throwError(() => err.status)));
  }
}
