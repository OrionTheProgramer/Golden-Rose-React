import React from 'react'
import { Table } from 'react-bootstrap'

function TablaOrdenes( { ordenes } ) {

const getEstadoColor = (estado) => {
  switch (estado.toLowerCase()) {
    case 'pendiente':
      return 'warning';
    case 'completado':
      return 'success';
    case 'cancelado':
      return 'danger';
    case 'en proceso':
      return 'info';
    default:
      return 'secondary';
  }
};  

  return (
    <div className="table-responsive shadow rounded">
        <Table 
            bordered 
            hover 
            responsive 
            className='align-middle text-center mb-0 overflow-x-auto'
            >
            <thead className="table-dark">
                <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Orden #</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Importe</th>
                </tr>
            </thead>
            <tbody>
                {ordenes.map((orden, index) => (
                    <tr key={index}>
                        <td>{orden.fecha}</td>
                        <td className="fw-semibold">{orden.orden}</td>
                        <td>{orden.cliente}</td>
                        <td>{orden.estado}</td>
                        <td className="text-center">$ {orden.importe.toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
  )
}

export default TablaOrdenes