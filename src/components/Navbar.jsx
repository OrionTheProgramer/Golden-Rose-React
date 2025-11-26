import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Bocetos/Original_logo.png';
import { useCart } from '../context/CartContext';

function NavbarComponent() {
  const cartContext = useCart && typeof useCart === 'function' ? useCart() : null;
  const totalItems = cartContext && typeof cartContext.totalItems === 'number' ? cartContext.totalItems : 0;
  const navigate = useNavigate();

  const handleCart = () => navigate('/carrito');

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
        <Navbar.Brand as={Link} to="/">Golden Rose</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/marketplace">Productos</Nav.Link>
            <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            <Button variant="outline-light" className="me-2" onClick={handleCart}>
              Carrito ({totalItems})
            </Button>
            <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
            <Nav.Link as={Link} to="/registro" className="btn btn-golden text-uppercase ms-2 px-3">
              Registrarse
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
