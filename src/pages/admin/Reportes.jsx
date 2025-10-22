import React from 'react'
import Estadistica from '../../components/admin/reportes/Estadisticas'


function Reportes() {
  return (
    <>
    <div className="d-flex">
      <main className="main-content rosegold m-1 p-4">
        {/* Encabezado principal */}
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h2>Reportes</h2>
        </header>

        <section className='mb-2'>
          <Estadistica/>
        </section>
      </main>
    </div>    
    </>
  )
}

export default Reportes