import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerProductos, actualizarProducto } from "../../../data/inventarioService";

function EditarProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    const productos = obtenerProductos();
    const encontrado = productos.find(p => p.id === Number(id));
    if (encontrado) {
      setProducto(encontrado);
      setNombre(encontrado.nombre);
      setPrecio(encontrado.precio);
      setStock(encontrado.stock);
      setCategoria(encontrado.categoria);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!producto) return alert("No se encontró el producto.");

    actualizarProducto({ ...producto, nombre, precio: Number(precio), stock: Number(stock), categoria });
    alert("Producto actualizado correctamente.");
  };

  if (!producto) return <p className="text-center mt-5">Cargando producto...</p>;

  return (
    <div className="p-4 bg-white border rounded text-dark">
      <h3>Editar Producto</h3>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Categoría</label>
          <input
            className="form-control"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
        </div>

        <div className="mt-3 text-end">
          <button className="btn btn-warning" type="submit">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarProducto;
