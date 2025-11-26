import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function PerfilAdmin() {
  const { user } = useAuth();
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    if (user) {
      setPerfil(user);
      return;
    }
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      setPerfil(JSON.parse(stored));
    }
  }, [user]);

  if (!perfil) return <p>Cargando perfil...</p>;

  return (
    <div className="perfil-admin">
      <h2>Perfil de {perfil.username || "Administrador"}</h2>
      <p>Email: {perfil.email}</p>
      <p>Rol: {perfil.role}</p>
      <p>Teléfono: {perfil.telefono || "No registrado"}</p>
    </div>
  );
}

export default PerfilAdmin;
