import React, { useState, useEffect } from 'react';
import { obtenerProductos } from "../../data/inventarioService";

function Reportes() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        setProductos(obtenerProductos());
    }, []);    
        
    const totalProductos = productos.length;
    const totalStock = productos.reduce((acc, p) => acc + p.stock, 0);

  return (
    <div className="p-4 bg-white border rounded">
        <div className="p-1 ">
            <h3>Reportes</h3>
        </div>
        <div className="m-2 p-2">
            <p class="text-secondary">Total de productos: {totalProductos}</p>
            <p class="text-secondary">Total de Stock: {totalStock}</p>
        </div>
    </div>
  )
}

export default Reportes