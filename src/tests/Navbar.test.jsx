import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { describe, it, expect } from 'vitest';

describe('Componente Navbar', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  });

  it('debe renderizar el logo y el nombre de la marca', () => {
    // Buscamos el nombre de la marca en el documento
    const brandName = screen.getByText(/Golden Rose/i);
    expect(brandName).toBeInTheDocument();

    // Verificamos que la imagen del logo esté presente
    const logoImg = screen.getByAltText('Logo');
    expect(logoImg).toBeInTheDocument();
  });

  it('debe mostrar todos los enlaces de navegación principales', () => {
    // Obtenemos los enlaces por su rol de navegación y verificamos sus nombres
    expect(screen.getByRole('link', { name: /Inicio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Productos/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Blog/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contacto/i })).toBeInTheDocument();
  });

  it('debe mostrar los enlaces de sesión y registro', () => {
    expect(screen.getByRole('link', { name: /Iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Registrarse/i })).toBeInTheDocument();
  });

  it('debe mostrar el botón del carrito de compras', () => {
    // Buscamos el botón por el texto que contiene
    const cartButton = screen.getByRole('button', { name: /Carrito \(0\)/i });
    expect(cartButton).toBeInTheDocument();
  });
});