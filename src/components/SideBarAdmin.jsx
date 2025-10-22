import React from "react";
import logo from "../assets/icon.png";
import { Link } from "react-router-dom";


function SideBarAdmin() {

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');

    window.location.href = '/login'
  }

  return (
    <aside className="d-flex flex-column justify-content-between vh-100 border-end position-sticky top-0" style={{ width: "250px", backgroundColor: "#ff4655" }}>
        <header className="p-3 border-bottom m-1">
            <h4 className="d-flex align-items-center">
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
                fontSize: "1.4rem",
                fontWeight: "bold",
                letterSpacing: "1px",
                color: "#FFD700",
                textShadow: "1px 1px 8px #ffb6c1",
                marginLeft: "10px",
                }}
            >
                Golden Rose
            </span>
            </h4>
        </header>

        {/* Panel lateral izquierdo */}
        <nav className="flex-grow-1 m-2">
            <ul className="nav nav-pills flex-column">
                <li className="nav-item mb-1">
                    <Link to="/" className="nav-link active">
                    <i className="bi bi-grid me-2"></i> Dashboard
                    </Link>
                </li>

                <li className="nav-item mb-1">
                    <Link to="/" className="nav-link text-dark ">
                    <i className="bi bi-bag me-2"></i> Ordenes
                    </Link>
                </li>

                <li className="nav-item mb-1">
                    <Link to="/" className="nav-link text-dark">
                    <i className="bi bi-box-seam me-2"></i> Productos
                    </Link>
                </li>

                <li className="nav-item mb-1">
                    <Link to="/" className="nav-link text-dark">
                    <i className="bi bi-clipboard-data me-2"></i> Categorías
                    </Link>
                </li>

                <li className="nav-item mb-1">
                    <Link to="/empleados" className="nav-link text-dark">
                    <i className="bi bi-people me-2"></i> Usuarios
                    </Link>
                </li>

                <li className="nav-item mb-1">
                    <Link to="/clientes" className="nav-link text-dark">
                    <i className="bi bi-person-lines-fill me-2"></i> Reporte
                    </Link>
                </li>
                <hr />
            </ul>

            <section className="m-1">
                <div>
                    <Link to="/perfil" className="btn btn-outline-secondary w-100">
                        <i className="bi bi-person-circle me-2"></i> Perfil
                    </Link>
                </div>
            </section>

            <section className="d-grid gap-3 m-1 p-1">
                <hr />
                <Link className="text-decoration-none" to="/">                
                    <button className="btn btn-dark w-100">
                        <i className="bi bi-shop me-2">
                        </i> Tienda
                    </button>
                </Link>
                <Link className="text-decoration-none">                
                    <button onClick={handleLogout} className="btn btn-outline-light w-100">
                        <i className="bi bi-door-open me-2 ">
                        </i> Cerrar Sesión
                    </button>
                </Link>                                          
            </section>            





        </nav>
    </aside>
  );
}

export default SideBarAdmin;
