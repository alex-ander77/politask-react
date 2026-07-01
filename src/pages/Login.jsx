import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authFirebase } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";

function Login(){

    const navigate = useNavigate();

    const {register,handleSubmit,formState:{errors}} = useForm();

    const iniciarSesion = async(data)=>{

        try{

            await signInWithEmailAndPassword(
                authFirebase,
                data.email,
                data.password
            );

            alert("Bienvenido");

            navigate("/");

        }catch(error){

            alert(error.message);

        }

    }

    return(

        <main className="contenido-principal contenedor">

            <h2>Iniciar Sesión</h2>

            <form className="formulario" onSubmit={handleSubmit(iniciarSesion)}>

    <div className="campo">
        <label>Correo</label>

        <input
            type="email"
            placeholder="Ingresa tu correo"
            {...register("email", { required: true })}
        />

        {errors.email && (
            <span className="errors">Ingrese un correo</span>
        )}
    </div>

    <div className="campo">
        <label>Contraseña</label>

        <input
            type="password"
            placeholder="Ingresa tu contraseña"
            {...register("password", { required: true })}
        />

        {errors.password && (
            <span className="errors">Ingrese la contraseña</span>
        )}
    </div>

    <button className="btn" type="submit">
        Iniciar sesión
    </button>

</form>

            <NavLink to="/register">

                ¿No tienes cuenta? Regístrate

            </NavLink>

        </main>

    )

}

export default Login;