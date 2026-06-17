import "./FAQ.css";

function FAQ() {
    return (
    <section id="faq" className="faq">

        <h2>FAQs</h2>
        <h3>Preguntas Frecuentes</h3>

        <div className="faq__grid">

        <details className="faq__item">
            <summary>¿Qué es PoliTask?</summary>
            <p>
            PoliTask es una plataforma colaborativa donde estudiantes
            de la EPN pueden crear y aceptar tareas universitarias.
            </p>
        </details>

        <details className="faq__item">
            <summary>¿Cómo gano puntos?</summary>
            <p>
            Los estudiantes ganan puntos al completar tareas aceptadas
            dentro de la plataforma.
            </p>
        </details>

        <details className="faq__item">
            <summary>¿Para qué sirven los puntos?</summary>
            <p>
            Los puntos pueden canjearse en asociaciones universitarias,
            billar, pingpong y comedor estudiantil.
            </p>
        </details>

        <details className="faq__item">
            <summary>¿Cómo funciona la reputación?</summary>
            <p>
            Los usuarios califican el servicio recibido después
            de completar una tarea.
            </p>
        </details>

        <details className="faq__item">
            <summary>¿Qué tipo de tareas existen?</summary>
            <p>
            Tutorías, entrega de deberes, pasear perros de la universidad
            y otros servicios estudiantiles.
            </p>
        </details>

        <details className="faq__item">
            <summary>¿PoliTask funciona en móviles?</summary>
            <p>
            Sí, PoliTask está diseñado para adaptarse a celulares y tablets.
            </p>
        </details>

        </div>

    </section>
    );
}

export default FAQ;