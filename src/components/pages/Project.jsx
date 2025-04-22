import { parse, v4 as uuidv4 } from "uuid";

import { useParams } from "react-router-dom";
import styles from "./Project.module.css";
import { useEffect, useState } from "react";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";

export default function Project() {

  const { id } = useParams();
  const [project, setProject] = useState({});
  const [services, setServices] = useState({})
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
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
          if (!res.ok) throw new Error(`Erro: ${res.status} - ${res.statusText}`);
          return res.json();
        }).then((data) => {
          console.log(`Dados recebidos ${data}`);
          setProject(data);
          setServices(data.services);
        }).catch((err) => console.log(err));
    }, 300)
  }, [id]);

  function editPost(project) {

    setMessage("");

    if (project.budget < project.cost) {
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

  function createService(project) {

    setMessage("");

    const lastService = project.services[project.services.length - 1];
    lastService.id = uuidv4();

    const lastServiceConst = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceConst);

    if (newCost > parseFloat(project.budget)) {
      setMessage("Orçamento ultrapassado, verifique o valor do serviço");
      setType("error");
      project.services.pop();
      return false;
    }

    project.cost = newCost;
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(project)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setShowServiceForm(false);
      })
      .catch((err) => console.log(err));
  }

  function removeService(id, cost) {

    setMessage("");

    const servicesUpdate = project.services.filter((service) => service.id !== id);
    const projectUpdated = project;
    projectUpdated.services = servicesUpdate;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(projectUpdated)
    })
    .then((res) => res.json())
    .then((data) => {
      setProject(projectUpdated);
      setServices(servicesUpdate);
      setMessage("Serviço removido com sucesso!");
      setType("success");
    })
    .catch((err) => console.log(err));

  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {
        project.name
          ? (
            <div className={styles.projectDetails}>
              <Container customClass="column">
                {message && <Message type={type} msg={message} />}
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
                <div className={styles.serviceFormContainer}>
                  <h2>Adicione um Serviço:</h2>
                  <button onClick={toggleServiceForm} className={styles.btn}>
                    {
                      !showServiceForm
                        ? "Adicionar Serviço"
                        : "Fechar"
                    }
                  </button>
                  <div className={styles.projectInfo}>
                    {showServiceForm && (
                      <ServiceForm
                        handleSubmit={createService}
                        btnText={"Adicionar Serviço"}
                        projectData={project}
                      />
                    )}
                  </div>
                </div>
                <h2>Serviços</h2>
                <Container customClass="start">
                  {services.length > 0 &&
                    services.map((service) => (
                      <ServiceCard
                        id={service.id}
                        name={service.name}
                        cost={service.cost}
                        description={service.description}
                        key={service.id}
                        handleRemove={removeService}
                      />
                    ))
                  }
                  {services.length === 0 && <p>Não há serviços cadastrados</p>}
                </Container>
              </Container>
            </div>
          )
          : (
            <Loading />
          )
      }
    </>
  )
}