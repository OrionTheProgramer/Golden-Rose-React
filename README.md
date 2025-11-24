Golden Rose – Frontend & Backend Microservicios
================================================

Este repositorio contiene:
- Frontend React/Vite (directorio `./`).
- Backend de microservicios Spring Boot (directorio `golden-rose-backend/`).

Servicios y puertos
- Autentificación: 8001
- Carrito: 8002
- Usuarios: 8003
- Catálogo: 8004 (categorías / fallback productos)
- Inventario: 8005
- Órdenes: 8006
- Pagos: 8007
- Productos (opcional/dedicado): 8008 (`VITE_API_PRODUCTO`)

Frontend
1) Crear `.env` (ver `.env.example`) con las URLs de los servicios.
2) Instalar dependencias: `npm install`
3) Ejecutar: `npm run dev` (o `npm run build` / `npm run preview`)

Backend
Cada microservicio es independiente (Maven + Spring Boot). Para ejecutarlos todos en Linux/EC2:
```
cd golden-rose-backend
chmod +x start-all.sh
./start-all.sh
```
En Windows: `powershell -ExecutionPolicy Bypass -File .\start-all.ps1`

Estructura relevante
- `src/` (frontend React)
- `src/data/apiConfig.js`: configuración de endpoints.
- `golden-rose-backend/`:
  - `Autentificacion/` (login/registro JWT)
  - `Carrito/`, `Usuario/`, `Catalogo/`, `Inventario/`, `Ordenes/`, `Pagos/`
  - `start-all.sh` y `start-all.ps1` para lanzar todos

Notas de integración
- El frontend consume los microservicios vía `VITE_API_*` (ver `.env.example`).
- Productos: se consulta primero `VITE_API_PRODUCTO` (microservicio dedicado, puerto 8008). Si no responde, se usa Catálogo (8004) como respaldo.
- Imágenes de productos: el backend de catálogo soporta `imagenUrl` o imagen embebida (endpoint `/api/productos/{id}/imagen`).

Tests
- Frontend: `npm test` (Vitest).
- Cada microservicio backend: `./mvnw test` dentro de su carpeta.
