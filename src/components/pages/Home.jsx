import styles from "./Home.module.css";
import savings from "../../assets/img/savings.svg";
import LinkButton from "../layout/LinkButton";

export default function Home() {
  return (
    <section className={styles.homeContainer}>
      <h1>Bem-Vindo ao <span>Cors</span></h1>
      <p>Comece a gerenciar os seus projetos agora mesmo!</p>
      <LinkButton to="/newProject" text="Criar Projeto" />
      <img src={savings} alt="Cors" />
    </section>
  )
}