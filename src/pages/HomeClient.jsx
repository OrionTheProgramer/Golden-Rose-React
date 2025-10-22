import React from 'react';
import { Container, Carousel, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import skinsData from '../data/data.json';
import Footer from '../components/Footer';
import NavbarClient from '../components/NavbarClient';

function HomeClient() {
  const navigate = useNavigate();

  const featured = skinsData.slice(0, 3);

  return (
    <>
    <NavbarClient />
    <Container className="my-5">
      {/* Carousel de skins destacadas */}
      <Carousel  id='carouselSkins' interval={3000} pause='hover'>
        {featured.map((skin) => (
          <Carousel.Item key={skin.id}>
            <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }} onClick={() => navigate(`/skin/${skin.id}`)}>
              <img
                src={skin.image}
                alt={skin.name}
                style={{ maxHeight: '400px', objectFit: 'contain' }}
              />
            </div>
            <Carousel.Caption>
              <h3>{skin.name}</h3>
              <p className="d-none d-md-block">{skin.desc.slice(0, 120)}...</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Sección de reseñas */}
      <section className="mt-5" id='comentarios'>
        <h2 className="mb-4 text-center">Comentarios y calificaciones</h2>
        <Row>
          <Col md={4}>
            <Card className="mb-3 knife-card comentario-text" id='comentarios h2'>
              <Card.Body>
                <Card.Title style={{ color: 'white' }}>Juan</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">5/5</Card.Subtitle>
                <Card.Text>
                  Excelente selección de skins. Servicio rápido y precios justos.
                </Card.Text>
                <Button variant="link" onClick={() => {}}>Leer más</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 knife-card">
              <Card.Body>
                <Card.Title style={{ color: 'white' }}>María</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">4.5/5</Card.Subtitle>
                <Card.Text>
                  Gran experiencia, la skin llegó en perfecto estado.
                </Card.Text>
                <Button variant="link" onClick={() => {}}>Leer más</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 knife-card">
              <Card.Body>
                <Card.Title style={{ color: 'white' }}>Carlos</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">5/5</Card.Subtitle>
                <Card.Text>
                  Muy recomendado, buen soporte y producto tal cual la descripción.
                </Card.Text>
                <Button variant="link" onClick={() => {}}>Leer más</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
    <Footer/>
    </>
  );
}

export default HomeClient;