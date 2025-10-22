import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { obtenerCategorias, editarCategoria, eliminarCategoria } from "../../../data/categoriasService";

function MostrarCategorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    setCategorias(obtenerCategorias());
  }, []);

  const handleEditar = (id) => {
    const nuevoNombre = prompt("Nuevo nombre de la categoría:");
    if (nuevoNombre) {
      editarCategoria(id, nuevoNombre);
      setCategorias(obtenerCategorias());
    }
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Eliminar esta categoría?")) {
      eliminarCategoria(id);
      setCategorias(obtenerCategorias());
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
