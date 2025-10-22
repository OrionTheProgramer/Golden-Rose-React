import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import SideBarAdmin from "../../components/SideBarAdmin";
import "../../css/home_style.css";

function Administrador() {
  useEffect(() => {
    document.title = "Administrador | Golden Rose";
  }, []); 
  
  return (
    <>
    <div className="d-flex">
      <SideBarAdmin/>
      <main className="main-content rosegold m-1 p-4">
        {/* Encabezado principal */}
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h2>¡Bienvenido Administrador!</h2>

          {/* Bandeja de notificaciones */}
          <div className="dropdown">
            <button
              className="btn btn-light position-relative"
              id="notificacionDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-bell"></i>

              {/* Contador */}
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                3
              </span>
            </button>

            <ul
              className="dropdown-menu dropdown-menu-end shadow"
              aria-labelledby="notificacionDropdown"
              style={{ minWidth: "300px" }}
            >
              <li className="dropdown-header fw-bold">Notificaciones</li>
              <li>
                <a className="dropdown-item" >
                  📦 Nuevo pedido registrado
                </a>
              </li>
              <li>
                <a className="dropdown-item" >
                  💳 Pago Recibido
                </a>
              </li>
              <li>
                <a className="dropdown-item" >
                  📊 Reporte disponible
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item text-center text-primary">
                  Ver todas
                </a>
              </li>
            </ul>
          </div>
        </header>

        {/* Sección: Resumen */}
        <section
          className="mb-4 p-4 bg-white border rounded"
          style={{ height: "350px" }}
        >
          <article>
            <h2 className="text-dark">Resumen</h2>
          </article>
        </section>

        {/* Sección: Reportes */}
        <section
          className="p-4 bg-white border rounded"
          style={{ height: "350px" }}
        >
          <article className="text-dark">
            <h2>Reportes</h2>
          </article>
        </section>
      </main>
      
    </div>
    </>
  );
}

export default Administrador;