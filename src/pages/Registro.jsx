import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icon.png";
import "../css/style.css";
import { registroUser } from "../data/authDataService";
import ModalComponent from "../components/ModalComponent";

function Registro() {
    useEffect(() => {
      document.title = "Registrarse | Golden Rose";
    }, []);

    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");

    const handleShowModal = (title, body) => {
      setModalTitle(title);
      setModalBody(body);
      setShowModal(true);
    };

  const handleRegistroSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const username = form.username.value;
      const email = form.correo.value;
      const password = form.password.value;
      const confirmar = form.confirmar.value;

      if (password !== confirmar) {
        handleShowModal("Error", "Las contraseñas no coinciden");
        setValidated(true);
        return;
      }

      try {
        const newUser = await registroUser(username, email, password);
        handleShowModal(`Registro exitoso para ${username}! Tu rol asignado es: ${newUser.role}. Ahora inicia sesión.`);
      } catch (error) {
        handleShowModal(`Error de registro: ${error.message}`);
      }
    }
    setValidated(true);
  };

  return (
    <>
      <ModalComponent
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          if (modalTitle === "Registro Exitoso!") {
            navigate("/Login");
          }
        }}
        title={modalTitle}
        body={modalBody}
      />

      <main className="container my-5">
        <section id="registro" className="row justify-content-center">
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

          <article className="col-md-8 col-lg-6">
            <div className="card shadow-lg p-4">
              
              <div className="card-body py-0"> 
                <h3 className="card-title text-center fs-5 mb-4">
                  Crea tu cuenta
                </h3>
              </div>

              <form 
                className={`needs-validation ${validated ? "was-validated" : ""}`}
                noValidate 
                onSubmit={handleRegistroSubmit}>

                <div className="mb-4">
                  <label htmlFor="nombre" className="form-label">Usuario</label>
                  <input 
                    type="text" 
                    name="username"
                    id="nombre" 
                    className="form-control" 
                    required 
                  />
                  <div className="invalid-feedback">Ingresa tu usuario.</div> 
                </div>

                <div className="mb-4">
                  <label htmlFor="fecha_nacimiento" className="form-label">Fecha de Nacimiento</label>
                  <input 
                    type="date" 
                    name="fecha_nacimiento"
                    className="form-control" 
                    required
                  />
                  <div className="invalid-feedback">Ingresa tu fecha de nacimiento.</div>
                </div>

                <div className="mb-4">
                  <label htmlFor="correo" className="form-label">Correo</label>
                  <input 
                    type="email" 
                    id="correo" 
                    name="correo" 
                    className="form-control" 
                    required 
                  />
                  <div className="invalid-feedback">Ingresa un correo válido.</div>
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    className="form-control"                      
                    required
                    minLength={6}
                  />
                  <div className="invalid-feedback">Ingresa tu contraseña (mínimo 6 caracteres).</div>
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmar" className="form-label">Confirmar Contraseña</label>
                  <input 
                    type="password" 
                    id="confirmar"
                    name="confirmar" 
                    className="form-control" 
                    required 
                  />
                  <div className="invalid-feedback">Las contraseñas no coinciden.</div>
                </div>

                <div className="mb-4">
                  <label htmlFor="telefono" className="form-label">Teléfono (opcional)</label>
                  <input type="tel" id="telefono" className="form-control" />
                </div>

                <div className="form-check mb-4">
                  <input 
                    type="checkbox"
                    className="form-check-input"  
                    name="terminos"
                    required 
                  />
                  <label className="form-check-label" htmlFor="terminos">
                    Acepto los{" "}
                    <a href="terminos.html" target="_blank" rel="noreferrer">términos y condiciones</a>
                  </label>
                  <div className="invalid-feedback">Debes aceptar los términos.</div>
                </div>

                <div className="d-grid mb-3">
                  <button
                    type="submit"
                    className="btn btn-golden text-uppercase"
                  >
                    Registrar
                  </button>
                </div>
              </form>
            </div>

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
