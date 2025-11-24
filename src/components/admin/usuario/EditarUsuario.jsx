import React, { useState, useEffect } from "react";
import { ObtenerTodosUsers, actualizarUsuario } from "../../../data/authDataService";

function EditarUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const load = async () => {
      const list = await ObtenerTodosUsers();
      setUsuarios(list);
    };
    load();
  }, []);

  const handleSeleccion = (e) => {
    const correo = e.target.value;
    const u = usuarios.find(user => user.email === correo);
    if (u) {
      setUsuarioSeleccionado(u);
      setUsername(u.username);
      setEmail(u.email);
      setRole(u.role);
    } else {
      setUsuarioSeleccionado(null);
      setUsername(""); setEmail(""); setRole("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuarioSeleccionado) return alert("Selecciona un usuario.");

    try {
      await actualizarUsuario({ ...usuarioSeleccionado, username, email, role });
      alert("Usuario actualizado!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-4 bg-white border rounded text-dark">
      <h3>Editar Usuario</h3>

      <div className="mb-3">
        <label className="form-label">Selecciona un usuario</label>
        <select className="form-select" onChange={handleSeleccion} value={usuarioSeleccionado?.email || ""}>
          <option value="">-- Selecciona --</option>
          {usuarios.map(u => (
            <option key={u.email} value={u.email}>{u.username}</option>
          ))}
        </select>
      </div>

      {usuarioSeleccionado && (
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col">
            <label className="form-label">Nombre</label>
            <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="col">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="col">
            <label className="form-label">Rol</label>
            <select className="form-select" value={role} onChange={e => setRole(e.target.value)} required>
              <option value="admin">Admin</option>
              <option value="client">Cliente</option>
            </select>
          </div>
          <div className="mt-3 text-end">
            <button className="btn btn-warning" type="submit">Guardar Cambios</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditarUsuario;
