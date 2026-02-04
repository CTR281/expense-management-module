using WebApi.Application.Categories.Queries.GetCategories;
using WebApi.Application.Expenses.Commands.CreateExpense;
using WebApi.Application.Expenses.Commands.DeleteExpense;
using WebApi.Application.Expenses.Commands.EditExpense;
using WebApi.Application.Expenses.Commands.SubmitExpense;
using WebApi.Application.Expenses.Queries.CheckExpenseUniqueness;
using WebApi.Application.Expenses.Queries.GetExpenseById;
using WebApi.Application.Expenses.Queries.GetExpenses;
using WebApi.Application.Users.Queries.GetUsers;

namespace WebApi.Infrastructure.Api;

internal static class DependencyInjectionExtensions
{
    public static IServiceCollection AddPersistence(this IServiceCollection services)
    {
        // Register command handlers
        services.AddScoped<CreateExpenseCommandHandler>();
        services.AddScoped<EditExpenseCommandHandler>();
        services.AddScoped<DeleteExpenseCommandHandler>();
        services.AddScoped<SubmitExpenseCommandHandler>();

        // Register query handlers
        services.AddScoped<CheckExpenseUniquenessQueryHandler>();
        services.AddScoped<GetExpenseByIdQueryHandler>();
        services.AddScoped<GetExpensesQueryHandler>();
        services.AddScoped<GetCategoriesQueryHandler>();
        services.AddScoped<GetUsersQueryHandler>();

        return services;
    }
}
