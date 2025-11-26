import React, { useEffect } from "react";
import "../css/style.css";
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ListGroup, Form, Image, InputGroup, Alert } from 'react-bootstrap'; // Make sure all necessary components are imported

function Carrito() {
  useEffect(() => {
    document.title = "Carrito | Golden Rose";
  }, []);

  const { cartItems, removeFromCart, updateQuantity, totalItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const commission = subtotal > 0 ? (subtotal * 0.05) : 0;
  const shipping = subtotal > 0 ? 300 : 0;
  const total = subtotal + commission + shipping;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const orderDetails = {
      orderId: `GR-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('es-CL'),
      buyerName: user?.username || user?.email || 'Invitado',
      buyerEmail: user?.email || 'No registrado',
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal,
      shipping,
      commission,
      total,
    };

    clearCart();
    navigate('/recibo', { state: { orderData: orderDetails } });
  };

  return (
    <>
      <main className="container my-5" id="carrito">
        <Row className="justify-content-center">
          <Col lg={8} className="m-3">
            <Card className="shadow-sm">
              <Card.Header as="h5" className="p-3">
                Mi Carrito ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})
              </Card.Header>
              <Card.Body>
                {cartItems.length === 0 ? (
                  <div className="text-center p-5">
                    <p className="text-muted">Tu carrito está vacío.</p>
                    <Button as={Link} to="/marketplace" variant="primary">
                      Ir al Mercado
                    </Button>
                  </div>
                ) : (
                  cartItems.map(item => (
                    <Card as="article" className="cart-item mb-3 shadow-sm" key={item.id}>
                      <Card.Body>
                        <Row className="align-items-center">
                          <Col md={3}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
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
                          <Col md={2} className="text-md-end">
                            <p className="mb-0 fw-bold text-primary">${(item.price * item.quantity).toLocaleString('es-CL')}</p>
                            {item.quantity > 1 && (
                              <small className="text-muted">${item.price.toLocaleString('es-CL')} c/u</small>
                            )}
                          </Col>
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
                    <span>Comisión</span>
                    <span>${commission.toLocaleString('es-CL', {minimumFractionDigits: 0})}</span>
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
                  <h5 className="mb-0 fw-bold text-primary">${total.toLocaleString('es-CL')}</h5>
                </div>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    disabled={cartItems.length === 0}
                    onClick={handleCheckout}
                  >
                    Pagar Ahora
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default Carrito;
