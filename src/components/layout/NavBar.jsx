import { Link } from "react-router-dom";
import Container from "./Container";
import styles from "./Navbar.module.css";
import logo from "../../assets/img/costs_logo.png";

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="Cors" />
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Inicio</Link>
          </li>
          <li className={styles.item}>
            <Link to="/projects">Projetos</Link>
          </li>
          <li className={styles.item}>
            <Link to="/company">Empresa</Link>
          </li>
          <li className={styles.item}>
            <Link to="/contact">Contato</Link>
          </li>
          {/* <li>
            <Link to="/newProject">Novo Projeto</Link>
          </li> */}
        </ul>
      </Container>
    </nav>
  )
}