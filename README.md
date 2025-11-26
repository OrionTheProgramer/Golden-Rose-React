Golden Rose - Frontend & Backend Microservicios
================================================

Este repositorio contiene:
- Frontend React/Vite (directorio `./`).
- Backend de microservicios Spring Boot (directorio `golden-rose-backend/`).

Servicios y puertos
- Autenticación: 8001
- Carrito: 8002
- Usuarios: 8003
- Catálogo: 8004 (categorías / fallback productos)
- Inventario: 8005
- Órdenes: 8006
- Pagos: 8007
- Productos (microservicio dedicado): 8008 (`VITE_API_PRODUCTO`)

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
  - `Carrito/`, `Usuario/`, `Catalogo/`, `Inventario/`, `Ordenes/`, `Pagos/`, `Productos/`
  - `start-all.sh` y `start-all.ps1` para lanzar todos

Crear productos (solo URL de imagen)
`POST /api/productos` en el microservicio Productos (8008):
```json
{
  "nombre": "Vandal Champions 2025",
  "descripcion": "Edición especial",
  "rareza": "Exclusive",
  "precio": 49.99,
  "imagenUrl": "https://ejemplo.com/vandal.png",
  "stock": 25
}
```
Actualizar: `PUT /api/productos/{id}` con el mismo cuerpo.

Notas
- Los POST/PUT de productos se hacen en `Productos` (8008). `Catalogo` responde con redirect y lee desde Productos.
- Imágenes de productos: consumir directamente `imagenUrl`.

Tests
- Frontend: `npm test` (Vitest).
- Cada microservicio backend: `./mvnw test` dentro de su carpeta.
