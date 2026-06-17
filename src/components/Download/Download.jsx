import "./Download.css";

import movil from "../../assets/images/movil.png";
import scanner from "../../assets/images/scanner.png";
import googleplay from "../../assets/images/googleplay.png";
import appstore from "../../assets/images/appstore.png";

function Download() {
    return (
    <section className="download" id="app">

        <div className="download__container">

        <div className="download__phone">
            <img src={movil} alt="PoliTask App" />
        </div>

        <div className="download__info">

            <h4>DESCARGA POLITASK</h4>

            <h2>
                Lleva PoliTask <br />
                contigo a todas partes
            </h2>

            <p>
                Descarga la app y empieza a ganar puntos
                completando tareas y ayudando a otros
                estudiantes de la EPN.
            </p>

            <div className="download__qr">
            <img src={scanner} alt="QR" />

            <span>
                Escanea el código QR
                para descargar
            </span>
            </div>

            <div className="download__stores">
            <img src={googleplay} alt="Google Play" />
            <img src={appstore} alt="App Store" />
            </div>

        </div>

        </div>

    </section>
    );
}

export default Download;