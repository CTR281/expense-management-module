using WebApi.Domain.ValueObjects;

namespace WebApi.Domain.Entities;

internal sealed class Expense
{
    public ExpenseId Id { get; set; }
    public DateOnly Date { get; init; }
    public UserId Owner { get; init; }
    public decimal Amount { get; init; }
    public required string CurrencyCode { get; init; }
    public CategoryId Category { get; init; }
    public bool IsSubmitted { get; private set; }

    public void Submit()
    {
        IsSubmitted = true;
    }
}