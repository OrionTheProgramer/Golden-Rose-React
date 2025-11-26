import apiBase from "./apiConfig";
import skinsDataLocal from "./data.json";

const getProductoBase = () => apiBase.producto || apiBase.catalogo;

const unwrapProductos = async (res) => {
  const data = await res.json();
  if (Array.isArray(data)) return data;
  if (data?._embedded?.productResponseList) return data._embedded.productResponseList;
  if (data?._embedded?.productos) return data._embedded.productos;
  return [];
};

export const obtenerProductosApi = async () => {
  let res = await fetch(`${getProductoBase()}/api/productos`);
  if (!res.ok) {
    res = await fetch(`${apiBase.catalogo}/api/productos`);
  }
  if (!res.ok) {
    return skinsDataLocal;
  }
  const list = await unwrapProductos(res);
  return list.length > 0 ? list : skinsDataLocal;
};

export const obtenerProductoPorIdApi = async (id) => {
  let res = await fetch(`${getProductoBase()}/api/productos/${id}`);
  if (!res.ok) {
    res = await fetch(`${apiBase.catalogo}/api/productos/${id}`);
  }
  if (!res.ok) {
    const local = skinsDataLocal.find((s) => `${s.id}` === `${id}`);
    if (local) return local;
    throw new Error("Producto no encontrado");
  }
  return res.json();
};

export const obtenerCategoriasApi = async () => {
  const res = await fetch(`${apiBase.catalogo}/api/categorias`);
  if (!res.ok) throw new Error("No se pudieron cargar las categor�as");
  return res.json();
};
