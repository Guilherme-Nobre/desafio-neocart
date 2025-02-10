using System;
using Flunt.Notifications;
using Flunt.Validations;
using API.Models;

namespace API.ViewModels
{
    public class CreateTodoViewModel : Notifiable<Notification>
    {
        public string? Id { get; set; }
        public string? Titulo { get; set; }
        public string? Descricao { get; set; }
        public string? Email { get; set; }
        public string? Arquivo { get; set; }
        public string? Status { get; set; }

        public Todo? MapTo()
        {
            var contract = new Contract<Notification>()
                .Requires()
                .IsNotNullOrEmpty(Titulo, "Titulo", "Informe o título da tarefa!")
                .IsNotNullOrEmpty(Descricao, "Descricao", "Informe a descrição da tarefa!")
                .IsNotNullOrEmpty(Email, "Email", "Informe o E-mail da tarefa!")
                .IsNotNullOrEmpty(Arquivo, "Arquivo", "Insira o arquivo da tarefa!")
                .IsNotNullOrEmpty(Status, "Status", "Informe o Status da tarefa!")
                .IsGreaterOrEqualsThan(Titulo, 5, "Titulo", "O título deve ter mais de 5 caracteres")
                .IsGreaterOrEqualsThan(Descricao, 5, "Descricao", "A descrição deve ter mais de 5 caracteres")
                .IsGreaterOrEqualsThan(Email, 5, "Email", "O e-mail deve ter mais de 5 caracteres");


            AddNotifications(contract);

            if (!IsValid)
                return null;

            return new Todo(Id, Titulo, Descricao, Email, Arquivo, Status);
        }
    }
}
