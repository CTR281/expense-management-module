import { Category } from "./category.model";
import { WithOptional } from "../../../../shared/util/types";

export interface Expense {
  id: string;
  date: string;
  ownerId: string;
  amount: number;
  currencyCode: string;
  category: Category;
  isSubmitted: boolean;
}

export type MaybeExpense = WithOptional<Expense, "category">;

export function allHaveCategory(
  expenses: MaybeExpense[]
): expenses is Expense[] {
  return expenses.some((expense) => expense.category === undefined);
}

export interface ExpenseFilters {
  categoryId: string;
  fromDate: string;
  toDate: string;
  page: number;
  pageSize: number;
}
