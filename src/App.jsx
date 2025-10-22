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
        </Route>

        {/* --- GRUPO DE RUTAS 2: Layout de Admin --- */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Administrador />} />
          <Route path="/admin/ordenes" element={<Ordenes />} />
        </Route>

        {/* --- Ruta 404 --- */}
        <Route path="*" element={<h1 className="text-center m-2 p-5">404 - Página no encontrada</h1>} />
      
      </Routes>
    </>
  )
}

export default App