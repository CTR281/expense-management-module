import { Routes } from "@angular/router";
import { ExpenseList } from "./expense-list/expense-list";
import { ExpenseShell } from "./expense-shell";
import { provideExpenses } from "./expense.config";
import { inject } from "@angular/core";
import { CategoryStore } from "./domain/store/category.store";
import { ExpenseCreate } from "./expense-create/expense-create";

export default [
  {
    path: "",
    component: ExpenseShell,
    providers: [provideExpenses()],
    resolve: {
      categories: () => inject(CategoryStore).load(),
    },
    children: [
      {
        path: "expense-list",
        component: ExpenseList,
      },
      {
        path: "new",
        component: ExpenseCreate,
      },
      {
        path: "**",
        redirectTo: "expense-list",
      },
    ],
  },
] satisfies Routes;
