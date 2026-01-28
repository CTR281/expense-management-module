using Microsoft.EntityFrameworkCore;
using WebApi.Domain.Entities;
using WebApi.Domain.ValueObjects;

namespace WebApi.Infrastructure.Persistence;

internal sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new ExpenseEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new CategoryEntityTypeConfiguration());
    }

    internal static async Task SeedAsync(DbContext context, CancellationToken cancellationToken)
    {
        if (!context.Set<User>().Any())
        {
            context.Set<User>().Add(new User { Id = UserId.New(), FirstName = "Juste", LastName = "Leblanc" });
            context.Set<User>().Add(new User { Id = UserId.New(), FirstName = "Marc", LastName = "Assin" });
            context.Set<User>().Add(new User { Id = UserId.New(), FirstName = "Alain", LastName = "Térieur" });
            context.Set<User>().Add(new User { Id = UserId.New(), FirstName = "Alex", LastName = "Térieur" });
            context.Set<User>().Add(new User { Id = UserId.New(), FirstName = "Jean", LastName = "Bon" });
            await context.SaveChangesAsync(cancellationToken);
        }

        if (!context.Set<Category>().Any())
        {
            context.Set<Category>().Add(new Category { Id = CategoryId.New(), Name = "Travel" });
            context.Set<Category>().Add(new Category { Id = CategoryId.New(), Name = "Food" });
            context.Set<Category>().Add(new Category { Id = CategoryId.New(), Name = "Accommodation" });
            context.Set<Category>().Add(new Category { Id = CategoryId.New(), Name = "Transportation" });
            context.Set<Category>().Add(new Category { Id = CategoryId.New(), Name = "Entertainment" });
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}