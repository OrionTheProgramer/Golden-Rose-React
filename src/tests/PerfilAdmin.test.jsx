import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PerfilAdmin from '../pages/admin/PerfilAdmin';
import { AuthProvider } from '../context/AuthContext';

beforeEach(() => {
  localStorage.clear();
});

test('muestra mensaje de carga cuando no hay perfil', () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <PerfilAdmin />
      </AuthProvider>
    </MemoryRouter>
  );

  expect(screen.getByText(/Cargando perfil/i)).toBeInTheDocument();
});

test('muestra datos del perfil almacenado', async () => {
  const perfil = {
    username: 'adminUser',
    email: 'admin@example.com',
    role: 'admin',
    token: 'token-test'
  };
  localStorage.setItem('userProfile', JSON.stringify(perfil));

  render(
    <MemoryRouter>
      <AuthProvider>
        <PerfilAdmin />
      </AuthProvider>
    </MemoryRouter>
  );

  expect(await screen.findByText(/Perfil de adminUser/i)).toBeInTheDocument();
  expect(screen.getByText(/admin@example.com/i)).toBeInTheDocument();
  expect(screen.getByText(/admin/i)).toBeInTheDocument();
});
