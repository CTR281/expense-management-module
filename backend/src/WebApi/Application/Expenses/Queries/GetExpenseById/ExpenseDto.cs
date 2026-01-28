namespace WebApi.Application.Expenses.Queries.GetExpenseById;

internal sealed record ExpenseDto(
    Guid Id,
    DateOnly Date,
    Guid OwnerId,
    decimal Amount,
    string CurrencyCode,
    Guid CategoryId,
    bool IsSubmitted);
