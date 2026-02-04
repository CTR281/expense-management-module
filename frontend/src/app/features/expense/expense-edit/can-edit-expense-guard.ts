import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { ExpenseService } from "../expense-service";
import { map } from "rxjs";
import { IsEditablePipe } from "./is-editable.pipe";

export const canEditExpenseGuard: CanActivateFn = (route) => {
  const isEditablePipe = inject(IsEditablePipe);
  const router = inject(Router);
  return inject(ExpenseService)
    .loadExpense(route.paramMap.get("id"))
    .pipe(
      map((expense) => {
        if (!isEditablePipe.transform(expense))
          return router.parseUrl("/expense-list");
        return true;
      })
    );
};
