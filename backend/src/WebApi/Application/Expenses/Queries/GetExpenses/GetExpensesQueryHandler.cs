using Microsoft.EntityFrameworkCore;
using WebApi.Application.Common;
using WebApi.Application.Expenses.Queries.GetExpenseById;
using WebApi.Domain.Entities;
using WebApi.Domain.ValueObjects;
using WebApi.Infrastructure.Persistence;

namespace WebApi.Application.Expenses.Queries.GetExpenses;

internal sealed class GetExpensesQueryHandler(AppDbContext dbContext)
{
    public async Task<PaginatedResult<ExpenseDto>> Handle(GetExpensesQuery query, CancellationToken cancellationToken)
    {
        var expensesQuery = dbContext.Set<Expense>().AsQueryable();

        if (query.UserId.HasValue)
        {
            var userId = UserId.From(query.UserId.Value);
            expensesQuery = expensesQuery.Where(e => e.Owner == userId);
        }

        if (query.CategoryId.HasValue)
        {
            var categoryId = CategoryId.From(query.CategoryId.Value);
            expensesQuery = expensesQuery.Where(e => e.Category == categoryId);
        }

        if (query.FromDate.HasValue)
        {
            expensesQuery = expensesQuery.Where(e => e.Date >= query.FromDate.Value);
        }

        if (query.ToDate.HasValue)
        {
            expensesQuery = expensesQuery.Where(e => e.Date <= query.ToDate.Value);
        }

        var totalCount = await expensesQuery.CountAsync(cancellationToken);

        var expenses = await expensesQuery
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync(cancellationToken);

        var items = expenses.Select(e => new ExpenseDto(
            e.Id.Value,
            e.Date,
            e.Owner.Value,
            e.Amount,
            e.CurrencyCode,
            e.Category.Value,
            e.IsSubmitted)).ToList();

        return new PaginatedResult<ExpenseDto>(items, totalCount, query.Page, query.PageSize);
    }
}
