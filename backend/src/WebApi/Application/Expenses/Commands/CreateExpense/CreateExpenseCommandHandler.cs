using Microsoft.EntityFrameworkCore;
using WebApi.Domain.Entities;
using WebApi.Domain.ValueObjects;
using WebApi.Infrastructure.Persistence;

namespace WebApi.Application.Expenses.Commands.CreateExpense;

internal sealed class CreateExpenseCommandHandler(AppDbContext dbContext)
{
    public async Task<Guid> Handle(CreateExpenseCommand command, CancellationToken cancellationToken)
    {
        var ownerId = UserId.From(command.OwnerId);

        // Check uniqueness: one expense per user per day
        var existingExpense = await dbContext.Set<Expense>()
            .FirstOrDefaultAsync(e => e.Owner == ownerId && e.Date == command.Date, cancellationToken);

        if (existingExpense is not null)
        {
            throw new InvalidOperationException($"An expense already exists for user {command.OwnerId} on {command.Date}");
        }

        var expense = new Expense
        {
            Id = ExpenseId.New(),
            Date = command.Date,
            Owner = ownerId,
            Amount = command.Amount,
            CurrencyCode = command.CurrencyCode,
            Category = CategoryId.From(command.CategoryId)
        };

        dbContext.Set<Expense>().Add(expense);
        await dbContext.SaveChangesAsync(cancellationToken);

        return expense.Id.Value;
    }
}
