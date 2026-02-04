import { ExpenseDto } from "../expense.dto";

export type GetExpenseByIdResultDto = ExpenseDto;

export const GET_EXPENSE_BY_ID_ERRORS = {
  404: "Expense does not exist.",
};
