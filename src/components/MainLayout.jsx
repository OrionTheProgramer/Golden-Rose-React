import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import NavbarClient from './NavbarClient';
import Footer from './Footer';

function MainLayout() {
  // Revisa el rol del usuario guardado en el localStorage
  const userRole = localStorage.getItem('userRole');

  return (
    <>
      {/* Lógica condicional: 
          Si el rol es 'client', muestra NavbarClient.
          Si no (es 'guest' o null), muestra Navbar.
      */}
      {userRole === 'client' ? <NavbarClient /> : <Navbar />}
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;