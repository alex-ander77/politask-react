import "./Contact.css";

function Contact() {
    return (
    <section className="contact" id="contacto">

        <h4>CONTÁCTANOS</h4>

        <h2>
        ¿Alguna pregunta o comentario?
        </h2>

        <p className="contact__subtitle">
        ¡Escríbenos! Estaremos felices de ayudarte.
        </p>

        <form className="contact__form">

        <div className="contact__inputs">

            <input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            />

            <input
            type="text"
            placeholder="Ingresa tu nombre"
            />

        </div>

        <textarea
            placeholder="Escribe tu mensaje"
            rows="5"
        ></textarea>

        <button type="submit">
            ENVIAR MENSAJE
        </button>

        </form>

        <div className="contact__cards">

        <div className="contact__card">

            <div className="contact__icon">👥</div>

            <h3>Comunidad PoliTask</h3>

            <p>
            Conecta con estudiantes, completa tareas
            y ayuda a otros a crecer juntos.
            </p>

        </div>

        <div className="contact__card">

            <div className="contact__icon">📞</div>

            <h3>Soporte PoliTask</h3>

            <p>
            ¿Tienes dudas o necesitas ayuda?
            Nuestro equipo está listo para apoyarte.
            </p>

        </div>

        <div className="contact__card">

            <div className="contact__icon">🎓</div>

            <h3>Escuela Politécnica Nacional</h3>

            <p>
            Aplicación desarrollada para la comunidad
            estudiantil de la EPN.
            </p>

        </div>

        </div>

    </section>
    );
}

export default Contact;