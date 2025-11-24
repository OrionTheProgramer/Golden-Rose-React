import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import MostrarProductos from '../components/admin/producto/MostrarProductos';

const STORAGE_KEY = 'goldenRose_products';

beforeEach(() => {
  localStorage.clear();
});

test('muestra mensaje cuando el inventario está vacío', () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));

  render(
    <MemoryRouter>
      <MostrarProductos />
    </MemoryRouter>
  );

  expect(screen.getByText(/inventario está vacío/i)).toBeInTheDocument();
});

test('renderiza los productos almacenados', () => {
  const productos = [
    { id: 1, nombre: 'Producto Demo', precio: 1500, stock: 3, categoria: 'Test' }
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));

  render(
    <MemoryRouter>
      <MostrarProductos />
    </MemoryRouter>
  );

  expect(screen.getByText('Producto Demo')).toBeInTheDocument();
  expect(screen.getByText('$ 1500')).toBeInTheDocument();
  expect(screen.getByText('3')).toBeInTheDocument();
});

test('permite eliminar un producto y muestra inventario vacío', async () => {
  const productos = [
    { id: 2, nombre: 'A Borrar', precio: 100, stock: 1, categoria: 'Test' }
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));

  const user = userEvent.setup();
  window.confirm = vi.fn(() => true);

  render(
    <MemoryRouter>
      <MostrarProductos />
    </MemoryRouter>
  );

  await user.click(screen.getByRole('button', { name: /Eliminar/i }));

  await waitFor(() => {
    expect(screen.getByText(/inventario está vacío/i)).toBeInTheDocument();
  });
});
