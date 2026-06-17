import "./Hero.css";

import buho from "../../assets/images/buho.png";

function Hero() {
    return (
    <section className="hero" id="inicio">

        <div className="hero__text">
        <h2>AYUDAR</h2>
        <h3>NUNCA FUE TAN</h3>
        <h4>VALIOSO</h4>
        </div>

        <div className="hero__img">
        <img src={buho} alt="Buho" />
        </div>

    </section>
    );
}

export default Hero;