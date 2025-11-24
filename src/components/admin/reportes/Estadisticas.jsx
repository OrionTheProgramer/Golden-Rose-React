import React, { useEffect, useState } from "react";
import { ObtenerTodosUsers } from "../../../data/authDataService";
import { obtenerProductos } from "../../../data/inventarioService";

function Estadistica() {
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setUsuarios(ObtenerTodosUsers());
    setProductos(obtenerProductos());
  }, []);

  const totalUsuarios = usuarios.length;
  const admins = usuarios.filter(u => u.role === "admin").length;
  const clientes = usuarios.filter(u => u.role === "client").length;

  const totalProductos = productos.length;
  const totalStock = productos.reduce((acc, p) => acc + p.stock, 0);

  return (
    <div className="p-4 bg-white border rounded text-dark ">
      <h3 className="mb-3">Reportes Generales</h3>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Usuarios</h5>
              <hr className="my-4" style={{ backgroundColor: "white", height: "2px", border: "none" }}/>
              <p className="card-text text-primary">Total de usuarios: {totalUsuarios}</p>
              <p className="card-text text-primary">Administradores: {admins}</p>
              <p className="card-text text-primary">Clientes: {clientes}</p>
            </div>
          </div>
        </div>

         <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Productos</h5>
              <hr className="my-4" style={{ backgroundColor: "white", height: "2px", border: "none" }}/>
              <p className="card-text text-primary">Total de productos: {totalProductos}</p>
              <p className="card-text text-primary">Total de stock: {totalStock}</p>
              <p className="card-text text-primary">Productos críticos (stock &lt; 5): {productos.filter(p => p.stock < 5).length}</p>
            </div>
          </div>          
        </div>       

      </div>
    </div>
  );
}

export default Estadistica;
