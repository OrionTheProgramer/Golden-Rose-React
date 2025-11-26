import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { obtenerProductos, eliminarProducto  } from "../../../data/inventarioService";

function MostrarProductos() {
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const load = async () => {
        try {
            const data = await obtenerProductos();
            setProductos(data);
            setError(null);
        } catch (err) {
            setError("No se pudieron cargar productos");
        }
    };

    useEffect(() => {
        load();
    }, []);

    const handleEditarProducto = (id) => {
        navigate(`/admin/productos/editar/${id}`);
    };    

    const handleEliminar = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
            try {
                await eliminarProducto(id);
                load();
            } catch (err) {
                alert("No se pudo eliminar");
            }
        }
    };
    
    if (productos.length === 0) {
        return (
            <div className="p-4 bg-white border rounded text-dark">
                <div>
                    <h3>Inventario</h3>
                </div>
                <div className="m-1 p-2">
                    <p className="text-muted">El inventario está vacío.</p>
                    {error && <p className="text-danger">{error}</p>}
                </div>
            </div>
        );
    }    

  return (
    <div className="p-4 bg-white border rounded text-dark">
        <div>
            <h3>Inventario</h3>
            {error && <p className="text-danger">{error}</p>}
        </div>
        
        <div 
            className="m-1 p-2 overflow-x-auto"
        >
            <Table
                className="table" 
                bordered 
                hover 
                responsive
                border={1}>
                <thead className="table-dark">
                    <tr>
                        <th className="border px-4 py-2 text-left">Nombre</th>
                        <th className="border px-4 py-2 text-left">Precio</th>
                        <th className="border px-4 py-2 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(p => (
                        <tr key={p.id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">{p.nombre}</td>
                            <td className="border px-4 py-2">$ {p.precio}</td>
                            <td className="border px-4 py-2">
                            <div className="d-flex gap-2 justify-content-center">
                                <button
                                className="btn btn-warning btn-sm"
                                onClick={() => handleEditarProducto(p.id)}
                                >
                                Editar
                                </button>
                                <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleEliminar(p.id)}
                                >
                                Eliminar
                                </button>
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

export default MostrarProductos;
