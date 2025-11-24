import { useState, useEffect } from "react";
import { Container, Row, Col, Form, InputGroup, Spinner, Alert } from "react-bootstrap";
import SkinCard from "../components/SkinCard";
import skinsDataLocal from "../data/data.json";
import { obtenerProductosApi } from "../data/catalogService";

function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [skinsData, setSkinsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const apiData = await obtenerProductosApi();
        setSkinsData(apiData);
      } catch (err) {
        console.error("Fallo carga API, usando datos locales", err);
        setSkinsData(skinsDataLocal);
        setError("Mostrando datos locales");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const skinTypes = [...new Set(skinsData.map((skin) => skin.Type || skin.type || skin.categoriaNombre))];

  const filteredSkins = skinsData.filter((skin) => {
    const name = (skin.name || skin.nombre || "").toLowerCase();
    const type = skin.Type || skin.type || skin.categoriaNombre || "";
    const matchesName = name.includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || type === selectedType;
    return matchesName && matchesType;
  });

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Mercado de Skins</h1>

      {loading && (
        <div className="d-flex align-items-center gap-2">
          <Spinner animation="border" size="sm" />
          <span>Cargando catálogo...</span>
        </div>
      )}
      {error && <Alert variant="warning" className="mt-2">{error}</Alert>}

      <Row className="mb-4 p-3 card" style={{ backgroundColor: "var(--color-surface)" }}>
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
            <Form.Select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="all">Todos los tipos</option>
              {skinTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        {!loading && filteredSkins.length > 0 ? (
          filteredSkins.map((skin) => (
            <Col key={skin.id} xs={12} md={6} lg={3} className="mb-4">
              <SkinCard
                id={skin.id}
                name={skin.name || skin.nombre}
                price={skin.price || skin.precio}
                image={skin.image || skin.imagenUrl}
                type={skin.Type || skin.type || skin.categoriaNombre}
                category={skin.Category || skin.categoriaNombre}
              />
            </Col>
          ))
        ) : (
          !loading && (
            <Col>
              <p className="text-center text-muted mt-5">No se encontraron skins con esos filtros.</p>
            </Col>
          )
        )}
      </Row>
    </Container>
  );
}

export default MarketplacePage;
