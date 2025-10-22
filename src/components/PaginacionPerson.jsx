import React from 'react'
import { Pagination } from "react-bootstrap";

function Paginacion({ paginasTotales, paginaActual, onPageChange}) {
  return (
    <Pagination className='justify-content-center mt-3'>
      <Pagination.First onClick={() => onPageChange(1)} />
      <Pagination.Prev
        onClick={() => onPageChange(paginaActual - 1)}
        disabled={paginaActual === 1}
      />
      {[...Array(paginasTotales)].map((_,i) => (
        <Pagination.Item
          key={i}
          active={i + 1 === paginaActual}
          onClick={() => onPageChange(i + 1 )}
        >
          {i + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick ={() => onPageChange(paginaActual + 1)}
        disabled = {paginaActual === paginasTotales}
      />
      <Pagination.Last
        onClick={() => onPageChange(paginasTotales)}
        disabled={paginaActual === paginasTotales}
      />
    </Pagination>
  )
}

export default Paginacion