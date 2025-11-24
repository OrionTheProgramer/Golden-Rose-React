import apiBase from "./apiConfig";

const jsonHeaders = { "Content-Type": "application/json" };

// Verifica las credenciales contra el backend
export const verificarCredenciales = async (email, password) => {
    const res = await fetch(`${apiBase.auth}/api/auth/login`, {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify({ email, password })
    });
    if (!res.ok) return null;
    return res.json();
};

// Registro de usuario en el backend
export const registroUser = async (username, email, password) => {
    const res = await fetch(`${apiBase.auth}/api/auth/register`, {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify({ username, email, password })
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "No se pudo registrar");
    }
    return res.json();
};

export const actualizarUsuario = async (usuarioActualizado) => {
  const res = await fetch(`${apiBase.usuarios}/api/usuarios/${usuarioActualizado.id}`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(usuarioActualizado),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "No se pudo actualizar el usuario");
  }
  return res.json();
};

export const ObtenerTodosUsers = async () => {
    const res = await fetch(`${apiBase.usuarios}/api/usuarios`);
    if (!res.ok) return [];
    return res.json();
};
