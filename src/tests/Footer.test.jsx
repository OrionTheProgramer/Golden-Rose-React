import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';
import { describe, it, expect } from 'vitest';


describe('Componente Footer', () => {

  // 'it' o 'test' define una prueba individual
  it('debe renderizar el texto de copyright correctamente', () => {
    // Renderiza el componente
    render(<Footer />);

    // En este caso no hay acción, solo comprobamos el renderizado inicial

    // Busca el elemento y comprueba su contenido
    const copyrightElement = screen.getByText(/© 2025 Golden Rose. Todos los derechos reservados./i);

    // Usamos un matcher de jest-dom para afirmar que el elemento está en el documento
    expect(copyrightElement).toBeInTheDocument();
  });

});