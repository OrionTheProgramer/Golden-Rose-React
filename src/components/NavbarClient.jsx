import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import logo from '../assets/Bocetos/Original_logo.png'; 

function NavbarClient() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout(); 
    navigate('/'); 
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Logo"
          style={{ marginRight: '10px' }}
        />
        <Navbar.Brand as={Link} to="/api/home">Golden Rose</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/api/home">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/marketplace">Mercado</Nav.Link>
            <Nav.Link as={Link} to="/carrito">Carrito</Nav.Link>
          </Nav>
          
          <Nav>
            <NavDropdown title="Mi Cuenta" id="basic-nav-dropdown" align="end">
              <NavDropdown.Item as={Link} to="/perfil">Ver Perfil</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/mis-compras">Mis Compras</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Cerrar Sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarClient;
