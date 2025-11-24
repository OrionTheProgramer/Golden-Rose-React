import apiBase from "./apiConfig";

export const obtenerProductosApi = async () => {
  const res = await fetch(`${apiBase.catalogo}/api/productos`);
  if (!res.ok) throw new Error("No se pudieron cargar los productos");
  return res.json();
};

export const obtenerProductoPorIdApi = async (id) => {
  const res = await fetch(`${apiBase.catalogo}/api/productos/${id}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  return res.json();
};

export const obtenerCategoriasApi = async () => {
  const res = await fetch(`${apiBase.catalogo}/api/categorias`);
  if (!res.ok) throw new Error("No se pudieron cargar las categorías");
  return res.json();
};
