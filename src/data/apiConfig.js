// Base URLs for each microservice. Override via environment variables if needed.
const apiBase = {
  auth: import.meta.env.VITE_API_AUTH || 'http://localhost:8001',
  usuarios: import.meta.env.VITE_API_USUARIOS || 'http://localhost:8003',
  catalogo: import.meta.env.VITE_API_CATALOGO || 'http://localhost:8004',
  inventario: import.meta.env.VITE_API_INVENTARIO || 'http://localhost:8005',
  ordenes: import.meta.env.VITE_API_ORDENES || 'http://localhost:8006',
  pagos: import.meta.env.VITE_API_PAGOS || 'http://localhost:8007',
  carrito: import.meta.env.VITE_API_CARRITO || 'http://localhost:8002',
};

export default apiBase;
