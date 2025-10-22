import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icon.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import "../css/home_style.css";




function NavbarClient() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');

    navigate('/login')
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#ff4655" }}>
        <div className="container">
          {/* Logo y nombre */}
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img
              src={logo}
              alt="Logo"
              width="48"
              height="48"
              style={{
                borderRadius: "12px",
                boxShadow: "0 2px 8px #ffb6c1",
                background: "#fff",
                padding: "2px",
              }}
            />
            <span
              style={{
                fontSize: "1.7rem",
                fontWeight: "bold",
                letterSpacing: "1px",
                color: "#FFD700",
                textShadow: "1px 1px 8px #ffb6c1",
              }}
            >
              Golden Rose
            </span>
          </Link>

          {/* Botón menú móvil */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Enlaces */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/api/home">
                    Home
                </Link>
              </li>              
              <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/marketplace">Productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog">Blog</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">Contacto</Link>
              </li>          
              <li className="nav-item">
                <Link className="nav-link" to="/carrito">                
                  <button className="btn btn-primary btn-sm">
                      <i className="bi bi-cart">
                      </i> Carrito (0)
                  </button>
                </Link>

              </li>    
              <li className="nav-item">
                  <Link className="nav-link" to="/perfil">
                      <i class="bi bi-person-circle"></i> Mi Perfil
                  </Link>
              </li>
              <li className="nav-item">
                  <button 
                      className="btn btn-danger ms-2" 
                      onClick={handleLogout}
                  >
                      Cerrar Sesión
                  </button>
              </li>                                          
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavbarClient;
