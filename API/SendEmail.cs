using System.Net.Mail;
using System;

namespace EnviaEmailAPI.Services
{
    public static class SendEmail
    {
        public static void Send(string email, string body)
        {
            MailMessage emailMessage = new MailMessage();
            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com", 587)
                {
                    EnableSsl = true,
                    Timeout = 60000,
                    UseDefaultCredentials = false,
                    Credentials = new System.Net.NetworkCredential("guilhermenobrega0906@gmail.com", "hsyd wpki nsrm gejl")
                };

                emailMessage.From = new MailAddress("guilhermenobrega0906@gmail.com", "Guilherme Nóbrega");
                emailMessage.Body = body;
                emailMessage.Subject = "Notificação";
                emailMessage.IsBodyHtml = true;
                emailMessage.Priority = MailPriority.Normal;
                emailMessage.To.Add(email);

                smtpClient.Send(emailMessage);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao enviar email: {ex.Message}");
            }
        }
    }
}
