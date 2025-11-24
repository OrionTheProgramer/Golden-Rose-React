import React, { useState, useEffect } from "react";
import { productosCriticos } from "../../../data/inventarioService";
import { Table } from "react-bootstrap";

function ProductosCriticos() {
    const [criticos, setCriticos] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const list = await productosCriticos();
                setCriticos(list);
            } catch (err) {
                setCriticos([]);
            }
        };
        load();
    }, []);   

  const estadoStock = (stock, umbral) => {
    if (stock <= umbral) return { label: "Stock crítico", color: "red", icon: "⚠" };
    if (stock <= umbral + 2) return { label: "Stock bajo", color: "orange", icon: "⚠" };
    return { label: "Stock suficiente", color: "green", icon: "✔" };
  };    
    
    if (criticos.length === 0) {
        return (
            <div className="p-4 bg-white border rounded">
                <div>
                    <h3>⚠ Productos Críticos ⚠</h3>
                </div>
                <div className="m-1 p-2">
                    <p className="text-muted">No hay productos críticos.</p>
                </div>
            </div>
        );
    }
  return (
    <div className="p-4 bg-white border rounded">
        <div className="m-1 p-2">
            <h3>⚠ Productos Críticos ⚠</h3>
        </div>
        <div className="m-1 p-2">
            <Table bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                    <th>Nombre</th>
                    <th>Stock</th>
                    <th>Umbral</th>
                    <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                {criticos.map((p) => {
                    const estado = estadoStock(p.stock, p.umbralCritico || 0);
                    return (
                        <tr key={p.id}>
                        <td>{p.productName}</td>
                        <td>{p.stock}</td>
                        <td>{p.umbralCritico}</td>
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

export default ProductosCriticos;
