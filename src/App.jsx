import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import AdminLayout from "./components/AdminLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import MarketplacePage from "./pages/MarketplacePage";
import SkinDetailPage from "./pages/SkinDetailPage";
import Carrito from "./pages/Carrito";
import Contacto from "./pages/Contacto";
import Administrador from "./pages/admin/Administrador";
import HomeClient from "./pages/HomeClient";
import Blog from "./pages/Blog";
import BlogDetailPage from "./pages/BlogDetailPage";
import Ordenes from "./pages/admin/Ordenes";
import Reportes from "./pages/admin/Reportes";
import PerfilAdmin from "./pages/admin/PerfilAdmin";

import Productos from "./pages/admin/Productos";
import NuevoProducto from "./components/admin/producto/NuevoProducto";
import MostrarProductos from "./components/admin/producto/MostrarProductos";
import EditarProducto from "./components/admin/producto/EditarProducto";
import ReceiptPage from "./pages/ReceiptPage";

import Usuarios from "./pages/admin/Usuarios";
import NuevoUsuario from "./components/admin/usuario/NuevoUsuario";
import MostrarUsuarios from "./components/admin/usuario/MostrarUsuarios";
import EditarUsuario from "./components/admin/usuario/EditarUsuario";
import HistorialCompras from "./components/admin/usuario/HistorialCompras";

import Categorias from "./pages/admin/Categorias";
import MostrarCategorias from "./components/admin/categorias/MostrarCategorias";
import NuevaCategoria from "./components/admin/categorias/NuevaCategoria";

function App() {

  return (
    <>
      <Routes>
        
        {/* --- GRUPO DE RUTAS 1: Layout Principal (Cliente y Visitante) --- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/api/home" element={<HomeClient />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/skin/:id" element={<SkinDetailPage />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/recibo" element={<ReceiptPage />} />
        </Route>

        {/* --- GRUPO DE RUTAS 2: Layout de Admin --- */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Administrador />} />
          <Route path="/admin/ordenes" element={<Ordenes />} />

          <Route path="/admin/productos" element={<Productos />} />
          <Route path="/admin/productos/nuevo" element={<NuevoProducto />} />
          <Route path="/admin/productos/mostrar" element={<MostrarProductos />} />
          <Route path="/admin/productos/editar/:id" element={<EditarProducto />} />

          <Route path="/admin/categorias" element={<Categorias />} />
          <Route path="/admin/categorias/nuevo" element={<NuevaCategoria />} />
          <Route path="/admin/categorias/mostrar" element={<MostrarCategorias />} />
                    

          <Route path="/admin/usuarios" element={<Usuarios />} />
          <Route path="/admin/usuarios/nuevo" element={<NuevoUsuario />} />
          <Route path="/admin/usuarios/mostrar" element={<MostrarUsuarios />} />
          <Route path="/admin/usuarios/editar" element={<EditarUsuario />} />
          <Route path="/admin/usuarios/historial" element={<HistorialCompras />} />

          


          <Route path="/admin/reportes" element={<Reportes />} />
          <Route path="/admin/perfil" element={<PerfilAdmin/>} />
          
        </Route>

        {/* --- Ruta 404 --- */}
        <Route path="*" element={<h1 className="text-center m-2 p-5">404 - Página no encontrada</h1>} />
      
      </Routes>
    </>
  )
}

export default App