// src/pages/ReceiptPage.jsx
import React, { useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Table, Alert } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '../assets/icon.png';

function ReceiptPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const receiptRef = useRef(null);

  const orderData = location.state?.orderData;

  useEffect(() => {
    document.title = "Boleta - Golden Rose";
    if (!orderData) {
      console.error("No se encontraron datos de la orden.");
      setTimeout(() => navigate('/'), 3000);
    }
  }, [orderData, navigate]);

  const handleDownloadPdf = () => {
    const input = receiptRef.current;
    if (!input) return;

    html2canvas(input, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`boleta_goldenrose_${orderData?.orderId || 'pedido'}.pdf`);
      })
      .catch(err => {
        console.error("Error al generar PDF:", err);
        alert("Hubo un error al generar el PDF.");
      });
  };

  if (!orderData) {
    return (
      <Container className="text-center my-5">
        <Alert variant="danger">
          Error: No se encontraron los detalles de la compra. Serás redirigido al inicio.
        </Alert>
      </Container>
    );
  }

  const {
    orderId,
    date,
    items,
    subtotal,
    shipping,
    commission,
    total,
    buyerName,
    buyerEmail
  } = orderData;

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <Link to="/api/home" className="btn btn-outline-secondary mb-3">
            <i className="bi bi-arrow-left me-2"></i>Volver al Inicio
          </Link>

          <div ref={receiptRef} className="p-4" style={{ backgroundColor: '#fff', color: '#000' }}>
            <Card className="border-dark shadow-sm">
              <Card.Header className="bg-dark text-white p-4">
                <Row className="align-items-center">
                  <Col xs={3} md={2}>
                    <img src={logo} alt="Logo" style={{ maxWidth: '60px', borderRadius: '50%', backgroundColor: 'white', padding: '5px' }} />
                  </Col>
                  <Col xs={9} md={10}>
                    <h2 className="mb-0 h4">Golden Rose Store</h2>
                    <p className="mb-0 small">Venta de Skins Exclusivas</p>
                    <p className="mb-0 small">Viña del Mar, Chile</p>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="p-4">
                <h3 className="text-center mb-4 border-bottom pb-2 text-primary">Boleta Electrónica</h3>
                <Row className="mb-3">
                  <Col>
                    <strong>N° Orden:</strong> {orderId || 'N/A'}
                  </Col>
                  <Col className="text-end text-primary">
                    <strong>Fecha:</strong> {date || new Date().toLocaleDateString('es-CL')}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <strong>Comprador:</strong> {buyerName || 'No indicado'}
                  </Col>
                  <Col className="text-end">
                    <strong>Email:</strong> {buyerEmail || 'No indicado'}
                  </Col>
                </Row>
                <hr />
                <h4 className="h6 mb-3 text-primary">Detalle de Compra:</h4>
                <Table striped bordered hover responsive size="sm">
                  <thead className="table-dark">
                    <tr>
                      <th>Producto</th>
                      <th className="text-center">Cant.</th>
                      <th className="text-end">P. Unitario</th>
                      <th className="text-end">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-end">${item.price.toLocaleString('es-CL')}</td>
                        <td className="text-end">${(item.price * item.quantity).toLocaleString('es-CL')}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <hr />
                <Row className="justify-content-end mt-4">
                  <Col md={6}>
                    <Table borderless size="sm">
                      <tbody>
                        <tr>
                          <td><strong>Subtotal:</strong></td>
                          <td className="text-end">${subtotal.toLocaleString('es-CL')}</td>
                        </tr>
                        <tr>
                          <td><strong>Envío:</strong></td>
                          <td className="text-end">${shipping.toLocaleString('es-CL')}</td>
                        </tr>
                        <tr>
                          <td><strong>Comisión:</strong></td>
                          <td className="text-end">${commission.toLocaleString('es-CL', { minimumFractionDigits: 0 })}</td>
                        </tr>
                        <tr className="border-top mt-2 pt-2">
                          <td className="h5"><strong>Total:</strong></td>
                          <td className="text-end h5"><strong>${total.toLocaleString('es-CL')}</strong></td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <p className="text-center small mt-4 text-primary">
                  ¡Gracias por tu compra en Golden Rose!
                </p>
              </Card.Body>
            </Card>
          </div>

          <div className="text-center mt-4">
            <Button variant="success" onClick={handleDownloadPdf}>
              <i className="bi bi-download me-2"></i>Descargar Boleta (PDF)
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ReceiptPage;
