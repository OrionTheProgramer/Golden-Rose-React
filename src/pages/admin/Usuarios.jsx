import React from 'react'
import { useNavigate } from 'react-router-dom';

function Usuarios() {

  const navigate = useNavigate();

  return (
    <>
    <div className="d-flex">
      <main className="main-content rosegold m-1 p-4">
        {/* Encabezado principal */}
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h2>Usuarios</h2>
        </header>

        <section>
          
        </section>


        <div className="p-4">

          {/* Sección Usuarios */}
          <div className="mb-4 d-flex gap-2">
            <button className="btn btn-primary" onClick={() => navigate("/admin/usuarios/nuevo")}>Nuevo Usuario</button>
            <button className="btn btn-secondary" onClick={() => navigate("/admin/usuarios/mostrar")}>Mostrar Usuario</button>
            <button className="btn btn-warning" onClick={() => navigate("/admin/usuarios/editar")}>Editar Usuario</button>
            <button className="btn btn-info" onClick={() => navigate("/admin/usuarios/historial")}>Historial de Compras</button>
          </div>

        </div>      
        
      </main>
      
    </div>    
    </>
  )
}

export default Usuarios