import React, { useState, useEffect } from "react";

function PerfilAdmin() {
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    const usuario = localStorage.getItem("usuarioLogueado");
    if (usuario) {
      setPerfil(JSON.parse(usuario));
    }
  }, []);

  if (!perfil) return <p>Cargando perfil...</p>;

  return (
    <div className="perfil-admin">
      <h2>Perfil de {perfil.nombre}</h2>
      <p><strong>Email:</strong> {perfil.email}</p>
      <p><strong>Rol:</strong> {perfil.rol}</p>
      <p><strong>Teléfono:</strong> {perfil.telefono}</p>
    </div>
  );
}

export default PerfilAdmin;
