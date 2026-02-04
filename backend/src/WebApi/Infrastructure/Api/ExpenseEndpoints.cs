using Microsoft.AspNetCore.Http.HttpResults;
using WebApi.Application.Common;
using WebApi.Application.Expenses.Commands.CreateExpense;
using WebApi.Application.Expenses.Commands.DeleteExpense;
using WebApi.Application.Expenses.Commands.EditExpense;
using WebApi.Application.Expenses.Commands.SubmitExpense;
using WebApi.Application.Expenses.Queries.CheckExpenseUniqueness;
using WebApi.Application.Expenses.Queries.GetExpenseById;
using WebApi.Application.Expenses.Queries.GetExpenses;

namespace WebApi.Infrastructure.Api;

internal static class ExpenseEndpoints
{
    public static IEndpointRouteBuilder MapExpenseEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints.MapGroup("/expenses")
            .WithTags("Expenses")
            .WithOpenApi();

        group.MapGet("/{id:guid}", async Task<Results<Ok<ExpenseDto>, NotFound>> (
            Guid id,
            GetExpenseByIdQueryHandler handler,
            CancellationToken cancellationToken) =>
        {
            var query = new GetExpenseByIdQuery(id);
            var expense = await handler.Handle(query, cancellationToken);
            return expense is not null ? TypedResults.Ok(expense) : TypedResults.NotFound();
        })
        .WithName("GetExpenseById")
        .WithSummary("Get an expense by ID");

        group.MapGet("/", async Task<Ok<PaginatedResult<ExpenseDto>>> (
            GetExpensesQueryHandler handler,
            CancellationToken cancellationToken,
            Guid? userId = null,
            Guid? categoryId = null,
            DateOnly? fromDate = null,
            DateOnly? toDate = null,
            int page = 1,
            int pageSize = 10) =>
        {
            var query = new GetExpensesQuery(userId, categoryId, fromDate, toDate, page, pageSize);
            var expenses = await handler.Handle(query, cancellationToken);
            return TypedResults.Ok(expenses);
        })
        .WithName("GetExpenses")
        .WithSummary("Get all expenses with optional filters and pagination");

        group.MapGet("/unique", async Task<Ok<bool>> (
            CheckExpenseUniquenessQueryHandler handler,
            CancellationToken cancellationToken,
            Guid userId,
            DateOnly date) =>
        {
            var query = new CheckExpenseUniquenessQuery(userId, date);
            var exists = await handler.Handle(query, cancellationToken);
            return TypedResults.Ok(exists);
        })
        .WithName("CheckExpenseUniqueness")
        .WithSummary("Check if an expense is a unique for a user on a specific date");

        group.MapPost("/", async Task<Results<Created<Guid>, BadRequest<string>>> (
            CreateExpenseRequest request,
            CreateExpenseCommandHandler handler,
            CancellationToken cancellationToken) =>
        {
            try
            {
                var command = new CreateExpenseCommand(
                    request.Date,
                    request.OwnerId,
                    request.Amount,
                    request.CurrencyCode,
                    request.CategoryId);

                var expenseId = await handler.Handle(command, cancellationToken);
                return TypedResults.Created($"/expenses/{expenseId}", expenseId);
            }
            catch (InvalidOperationException ex)
            {
                return TypedResults.BadRequest(ex.Message);
            }
        })
        .WithName("CreateExpense")
        .WithSummary("Create a new expense");

        group.MapPut("/{id:guid}", async Task<Results<NoContent, NotFound, BadRequest<string>>> (
            Guid id,
            EditExpenseRequest request,
            EditExpenseCommandHandler handler,
            CancellationToken cancellationToken) =>
        {
            try
            {
                var command = new EditExpenseCommand(
                    id,
                    request.Amount,
                    request.CurrencyCode,
                    request.CategoryId);

                await handler.Handle(command, cancellationToken);
                return TypedResults.NoContent();
            }
            catch (InvalidOperationException ex) when (ex.Message.Contains("not found"))
            {
                return TypedResults.NotFound();
            }
            catch (InvalidOperationException ex)
            {
                return TypedResults.BadRequest(ex.Message);
            }
        })
        .WithName("EditExpense")
        .WithSummary("Edit an existing expense");

        group.MapDelete("/{id:guid}", async Task<Results<NoContent, NotFound, BadRequest<string>>> (
            Guid id,
            DeleteExpenseCommandHandler handler,
            CancellationToken cancellationToken) =>
        {
            try
            {
                var command = new DeleteExpenseCommand(id);
                await handler.Handle(command, cancellationToken);
                return TypedResults.NoContent();
            }
            catch (InvalidOperationException ex) when (ex.Message.Contains("not found"))
            {
                return TypedResults.NotFound();
            }
            catch (InvalidOperationException ex)
            {
                return TypedResults.BadRequest(ex.Message);
            }
        })
        .WithName("DeleteExpense")
        .WithSummary("Delete an expense");

        group.MapPost("/{id:guid}/submit", async Task<Results<NoContent, NotFound>> (
            Guid id,
            SubmitExpenseCommandHandler handler,
            CancellationToken cancellationToken) =>
        {
            try
            {
                var command = new SubmitExpenseCommand(id);
                await handler.Handle(command, cancellationToken);
                return TypedResults.NoContent();
            }
            catch (InvalidOperationException ex) when (ex.Message.Contains("not found"))
            {
                return TypedResults.NotFound();
            }
        })
        .WithName("SubmitExpense")
        .WithSummary("Submit an expense");

        return endpoints;
    }

    private sealed record CreateExpenseRequest(
        DateOnly Date,
        Guid OwnerId,
        decimal Amount,
        string CurrencyCode,
        Guid CategoryId);

    private sealed record EditExpenseRequest(
        decimal Amount,
        string CurrencyCode,
        Guid CategoryId);
}
