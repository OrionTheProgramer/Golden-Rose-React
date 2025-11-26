import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import apiBase from '../data/apiConfig';

function resolveImage({ id, image, hasImageData }) {
  if (hasImageData && id) {
    const base = apiBase.producto || apiBase.catalogo;
    return `${base}/api/productos/${id}/imagen`;
  }
  return image;
}

function SkinCard({ id, name, image, price, type, rareza, hasImageData, rarezaIconUrl }) {
  const imgSrc = resolveImage({ id, image, hasImageData });

  return (
    <Card border='info' className="product-card" style={{ width: '18rem', margin: '10px' }}>
      {imgSrc && <Card.Img className="product-card-img" variant="top" src={imgSrc} alt="" role="img" />}
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Tipo: {type}
        </Card.Text>
        {(rarezaIconUrl || rareza) && (
          <div className="d-flex align-items-center gap-2 mb-2">
            {rarezaIconUrl && (
              <img src={rarezaIconUrl} alt={rareza || "Rareza"} style={{ width: "28px", height: "28px" }} />
            )}
            {rareza && <span>{rareza}</span>}
          </div>
        )}
        <Button as={Link} to={`/skin/${id}`} variant="primary">Ver Detalles</Button>
        <Card.Footer>
          <big className="text-success">Precio: ${price}</big>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}

export default SkinCard;
