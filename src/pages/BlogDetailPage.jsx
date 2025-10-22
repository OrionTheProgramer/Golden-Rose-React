import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import blogData from '../data/blogs.json';

function BlogDetailPage() {
  const { id } = useParams();

  const post = blogData.find(p => p.id === id);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Golden Rose`;
    }
  }, [post]);

  if (!post) {
    return (
      <Container className="my-5 text-center">
        <h2 className="mb-3">Post no encontrado</h2>
        <p className="text-muted mb-4">Lo sentimos, no pudimos encontrar el post que buscas.</p>
        <Button as={Link} to="/blog" variant="primary">
          Volver al Blog
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>

          <article>
            {/* Título */}
            <h1 className="mb-3">{post.title}</h1>
            
            {/* Meta-datos (Autor, Fecha, Votos) */}
            <div className="d-flex align-items-center mb-3 text-muted">
              <span>Por {post.author} el {post.date}</span>
              <span className="mx-2">|</span>
              <Badge 
                pill 
                className="p-2" 
                style={{ 
                  backgroundColor: 'var(--color-primary)', 
                  fontSize: '0.9rem' 
                }}
              >
                <i className="bi bi-arrow-up-circle-fill me-1"></i> 
                {post.votes} Votos
              </Badge>
            </div>
            
            <hr />

            {/* Contenido Completo del Post */}
            {/* Usamos whiteSpace: 'pre-wrap' para respetar los saltos de línea del JSON */}
            <p className="lead" style={{ whiteSpace: 'pre-wrap', fontSize: '1.15rem' }}>
              {post.content}
            </p>
          </article>

          {/* --- Sección de Comentarios --- */}
          <section className="mt-5">
            <h3 className="mb-4">Comentarios ({post.comments.length})</h3>
            
            {/* Mapeamos y mostramos cada comentario */}
            {post.comments.map(comment => (
              <Card className="mb-3" key={comment.id}>
                <Card.Body>
                  <Card.Title as="h6" className="mb-1">{comment.user}</Card.Title>
                  <Card.Text>
                    {comment.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </section>

        </Col>
      </Row>
    </Container>
  );
}

export default BlogDetailPage;