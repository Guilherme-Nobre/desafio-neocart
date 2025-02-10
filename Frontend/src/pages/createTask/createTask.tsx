import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './createTask.module.css';

const createTask = () => {
  const [Titulo, setTitulo] = useState("");
  const [Descricao, setDescricao] = useState("");
  const [Email, setEmail] = useState("");
  const [Arquivo, setArquivo] = useState(""); // Será enviado
  const [Status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        setArquivo(base64String);
      };
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = {
      Id: crypto.randomUUID(),
      Titulo,
      Descricao,
      Email,
      Arquivo,
      Status
    };

    console.log(formData);

    try {
      const response = await axios.post("http://localhost:5270/v1/todos", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log("Tarefa criada com sucesso:", response.data);
      navigate('/');
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Criar Tarefa</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Tarefa:</label>
        <input className={styles.input} type="text" name="Titulo" onChange={(e) => setTitulo(e.target.value)} value={Titulo} required />

        <label className={styles.label}>Descreva sua tarefa:</label>
        <textarea className={styles.textarea} name="Descricao" onChange={(e) => setDescricao(e.target.value)} value={Descricao} required></textarea>

        <label className={styles.label}>E-mail para envio:</label>
        <input className={styles.input} type="Email" name="Email" onChange={(e) => setEmail(e.target.value)} value={Email} required />

        <label className={styles.label}>Arquivo ou Imagem:</label>
        <input className={styles.input} type="file" name="Arquivo" onChange={handleFileChange} accept="image/*" required />

        <label className={styles.label}>Status da Tarefa:</label>
        <select className={styles.select} name="Status" onChange={(e) => setStatus(e.target.value)} value={Status} required>
          <option value=""></option>
          <option value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Em atraso">Em atraso</option>
          <option value="Concluída">Concluída</option>
        </select>

        <button type="submit" className={styles.save}>Salvar</button>
      </form>
      <Link to="/" className={styles.back}>Voltar</Link>
    </div>
  );
};

export default createTask;
