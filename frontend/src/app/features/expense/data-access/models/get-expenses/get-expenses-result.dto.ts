import { ExpenseDto } from "../expense.dto";

export interface GetExpensesResultDto {
  items: ExpenseDto[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
