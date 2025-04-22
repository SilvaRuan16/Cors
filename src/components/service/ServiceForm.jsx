import { useState } from "react";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from "../project/ProjectForm.module.css";

export default function ServiceForm({ handleSubmit, btnText, projectData }) {

  const [service, setService] = useState({});

  function submit(e) {
    e.preventDefault();
    projectData.services.push(service);
    handleSubmit(projectData);
  }

  function handleOnChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type={"text"}
        text={"Nome do serviço"}
        name={"name"}
        placeholder={"Insira o nome do serviço"}
        handleOnChange={handleOnChange}
        value={service.name ?? ""}
      />
      <Input
        type={"number"}
        text={"Custo do serviço"}
        name={"cost"}
        placeholder={"Insira o valor total"}
        handleOnChange={handleOnChange}
        value={service.cost ?? ""}
      />
      <Input
        type={"text"}
        text={"Descrição do serviço"}
        name={"description"}
        placeholder={"Insira a descrição do serviço"}
        handleOnChange={handleOnChange}
        value={service.description ?? ""}
      />
      <SubmitButton text={btnText} />
    </form>
  )
}