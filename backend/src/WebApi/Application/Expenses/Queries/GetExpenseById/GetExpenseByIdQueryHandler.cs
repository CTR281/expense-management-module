using Microsoft.EntityFrameworkCore;
using WebApi.Domain.Entities;
using WebApi.Domain.ValueObjects;
using WebApi.Infrastructure.Persistence;

namespace WebApi.Application.Expenses.Queries.GetExpenseById;

internal sealed class GetExpenseByIdQueryHandler(AppDbContext dbContext)
{
    public async Task<ExpenseDto?> Handle(GetExpenseByIdQuery query, CancellationToken cancellationToken)
    {
        var expenseId = ExpenseId.From(query.ExpenseId);

        var expense = await dbContext.Set<Expense>()
            .FirstOrDefaultAsync(e => e.Id == expenseId, cancellationToken);

        if (expense is null)
        {
            return null;
        }

        return new ExpenseDto(
            expense.Id.Value,
            expense.Date,
            expense.Owner.Value,
            expense.Amount,
            expense.CurrencyCode,
            expense.Category.Value,
            expense.IsSubmitted);
    }
}
