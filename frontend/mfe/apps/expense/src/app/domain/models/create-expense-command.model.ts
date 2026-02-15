export interface CreateExpenseCommand {
  amount: number;
  categoryId: string;
  currencyCode: string;
  date: string;
}

export function toCreateExpenseRequestDto(
  command: CreateExpenseCommand,
  ownerId: string
) {
  return {
    ...command,
    ownerId,
  };
}
