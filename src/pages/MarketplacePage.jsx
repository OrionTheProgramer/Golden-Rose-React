import { useState } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import SkinCard from '../components/SkinCard';
import skinsData from '../data/data.json';

function MarketplacePage() {
  // --- Estados ---
  // Estado para la barra de búsqueda (por nombre)
  const [searchQuery, setSearchQuery] = useState('');
  // Estado para el filtro (por tipo de arma)
  const [selectedType, setSelectedType] = useState('all'); // 'all' = Todos

  // --- Lógica de Filtros ---

  const skinTypes = [...new Set(skinsData.map(skin => skin.Type))];

  // 2. Filtramos la data ANTES de mostrarla, basado en los estados
  const filteredSkins = skinsData.filter(skin => {
    
    // Filtro por nombre (ignora mayúsculas/minúsculas)
    const matchesName = skin.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || skin.Type === selectedType;

    return matchesName && matchesType;
  });

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Mercado de Skins</h1>

      <Row className="mb-4 p-3 card" style={{ backgroundColor: 'var(--color-surface)' }}>
        
        <Col md={7} className="mb-3 mb-md-0">
          <Form.Group>
            <Form.Label>Buscar por nombre</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Ej: Vandal Reaver, Phantom Oni..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </Col>

        <Col md={5}>
          <Form.Group>
            <Form.Label>Filtrar por tipo de arma</Form.Label>
            <Form.Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">Todos los tipos</option>
              {skinTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        {filteredSkins.length > 0 ? (
          filteredSkins.map(skin => (
            <Col key={skin.id} xs={12} md={6} lg={3} className="mb-4">
              <SkinCard
                id={skin.id}
                name={skin.name}
                price={skin.price}
                image={skin.image}
                type={skin.Type}
                category={skin.Category}
              />
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center text-muted mt-5">
              No se encontraron skins con esos filtros.
            </p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default MarketplacePage; // jotapeeeeeeeeeeeeeeeeeeee ******** tuve que modificar todo esto para que ande el filtro de busqueda y tipo de skin en el marketplace