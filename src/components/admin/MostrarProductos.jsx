import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap'
import { obtenerProductos, editarProducto } from "../../data/inventarioService";

function MostrarProductos() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        setProductos(obtenerProductos());
    }, []);

    const handleEditarStock = (id) => {
        const nuevoStock = prompt("Ingrese nuevo stock:")
        if (nuevoStock !== null) {
            editarProducto(id, { stock: Number(nuevoStock) });
            setProductos(obtenerProductos());
        }
    };

  return (
    <div className="p-4 bg-white border rounded text-dark">
        <div>
            <h3>Inventario</h3>
        </div>
        
        <div 
            className="m-1 p-2 overflow-x-auto"
        >
            <Table
                class="table" 
                bordered 
                hover 
                responsive
                border={1}>
                <thead className="table-dark">
                    <tr>
                        <th className="border px-4 py-2 text-left">Nombre</th>
                        <th className="border px-4 py-2 text-left">Precio</th>
                        <th className="border px-4 py-2 text-left">Stock</th>
                        <th className="border px-4 py-2 text-left">Categoría</th>
                        <th className="border px-4 py-2 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(p => (
                        <tr key={p.id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">{p.nombre}</td>
                            <td className="border px-4 py-2">$ {p.precio}</td>
                            <td className="border px-4 py-2">{p.stock}</td>
                            <td className="border px-4 py-2">{p.categoria}</td>
                            <td className="border px-4 py-2">
                                <div className="flex justify-center">
                                    <button className="btn btn-success px-3 py-1 text-sm text-center" onClick={() => handleEditarStock(p.id)}>Editar Stock</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table> 
                       
        </div>
    </div>
  )
}

export default MostrarProductos