import { inject, Injectable } from "@angular/core";
import { AuthService } from "../../../core/auth/auth.service";
import { ExpenseRepositoryService } from "./expense-repository.service";
import {
  CreateExpenseCommand,
  toCreateExpenseRequestDto,
} from "./models/create-expense-command.model";
import { catchError, EMPTY, Observable, tap } from "rxjs";
import {
  CREATE_EXPENSE_ERRORS,
  CreateExpenseResultDto,
} from "../data-access/models/create-expense/create-expense-result.dto";
import { NotificationService } from "../../../core/notification/notification-service";
import { ExpenseStore } from "./store/expense.store";

@Injectable()
export class ExpenseService {
  private readonly authService = inject(AuthService);
  private readonly repositoryService = inject(ExpenseRepositoryService);
  private readonly notificationService: NotificationService;
  private readonly expenseStore = inject(ExpenseStore);

  createExpenses(
    command: CreateExpenseCommand
  ): Observable<CreateExpenseResultDto> {
    return this.repositoryService
      .createExpenses(
        toCreateExpenseRequestDto(command, this.authService.user().id)
      )
      .pipe(
        tap(() => this.expenseStore.invalidate()),
        catchError((err) => {
          if (Object.keys(CREATE_EXPENSE_ERRORS).includes(err))
            this.notificationService.error(CREATE_EXPENSE_ERRORS[err]);
          return EMPTY;
        })
      );
  }
}
