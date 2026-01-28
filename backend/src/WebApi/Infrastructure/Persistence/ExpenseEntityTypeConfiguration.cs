using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApi.Domain.Entities;
using WebApi.Domain.ValueObjects;

namespace WebApi.Infrastructure.Persistence;

internal sealed class ExpenseEntityTypeConfiguration : IEntityTypeConfiguration<Expense>
{
    public void Configure(EntityTypeBuilder<Expense> builder)
    {
        builder.ToTable("expenses");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id)
            .HasConversion(
                id => id.Value,
                value => ExpenseId.From(value));

        builder.Property(e => e.Owner)
            .HasConversion(
                id => id.Value,
                value => UserId.From(value));

        builder.Property(e => e.Category)
            .HasConversion(
                id => id.Value,
                value => CategoryId.From(value));

        builder.Property(e => e.Amount)
            .HasPrecision(18, 2);

        builder.Property(e => e.CurrencyCode)
            .HasMaxLength(3)
            .IsRequired();

        builder.Property(e => e.Date)
            .IsRequired();

        builder.Property(e => e.IsSubmitted)
            .IsRequired();

        builder.HasIndex(e => new { e.Owner, e.Date })
            .IsUnique();
    }
}
