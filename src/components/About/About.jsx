import "./About.css";

import manos from "../../assets/images/manos.png";

function About() {
    return (
    <section className="about" id="nosotros">

        <div className="about__text">
        <h2>Sobre Nosotros</h2>

        <p>
            Somos una iniciativa de la comunidad de la Escuela
            Politécnica Nacional (la Poli) que impulsa la
            colaboración entre estudiantes en el ambito Enseñanza-Aprendizaje.
        </p>
        </div>

        <div className="about__img">
        <img src={manos} alt="Manos ayudando" />
        </div>

    </section>
    );
}

export default About;