import apiBase from "./apiConfig";

const getProductoBase = () => apiBase.producto || apiBase.catalogo;

const buildProductoPayload = (producto) => {
  const hasFile = producto?.imagenFile instanceof File;
  if (hasFile) {
    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    if (producto.descripcion) formData.append("descripcion", producto.descripcion);
    if (producto.categoria) formData.append("categoria", producto.categoria);
    if (producto.rareza) formData.append("rareza", producto.rareza);
    if (producto.imagenUrl) formData.append("imagenUrl", producto.imagenUrl);
    if (producto.referenciaExterna) formData.append("referenciaExterna", producto.referenciaExterna);
    if (producto.activo !== undefined) formData.append("activo", producto.activo);
    if (producto.imagenFile) formData.append("imagen", producto.imagenFile);
    return { body: formData };
  }

  // JSON/base64
  const jsonBody = {
    nombre: producto.nombre,
    precio: producto.precio,
    descripcion: producto.descripcion,
    categoria: producto.categoria,
    rareza: producto.rareza,
    imagenUrl: producto.imagenUrl,
    imagenBase64: producto.imagenBase64,
    imagenContentType: producto.imagenContentType,
    referenciaExterna: producto.referenciaExterna,
    activo: producto.activo,
  };
  return {
    body: JSON.stringify(jsonBody),
    headers: { "Content-Type": "application/json" },
  };
};

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
  const { body, headers } = buildProductoPayload(producto);
  const res = await fetch(`${getProductoBase()}/api/productos`, {
    method: "POST",
    headers,
    body,
  });
  if (!res.ok) throw new Error("No se pudo crear el producto");
  return res.json();
};

export const editarProducto = async (id, datosActualizados) => {
  const { body, headers } = buildProductoPayload(datosActualizados);
  const res = await fetch(`${getProductoBase()}/api/productos/${id}`, {
    method: "PUT",
    headers,
    body,
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
