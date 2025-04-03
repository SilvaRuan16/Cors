import { useEffect, useState } from "react";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import styles from "./ProjectForm.module.css";

export default function ProjectForm({ handleSubmit, btnText, projectData }) {

  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || { name: "", budget: "", category: null });

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ERROR PROJECTFORM API ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCategories(data)
      })
      .catch((err) => console.log(`Message Catch Error: ${err}.`));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    console.log(project);
    handleSubmit(project);
  }

  function handleChange(e) {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    });
    console.log(project);
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      }
    });
    console.log(project);
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        handleOnChange={handleChange}
        type="text"
        text="Nome do Projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        value={project.name ?? ""}
      />
      <Input
        handleOnChange={handleChange}
        type="number"
        text="Orçamento do Projeto"
        name="budget"
        placeholder="Insira o orçamento do projeto"
        value={project.budget ?? ""}
      />
      <Select
        handleOnChange={handleCategory}
        name="categoryId"
        text="Selecione a Categoria"
        options={categories}
        value={project.category ? project.category.id : ""}
      />
      <SubmitButton text={btnText} />
    </form>
  )
}