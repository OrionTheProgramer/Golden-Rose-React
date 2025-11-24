import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import apiBase from '../data/apiConfig';

function resolveImage({ id, image, hasImageData }) {
  if (hasImageData && id) return `${apiBase.catalogo}/api/productos/${id}/imagen`;
  return image;
}

function SkinCard({ id, name, image, price, type, category, hasImageData }) {
  const imgSrc = resolveImage({ id, image, hasImageData });

  return (
    <Card border='info' className="product-card" style={{ width: '18rem', margin: '10px' }}>
      {imgSrc && <Card.Img className="product-card-img" variant="top" src={imgSrc} alt={name} />}
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Tipo: {type} <br />
          Categoria: {category}
        </Card.Text>
        <Button as={Link} to={`/skin/${id}`} variant="primary">Ver Detalles</Button>
        <Card.Footer>
          <big className="text-success">Precio: ${price}</big>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}

export default SkinCard;
