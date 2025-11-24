import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { obtenerCategorias, editarCategoria, eliminarCategoria } from "../../../data/categoriasService";

function MostrarCategorias() {
  const [categorias, setCategorias] = useState([]);

  const load = async () => {
    try {
      const data = await obtenerCategorias();
      setCategorias(data);
    } catch (err) {
      setCategorias([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleEditar = async (id) => {
    const nuevoNombre = prompt("Nuevo nombre de la categoría:");
    if (nuevoNombre) {
      await editarCategoria(id, nuevoNombre);
      load();
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Eliminar esta categoría?")) {
      await eliminarCategoria(id);
      load();
    }
  };

  if (categorias.length === 0) {
        return (
            <div className="p-4 bg-white border rounded text-dark mb-4">
                <div className="mt-1">
                    <h3 className="mb-4">Categorías</h3>
                </div>
                <div className="m-1 p-2">
                    <p>No hay categorías.</p>
                </div>                
            </div>
        );
    }   

  return (
    <div className="p-4 bg-white border rounded text-dark mb-4">
        <div className="mt-1">
            <h3 className="mb-4">Categorías</h3>
        </div>
        <Table bordered hover responsive className="mb-4">
            <thead className="table-dark">
                <tr>
                <th>Nombre</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {categorias.map(c => (
                <tr key={c.id}>
                    <td>{c.nombre}</td>
                    <td className="d-flex gap-2">
                    <button className="btn btn-warning btn-sm" onClick={() => handleEditar(c.id)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(c.id)}>Eliminar</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </Table>                          
    </div>      
  );
}

export default MostrarCategorias;
