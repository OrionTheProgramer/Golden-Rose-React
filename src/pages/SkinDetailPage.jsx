import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import skinsData from '../data/data.json';
import { useCart } from '../context/CartContext'; 
import ModalComponent from '../components/ModalComponent'; 

function SkinDetailPage() {
  const { id } = useParams();
  const skin = skinsData.find(s => s.id === id);
  const { addToCart } = useCart(); 

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (skin) {
      document.title = `${skin.name} | Golden Rose`;
    }
  }, [skin]);

  
  if (!skin) {
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

  // Función para manejar el clic
  const handleAddToCart = () => {
    addToCart(skin);
    setShowModal(true); 
  };

  return (
    <>
      {/* Añade el Modal de éxito a la página */}
      <ModalComponent
        show={showModal}
        handleClose={() => setShowModal(false)}
        title="¡Éxito!"
        body={`¡Se ha añadido ${skin.name} a tu carrito!`}
      />

      <Container className="my-5">
        <Row>
          <Col md={12} className="mb-4">
            {/* Asumo que 'skin.image' es la ruta correcta */}
            <Image src={skin.image} alt={skin.name} fluid width='180%' />
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
              <h3>Precio: <span className="text-success">${skin.price.toLocaleString('es-CL')}</span></h3>
              <h5>Tipo: {skin.Type}</h5>
              <h5>Categoria: <img src={skin.Category} alt="Categoria" style={{ width: '25px', height: '25px' }} /></h5>
            </div>
            <div>
              {/* Conecta el botón a la nueva función */}
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