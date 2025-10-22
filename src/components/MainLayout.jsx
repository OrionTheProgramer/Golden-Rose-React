import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import NavbarClient from './NavbarClient';
import Footer from './Footer';
import { useAuth } from '../context/AuthContext'; 

function MainLayout() {
  const { userRole } = useAuth();

  return (
    <>
      {userRole === 'client' ? <NavbarClient /> : <Navbar />}

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;