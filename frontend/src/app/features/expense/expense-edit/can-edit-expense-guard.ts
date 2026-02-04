import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { ExpenseService } from "../expense-service";
import { map } from "rxjs";
import { isEditable } from "../domain/models/expense.model";

export const canEditExpenseGuard: CanActivateFn = (route) =>
  inject(ExpenseService)
    .loadExpense(route.paramMap.get("id"))
    .pipe(
      map((expense) => {
        if (!isEditable(expense))
          return inject(Router).parseUrl("/expense-list");
        return true;
      })
    );
