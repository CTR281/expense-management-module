using Microsoft.EntityFrameworkCore;
using WebApi.Domain.Entities;
using WebApi.Domain.ValueObjects;
using WebApi.Infrastructure.Persistence;

namespace WebApi.Application.Expenses.Commands.DeleteExpense;

internal sealed class DeleteExpenseCommandHandler(AppDbContext dbContext)
{
    public async Task Handle(DeleteExpenseCommand command, CancellationToken cancellationToken)
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
            throw new InvalidOperationException($"Cannot delete a submitted expense");
        }

        dbContext.Set<Expense>().Remove(expense);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
