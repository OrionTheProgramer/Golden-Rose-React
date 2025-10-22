import { Route, Routes } from "react-router-dom";
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

function App() {

  return (
    <>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/skin/:id" element={<SkinDetailPage />} />

        <Route 
          path="/api/home" 
          element={
          <HomeClient />
        } 
        />

        {/* Proteger Rutas */}
        <Route 
          path="/admin" 
          element={
            
          <Administrador/>
        } 
        />

        {/* Ruta inexistente (404) */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </>
  )
}

export default App
