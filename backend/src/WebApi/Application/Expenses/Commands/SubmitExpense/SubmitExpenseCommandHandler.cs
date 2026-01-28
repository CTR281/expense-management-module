using Microsoft.EntityFrameworkCore;
using WebApi.Domain.Entities;
using WebApi.Domain.ValueObjects;
using WebApi.Infrastructure.Persistence;

namespace WebApi.Application.Expenses.Commands.SubmitExpense;

internal sealed class SubmitExpenseCommandHandler(AppDbContext dbContext)
{
    public async Task Handle(SubmitExpenseCommand command, CancellationToken cancellationToken)
    {
        var expenseId = ExpenseId.From(command.ExpenseId);

        var expense = await dbContext.Set<Expense>()
            .FirstOrDefaultAsync(e => e.Id == expenseId, cancellationToken);

        if (expense is null)
        {
            throw new InvalidOperationException($"Expense {command.ExpenseId} not found");
        }

        expense.Submit();
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
