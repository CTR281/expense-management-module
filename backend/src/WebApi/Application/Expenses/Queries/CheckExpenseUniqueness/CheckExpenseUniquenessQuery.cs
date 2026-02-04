namespace WebApi.Application.Expenses.Queries.CheckExpenseUniqueness;

internal sealed record CheckExpenseUniquenessQuery(Guid UserId, DateOnly Date);
