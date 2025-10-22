import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/icon.png';
import "../css/style.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { registroUser } from '../data/authDataService'




function Registro() {
    useEffect(() => {
      document.title = "Registrarse | Golden Rose";
    }, []);

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword ] = useState('')
    const [aceptaTerminos, setAceptaTerminos] = useState(false);
    const navigate = useNavigate(); // Hook de navegacion

    const handleRegistroSubmit = (event) => {
      event.preventDefault();

      if (!email || !password || !nombre){
        alert("Error: Por favor, completa todos los campos requeridos.");
        return;
      }

      if (password !== confirmarPassword) {
        alert("Error: Las contraseñas no coinciden. Por favor, verifica.");
        return;
      }

      if (!aceptaTerminos) {
          alert("Debes aceptar los términos y condiciones para registrarte.");
          return;
      }      

      try {
        const newUser = registroUser(email, password);

        alert(`¡Registro exitoso para ${nombre}! Tu rol asignado es: ${newUser.role}. Ahora inicia sesión.`);

        navigate('/Login');
      } catch (error) {

        alert(`Error de registro: ${error.message}`)
      }
    };

  return (
    <>
    <Navbar />
    <main className="container my-5">
      <section id="registro" className="row justify-content-center">

        {/* Encabezado con logo */}
        <section className="text-center mb-5">
          <figure className="centrar-logo">
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
          <div className="card shadow-lg p-4 rounded-4">
            <header className="card-header bg-light fw-bold fs-5 mb-4 text-center">
              Crea tu cuenta
            </header>

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
                <div className="valid-feedback">Correcto!</div>
                <div className="invalid-feedback">Incorrecto</div>
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
                <button
                  type="submit"
                  className="btn fw-bold text-dark text-uppercase shadow-sm"
                  style={{
                    backgroundColor: "#FFD700",
                    border: "none",
                    letterSpacing: "1px",
                  }}
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>

          {/* Enlaces secundarios */}
          <div className="text-center py-4 border-top mt-5">
            <p>
              <Link to="/forgot-password" className="text-primary">¿Olvidaste tu contraseña?</Link>
            </p>
            <p>
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-primary fw-bold">Iniciar sesión</Link>
            </p>
          </div>
        </article>
      </section>
    </main>
    <Footer/>
    </>
  );
}

export default Registro;
