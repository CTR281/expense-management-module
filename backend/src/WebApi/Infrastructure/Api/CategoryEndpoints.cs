using Microsoft.AspNetCore.Http.HttpResults;
using WebApi.Application.Categories.Queries.GetCategories;
using WebApi.Application.Common;

namespace WebApi.Infrastructure.Api;

internal static class CategoryEndpoints
{
    public static IEndpointRouteBuilder MapCategoryEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints.MapGroup("/categories")
            .WithTags("Categories")
            .WithOpenApi();

        group.MapGet("/", async Task<Ok<PaginatedResult<CategoryDto>>> (
            GetCategoriesQueryHandler handler,
            CancellationToken cancellationToken,
            string? name = null,
            int page = 1,
            int pageSize = 10) =>
        {
            var query = new GetCategoriesQuery(name, page, pageSize);
            var categories = await handler.Handle(query, cancellationToken);
            return TypedResults.Ok(categories);
        })
        .WithName("GetCategories")
        .WithSummary("Get all categories with optional name filter and pagination");

        return endpoints;
    }
}
