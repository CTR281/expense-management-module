using WebApi.Domain.ValueObjects;

namespace WebApi.Application.Expenses.Commands.CreateExpense;

internal sealed record CreateExpenseCommand(
    DateOnly Date,
    Guid OwnerId,
    decimal Amount,
    string CurrencyCode,
    Guid CategoryId);
