const CLAVE_CATEGORIAS = "goldenRose_categorias";

// Cargar categorías desde localStorage o crear lista vacía
export const cargarCategorias = () => {
  const stored = localStorage.getItem(CLAVE_CATEGORIAS);
  if (stored) return JSON.parse(stored);

  const categoriasIniciales = []; 
  localStorage.setItem(CLAVE_CATEGORIAS, JSON.stringify(categoriasIniciales));
  return categoriasIniciales;
};

// Guardar categorías
export const guardarCategorias = (categorias) => {
  localStorage.setItem(CLAVE_CATEGORIAS, JSON.stringify(categorias));
};

// Agregar nueva categoría
export const agregarCategoria = (nombre) => {
  const categorias = cargarCategorias();
  const nueva = { id: Date.now(), nombre };
  categorias.push(nueva);
  guardarCategorias(categorias);
  return nueva;
};

// Editar categoría
export const editarCategoria = (id, nuevoNombre) => {
  const categorias = cargarCategorias();
  const index = categorias.findIndex(c => c.id === id);
  if (index !== -1) {
    categorias[index].nombre = nuevoNombre;
    guardarCategorias(categorias);
    return categorias[index];
  }
  return null;
};

// Eliminar categoría
export const eliminarCategoria = (id) => {
  let categorias = cargarCategorias();
  categorias = categorias.filter(c => c.id !== id);
  guardarCategorias(categorias);
};

// Obtener todas las categorías
export const obtenerCategorias = () => {
  return cargarCategorias();
};
