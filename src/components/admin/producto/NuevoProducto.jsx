import React, { useState } from "react";
import { agregarProducto } from "../../../data/inventarioService";
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();


  return (
    <>
    <div className="mb-3">
        <h3>Nuevo Producto</h3>
    </div>    

    <form 
        className="p-4 bg-white border rounded text-dark" 
        onSubmit={handleSubmit}
        >

        <div className="m-1">
            <h3>Crear un producto</h3>
        </div>
        <div className="row g-3 m-1">
            <div className="col">
                <label htmlFor="" className="form-label">Nombre</label>
                <input
                    className="form-control" 
                    placeholder="Nombre" 
                    value={nombre} 
                    onChange={e => setNombre(e.target.value)} 
                    required 
                />
            </div>

            <div className="col">
                <label htmlFor="" className="form-label">Precio</label>
                <input 
                    className="form-control"
                    type="number" 
                    placeholder="Precio" 
                    value={precio} 
                    onChange={e => setPrecio(e.target.value)} 
                    required 
                />
            </div>

            <div className="col">
                <label htmlFor="" className="form-label">Stock</label>
                <input 
                    className="form-control"
                    type="number" 
                    placeholder="Stock" 
                    value={stock} 
                    onChange={e => setStock(e.target.value)} 
                    required 
                />
            </div>

            <div className="col">
                <label htmlFor="" className="form-label">Categoria</label>
                <input 
                    className="form-control"
                    placeholder="Categoría" 
                    value={categoria} 
                    onChange={e => setCategoria(e.target.value)} 
                    required 
                />
            </div>
        </div>
        
        <div className="mt-5 d-flex justify-content-end gap-4">
            <button 
                className="btn btn-primary"
                type="submit"
            >Agregar Producto
            </button>    
            <div className="">
                <button 
                    className="btn btn-danger "
                    type="submit"
                    onClick={() => navigate("/admin/productos")}

                >Volver
                </button>              
            </div>             
           
        </div>
   
    </form>
    </>
  );
}

export default NuevoProducto;