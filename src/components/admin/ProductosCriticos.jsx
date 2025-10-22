import React, { useState, useEffect } from "react";
import { productosCriticos } from "../../data/inventarioService";


function ProductosCriticos() {
    const [criticos, setCriticos] = useState([]);

    useEffect(() => {
        setCriticos(productosCriticos());
    }, []);   
    
    if (criticos.length === 0) {
        return (
            <div className="p-4 bg-white border rounded">
                <div>
                    <h3>Productos Críticos</h3>
                </div>
                <div className="m-1 p-2">
                    <p class="text-muted">No hay productos críticos.</p>
                </div>
            </div>
        );
    }
  return (
    <div className="p-4 bg-white border rounded">
        <div className="m-1 p-2">
            <h3>Productos Críticos</h3>
        </div>
        <div className="m-1 p-2">
            <ul>
                {criticos.map(p => (
                    <li key={p.id}>{p.nombre} - Stock: {p.stock}</li>
                ))}
            </ul>            
        </div>
    </div>
  )
  
}

export default ProductosCriticos