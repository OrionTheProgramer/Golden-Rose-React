import React from 'react'
import MostrarProductos from '../../components/admin/producto/MostrarProductos'
import { useNavigate } from 'react-router-dom';
import ProductosCriticos from "../../components/admin/producto/ProductosCriticos";

function Productos() {
    const navigate = useNavigate();

  return (
    <>
    <div className="d-flex">
      <main className="main-content rosegold m-1 p-4">
        {/* Encabezado principal */}
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h2>Productos</h2>
          <div className='d-flex gap-2'>
            <button
             style={{ fontSize: "14px", padding: "6px 12px" }}
                className='form-control'
                onClick={() => navigate("/admin/productos/nuevo")}
            >
                Nuevo Producto
            </button> 
            <button
              style={{ fontSize: "14px", padding: "6px 12px" }}
              className="btn btn-secondary"
              onClick={() => navigate("/admin/productos/mostrar")}
            >
              Mostrar Producto
            </button>

            <button
              style={{ fontSize: "14px", padding: "6px 12px" }}
              className="btn btn-warning"
              onClick={() => navigate("/admin/productos/editar/:id")}
            >
              Editar Producto
            </button>                                  
          </div>
        </header>

        <article className="mb-4 text-dark">
            <MostrarProductos/>
        </article>
        
        <article className="mb-4 text-dark">
            <div>
                <h3></h3>
            </div>
            <ProductosCriticos/>
        </article>
            
        
      </main>
      
    </div>    
    </>
  )
}

export default Productos