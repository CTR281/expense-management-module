using Microsoft.AspNetCore.Http.HttpResults;
using WebApi.Application.Users.Queries.GetUsers;

namespace WebApi.Infrastructure.Api;

internal static class UserEndpoints
{
    public static IEndpointRouteBuilder MapUserEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints.MapGroup("/users")
            .WithTags("Users")
            .WithOpenApi();

        group.MapGet("/", async Task<Ok<List<UserDto>>> (
            GetUsersQueryHandler handler,
            CancellationToken cancellationToken) =>
        {
            var query = new GetUsersQuery();
            var users = await handler.Handle(query, cancellationToken);
            return TypedResults.Ok(users);
        })
        .WithName("GetUsers")
        .WithSummary("Get all users")
        .WithDescription("Retrieves a list of all users in the system. Each user contains an ID and full name.");

        return endpoints;
    }
}