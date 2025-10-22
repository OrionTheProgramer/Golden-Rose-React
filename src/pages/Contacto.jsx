import React , { useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contacto() {
    useEffect(() => {
      document.title = "Contacto | Golden Rose";
    }, []);    
  return (
    <>
    <Navbar />
    <main className="container my-5" id="contacto">
      <section className="row justify-content-center">
        <form className="col-md-8 col-lg-6 needs-validation" method="post" noValidate>
          <article className="bg-dark text-light p-5 rounded-4 shadow-lg">
            <h1 className="text-center mb-4" style={{ fontSize: '1.7rem', fontWeight: 'bold', letterSpacing: '1px', color: '#FFD700', textShadow: '1px 1px 8px #ffb6c1' }}>
              Contáctanos
            </h1>

            <p className="text-center mb-4">
              ¿Tienes alguna duda o comentario? Completa el formulario y te responderemos a la brevedad.
            </p>

            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="nombre" placeholder="Nombre completo" required />
              <div className="invalid-feedback">Por favor, ingresa tu nombre.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="correo" className="form-label">Correo</label>
              <input type="email" className="form-control" id="correo" placeholder="correo@gmail.com" required />
              <div className="invalid-feedback">Por favor, ingresa un correo válido.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label fw-semibold">Mensaje</label>
              <textarea className="form-control" id="mensaje" rows="4" placeholder="Escribe tu mensaje aquí..." required></textarea>
              <div className="invalid-feedback">Por favor, escribe un mensaje.</div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-outline-light mt-3">
                <i className="bi bi-envelope-paper"></i> Enviar Mensaje
              </button>
            </div>
          </article>
        </form>

        <div className="text-center mt-4">
          <p className="mb-0"><i className="bi bi-geo-alt"></i> Santiago, Chile</p>
          <p className="mb-0"><i className="bi bi-telephone"></i> +56 9 1234 5678</p>
          <p><i className="bi bi-envelope"></i> contacto@goldenrose.cl</p>
        </div>
      </section>
    </main>

    <Footer/>
    </>
    
    
  );
}

export default Contacto;
