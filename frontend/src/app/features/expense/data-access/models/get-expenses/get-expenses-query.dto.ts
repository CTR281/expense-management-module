export interface GetExpensesQueryDto {
  userId: string;
  categoryId: string;
  fromDate: string;
  toDate: string;
  page: number;
  pageSize: number;
}
