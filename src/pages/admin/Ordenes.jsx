import React, { useState } from 'react'
import TablaOrdenes from "../../components/TablaOrdenes";
import PaginacionPerson from "../../components/PaginacionPerson";

const pedidosDatos = [
    { fecha: "2025-10-01", orden: "ORD-VAL-1021", cliente: "PlayerOne", estado: "Completado", importe: 18990 },
    { fecha: "2025-10-05", orden: "ORD-VAL-1022", cliente: "NeonMaster", estado: "Pendiente", importe: 8990 },
    { fecha: "2025-10-08", orden: "ORD-VAL-1023", cliente: "JettLover", estado: "Cancelado", importe: 12990 },
    { fecha: "2025-10-11", orden: "ORD-VAL-1024", cliente: "PhoenixMain", estado: "Completado", importe: 24990 },
    { fecha: "2025-10-14", orden: "ORD-VAL-1025", cliente: "CypherXD", estado: "En proceso", importe: 9990 },
    { fecha: "2025-10-17", orden: "ORD-VAL-1026", cliente: "ReynaQueen", estado: "Pendiente", importe: 14990 },
]


function Ordenes() {
    const [paginaActual, setPaginaActual] = useState(1);
    const itemsPorPagina = 10;

    const ultimoIndex = paginaActual * itemsPorPagina;
    const primerIndex =  ultimoIndex - itemsPorPagina;
    const pedidosActuales = pedidosDatos.slice(primerIndex, ultimoIndex);

    const paginasTotales = Math.ceil(pedidosDatos.length / itemsPorPagina);

  return (
    <>
    <div className="container py-4">

        {/* Encabezado principal */}
        <header className="d-flex justify-content-between align-items-center mb-4">
            <h2>Ordenes</h2>
        </header>
        <TablaOrdenes
            ordenes={pedidosActuales}
        />

        <PaginacionPerson
            paginasTotales={paginasTotales}
            paginaActual={paginaActual}
            onPageChange={setPaginaActual}
        />

      
    </div>    
    </>
  )
}

export default Ordenes