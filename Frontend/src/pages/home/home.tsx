import { useEffect, useState } from "react";
import styles from "./home.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

interface Todo {
  id: string;
  titulo: string;
  descricao: string;
  email: string;
  arquivo: string;
  status: string;
}

const Home = () => {
  const [data, setData] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5270/v1/todos")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      
      <div className={styles.pendente}>
        <h3>Pendente</h3>
        {data
          .filter((task) => task.status === "Pendente")
          .map((task) => (
            <NavLink to={`/updateTask/${task.id}`} className={styles.tasks} key={task.id}>
              <h4>Título: {task.titulo}</h4>
              <p className={styles.descricao}>{task.descricao}</p>
              <p className={styles.status}>Status: {task.status}</p>
              <p className={styles.id}>Id: {task.id}</p>
            </NavLink>
          ))}
      </div>

      <div className={styles.emAndamento}>
        <h3>Em andamento</h3>
        {data
          .filter((task) => task.status === "Em andamento")
          .map((task) => (
            <NavLink to={`/updateTask/${task.id}`} className={styles.tasks} key={task.id}>
              <h4>Título: {task.titulo}</h4>
              <p className={styles.descricao}>{task.descricao}</p>
              <p className={styles.status}>Status: {task.status}</p>
              <p className={styles.id}>Id: {task.id}</p>
            </NavLink>
          ))}
      </div>

      <div className={styles.emAtraso}>
        <h3>Em atraso</h3>
        {data
          .filter((task) => task.status === "Em atraso")
          .map((task) => (
            <NavLink to={`/updateTask/${task.id}`} className={styles.tasks} key={task.id}>
              <h4>Título: {task.titulo}</h4>
              <p className={styles.descricao}>{task.descricao}</p>
              <p className={styles.status}>Status: {task.status}</p>
              <p className={styles.id}>Id: {task.id}</p>
            </NavLink>
          ))}
      </div>

      <div className={styles.concluida}>
        <h3>Concluída</h3>
        {data
          .filter((task) => task.status === "Concluída")
          .map((task) => (
            <NavLink to={`/updateTask/${task.id}`} className={styles.tasks} key={task.id}>
              <h4>Título: {task.titulo}</h4>
              <p className={styles.descricao}>{task.descricao}</p>
              <p className={styles.status}>Status: {task.status}</p>
              <p className={styles.id}>Id: {task.id}</p>
            </NavLink>
          ))}
      </div>

    </div>
  );
};

export default Home;
