import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';

// --- Mocking ---
// Mockeamos la importación del logo.
vi.mock('../assets/Bocetos/Original_logo.png', () => ({
  default: 'test-logo.png', // Un string de reemplazo
}));

// Creamos una función para renderizar el componente envuelto en el Router.
const renderWithRouter = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

// --- Tests ---
describe('NavbarComponent', () => {
  it('debería renderizar la marca "Golden Rose"', () => {
    renderWithRouter(<NavbarComponent />);

    // Buscamos el texto Golden Rose 
    expect(screen.getByText('Golden Rose')).toBeInTheDocument();
  });

  it('debería renderizar los links de navegación "Inicio" y "Mercado"', () => {
    renderWithRouter(<NavbarComponent />);

    // Buscamos los links por su texto
    const inicioLink = screen.getByText('Inicio');
    const mercadoLink = screen.getByText('Mercado');

    expect(inicioLink).toBeInTheDocument();
    expect(mercadoLink).toBeInTheDocument();
  });

  it('debería renderizar el logo con el texto alternativo correcto', () => {
    renderWithRouter(<NavbarComponent />);

    // Buscamos la imagen por su alttext
    const logoImage = screen.getByAltText('Logo');

    expect(logoImage).toBeInTheDocument();
    // Verificamos que el 'src' contenga el valor mockeado
    expect(logoImage.src).toContain('test-logo.png');
  });

  it('debería tener los links apuntando a las rutas correctas', () => {
    renderWithRouter(<NavbarComponent />);

    // react-bootstrap renderiza esto como <a href="...">
    // Verificamos que el link "Inicio" apunte a "/"
    expect(screen.getByText('Inicio').closest('a')).toHaveAttribute('href', '/');

    // Verificamos que el link "Mercado" apunte a "/marketplace"
    expect(screen.getByText('Mercado').closest('a')).toHaveAttribute('href', '/marketplace');

    // Verificamos que la marca "Golden Rose" apunte a "/"
    expect(screen.getByText('Golden Rose').closest('a')).toHaveAttribute('href', '/');
  });
});