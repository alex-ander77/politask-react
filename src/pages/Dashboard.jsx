import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { authFirebase, dbFirebase } from "../firebase";
import "./Dashboard.css";

const FORM_DEFAULTS = {
  titulo: "",
  categoria: "",
  puntos: "",
  estado: "Pendiente",
  descripcion: "",
};

function Dashboard() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [tareas, setTareas] = useState([]);
  const [idEdicion, setIdEdicion] = useState("");
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errorGeneral, setErrorGeneral] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: FORM_DEFAULTS });

  const obtenerTareas = async (uid) => {
    try {
      setCargando(true);
      setErrorGeneral("");

      const consulta = query(
        collection(dbFirebase, "tareas"),
        where("usuarioId", "==", uid)
      );

      const snapshot = await getDocs(consulta);
      const documentos = snapshot.docs.map((documento) => ({
        id: documento.id,
        ...documento.data(),
      }));

      documentos.sort((a, b) => {
        const fechaA = a.creadoEn?.seconds ?? 0;
        const fechaB = b.creadoEn?.seconds ?? 0;
        return fechaB - fechaA;
      });

      setTareas(documentos);
    } catch (error) {
      console.error(error);
      setErrorGeneral(
        "No se pudieron cargar las tareas. Revisa Firestore y sus reglas de seguridad."
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const cancelarObservador = onAuthStateChanged(authFirebase, (user) => {
      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      setUsuario(user);
      obtenerTareas(user.uid);
    });

    return cancelarObservador;
  }, [navigate]);

  const limpiarFormulario = () => {
    setIdEdicion("");
    reset(FORM_DEFAULTS);
  };

  const guardarTarea = async (data) => {
    if (!usuario) return;

    try {
      setGuardando(true);
      setMensaje("");
      setErrorGeneral("");

      const datosTarea = {
        titulo: data.titulo.trim(),
        categoria: data.categoria,
        puntos: Number(data.puntos),
        estado: data.estado,
        descripcion: data.descripcion.trim(),
        actualizadoEn: serverTimestamp(),
      };

      if (idEdicion) {
        await updateDoc(doc(dbFirebase, "tareas", idEdicion), datosTarea);
        setMensaje("Tarea actualizada correctamente.");
      } else {
        await addDoc(collection(dbFirebase, "tareas"), {
          ...datosTarea,
          usuarioId: usuario.uid,
          usuarioEmail: usuario.email ?? "",
          creadoEn: serverTimestamp(),
        });
        setMensaje("Tarea registrada correctamente.");
      }

      limpiarFormulario();
      await obtenerTareas(usuario.uid);
    } catch (error) {
      console.error(error);
      setErrorGeneral("No se pudo guardar la tarea. Inténtalo nuevamente.");
    } finally {
      setGuardando(false);
    }
  };

  const editarTarea = (tarea) => {
    setIdEdicion(tarea.id);
    setMensaje("");
    setErrorGeneral("");

    reset({
      titulo: tarea.titulo ?? "",
      categoria: tarea.categoria ?? "",
      puntos: tarea.puntos ?? "",
      estado: tarea.estado ?? "Pendiente",
      descripcion: tarea.descripcion ?? "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const eliminarTarea = async (id) => {
    if (!usuario) return;

    const confirmado = window.confirm(
      "Vas a eliminar esta tarea. ¿Estás seguro?"
    );

    if (!confirmado) return;

    try {
      setMensaje("");
      setErrorGeneral("");

      await deleteDoc(doc(dbFirebase, "tareas", id));

      if (idEdicion === id) {
        limpiarFormulario();
      }

      setMensaje("Tarea eliminada correctamente.");
      await obtenerTareas(usuario.uid);
    } catch (error) {
      console.error(error);
      setErrorGeneral("No se pudo eliminar la tarea.");
    }
  };

  const cerrarSesion = async () => {
    try {
      await signOut(authFirebase);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
      setErrorGeneral("No se pudo cerrar la sesión.");
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <p className="dashboard__eyebrow">Panel de control</p>
          <h1>PoliTask</h1>
          <p className="dashboard__user">
            Sesión iniciada como <strong>{usuario?.email ?? "usuario"}</strong>
          </p>
        </div>

        <button className="dashboard__logout" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </header>

      <main className="dashboard__content">
        <section className="dashboard__panel dashboard__form-panel">
          <div className="dashboard__section-heading">
            <span>{idEdicion ? "Actualizar" : "Registrar"}</span>
            <h2>{idEdicion ? "Editar tarea" : "Nueva tarea"}</h2>
            <p>
              {idEdicion
                ? "Modifica los datos y guarda los cambios."
                : "Crea una tarea para organizar tu trabajo en PoliTask."}
            </p>
          </div>

          <form
            className="task-form"
            onSubmit={handleSubmit(guardarTarea)}
            noValidate
          >
            <div className="task-form__group task-form__group--full">
              <label htmlFor="titulo">Título</label>
              <input
                id="titulo"
                type="text"
                placeholder="Ej.: Entregar deber de programación"
                {...register("titulo", {
                  required: "El título es obligatorio.",
                  minLength: {
                    value: 3,
                    message: "El título debe tener al menos 3 caracteres.",
                  },
                })}
              />
              {errors.titulo && (
                <span className="task-form__error">{errors.titulo.message}</span>
              )}
            </div>

            <div className="task-form__group">
              <label htmlFor="categoria">Categoría</label>
              <select
                id="categoria"
                {...register("categoria", {
                  required: "Selecciona una categoría.",
                })}
              >
                <option value="">Selecciona una opción</option>
                <option value="Académica">Académica</option>
                <option value="Entrega">Entrega</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Mascotas">Mascotas</option>
                <option value="Otra">Otra</option>
              </select>
              {errors.categoria && (
                <span className="task-form__error">
                  {errors.categoria.message}
                </span>
              )}
            </div>

            <div className="task-form__group">
              <label htmlFor="puntos">Puntos</label>
              <input
                id="puntos"
                type="number"
                min="1"
                max="1000"
                placeholder="Ej.: 30"
                {...register("puntos", {
                  required: "Los puntos son obligatorios.",
                  min: {
                    value: 1,
                    message: "Los puntos deben ser mayores que 0.",
                  },
                  max: {
                    value: 1000,
                    message: "El máximo permitido es 1000 puntos.",
                  },
                })}
              />
              {errors.puntos && (
                <span className="task-form__error">{errors.puntos.message}</span>
              )}
            </div>

            <div className="task-form__group task-form__group--full">
              <label htmlFor="estado">Estado</label>
              <select id="estado" {...register("estado", { required: true })}>
                <option value="Pendiente">Pendiente</option>
                <option value="En progreso">En progreso</option>
                <option value="Completada">Completada</option>
              </select>
            </div>

            <div className="task-form__group task-form__group--full">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                rows="5"
                placeholder="Describe en qué consiste la tarea..."
                {...register("descripcion", {
                  required: "La descripción es obligatoria.",
                  minLength: {
                    value: 10,
                    message:
                      "La descripción debe tener al menos 10 caracteres.",
                  },
                })}
              />
              {errors.descripcion && (
                <span className="task-form__error">
                  {errors.descripcion.message}
                </span>
              )}
            </div>

            <div className="task-form__actions task-form__group--full">
              <button
                className="task-form__submit"
                type="submit"
                disabled={guardando}
              >
                {guardando
                  ? "Guardando..."
                  : idEdicion
                    ? "Guardar cambios"
                    : "Registrar tarea"}
              </button>

              {idEdicion && (
                <button
                  className="task-form__cancel"
                  type="button"
                  onClick={limpiarFormulario}
                >
                  Cancelar edición
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="dashboard__panel dashboard__list-panel">
          <div className="dashboard__section-heading dashboard__list-heading">
            <div>
              <span>Listar</span>
              <h2>Mis tareas</h2>
              <p>Consulta, actualiza o elimina tus registros.</p>
            </div>
            <strong className="dashboard__counter">{tareas.length}</strong>
          </div>

          {mensaje && <p className="dashboard__message">{mensaje}</p>}
          {errorGeneral && (
            <p className="dashboard__message dashboard__message--error">
              {errorGeneral}
            </p>
          )}

          {cargando ? (
            <p className="dashboard__empty">Cargando tareas...</p>
          ) : tareas.length === 0 ? (
            <div className="dashboard__empty">
              <strong>No existen registros todavía.</strong>
              <span>Crea tu primera tarea usando el formulario.</span>
            </div>
          ) : (
            <div className="task-list">
              {tareas.map((tarea) => (
                <article className="task-card" key={tarea.id}>
                  <div className="task-card__top">
                    <span className="task-card__category">
                      {tarea.categoria}
                    </span>
                    <span
                      className={`task-card__status task-card__status--${(
                        tarea.estado ?? "Pendiente"
                      )
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {tarea.estado ?? "Pendiente"}
                    </span>
                  </div>

                  <h3>{tarea.titulo}</h3>
                  <p>{tarea.descripcion}</p>

                  <div className="task-card__footer">
                    <strong>{tarea.puntos} puntos</strong>
                    <div className="task-card__actions">
                      <button
                        className="task-card__edit"
                        type="button"
                        onClick={() => editarTarea(tarea)}
                      >
                        Actualizar
                      </button>
                      <button
                        className="task-card__delete"
                        type="button"
                        onClick={() => eliminarTarea(tarea.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
