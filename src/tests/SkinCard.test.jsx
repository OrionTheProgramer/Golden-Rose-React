import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SkinCard from '../components/SkinCard';
import { describe, it, expect } from 'vitest';

describe('Componente SkinCard', () => {
  const skin_test = {
    id: 'champions-2025-vandal',
    name: 'Vandal Champions 2025',
    image: 'public/assets/valorant_skins/champions2025_vandal.png',
    price: 1500,
    type: 'Rifle',
    rareza: 'Exclusive',
    rarezaIconUrl: 'https://c-valorant-api.op.gg/Assets/ContentTiers/E046854E-406C-37F4-6607-19A9BA8426FC.svg'
  };

  beforeEach(() => {
    render(
      <BrowserRouter>
        <SkinCard {...skin_test} />
      </BrowserRouter>
    );
  });

  it('debe renderizar el nombre, tipo y precio de la skin', () => {
    expect(screen.getByText(skin_test.name)).toBeInTheDocument();
    expect(screen.getByText(/Tipo:\s+Rifle/i)).toBeInTheDocument();

    const priceElement = screen.getByText(/Precio:/i);
    expect(priceElement.tagName).toBe('BIG');
    const normalizedText = priceElement.textContent.replace(/\s+/g, ' ').trim();
    expect(normalizedText).toBe('Precio: $1500');
  });

  it('debe renderizar la imagen del producto y la rareza', () => {
    const skinImage = screen.getByRole('img', { name: '' });
    expect(skinImage).toHaveAttribute('src', skin_test.image);

    const rarezaImage = screen.getByAltText(/Exclusive|Rareza/i);
    expect(rarezaImage).toHaveAttribute('src', skin_test.rarezaIconUrl);
    expect(screen.getByText(/Exclusive/i)).toBeInTheDocument();
  });

  it('debe tener un botón "Ver Detalles" que enlace a la página correcta', () => {
    const detailsButton = screen.getByRole('button', { name: /Ver Detalles/i });
    expect(detailsButton).toBeInTheDocument();
    expect(detailsButton).toHaveAttribute('href', `/skin/${skin_test.id}`);
  });
});
