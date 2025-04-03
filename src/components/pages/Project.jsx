import { useParams } from "react-router-dom";
import styles from "./Project.module.css";
import { useEffect, useState } from "react";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";

export default function Project() {

  const { id } = useParams();
  const [project, setProject] = useState({});
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [message, setMessage] = useState()
  const [type, setType] = useState()

  useEffect(() => {

    setTimeout(() => {

      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((res) => {
        if(!res.ok) throw new Error(`Erro: ${res.status} - ${res.statusText}`);
        return res.json();
      }).then((data) => {
        console.log(`Dados recebidos ${data}`);
        setProject(data);
      }).catch((err) => console.log(err));
    }, 300)
  }, [id]);

  function editPost(project) {
    if(project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto!");
      setType("error");
      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(project),
    })
    .then((res) => res.json())
    .then((data) => {
      setProject(data)
      setShowProjectForm(false)
      setMessage("Projeto atualizado!");
      setType("success");
    })
    .catch((err) => console.log(err));
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  return (
    <>
      {
        project.name
        ? (
          <div className={styles.projectDetails}>
            <Container customClass="column">
              {message && <Message type={type} msg={message}/>}
              <div className={styles.detailsContainer}>
                <h1>Projeto: {project.name}</h1>
                <button onClick={toggleProjectForm} className={styles.btn}>
                  {
                    !showProjectForm
                    ? "Editar projeto"
                    : "Fechar"
                  }
                </button>

                {
                  !showProjectForm
                  ? (
                    <div className={styles.projectInfo}>
                      <p>
                        <span>Categoria: </span> {project.category.name}
                      </p>
                      <p>
                        <span>Total de Orçamento </span> R${project.budget}
                      </p>
                      <p>
                        <span>Total de Utilizado </span> R${project.cost}
                      </p>
                    </div>
                  )
                  : (
                    <div className={styles.projectInfo}>
                      <ProjectForm handleSubmit={editPost} btnText={"Concluir Edição"} projectData={project} />
                    </div>
                  )
                }
              </div>
            </Container>
          </div>
        )
        : (
          <Loading/>
        )
      }
    </>
  )
}