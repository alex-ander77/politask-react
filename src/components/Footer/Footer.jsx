import "./Footer.css";

import facebook from "../../assets/images/facebook.png";
import instagram from "../../assets/images/ig.png";
import x from "../../assets/images/x.png";

function Footer() {
    return (
    <footer className="footer">

        <div className="footer__social">

        <h3>Redes</h3>

        <div className="footer__icons">
            <img src={facebook} alt="Facebook" />
            <img src={instagram} alt="Instagram" />
            <img src={x} alt="X" />
        </div>

        </div>

        <div className="footer__contact">

        <h3>Contáctanos</h3>

        <p>+593 99 461 6687</p>

        <p>politask@gmail.com</p>

        </div>

    </footer>
    );
}

export default Footer;