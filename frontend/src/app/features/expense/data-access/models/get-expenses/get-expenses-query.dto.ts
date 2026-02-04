import { ExpenseFilters } from "../../../domain/models/expense-view.model";

export interface GetExpensesQueryDto {
  userId?: string;
  categoryId?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  pageSize?: number;
}
export function toGetExpensesQueryDto(
  expenseFilters: ExpenseFilters,
  userId: string
): GetExpensesQueryDto {
  return {
    ...expenseFilters,
    userId,
  };
}
