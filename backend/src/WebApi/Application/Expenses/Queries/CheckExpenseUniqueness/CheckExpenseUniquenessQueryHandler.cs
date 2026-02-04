using Microsoft.EntityFrameworkCore;
using WebApi.Domain.Entities;
using WebApi.Domain.ValueObjects;
using WebApi.Infrastructure.Persistence;

namespace WebApi.Application.Expenses.Queries.CheckExpenseUniqueness;

internal sealed class CheckExpenseUniquenessQueryHandler(AppDbContext dbContext)
{
    public async Task<bool> Handle(CheckExpenseUniquenessQuery query, CancellationToken cancellationToken)
    {
        var ownerId = UserId.From(query.UserId);
        return !await dbContext.Set<Expense>()
            .AnyAsync(e => e.Owner == ownerId && e.Date == query.Date, cancellationToken);
    }
}
