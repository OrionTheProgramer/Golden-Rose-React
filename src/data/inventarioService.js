const CLAVE_PRODUCTOS = "goldenRose_products";

// Cargar productos desde localStorage o datos iniciales
export const cargarProductos = () => {
  const stored = localStorage.getItem(CLAVE_PRODUCTOS);
  if (stored) return JSON.parse(stored);

  const productosIniciales = []; // o tus skins iniciales
  localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productosIniciales));
  return productosIniciales;
};

export const guardarProductos = (productos) => {
  localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos));
};

// Nuevo producto
export const agregarProducto = (producto) => {
  const productos = cargarProductos();
  producto.id = Date.now(); // id único simple
  productos.push(producto);
  guardarProductos(productos);
  return producto;
};

// Editar producto
export const editarProducto = (id, datosActualizados) => {
  const productos = cargarProductos();
  const index = productos.findIndex(p => p.id === id);
  if (index !== -1) {
    productos[index] = { ...productos[index], ...datosActualizados };
    guardarProductos(productos);
    return productos[index];
  }
  return null;
};

// Actualizar un producto
export const actualizarProducto = (productoActualizado) => {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const nuevos = productos.map(p =>
    p.id === productoActualizado.id ? productoActualizado : p
  );
  localStorage.setItem("productos", JSON.stringify(nuevos));
};

// Mostrar productos
export const obtenerProductos = () => {
  return cargarProductos();
};

// Obtener un producto por id
export const obtenerProductoPorId = (id) => {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  return productos.find(p => p.id === id);
};

export const eliminarProducto = (id) => {
  const productos = cargarProductos(); 
  const nuevosProductos = productos.filter(p => p.id !== id); 
  guardarProductos(nuevosProductos); 
  return nuevosProductos; 
};

// Productos críticos (poco stock)
export const productosCriticos = (umbral = 5) => {
  return cargarProductos().filter(p => p.stock <= umbral);
};
