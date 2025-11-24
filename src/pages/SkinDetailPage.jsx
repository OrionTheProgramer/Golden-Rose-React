import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner } from 'react-bootstrap';
import skinsData from '../data/data.json';
import { useCart } from '../context/CartContext'; 
import ModalComponent from '../components/ModalComponent'; 
import { obtenerProductoPorIdApi } from '../data/catalogService';
import apiBase from '../data/apiConfig';

function resolveImage({ id, image, hasImageData }) {
  if (hasImageData && id) return `${apiBase.catalogo}/api/productos/${id}/imagen`;
  return image;
}

function SkinDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart(); 
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
          Category: apiSkin.categoriaNombre,
          hasImageData: apiSkin.hasImageData,
        };
        setSkin(mapped);
      } catch (err) {
        const local = skinsData.find((s) => s.id === id);
        if (local) setSkin(local);
        else setError('Skin no encontrada');
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

  const handleAddToCart = () => {
    addToCart(skin);
    setShowModal(true); 
  };

  const imgSrc = resolveImage({ id: skin.id, image: skin.image, hasImageData: skin.hasImageData });

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
              <h5>Categoría: {skin.Category}</h5>
            </div>
            <div>
              <Button variant="info" size="lg" className="mt-3" onClick={handleAddToCart}>
                Añadir al carrito
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SkinDetailPage;
