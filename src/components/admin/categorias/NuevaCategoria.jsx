import React, { useState } from "react";
import { agregarCategoria } from "../../../data/categoriasService";

function NuevaCategoria() {
  const [nombre, setNombre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    agregarCategoria(nombre);
    setNombre("");
    alert("Categoría agregada!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border rounded text-dark">
      <h3 className="mb-4">Nueva Categoría</h3>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre de la categoría"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Agregar</button>
    </form>
  );
}

export default NuevaCategoria;
