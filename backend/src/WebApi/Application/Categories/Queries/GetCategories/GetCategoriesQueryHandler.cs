using Microsoft.EntityFrameworkCore;
using WebApi.Application.Common;
using WebApi.Domain.Entities;
using WebApi.Infrastructure.Persistence;

namespace WebApi.Application.Categories.Queries.GetCategories;

internal sealed class GetCategoriesQueryHandler(AppDbContext dbContext)
{
    public async Task<PaginatedResult<CategoryDto>> Handle(GetCategoriesQuery query, CancellationToken cancellationToken)
    {
        var categoriesQuery = dbContext.Set<Category>().AsQueryable();

        if (!string.IsNullOrWhiteSpace(query.Name))
        {
            categoriesQuery = categoriesQuery.Where(c => c.Name.Contains(query.Name));
        }

        var totalCount = await categoriesQuery.CountAsync(cancellationToken);

        var categories = await categoriesQuery
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync(cancellationToken);

        var items = categories.Select(c => new CategoryDto(c.Id.Value, c.Name)).ToList();

        return new PaginatedResult<CategoryDto>(items, totalCount, query.Page, query.PageSize);
    }
}
