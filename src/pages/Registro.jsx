import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/icon.png';
import "../css/style.css";
import { registroUser } from '../data/authDataService';
import ModalComponent from "../components/ModalComponent"; // Importamos el Modal

function Registro() {
    useEffect(() => {
      document.title = "Registrarse | Golden Rose";
    }, []);

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword ] = useState('')
    const [aceptaTerminos, setAceptaTerminos] = useState(false);
    const navigate = useNavigate();

    // Estados para controlar el modal
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalBody, setModalBody] = useState('');

    // Función genérica para mostrar el modal
    const handleShowModal = (title, body) => {
      setModalTitle(title);
      setModalBody(body);
      setShowModal(true);
    };

    const handleRegistroSubmit = (event) => {
      event.preventDefault();

      // Reemplazamos todos los alerts() por el modal
      if (!email || !password || !nombre){
        handleShowModal('Error de Registro', 'Por favor, completa todos los campos requeridos.');
        return;
      }

      if (password !== confirmarPassword) {
        handleShowModal('Error de Registro', 'Las contraseñas no coinciden. Por favor, verifica.');
        return;
      }

      if (!aceptaTerminos) {
          handleShowModal('Error de Registro', 'Debes aceptar los términos y condiciones para registrarte.');
          return;
      }      

      try {
        const newUser = registroUser(email, password);
        
        // Usamos el modal para el mensaje de éxito
        handleShowModal(
          '¡Registro Exitoso!', 
          `¡Registro exitoso para ${nombre}! Tu rol asignado es: ${newUser.role}. Ahora inicia sesión.`
        );
        // No navegamos de inmediato, esperamos a que el usuario cierre el modal

      } catch (error) {
        handleShowModal('Error de Registro', error.message);
      }
    };

  return (
    <>
      {/* Componente Modal */}
      <ModalComponent 
        show={showModal}
        // Lógica especial: si el registro fue exitoso, redirige al cerrar
        handleClose={() => {
          setShowModal(false);
          if (modalTitle === '¡Registro Exitoso!') {
            navigate('/Login');
          }
        }}
        title={modalTitle}
        body={modalBody}
      />

      <main className="container my-5">
        <section id="registro" className="row justify-content-center">

          {/* Encabezado con logo */}
          <section className="text-center mb-5">
            <figure>
            <img
              src={logo}
              alt="Logo de Golden Rose"
              className="icon-logo-v1"
            />
              <figcaption className="visually-hidden">Logo de Golden Rose</figcaption>
            </figure>
            <h1 className="row justify-content-center">
              <span className="fonts-golden-rose-v2">Golden Rose</span>
            </h1>
          </section>

          {/* Formulario */}
          <article className="col-md-8 col-lg-6">
            <div className="card shadow-lg p-4">
              
              <div className="card-body py-0"> 
                {/* Título con 'card-title' para que se vea blanco */}
                <h3 className="card-title text-center fs-5 mb-4">
                  Crea tu cuenta
                </h3>
              </div>

              <form className="needs-validation" noValidate onSubmit={handleRegistroSubmit}>
                {/* Usuario */}
                <div className="mb-4">
                  <label htmlFor="nombre" className="form-label">Usuario</label>
                  <input 
                    type="text" 
                    name="username"
                    id="nombre" 
                    className="form-control" 
                    required 
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                  {/* ... (feedbacks) ... */}
                </div>

                {/* Fecha de nacimiento */}
                <div className="mb-4">
                  <label htmlFor="fecha_nacimiento" className="form-label">Fecha de Nacimiento</label>
                  <input type="date" id="fecha_nacimiento" className="form-control" />
                </div>

                {/* Correo */}
                <div className="mb-4">
                  <label htmlFor="correo" className="form-label">Correo</label>
                  <input 
                    type="email" 
                    name="correo" 
                    id="correo" 
                    className="form-control" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Contraseña */}
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="contraseña" 
                    className="form-control" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Confirmar contraseña */}
                <div className="mb-4">
                  <label htmlFor="confirmar" className="form-label">Confirmar Contraseña</label>
                  <input 
                    type="password" 
                    id="confirmar" 
                    name="contraseña-confirmar" 
                    className="form-control" 
                    required 
                    value={confirmarPassword}
                    onChange={(e) => setConfirmarPassword(e.target.value)}
                  />
                </div>

                {/* Teléfono opcional */}
                <div className="mb-4">
                  <label htmlFor="telefono" className="form-label">Teléfono (opcional)</label>
                  <input type="tel" id="telefono" className="form-control" />
                </div>

                {/* Términos y condiciones */}
                <div className="form-check mb-4">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="terminos" 
                    required 
                    checked={aceptaTerminos}
                    onChange={(e) => setAceptaTerminos(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="terminos">
                    Acepto los{" "}
                    <a href="terminos.html" target="_blank" rel="noreferrer">términos y condiciones</a>
                  </label>
                </div>

                {/* Botón */}
                <div className="d-grid mb-3">
                  {/* Botón dorado (sin style en línea) */}
                  <button
                    type="submit"
                    className="btn btn-golden text-uppercase"
                  >
                    Registrar
                  </button>
                </div>
              </form>
            </div>

            {/* Enlaces secundarios (sin 'border-top' ni 'text-primary') */}
            <div className="text-center py-4 mt-5">
              <p>
                <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
              </p>
              <p>
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className="fw-bold">Iniciar sesión</Link>
              </p>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}

export default Registro;