using Microsoft.EntityFrameworkCore;
using WebApi.Domain.Entities;
using WebApi.Domain.ValueObjects;
using WebApi.Infrastructure.Persistence;

namespace WebApi.Application.Expenses.Commands.EditExpense;

internal sealed class EditExpenseCommandHandler(AppDbContext dbContext)
{
    public async Task Handle(EditExpenseCommand command, CancellationToken cancellationToken)
    {
        var expenseId = ExpenseId.From(command.ExpenseId);

        var expense = await dbContext.Set<Expense>()
            .FirstOrDefaultAsync(e => e.Id == expenseId, cancellationToken);

        if (expense is null)
        {
            throw new InvalidOperationException($"Expense {command.ExpenseId} not found");
        }

        if (expense.IsSubmitted)
        {
            throw new InvalidOperationException($"Cannot edit a submitted expense");
        }

        // Since properties are init-only, we need to use EF Core's entry update
        dbContext.Entry(expense).CurrentValues.SetValues(new Expense
        {
            Id = expense.Id,
            Date = expense.Date,
            Owner = expense.Owner,
            Amount = command.Amount,
            CurrencyCode = command.CurrencyCode,
            Category = CategoryId.From(command.CategoryId)
        });

        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
