namespace WebApi.Application.Expenses.Queries.GetExpenses;

internal sealed record GetExpensesQuery(
    Guid? UserId = null,
    Guid? CategoryId = null,
    DateOnly? FromDate = null,
    DateOnly? ToDate = null,
    int Page = 1,
    int PageSize = 10);
