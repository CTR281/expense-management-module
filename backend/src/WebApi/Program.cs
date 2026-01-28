using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;
using Scalar.AspNetCore;
using WebApi.Infrastructure.Api;
using WebApi.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("ExpenseDb"));

builder.Services
    .AddOpenApi()
    .AddPersistence();
builder.Services.AddHealthChecks();

var app = builder.Build();

// Seed the in-memory database
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await AppDbContext.SeedAsync(dbContext, CancellationToken.None);
}

app.MapOpenApi();
app.MapScalarApiReference();
app.MapGet("/", () => Results.Redirect("/scalar"));

app.MapUserEndpoints();
app.MapExpenseEndpoints();
app.MapCategoryEndpoints();
app.MapHealthChecks("/health");

app.Run();

[SuppressMessage("ReSharper", "ClassNeverInstantiated.Global")]
public partial class Program;