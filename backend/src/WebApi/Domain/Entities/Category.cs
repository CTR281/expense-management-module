using WebApi.Domain.ValueObjects;

namespace WebApi.Domain.Entities;

internal sealed class Category
{
    public CategoryId Id { get; set; }
    public required string Name { get; init; }
}