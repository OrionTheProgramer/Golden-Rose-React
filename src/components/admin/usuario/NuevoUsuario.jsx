import React, { useState } from "react";
import { registroUser } from "../../../data/authDataService";

function NuevoUsuario() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      registroUser(username, email, password);
      alert("Usuario registrado!");
      setUsername(""); setEmail(""); setPassword("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className="p-4 bg-white border rounded text-dark" onSubmit={handleSubmit}>
      <div className="mb-3">
        <h3>Nuevo Usuario</h3>
      </div>
      <div className="mb-3 gap-1">
        <label className="form-label">Nombre de usuario</label>
        <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <div className="text-end">
        <button className="btn btn-primary" type="submit">Registrar Usuario</button>
      </div>
    </form>
  );
}

export default NuevoUsuario;
