import React from "react";

function HistorialCompras({ usuario }) {
    
  return (
    <div className="p-4 bg-white border rounded text-dark">
      <h3>Historial de Compras de {usuario?.username || "Usuario"}</h3>
      <div className="mt-3">
        <p>Aquí se mostrará el historial de compras del usuario.</p>  
      </div>
    </div>
  );
}

export default HistorialCompras;
