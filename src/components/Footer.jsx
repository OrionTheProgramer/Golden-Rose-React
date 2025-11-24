import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

function Footer() {
  return (
    <footer className="text-center text-light border-top mt-5 bg-dark py-5">
      <div className="container">

        <h4 className="fw-bold mb-3 text-warning">Golden Rose</h4>

        <ul className="list-inline mb-3">
          <li className="list-inline-item mx-3">
            <a href="/" className="text-light text-decoration-none hover-text-warning">Inicio</a>
          </li>
          <li className="list-inline-item mx-3">
            <a href="/marketplace" className="text-light text-decoration-none hover-text-warning">Productos</a>
          </li>
          <li className="list-inline-item mx-3">
            <a href="/contacto" className="text-light text-decoration-none hover-text-warning">Contacto</a>
          </li>
          <li className="list-inline-item mx-3">
            <a href="/blog" className="text-light text-decoration-none hover-text-warning">Blog</a>
          </li>
        </ul>

        <div className="d-flex justify-content-center mb-3">
          <a href="#" className="text-light mx-3 hover-text-warning">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-light mx-3 hover-text-warning">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-light mx-3 hover-text-warning">
            <Twitter size={20} />
          </a>
        </div>

        <p className="mb-0 small text-secondary">
          &copy; 2025 Golden Rose — Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
