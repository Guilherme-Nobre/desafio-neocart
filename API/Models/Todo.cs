using Google.Cloud.Firestore;

namespace API.Models;

[FirestoreData]
public class Todo
{
    [FirestoreProperty]
    public string Id { get; set; } = string.Empty;

    [FirestoreProperty]
    public string Titulo { get; set; } = string.Empty;

    [FirestoreProperty]
    public string Descricao { get; set; } = string.Empty;

    [FirestoreProperty]
    public string Email { get; set; } = string.Empty;

    [FirestoreProperty]
    public string Arquivo { get; set; } = string.Empty;

    [FirestoreProperty]
    public string Status { get; set; } = string.Empty;

    public Todo() { }

    public Todo(string id, string titulo, string descricao, string email, string arquivo, string status)
    {
        Id = id;
        Titulo = titulo;
        Descricao = descricao;
        Email = email;
        Arquivo = arquivo;
        Status = status;
    }
}
