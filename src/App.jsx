// src/App.jsx
import { Route, Routes } from "react-router-dom";

// Importa tus Layouts
import MainLayout from "./components/MainLayout";
import AdminLayout from "./components/AdminLayout";

// Importa tus Páginas
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
// NOTA: Ya no necesitas importar Footer o Navbar aquí

function App() {
  return (
    <>
      <Routes>
        
        {/* Todas las rutas DENTRO de este grupo se renderizarán DENTRO de <MainLayout /> */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/api/home" element={<HomeClient />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/skin/:id" element={<SkinDetailPage />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        </Route>

        {/* Todas las rutas de admin van aquí adentro */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Administrador />} />
          {/* Si tuvieras más páginas de admin, irían aquí:
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
          <Route path="/admin/productos" element={<AdminProductos />} />
          */}
        </Route>

        {/* --- Ruta 404 --- */}
        <Route path="*" element={<h1 className="text-center m-2 p-5">404 - Página no encontrada</h1>} />
      
      </Routes>
    </>
  );
}

export default App;