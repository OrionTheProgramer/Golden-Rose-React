import apiBase from "./apiConfig";

const jsonHeaders = { "Content-Type": "application/json" };

export const cargarCategorias = async () => {
  const res = await fetch(`${apiBase.catalogo}/api/categorias`);
  if (!res.ok) throw new Error("No se pudieron cargar las categorías");
  return res.json();
};

export const guardarCategorias = async (categorias) => categorias;

export const agregarCategoria = async (nombre) => {
  const res = await fetch(`${apiBase.catalogo}/api/categorias`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ nombre }),
  });
  if (!res.ok) throw new Error("No se pudo crear la categoría");
  return res.json();
};

export const editarCategoria = async (id, nuevoNombre) => {
  const res = await fetch(`${apiBase.catalogo}/api/categorias/${id}`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify({ nombre: nuevoNombre }),
  });
  if (!res.ok) throw new Error("No se pudo editar la categoría");
  return res.json();
};

export const eliminarCategoria = async (id) => {
  const res = await fetch(`${apiBase.catalogo}/api/categorias/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("No se pudo eliminar la categoría");
};

export const obtenerCategorias = async () => cargarCategorias();
