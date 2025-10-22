import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/icon.png';
import Navbar from "../components/Navbar";
import "../css/style.css";
import Footer from "../components/Footer";
import { verificarCredenciales } from '../data/authDataService';

function Login() {
  useEffect(() => {
    document.title = "Inicio Sesion | Golden Rose";
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    
    const authResult = verificarCredenciales(email, password);

    if(!authResult) {
      alert('Error en el inicio de sesión: Correo o Contraseña inválidos.');
      return;      
    }

    const { token, role } = authResult;

    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);

    if (role === 'admin'){
      navigate('/admin');
    } else if (role === 'client') {
      navigate('/api/home');
    } else {
      navigate('/')
    }

  
    };  
  
  return (
    <>  
    <Navbar />
    <main className="container my-5">

      <section className="text-center m-5">
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

      <section id="login" className="row justify-content-center">
        <article className="col-md-6 col-lg-4">
          <form action="#" className="row needs-validation" noValidate onSubmit={handleLoginSubmit}>

            <div className="card shadow-sm bg-light fw-bold border-top">
              <header className="card-header text-center fs-5 py-2">
                Inicio de sesión
              </header>

              <div className="card-body bg-light fw-bold">
                {/* Correo */}
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
                    pattern="^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="valid-feedback">Correcto!</div>
                  <div className="invalid-feedback">
                    Por favor, ingresa un correo válido.
                  </div>
                </div>

                {/* Contraseña */}
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
                  <div className="invalid-feedback">
                    La contraseña es obligatoria.
                  </div>
                </div>

                {/* Botón */}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-warning fw-bold text-dark text-uppercase shadow-sm"
                    style={{
                      backgroundColor: '#FFD700',
                      border: 'none',
                      letterSpacing: '1px',
                    }}
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </div>
            </div>

            {/* Enlaces secundarios */}
            <div className="col-12 text-center py-4 border-top mt-5">
              <p>
                <a href="#forgot-password" className="text-primary">
                  ¿Olvidaste tu Contraseña?
                </a>
              </p>
              <p>
                ¿No tienes cuenta?{' '}
                <Link to="/registro" className="text-primary fw-bold">
                  Regístrate Aquí
                </Link>.
              </p>
            </div>
          </form>
        </article>
      </section>  
    </main>
    <Footer/>
    </>
  );
}

export default Login;