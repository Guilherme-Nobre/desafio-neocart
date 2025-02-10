using API.Models;
using EnviaEmailAPI.Services;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

var builder = WebApplication.CreateBuilder(args);

string credentialsPath = "firebase-config.json";
Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", credentialsPath);

builder.Services.AddSingleton<FirestoreService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();

var firestoreService = app.Services.GetRequiredService<FirestoreService>();

app.MapGet("v1/todos", async (FirestoreService firestoreService) =>
{
    var todos = await firestoreService.GetTodosAsync();
    return Results.Ok(todos);
});

app.MapPost("v1/todos", async (FirestoreService firestoreService, Todo todo) =>
{
    await firestoreService.AddTodoAsync(todo);
    return Results.Created($"/v1/todos/{todo.Id}", todo);
});

app.MapPut("v1/todos/{id}", async (string id, FirestoreService firestoreService, Todo todo) =>
{
    var success = await firestoreService.UpdateTodoAsync(id, todo);
    if (!success) return Results.NotFound("Tarefa não encontrada");
    return Results.Ok(todo);
});

app.MapDelete("v1/todos/{id}", async (string id, FirestoreService firestoreService) =>
{
    var success = await firestoreService.DeleteTodoAsync(id);
    if (!success) return Results.NotFound("Tarefa não encontrada");
    return Results.NoContent();
});

app.MapPost("v1/email", async (HttpContext context) =>
{
    try
    {
        var request = await context.Request.ReadFromJsonAsync<EmailRequest>();
        if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Body))
        {
            return Results.BadRequest("O email e o corpo do email são obrigatórios.");
        }

        SendEmail.Send(request.Email, request.Body);
        return Results.Ok("Email enviado com sucesso!");
    }
    catch (Exception ex)
    {
        return Results.Problem($"Erro ao processar o envio do e-mail: {ex.Message}");
    }
});

app.UseCors("AllowAllOrigins");
app.UseAuthorization();
app.MapControllers();
app.Run();
