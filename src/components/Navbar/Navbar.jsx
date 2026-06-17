import "./Navbar.css";

import logo from "../../assets/images/logo.png";
import user from "../../assets/images/user.png";

function Navbar() {
    return (
    <header className="container">
        <nav className="navbar">

        <div className="navbar__brand">
            <img
            src={logo}
            alt="logo"
            className="navbar__img"
            width="80"
            />

            <h1 className="navbar__logo">
            POLI
                <span className="navbar__logo--primary">
                -TASK
            </span>
            </h1>
        </div>

        <ul className="navbar__menu">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#nosotros">Nosotros</a></li>
            <li><a href="#app">App</a></li>
            <li><a href="#recompensas">Recompensas</a></li>
            <li><a href="#gallery">Galería</a></li>
            <li><a href="#contacto">Contacto</a></li>
        </ul>

        <div className="navbar__login">
            <img src={user} alt="user" width="40" />
            <a href="/">Login</a>
        </div>

        </nav>
    </header>
    );
}

export default Navbar;