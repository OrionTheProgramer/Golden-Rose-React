import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import blogData from '../data/blogs.json'; // 1. Importamos los datos del blog

function Blog() {
  return (
    <Container className="my-5">
      <h1 className="mb-4">Blog de la Comunidad</h1>
      
      <Row>
        {/* 2. Hacemos un 'map' sobre los datos del blog */}
        {blogData.map((post) => (
          
          // Usamos 'mx-auto' para centrar las tarjetas en una sola columna
          <Col md={10} lg={8} className="mb-4 mx-auto" key={post.id}>
            
            {/* 3. Renderizamos cada post como una Card */}
            {/* La clase 'card' tomará automáticamente el estilo oscuro */}
            <Card>
              <Card.Body className="p-4">
                
                {/* Título del Post */}
                <Card.Title as="h2" className="mb-2">{post.title}</Card.Title>
                
                {/* Subtítulo con autor y fecha */}
                <Card.Subtitle className="mb-3 text-muted">
                  Por {post.author} el {post.date}
                </Card.Subtitle>
                
                {/* Extracto del contenido (ej: primeros 200 caracteres) */}
                <Card.Text>
                  {post.content.substring(0, 200)}...
                </Card.Text>

                {/* Pie de la tarjeta con Votos, Comentarios y Botón */}
                <div className="d-flex justify-content-between align-items-center mt-4">
                  
                  {/* Votos y Comentarios */}
                  <div>
                    <Badge 
                      pill 
                      className="me-2 p-2" 
                      style={{ 
                        backgroundColor: 'var(--color-primary)', 
                        fontSize: '0.9rem' 
                      }}
                    >
                      <i className="bi bi-arrow-up-circle-fill me-1"></i> 
                      {post.votes} Votos
                    </Badge>
                    
                    {/* Comentarios */}
                    <Badge 
                      pill 
                      bg="secondary" 
                      className="p-2" 
                      style={{ fontSize: '0.9rem' }}
                    >
                      <i className="bi bi-chat-fill me-1"></i> 
                      {post.comments.length} Comentarios
                    </Badge>
                  </div>
                  
                  <div>
                    {/* Asumimos que una ruta /blog/:id */}
                    <Button 
                      as={Link} 
                      to={`/blog/${post.id}`} 
                      variant="primary"
                    >
                      Leer Más
                    </Button>
                  </div>
                </div>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Blog;