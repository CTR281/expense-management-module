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
    id: expense.id,
    date: expense.date,
    ownerId: expense.ownerId,
    amount: expense.amount,
    currencyCode: expense.currencyCode,
    category: categories.find(
      (category) => category.id === expense.categoryId
    ) as Category, // as per backend design the category cannot be missing
    isSubmitted: expense.isSubmitted,
  };
}
