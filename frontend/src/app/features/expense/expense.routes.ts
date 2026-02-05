import { RedirectCommand, ResolveFn, Router, Routes } from "@angular/router";
import { ExpenseList } from "./expense-list/expense-list";
import { ExpenseShell } from "./expense-shell";
import { provideExpenses } from "./expense.config";
import { assertInInjectionContext, inject } from "@angular/core";
import { ExpenseCreate } from "./expense-create/expense-create";
import { Category } from "./domain/models/category.model";
import { Expense } from "./domain/models/expense.model";
import { ExpenseDetails } from "./expense-details/expense-details";
import { catchError, of } from "rxjs";
import { NotificationService } from "../../core/notification/notification-service";
import { ExpenseService } from "./expense-service";
import { ExpenseEdit } from "./expense-edit/expense-edit";
import { canEditExpenseGuard } from "./expense-edit/can-edit-expense-guard";
import { Paginated } from "./domain/models/expense-view.model";

function redirectOnError(message: string, redirectTo: string) {
  assertInInjectionContext(redirectOnError);
  const router = inject(Router);
  const notification = inject(NotificationService);

  return () => {
    notification.error(message);
    return of(new RedirectCommand(router.parseUrl(redirectTo)));
  };
}

const resolveCategories: ResolveFn<Category[]> = () =>
  inject(ExpenseService)
    .loadCategories()
    .pipe(catchError(redirectOnError("Could not load categories.", "/")));

const resolveExpenses: ResolveFn<Paginated<Expense>> = () =>
  inject(ExpenseService)
    .loadExpenses()
    .pipe(catchError(redirectOnError("Could not load expenses.", "/")));

const resolveExpense: ResolveFn<Expense> = (route) => {
  return inject(ExpenseService)
    .loadExpense(route.paramMap.get("id") as string)
    .pipe(
      catchError(redirectOnError("Could not load expense.", "/expense-list"))
    );
};

export default [
  {
    path: "",
    component: ExpenseShell,
    providers: [provideExpenses()],
    resolve: {
      categories: resolveCategories,
    },
    children: [
      {
        path: "expense-list",
        component: ExpenseList,
        resolve: {
          expenses: resolveExpenses,
        },
      },
      {
        path: "new",
        component: ExpenseCreate,
      },
      {
        path: ":id",
        component: ExpenseDetails,
        resolve: {
          expense: resolveExpense,
        },
      },
      {
        path: ":id/edit",
        component: ExpenseEdit,
        canActivate: [canEditExpenseGuard],
        resolve: {
          expense: resolveExpense,
        },
      },
      {
        path: "**",
        redirectTo: "expense-list",
      },
    ],
  },
] satisfies Routes;
