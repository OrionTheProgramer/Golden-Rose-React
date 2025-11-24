import React from 'react';
import MostrarCategorias from '../../components/admin/categorias/MostrarCategorias';
import NuevaCategoria from '../../components/admin/categorias/NuevaCategoria';

function Categorias() {
  return (
    <>
    <div className="d-flex">
      <main className="main-content rosegold m-1 p-4">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h2>Categorías</h2>
        </header>
    
        <section>
          <MostrarCategorias/>
        </section>

        <section>
          <NuevaCategoria/>
        </section>

      </main>
      
    </div>    
    </>
  );
}

export default Categorias;
