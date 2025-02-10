import styles from './NavBar.module.css';

import { NavLink } from "react-router-dom";

import logo from "../assets/Logo-lateral1-transp.png";

const NavBar = () => {

    return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={styles.logo} >
                <img src={logo} alt="neocart" className={styles.logo} />
            </NavLink>
            <NavLink to="/createTask" className={styles.brand} >
                Criar
            </NavLink>
        </nav>
    )
};

export default NavBar