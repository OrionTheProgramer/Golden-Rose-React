import React from 'react';
import { Container, Carousel, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import skinsData from '../data/data.json';

function Home() {
  const navigate = useNavigate();

  const featured = skinsData.slice(0, 3);

  return (
    <Container className="my-5">
      {/* Carousel de skins destacadas */}
      {/* El ID se mantiene para que el CSS le aplique el estilo de sombra y tamaño */}
      <Carousel id='carouselSkins' interval={3000} pause='hover'>
        {featured.map((skin) => (
          <Carousel.Item key={skin.id}>
            <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }} onClick={() => navigate(`/skin/${skin.id}`)}>
              {/* No más 'style' en línea, el CSS lo maneja */}
              <img
                src={skin.image}
                alt={skin.name}
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
      {/* Mantenemos el ID para el estilo del <h2> */}
      <section className="mt-5" id='comentarios'> 
        <h2 className="mb-4 text-center">Comentarios y calificaciones</h2>
        <Row>
          {/* Columna 1 */}
          <Col md={4}>
            {/* Solo se necesita la clase .card y el margen 'mb-3' */}
            <Card className="mb-3">
              <Card.Body>
                {/* No más 'style' en línea */}
                <Card.Title>Juan</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">5/5</Card.Subtitle>
                <Card.Text>
                  Excelente selección de skins. Servicio rápido y precios justos.
                </Card.Text>
                <Button variant="link" onClick={() => {}}>Leer más</Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Columna 2 */}
          <Col md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>María</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">4.5/5</Card.Subtitle>
                <Card.Text>
                  Gran experiencia, la skin llegó en perfecto estado.
                </Card.Text>
                <Button variant="link" onClick={() => {}}>Leer más</Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Columna 3 */}
          <Col md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Carlos</Card.Title>
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
  );
}

export default Home;