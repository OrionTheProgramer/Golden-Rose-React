import React from 'react'

function Categorias() {
  return (
    <>
    <div className="d-flex">
      <main className="main-content rosegold m-1 p-4">
        {/* Encabezado principal */}
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h2>Categorías</h2>

        </header>

        {/* Sección: Resumen */}
        <section
          className="mb-4 p-4 bg-white border rounded"
          style={{ height: "350px" }}
        >
          <article>
            <h2 className="text-dark">Resumen</h2>
          </article>
        </section>

        {/* Sección: Reportes */}
        <section
          className="p-4 bg-white border rounded"
          style={{ height: "350px" }}
        >
          <article className="text-dark">
            <h2>Reportes</h2>
          </article>
        </section>
      </main>
      
    </div>    
    </>
  )
}

export default Categorias