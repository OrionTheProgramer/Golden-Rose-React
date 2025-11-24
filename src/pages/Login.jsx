import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icon.png";
import "../css/style.css";
import { verificarCredenciales } from "../data/authDataService";
import ModalComponent from "../components/ModalComponent";
import { useAuth } from "../context/AuthContext";

function Login() {
  useEffect(() => {
    document.title = "Inicio Sesion | Golden Rose";
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const auth = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  const handleShowModal = (title, body) => {
    setModalTitle(title);
    setModalBody(body);
    setShowModal(true);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const authResult = await verificarCredenciales(email, password);

    if (!authResult) {
      handleShowModal("Error de Inicio de Sesión", "Correo o Contraseña inválidos.");
      return;
    }

    auth.login(authResult);

    if (authResult.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/api/home");
    }
  };

  return (
    <>
      <ModalComponent
        show={showModal}
        handleClose={() => setShowModal(false)}
        title={modalTitle}
        body={modalBody}
      />

      <main className="container my-5">
        <section className="text-center m-5">
          <figure>
            <img src={logo} alt="Logo de Golden Rose" className="icon-logo-v1" />
            <figcaption className="visually-hidden">Logo de Golden Rose</figcaption>
          </figure>
          <h1 className="row justify-content-center">
            <span className="fonts-golden-rose-v2">Golden Rose</span>
          </h1>
        </section>

        <section id="login" className="row justify-content-center">
          <article className="col-md-6 col-lg-4">
            <form className="row needs-validation" noValidate onSubmit={handleLoginSubmit}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h3 className="card-title text-center fs-5 py-2 mb-4">Inicio de sesión</h3>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Correo Institucional / Personal
                    </label>
                    <input
                      type="email"
                      name="username"
                      id="email"
                      className="form-control"
                      required
                      maxLength="100"
                      value={email}
                      pattern="^[a-zA-Z0-9._%+-]+@(duoc\\.cl|profesor\\.duoc\\.cl|gmail\\.com)$"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="valid-feedback">Correcto!</div>
                    <div className="invalid-feedback">Por favor, ingresa un correo válido.</div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="form-control"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="invalid-feedback">La contraseña es obligatoria.</div>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-golden text-uppercase">
                      Iniciar Sesión
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-12 text-center py-4 mt-5">
                <p>
                  <a href="#forgot-password">¿Olvidaste tu Contraseña?</a>
                </p>
                <p>
                  ¿No tienes cuenta?{" "}
                  <Link to="/registro" className="fw-bold">
                    Regístrate Aquí
                  </Link>
                  .
                </p>
              </div>
            </form>
          </article>
        </section>
      </main>
    </>
  );
}

export default Login;
