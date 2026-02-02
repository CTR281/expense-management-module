export interface ExpenseDto {
  id: string;
  date: string;
  ownerId: string;
  amount: number;
  currencyCode: string;
  categoryId: string;
  isSubmitted: boolean;
}
