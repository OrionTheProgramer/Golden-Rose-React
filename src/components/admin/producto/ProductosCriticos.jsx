import React, { useState, useEffect } from "react";
import { productosCriticos } from "../../../data/inventarioService";
import { Table } from "react-bootstrap";



function ProductosCriticos() {
    const [criticos, setCriticos] = useState([]);

    useEffect(() => {
        setCriticos(productosCriticos());
    }, []);   


  const estadoStock = (stock) => {
    if (stock <= 3) return { label: "Stock crítico", color: "red", icon: "⚠️" };
    if (stock <= 5) return { label: "Stock bajo", color: "orange", icon: "⚠️" };
    return { label: "Stock suficiente", color: "green", icon: "✅" };
  };    
    
    if (criticos.length === 0) {
        return (
            <div className="p-4 bg-white border rounded">
                <div>
                    <h3>⚠️ Productos Críticos ⚠️</h3>
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
            <h3>⚠️ Productos Críticos ⚠️</h3>
        </div>
        <div className="m-1 p-2">
            <Table bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                    <th>Nombre</th>
                    <th>Stock</th>
                    <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                {criticos.map((p) => {
                    const estado = estadoStock(p.stock);
                    return (
                        <tr key={p.id}>
                        <td>{p.nombre}</td>
                        <td>{p.stock}</td>
                        <td style={{ color: estado.color }}>
                            {estado.icon} {estado.label}
                        </td>
                        </tr>
                    );
                })}
            </tbody>
            </Table>
        </div>
    </div>
  )
  
}

export default ProductosCriticos