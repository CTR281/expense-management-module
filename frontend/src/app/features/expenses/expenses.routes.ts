import { Routes } from "@angular/router";
import { ExpenseList } from "./expense-list/expense-list";

export default [
  {
    path: "expenses-list",
    component: ExpenseList,
  },
] satisfies Routes;
