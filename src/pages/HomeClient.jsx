import React, { useEffect, useState } from 'react';
import { Container, Carousel, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import skinsData from '../data/data.json';
import { obtenerProductosApi } from '../data/catalogService';
import apiBase from '../data/apiConfig';

function resolveImage({ id, image, hasImageData }) {
  if (hasImageData && id) {
    const base = apiBase.producto || apiBase.catalogo;
    return `${base}/api/productos/${id}/imagen`;
  }
  return image;
}

function HomeClient() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState(() => skinsData.slice(0, 3));

  useEffect(() => {
    const load = async () => {
      try {
        const apiProducts = await obtenerProductosApi();
        setFeatured(apiProducts.slice(0, 3));
      } catch (err) {
        setFeatured(skinsData.slice(0, 3));
      }
    };
    load();
  }, []);

  return (
    <Container className="my-5">
      {/* Carousel de skins destacadas */}
      <Carousel  id='carouselSkins' interval={3000} pause='hover'>
        {featured.map((skin) => {
          const imgSrc = resolveImage({
            id: skin.id,
            image: skin.image || skin.imagenUrl,
            hasImageData: skin.hasImageData,
          });
          return (
            <Carousel.Item key={skin.id}>
              <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }} onClick={() => navigate(`/skin/${skin.id}`)}>
                <img
                  src={imgSrc}
                  alt={skin.name || skin.nombre}
                  style={{ maxHeight: '400px', objectFit: 'contain' }}
                />
              </div>
              <Carousel.Caption>
                <h3>{skin.name || skin.nombre}</h3>
                {skin.rarezaIconUrl && (
                  <img src={skin.rarezaIconUrl} alt="Rareza" style={{ width: "32px", height: "32px" }} />
                )}
                <p className="d-none d-md-block">{(skin.desc || skin.descripcion || "").slice(0, 120)}...</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
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
  );
}

export default HomeClient;
