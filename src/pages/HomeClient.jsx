import React, { useEffect, useState } from 'react';
import { Container, Carousel, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const apiProducts = await obtenerProductosApi();
        setFeatured(apiProducts.slice(0, 3));
      } catch (err) {
        setError("No se pudieron cargar las skins destacadas");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <Container className="my-5">
      {loading && (
        <div className="d-flex align-items-center gap-2 mb-3">
          <Spinner animation="border" size="sm" />
          <span>Cargando catálogo...</span>
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Carousel de skins destacadas */}
      <Carousel  id='carouselSkins' interval={3000} pause='hover'>
        {featured.map((skin) => {
          const imgSrc = resolveImage({
            id: skin.id,
            image: skin.imagenUrl || skin.image,
            hasImageData: skin.hasImageData,
          });
          return (
            <Carousel.Item key={skin.id}>
              <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }} onClick={() => navigate(`/skin/${skin.id}`)}>
                <img
                  src={imgSrc}
                  alt={skin.nombre || skin.name}
                  style={{ maxHeight: '400px', objectFit: 'contain' }}
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
                <p className="d-none d-md-block">{(skin.descripcion || "").slice(0, 120)}...</p>
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
