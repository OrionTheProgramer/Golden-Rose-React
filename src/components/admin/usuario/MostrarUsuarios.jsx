import React, { useState, useEffect } from "react";
import { ObtenerTodosUsers } from "../../../data/authDataService";

function MostrarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    setUsuarios(ObtenerTodosUsers());
  }, []);

  return (
    <div className="p-4 bg-white border rounded text-dark">
      <h3>Lista de Usuarios</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.email}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MostrarUsuarios;
