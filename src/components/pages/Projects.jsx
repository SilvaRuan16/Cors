import { useLocation } from "react-router-dom";
import Message from "../layout/Message";
import styles from "./Projects.module.css";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import Loading from "../layout/Loading";
import ProjectCard from "../project/ProjectCard";
import { useState, useEffect } from "react";

export default function Projects() {

  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState("");

  const location = useLocation();
  let message = location.state ? location.state.message : "";

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProjects(data || []);
        setRemoveLoading(true);
      })
      .catch((e) => console.log(e));
    }, 300)
  }, []);

  function removeProject(id) {

    fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => res.json)
    .then(() => {
      setProjects(projects.filter((project) => project.id !== id));
      setProjectMessage("Projeto removido com Sucesso!");
    })
    .catch((err) => console.log(err));

  }

  return (
    <div className={styles.projectContainer}>
      <div className={styles.titleContainer}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newProject" text="Novo Projeto" />
      </div>
      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}

      <Container customClass = "start">
        {
          projects.length > 0 && projects.map((project) => (
            <ProjectCard
              id={project.id}
              name={project.name}
              budget={project.budget ?? "Indefinido"}
              category={project.category ? project.category.name : "Categoria Indefinida"}
              key={project.id}
              handleRemove={removeProject}
            />
          ))
        }
        {
          !removeLoading && <Loading/>
        }
        {
          removeLoading && projects.length === 0 && (
            <p>Não há projetos cadastrados!</p>
          )
        }
      </Container>
    </div>
  );
}