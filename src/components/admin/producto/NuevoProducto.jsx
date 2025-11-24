import React, { useState } from "react";
import { agregarProducto } from "../../../data/inventarioService";
import { useNavigate } from "react-router-dom";

function NuevoProducto() {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [imagenUrl, setImagenUrl] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await agregarProducto({ nombre, precio: Number(precio), categoriaId: Number(categoriaId), imagenUrl, descripcion });
            alert("Producto agregado!");
            setNombre(""); setPrecio(""); setCategoriaId(""); setImagenUrl(""); setDescripcion("");
        } catch (err) {
            alert("No se pudo agregar el producto: " + err.message);
        }
    };

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
                <label htmlFor="" className="form-label">Categoría Id</label>
                <input 
                    className="form-control"
                    placeholder="Categoría" 
                    value={categoriaId} 
                    onChange={e => setCategoriaId(e.target.value)} 
                    required 
                />
            </div>

            <div className="col">
                <label className="form-label">Imagen URL</label>
                <input 
                    className="form-control"
                    placeholder="https://..." 
                    value={imagenUrl} 
                    onChange={e => setImagenUrl(e.target.value)} 
                />
            </div>
        </div>

        <div className="row g-3 m-1">
            <div className="col">
                <label className="form-label">Descripción</label>
                <textarea className="form-control" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
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
                    type="button"
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
