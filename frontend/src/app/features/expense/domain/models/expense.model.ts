import { Category } from "./category.model";
import { ExpenseDto } from "../../data-access/models/expense.dto";

export interface Expense {
  id: string;
  date: string;
  ownerId: string;
  amount: number;
  currencyCode: string;
  category: Category;
  isSubmitted: boolean;
}

export function toExpense(
  expense: ExpenseDto,
  categories: Category[]
): Expense {
  return {
    ...expense,
    category: categories.find((category) => category.id === expense.categoryId),
  };
}

export function isEditable(expense: Expense) {
  return !expense.isSubmitted;
}
