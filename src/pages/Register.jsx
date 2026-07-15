import {
createUserWithEmailAndPassword,
updateProfile,
} from "firebase/auth";

import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { authFirebase } from "../firebase";

const Register = () => {
const navigate = useNavigate();

const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm();

const handleRegister = async (data) => {
    const { name, email, password } = data;

    try {
    const newUserFirebase = await createUserWithEmailAndPassword(
        authFirebase,
        email,
        password
    );

    await updateProfile(newUserFirebase.user, {
        displayName: name,
    });

    console.log("Usuario registrado:", newUserFirebase.user);

    navigate("/dashboard");
    } catch (error) {
    console.error(error);
    alert("No se pudo crear la cuenta: " + error.message);
    }
};

  return (
    <main className="contenido-principal contenedor">
    <h3 className="text-center">Registro</h3>

    <form
        className="formulario"
        onSubmit={handleSubmit(handleRegister)}
    >
        <fieldset>
        <legend>Ingresa tus datos</legend>

        <div className="campo">
            <label>Nombre:</label>

            <input
            type="text"
            placeholder="Tu nombre"
            {...register("name", {
                required: "El nombre es requerido",
                minLength: {
                value: 3,
                message: "El nombre debe tener mínimo 3 caracteres",
                },
            })}
            />

            {errors.name && (
            <span className="errors">
                {errors.name.message}
            </span>
            )}
        </div>

        <div className="campo">
            <label>E-mail:</label>

            <input
            type="email"
            placeholder="Tu correo"
            {...register("email", {
                required: "El correo es requerido",
            })}
            />

            {errors.email && (
            <span className="errors">
                {errors.email.message}
            </span>
            )}
        </div>

        <div className="campo">
            <label>Contraseña:</label>

            <input
            type="password"
            placeholder="Tu contraseña"
            {...register("password", {
                required: "La contraseña es requerida",
                minLength: {
                value: 6,
                message: "La contraseña debe tener mínimo 6 caracteres",
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

        <input
        className="btn"
        type="submit"
        value="Crear cuenta"
        />
    </form>

    <NavLink to="/login" className="enlace">
        Si ya tienes cuenta, puedes iniciar sesión aquí
    </NavLink>
    </main>
);
};

export default Register;