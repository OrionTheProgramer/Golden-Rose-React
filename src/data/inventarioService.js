import apiBase from "./apiConfig";

const jsonHeaders = { "Content-Type": "application/json" };

const getProductoBase = () => apiBase.producto || apiBase.catalogo;

export const obtenerProductos = async () => {
  let res = await fetch(`${getProductoBase()}/api/productos`);
  if (!res.ok) {
    res = await fetch(`${apiBase.catalogo}/api/productos`);
  }
  if (!res.ok) throw new Error("No se pudieron obtener productos");
  return res.json();
};

export const obtenerProductoPorId = async (id) => {
  let res = await fetch(`${getProductoBase()}/api/productos/${id}`);
  if (!res.ok) {
    res = await fetch(`${apiBase.catalogo}/api/productos/${id}`);
  }
  if (!res.ok) throw new Error("Producto no encontrado");
  return res.json();
};

export const agregarProducto = async (producto) => {
  const res = await fetch(`${getProductoBase()}/api/productos`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error("No se pudo crear el producto");
  return res.json();
};

export const editarProducto = async (id, datosActualizados) => {
  const res = await fetch(`${getProductoBase()}/api/productos/${id}`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(datosActualizados),
  });
  if (!res.ok) throw new Error("No se pudo editar el producto");
  return res.json();
};

export const eliminarProducto = async (id) => {
  const res = await fetch(`${getProductoBase()}/api/productos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("No se pudo eliminar el producto");
  return true;
};

// Productos críticos vía microservicio de inventario
export const productosCriticos = async () => {
  const res = await fetch(`${apiBase.inventario}/api/inventario/criticos`);
  if (!res.ok) throw new Error("No se pudieron obtener productos críticos");
  return res.json();
};
