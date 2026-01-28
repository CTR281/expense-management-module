namespace WebApi.Application.Expenses.Commands.EditExpense;

internal sealed record EditExpenseCommand(
    Guid ExpenseId,
    decimal Amount,
    string CurrencyCode,
    Guid CategoryId);
