import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import MarketplacePage from "./pages/MarketplacePage";
import SkinDetailPage from "./pages/SkinDetailPage";
import Navbar from "./components/Navbar";
import Carrito from "./pages/Carrito";
import Contacto from "./pages/Contacto";
import Administrador from "./pages/admin/Administrador";
import Footer from "./components/Footer";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/index.html" element={<Administrador/>} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/skin/:id" element={<SkinDetailPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
