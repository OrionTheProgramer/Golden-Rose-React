import React, { useState, useEffect } from "react";
import { productosCriticos } from "../../data/inventarioService";

function EditarProducto() {
    const [criticos, setCriticos] = useState([]);

    useEffect(() => {
        setCriticos(productosCriticos());
    }, []); 
    
  if (criticos.length === 0) return (
    <div className="p-4 bg-white border rounded text-dark">
      <h3>Productos Críticos</h3>
      <p>No hay productos críticos.</p>
    </div>
  );
      
  return (
    <div className="p-4 bg-white border rounded text-dark">
      <h3>Productos Críticos</h3>
      <ul>
        {criticos.map(p => <li key={p.id}>{p.nombre} - Stock: {p.stock}</li>)}
      </ul>
    </div>
  );
}

export default EditarProducto