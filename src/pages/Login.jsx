import {
    authFirebase,
    googleProvider,
} from "../firebase";
import { signInWithEmailAndPassword,
        signInWithPopup
} from "firebase/auth";

import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
const navigate = useNavigate();

const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
} = useForm();

const iniciarSesion = async (data) => {
    try {
    await signInWithEmailAndPassword(
        authFirebase,
        data.email,
        data.password
    );

    alert("Bienvenido a PoliTask");

    navigate("/dashboard", { replace: true });
    } catch (error) {
    console.error("Error al iniciar sesión:", error);

    let mensaje = "No se pudo iniciar sesión.";

    if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
    ) {
        mensaje = "El correo o la contraseña son incorrectos.";
    } else if (error.code === "auth/invalid-email") {
        mensaje = "El correo electrónico no es válido.";
    } else if (error.code === "auth/too-many-requests") {
        mensaje =
        "Demasiados intentos. Espera unos minutos e inténtalo nuevamente.";
    } else if (error.code === "auth/network-request-failed") {
        mensaje = "Comprueba tu conexión a Internet.";
    }

    alert(mensaje);
    }
};
const iniciarSesionConGoogle = async () => {
    try {
        await signInWithPopup(
            authFirebase,
            googleProvider
    );

        alert("Bienvenido a PoliTask");

        navigate("/dashboard", { replace: true });
    } catch (error) {
        console.error(
        "Error al iniciar sesión con Google:",
        error
        );

        let mensaje =
        "No se pudo iniciar sesión con Google.";

        if (error.code === "auth/popup-closed-by-user") {
        mensaje =
            "Cerraste la ventana de Google antes de finalizar.";
        } else if (error.code === "auth/popup-blocked") {
        mensaje =
            "El navegador bloqueó la ventana emergente de Google.";
        } else if (
        error.code === "auth/unauthorized-domain"
        ) {
        mensaje =
            "Este dominio no está autorizado en Firebase.";
        } else if (
        error.code === "auth/network-request-failed"
        ) {
        mensaje = "Comprueba tu conexión a Internet.";
        }

        alert(mensaje);
    }
};

return (
    <main className="contenido-principal contenedor">
    <h2 className="text-center">Iniciar sesión</h2>

    <form
        className="formulario"
        onSubmit={handleSubmit(iniciarSesion)}
    >
        <fieldset>
        <legend>Ingresa tus datos</legend>

        <div className="campo">
            <label htmlFor="email">Correo:</label>

            <input
            id="email"
            type="email"
            placeholder="Ingresa tu correo"
            {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Ingresa un correo válido",
                },
            })}
            />

            {errors.email && (
            <span className="errors">
                {errors.email.message}
            </span>
            )}
        </div>

        <div className="campo">
            <label htmlFor="password">Contraseña:</label>

            <input
            id="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                value: 6,
                message:
                    "La contraseña debe tener mínimo 6 caracteres",
                },
            })}
            />

            {errors.password && (
            <span className="errors">
                {errors.password.message}
            </span>
            )}
        </div>
        </fieldset>

        <button
        className="btn"
        type="submit"
        disabled={isSubmitting}
        >
        {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
        </button>
    </form>

    <div className="login-divider">
        <span>o continúa con</span>
    </div>

    <button
        type="button"
        className="btn-google"
        onClick={iniciarSesionConGoogle}
    >
        <span className="google-icon">G</span>
        Continuar con Google
    </button>
    <NavLink to="/register" className="enlace">
        ¿No tienes cuenta? Regístrate aquí
    </NavLink>
    </main>
);
}

export default Login;