import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner } from 'react-bootstrap';
import { useCart } from '../context/CartContext'; 
import { useAuth } from '../context/AuthContext';
import ModalComponent from '../components/ModalComponent'; 
import { obtenerProductoPorIdApi } from '../data/catalogService';
import apiBase from '../data/apiConfig';

function resolveImage({ id, image, hasImageData }) {
  if (hasImageData && id) {
    const base = apiBase.producto || apiBase.catalogo;
    return `${base}/api/productos/${id}/imagen`;
  }
  return image;
}

function SkinDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart(); 
  const { user } = useAuth();
  const [skin, setSkin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const apiSkin = await obtenerProductoPorIdApi(id);
        const mapped = {
          id: apiSkin.id,
          name: apiSkin.nombre,
          price: apiSkin.precio,
          image: apiSkin.imagenUrl,
          desc: apiSkin.descripcion,
          Type: apiSkin.categoriaNombre,
          hasImageData: apiSkin.hasImageData,
          rareza: apiSkin.rareza,
          rarezaIconUrl: apiSkin.rarezaIconUrl,
        };
        setSkin(mapped);
      } catch (err) {
        setError('Skin no encontrada');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  useEffect(() => {
    if (skin) {
      document.title = `${skin.name} | Golden Rose`;
    }
  }, [skin]);

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" />
        <p className="mt-2">Cargando...</p>
      </Container>
    );
  }

  if (error || !skin) {
    return (
      <Container className="my-5 text-center">
        <h2 className="mb-3">Skin no encontrada</h2>
        <p className="text-muted mb-4">Lo sentimos, no pudimos encontrar la skin que buscas.</p>
        <Link to="/marketplace" className="btn btn-primary">
          Volver al Mercado
        </Link>
      </Container>
    );
  }

  const imgSrc = resolveImage({ id: skin.id, image: skin.image, hasImageData: skin.hasImageData });

  const handleAddToCart = () => {
    if (!user) return;
    addToCart({ ...skin, image: imgSrc });
    setShowModal(true); 
  };

  return (
    <>
      <ModalComponent
        show={showModal}
        handleClose={() => setShowModal(false)}
        title="¡Éxito!"
        body={`Se ha añadido ${skin.name} a tu carrito!`}
      />

      <Container className="my-5">
        <Row>
          <Col md={12} className="mb-4">
            {imgSrc && <Image src={imgSrc} alt={skin.name} fluid width='180%' />}
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <h1>{skin.name}</h1>
            <p className="lead">
              {skin.desc || "Una de las skins más deseadas del mercado. Perfecta para destacar en tus partidas."}
            </p>
            <hr />
            <div className="mb-3">
              <h3>Precio: <span className="text-success">${skin.price?.toLocaleString('es-CL')}</span></h3>
              <h5>Tipo: {skin.Type}</h5>
              {(skin.rareza || skin.rarezaIconUrl) && (
                <div className="d-flex align-items-center gap-2 mt-2">
                  {skin.rarezaIconUrl && (
                    <img src={skin.rarezaIconUrl} alt={skin.rareza || "Rareza"} style={{ width: "32px", height: "32px" }} />
                  )}
                  {skin.rareza && <h6 className="mb-0">{skin.rareza}</h6>}
                </div>
              )}
            </div>
            <div>
              <Button variant="info" size="lg" className="mt-3" onClick={handleAddToCart} disabled={!user}>
                Añadir al carrito
              </Button>
              {!user && <p className="text-muted mt-2 mb-0">Inicia sesión para comprar.</p>}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SkinDetailPage;
