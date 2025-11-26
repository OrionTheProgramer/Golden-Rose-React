import React, { useEffect, useState } from 'react';
import { Container, Carousel, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import skinsData from '../data/data.json';

function Home() {
  const navigate = useNavigate();

  const [featured, setFeatured] = useState(() => skinsData.slice(0, 3));

  return (
    <Container className="my-5">
      {/* Carousel de skins destacadas */}
      <Carousel id='carouselSkins' interval={3000} pause='hover'>
        {featured.map((skin) => {
          return (
            <Carousel.Item key={skin.id}>
              <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }} onClick={() => navigate(`/skin/${skin.id}`)}>
                <img
                  src={skin.image || skin.imagenUrl}
                  alt={skin.nombre || skin.name}
                />
              </div>
              <Carousel.Caption>
                <h3>{skin.nombre || skin.name}</h3>
                {(skin.rarezaIconUrl || skin.rareza) && (
                  <div className="d-flex align-items-center gap-2 justify-content-center">
                    {skin.rarezaIconUrl && <img src={skin.rarezaIconUrl} alt="Rareza" style={{ width: "32px", height: "32px" }} />}
                    {skin.rareza && <span>{skin.rareza}</span>}
                  </div>
                )}
                <p className="d-none d-md-block">{(skin.descripcion || skin.desc || "").slice(0, 120)}...</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>

      {/* Sección de reseñas */}
      <section className="mt-5" id='comentarios'> 
        <h2 className="mb-4 text-center">Comentarios y calificaciones</h2>
        <Row>
          {/* Columna 1 */}
          <Col md={4}>
            <Card className="mb-3">
              <Card.Body>
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
