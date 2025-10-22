import React, { useState } from "react";
import { agregarProducto } from "../../data/inventarioService";

function NuevoProducto() {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [categoria, setCategoria] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        agregarProducto({ nombre, precio: Number(precio), stock: Number(stock), categoria });
        setNombre(""); setPrecio(""); setStock(""); setCategoria("");
        alert("Producto agregado!");
    };


  return (
    <form className="p-4 bg-white border rounded" onSubmit={handleSubmit}>
        <div>
            <h3>Nuevo Producto</h3>
        </div>
        <div>
            <input
                className="form-control" 
                placeholder="Nombre" 
                value={nombre} 
                onChange={e => setNombre(e.target.value)} 
                required 
            />
            <input 
                className="form-control"
                type="number" 
                placeholder="Precio" 
                value={precio} 
                onChange={e => setPrecio(e.target.value)} 
                required 
            />
            <input 
                className="form-control"
                type="number" 
                placeholder="Stock" 
                value={stock} 
                onChange={e => setStock(e.target.value)} 
                required 
            />
            <input 
                className="form-control"
                placeholder="Categoría" 
                value={categoria} 
                onChange={e => setCategoria(e.target.value)} 
                required 
            />
        </div>

        <div>
            <button 
                className="btn btn-primary"
                type="submit"
            >Agregar Producto
            </button>                 
        </div>
   
    </form>
  );
}

export default NuevoProducto;