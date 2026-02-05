import { GetExpensesResultDto } from "../../data-access/models/get-expenses/get-expenses-result.dto";
import { Expense, toExpense } from "./expense.model";
import { Category } from "./category.model";

export interface ExpenseFilters {
  categoryId?: string;
  fromDate?: string;
  toDate?: string;
  page: number;
  pageSize: number;
}

export function areFiltersEqual(a: ExpenseFilters, b: ExpenseFilters) {
  return (
    a.categoryId === b.categoryId &&
    a.fromDate === b.fromDate &&
    a.toDate === b.toDate &&
    a.page === b.page &&
    a.pageSize === b.pageSize
  );
}

export interface Paginated<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export function toPaginatedExpense(
  getExpensesResultDto: GetExpensesResultDto,
  categories: NonNullable<Category[]>
): Paginated<Expense> {
  return {
    data: getExpensesResultDto.items.map((expenseDto) =>
      toExpense(expenseDto, categories)
    ),
    totalCount: getExpensesResultDto.totalCount,
    totalPages: getExpensesResultDto.totalPages,
    hasPreviousPage: getExpensesResultDto.hasPreviousPage,
    hasNextPage: getExpensesResultDto.hasNextPage,
  };
}
