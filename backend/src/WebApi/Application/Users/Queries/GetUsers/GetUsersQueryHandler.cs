using Microsoft.EntityFrameworkCore;
using WebApi.Domain.Entities;
using WebApi.Infrastructure.Persistence;

namespace WebApi.Application.Users.Queries.GetUsers;

internal sealed class GetUsersQueryHandler(AppDbContext dbContext)
{
    public async Task<List<UserDto>> Handle(GetUsersQuery query, CancellationToken cancellationToken)
    {
        var users = await dbContext.Set<User>().ToListAsync(cancellationToken);

        return users.Select(u => new UserDto(u.Id.Value, $"{u.FirstName} {u.LastName}")).ToList();
    }
}
