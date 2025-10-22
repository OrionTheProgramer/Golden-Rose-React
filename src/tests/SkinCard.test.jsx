import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SkinCard from '../components/SkinCard';
import { describe, it, expect } from 'vitest';

describe('Componente SkinCard', () => {
  // Creamos datos de prueba 
  const skin_test = {
    id: 'champions-2025-vandal',
    name: 'Vandal Champions 2025',
    image: 'public/assets/valorant_skins/champions2025_vandal.png',
    price: 1500,
    type: 'Rifle',
    category: 'https://c-valorant-api.op.gg/Assets/ContentTiers/E046854E-406C-37F4-6607-19A9BA8426FC.svg'
  };

  beforeEach(() => {
    render(
      <BrowserRouter>
        <SkinCard {...skin_test} />
      </BrowserRouter>
    );
  });

  it('debe renderizar el nombre, tipo y precio de la skin', () => {
    // Verificamos que el nombre del producto esté en la tarjeta
    expect(screen.getByText(skin_test.name)).toBeInTheDocument();
    
    // Verificamos que el tipo de skin se muestre
    expect(screen.getByText(/Tipo:\s+Rifle/i)).toBeInTheDocument();

    // Esto nos dará la etiqueta <big>
    const priceElement = screen.getByText(/Precio:/i);

    // Verificamos que sea el tag correcto 
    expect(priceElement.tagName).toBe('BIG');

    // Obtenemos TODO su contenido de texto 
    const normalizedText = priceElement.textContent.replace(/\s+/g, ' ').trim();

    // Ahora comparamos el texto limpio con un string exacto
    expect(normalizedText).toBe('Precio: $1500');
  });

  it('debe renderizar la imagen del producto y de la categoría', () => {
    // Verificamos que la imagen principal del producto se muestre
    const skinImage = screen.getByRole('img', { name: '' }); // bootstrap puede no asignar alttext al Card
    expect(skinImage).toHaveAttribute('src', skin_test.image);

    // Verificamos la imagen de la categoría por su texto alternativo
    const categoryImage = screen.getByAltText('Categoria');
    expect(categoryImage).toHaveAttribute('src', skin_test.category);
  });

  it('debe tener un botón "Ver Detalles" que enlace a la página correcta', () => {
    const detailsButton = screen.getByRole('button', { name: /Ver Detalles/i });

    // Ahora que lo encontraste, puedes verificar el atributo "href"
    expect(detailsButton).toBeInTheDocument();
    expect(detailsButton).toHaveAttribute('href', `/skin/${skin_test.id}`);

    // Verificamos que el enlace (href) apunte a la ruta dinámica correcta
    expect(detailsButton).toHaveAttribute('href', `/skin/${skin_test.id}`);
  });
});