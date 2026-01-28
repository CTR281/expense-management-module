namespace WebApi.Domain.ValueObjects;

internal readonly record struct ExpenseId(Guid Value)
{
    public static ExpenseId New() => new(Guid.NewGuid());
    public static ExpenseId From(Guid value) => new(value);
    public override string ToString() => Value.ToString();
}
