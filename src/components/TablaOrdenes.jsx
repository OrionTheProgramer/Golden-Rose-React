import React from 'react'
import { Table } from 'react-bootstrap'

function TablaOrdenes( { ordenes } ) {
  return (
    <div className='table-responsive shadow-sm rounded'>
        <Table bordered hover className='align-middle text-center mb-0'>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Orden #</th>
                    <th>Cliente</th>
                    <th>Estado</th>
                    <th>Importe</th>
                </tr>
            </thead>
            <tbody>
                {ordenes.map((orden, index) => (
                    <tr key={index}>
                        <td>{orden.fecha}</td>
                        <td>{orden.orden}</td>
                        <td>{orden.cliente}</td>
                        <td>{orden.estado}</td>
                        <td>{orden.importe.toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
  )
}

export default TablaOrdenes