export interface CreateExpenseBodyDto {
  amount: number;
  categoryId: string;
  currencyCode: string;
  date: string;
  ownerId: string;
}
