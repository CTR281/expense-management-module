namespace WebApi.Application.Categories.Queries.GetCategories;

internal sealed record GetCategoriesQuery(
    string? Name = null,
    int Page = 1,
    int PageSize = 10);
