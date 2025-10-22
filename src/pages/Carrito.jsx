import React, { useEffect } from "react";
import "../css/style.css";
import { useCart } from '../context/CartContext'; 
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ListGroup, Form, Image, InputGroup } from 'react-bootstrap';

function Carrito() {
  useEffect(() => {
    document.title = "Carrito | Golden Rose";
  }, []);

  const { cartItems, removeFromCart, updateQuantity, totalItems } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const iva = subtotal > 0 ? (subtotal * 0.05) : 0; // hay que añadirle iva
  const shipping = subtotal > 0 ? 1490 : 0; // Envío fijo
  const total = subtotal + iva + shipping;

  return (
    <Container as="main" className="my-5" id="carrito">
      <Row className="justify-content-center">

        {/* Columna de items del Carrito */}
        <Col lg={8} className="m-3">
          <Card className="shadow-sm">
            <Card.Header as="h5" className="p-3">
              Mi Carrito ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})
            </Card.Header>
            <Card.Body>
              
              {/* Lógica de Carrito Vacío */}
              {cartItems.length === 0 ? (
                <div className="text-center p-5">
                  <p className="text-muted">Tu carrito está vacío.</p>
                  <Button as={Link} to="/marketplace" variant="primary">
                    Ir al Mercado
                  </Button>
                </div>
              ) : (
                // Mapear y mostrar los productos reales
                cartItems.map(item => (
                  <Card as="article" className="cart-item mb-3 shadow-sm" key={item.id}>
                    <Card.Body>
                      <Row className="align-items-center">
                        {/* Imagen */}
                        <Col md={3}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        {/* Título y Botón Eliminar */}
                        <Col md={4}>
                          <h5 className="mb-1 fw-semibold text-primary">{item.name}</h5>
                          <Button 
                            variant="light" 
                            size="sm" 
                            className="fw-bold text-primary rounded-3 shadow-sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Eliminar
                          </Button>
                        </Col>
                        {/* Precio */}
                        <Col md={2} className="text-md-end">
                          <p className="mb-0 fw-bold text-primary">${(item.price * item.quantity).toLocaleString('es-CL')}</p>
                          {item.quantity > 1 && (
                            <small className="text-muted">${item.price.toLocaleString('es-CL')} c/u</small>
                          )}
                        </Col>
                        {/* Cantidad */}
                        <Col md={3} className="mt-2 mt-md-0">
                          <Form.Select
                            id={`quantity-${item.id}`} 
                            className="w-auto"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, e.target.value)}
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Form.Select>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Columna de Resumen de compra */}
        <Col lg={4} className="m-3" style={{ maxWidth: "24rem" }}>
          <Card as="section" className="shadow-sm border-0">
            <Card.Body className="p-4">
              <Card.Title as="h6" className="mb-4 fw-bold text-center border-bottom pb-2">
                Resumen de compra
              </Card.Title>

              <ListGroup variant="flush" className="mb-4">
                <ListGroup.Item className="d-flex justify-content-between border-0 px-0 py-1">
                  <span>Skins ({totalItems})</span>
                  <strong>${subtotal.toLocaleString('es-CL')}</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between border-0 px-0 py-1">
                  <span>Envíos</span>
                  <span>${shipping.toLocaleString('es-CL')}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between border-0 px-0 py-1">
                  <span>IVA</span>
                  <span>${iva.toLocaleString('es-CL', {minimumFractionDigits: 0})}</span>
                </ListGroup.Item>
              </ListGroup>

              <Form className="mb-4">
                <Form.Label className="fw-semibold">¿Tienes un cupón?</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    id="cupon"
                    placeholder="Introduce tu cupón"
                    size="sm"
                  />
                  <Button variant="outline-warning" size="sm" type="button">
                    Aplicar
                  </Button>
                </InputGroup>
              </Form>

              <div className="d-flex justify-content-between align-items-center border-top pt-3 mb-3">
                <h6 className="mb-0 fw-semibold text-primary">Total</h6>
                <h5 className="mb-0 fw-semibold text-primary">${total.toLocaleString('es-CL')}</h5>
              </div>

              <div className="d-grid">
                <Button variant="primary" disabled={cartItems.length === 0}>
                  Continuar Compra
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Carrito;