import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { authFirebase } from "../firebase";




const Register = () => {

    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()

    
    const handleRegister = async (data) => {
        const {email,password} = data
        try {
            const newUserFirebase = await createUserWithEmailAndPassword(authFirebase, email, password)
            const userRegister = newUserFirebase.user
            console.log(userRegister)
            navigate("/login")
        } catch (error) {
            console.log(error.message)
            alert(error.message)
        }
    }

    return (
        <>
            <main className="contenido-principal contenedor ">
                <h3 className="text-center">Registro</h3>
                <form className="formulario" onSubmit={handleSubmit(handleRegister)}>

                    <fieldset>

                        <legend>Ingresa tus datos</legend>

                        <div className="campo">
                            <label >Nombre: </label>
                            <input type="text" placeholder="Tu Nombre"
                            {...register("name",{ required: true })}
                            />
                            {errors.name && <span className="errors">El nombre es requerido</span>}

                        </div>

                        <div className="campo">
                            <label >E-mail:</label>
                            <input type="email" placeholder="Tu Email"
                            {...register("email",{ required: true })}
                            />
                            {errors.email && <span className="errors">El correo es requerido</span>}
                        </div>

                        <div className="campo">
                            <label >Contraseña:</label>
                            <input type="password" placeholder="Tu Contraseña"
                            {...register("password",{ required: true })}
                            />
                            {errors.password && <span className="errors">La contraseña es requerida</span>}
                        </div>

                    </fieldset>

                    <input className="btn" type="submit" value="Enviar" ></input>

                </form>

                <NavLink to="/login" className="enlace">Si ya tienes cuenta, puedes iniciar sesión aquí</NavLink>
                
            </main>
        </>
    )
}

export default Register