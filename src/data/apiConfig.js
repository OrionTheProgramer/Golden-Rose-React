// Base URLs for each microservice. Override via environment variables if needed.
const cloudHost = 'http://35.170.88.63';

const apiBase = {
  auth: import.meta.env.VITE_API_AUTH || `${cloudHost}:8001`,
  carrito: import.meta.env.VITE_API_CARRITO || `${cloudHost}:8002`,
  usuarios: import.meta.env.VITE_API_USUARIOS || `${cloudHost}:8003`,
  catalogo: import.meta.env.VITE_API_CATALOGO || `${cloudHost}:8004`,
  inventario: import.meta.env.VITE_API_INVENTARIO || `${cloudHost}:8005`,
  ordenes: import.meta.env.VITE_API_ORDENES || `${cloudHost}:8006`,
  pagos: import.meta.env.VITE_API_PAGOS || `${cloudHost}:8007`,
  producto: import.meta.env.VITE_API_PRODUCTO || `${cloudHost}:8008`,
};

export default apiBase;
