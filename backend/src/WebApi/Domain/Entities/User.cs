using WebApi.Domain.ValueObjects;

namespace WebApi.Domain.Entities;

internal sealed class User
{
    public UserId Id { get; set; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
}