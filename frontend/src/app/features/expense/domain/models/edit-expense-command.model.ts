export interface EditExpenseCommand {
  id: string;
  amount: number;
  categoryId: string;
  currencyCode: string;
}

export function toEditExpenseBodyDto(command: EditExpenseCommand) {
  return {
    amount: command.amount,
    categoryId: command.categoryId,
    currencyCode: command.currencyCode,
  };
}
