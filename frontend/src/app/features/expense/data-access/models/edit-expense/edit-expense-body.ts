export interface EditExpenseBodyDto {
  amount: number;
  categoryId: string;
  currencyCode: string;
}

export enum EDIT_EXPENSE_ERRORS {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}
