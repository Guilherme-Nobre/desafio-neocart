import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './updateTask.module.css';
import axios from "axios";

interface Todo {
  id: string;
  titulo: string;
  descricao: string;
  email: string;
  arquivo: string;
  status: string;
}

const updateTask = () => {

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [email, setEmail] = useState("");
  const [arquivo, setArquivo] = useState("");
  const [arquivoTxt, setArquivoTxt] = useState("");
  const [status, setStatus] = useState("");

  const [data, setData] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5270/v1/todos")
      .then((res) => {
        setData(res.data);
        const task = res.data.find((task: Todo) => task.id === id);
        if (task) {
          setTitulo(task.titulo);
          setDescricao(task.descricao);
          setEmail(task.email);
          setArquivoTxt(task.arquivo);
          setStatus(task.status);
        }
        console.log(task);

        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });

  }, []);

  const handleDownload = (e: any) => {
    e.preventDefault();
    if (arquivoTxt) {
      const link = document.createElement("a");
      link.href = arquivoTxt;
      link.download = "decoded_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        setArquivo(base64String);
      };
    }
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = {
      id,
      titulo,
      descricao,
      email,
      arquivo,
      status
    };

    try {
      axios.put(`http://localhost:5270/v1/todos/${id}`, formData);
      alert("Tarefa alterada com sucesso!");
      navigate("/");

      const formBody = `
      Tarefa: ${titulo}
      <br>Descrição: ${descricao}
      <br>Status: ${status}
      `;

      if (status === "Concluída") {
        const formEmail = {
          Email: email,
          Body: formBody
        }
        try {
          const response = axios.post("http://localhost:5270/v1/email", formEmail, {
            headers: {
              "Content-Type": "application/json"
            }
          });
          console.log("E-mail enviado!");
          navigate('/');
        } catch (error) {
          console.error("Erro ao criar tarefa:", error);
        }
      }
    } catch (error) {
      alert("Erro ao tentar alterar tarefa.")      
    }

  }

  const handleDelete = () => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir?");
    if (confirmDelete) {
      axios.delete(`http://localhost:5270/v1/todos/${id}`)
        .then(() => {
          navigate("/");
          alert("Item excluído com sucesso!");
        }).catch(() => {
          alert("Erro ao excluir o item.");
        });
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Alterar Tarefa</h2>
      <form className={styles.form}>
        <label className={styles.label}>Tarefa:</label>
        <input className={styles.input} type="text" name="titulo" onChange={(e) => setTitulo(e.target.value)} value={titulo} required />

        <label className={styles.label}>Descreva sua tarefa:</label>
        <textarea className={styles.textarea} name="descricao" onChange={(e) => setDescricao(e.target.value)} value={descricao} required></textarea>

        <label className={styles.label}>E-mail para envio:</label>
        <input className={styles.input} type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required />

        <label className={styles.label}>Arquivo ou Imagem:</label>
        <input className={styles.input} type="file" name="arquivo" onChange={handleFileChange} />

        <button onClick={handleDownload} className={styles.save}>Download Arquivo</button>

        <label className={styles.label}>Status da Tarefa:</label>
        <select className={styles.select} name="status" onChange={(e) => setStatus(e.target.value)} value={status} required>
          <option value=""></option>
          <option value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Em atraso">Em atraso</option>
          <option value="Concluída">Concluída</option>
        </select>
      </form>
      <button onClick={handleSubmit} className={styles.save}>Alterar</button>
      <button onClick={handleDelete} className={styles.delete}>Excluir</button>
      <Link to="/" className={styles.back}>Voltar</Link>
    </div>
  )
}

export default updateTask;