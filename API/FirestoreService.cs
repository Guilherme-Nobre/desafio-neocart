using Google.Cloud.Firestore;
using API.Models;

public class FirestoreService
{
    private readonly FirestoreDb _firestoreDb;

    public FirestoreService()
    {
        string path = Path.Combine(Directory.GetCurrentDirectory(), "firebase-config.json");
        Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", path);
        _firestoreDb = FirestoreDb.Create("neocart-5b1db");
    }

    public async Task<List<Todo>> GetTodosAsync()
    {
        Query query = _firestoreDb.Collection("Todos");
        QuerySnapshot snapshot = await query.GetSnapshotAsync();
        List<Todo> TodoList = new();

        foreach (DocumentSnapshot document in snapshot.Documents)
        {
            if (document.Exists)
            {
                Todo todo = document.ConvertTo<Todo>();

                todo.Id = document.Id;

                TodoList.Add(todo);
            }
        }

        return TodoList;
    }


    public async Task AddTodoAsync(Todo Todo)
    {
        CollectionReference collection = _firestoreDb.Collection("Todos");
        await collection.AddAsync(Todo);
    }

    public async Task<bool> UpdateTodoAsync(string id, Todo todo)
    {
        DocumentReference docRef = _firestoreDb.Collection("Todos").Document(id);

        DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();
        if (!snapshot.Exists)
            return false;

        await docRef.SetAsync(todo, SetOptions.MergeAll);
        return true;
    }


    public async Task<bool> DeleteTodoAsync(string id)
    {
        DocumentReference docRef = _firestoreDb.Collection("Todos").Document(id);

        DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();
        if (!snapshot.Exists)
            return false;

        await docRef.DeleteAsync();
        return true;
    }


}