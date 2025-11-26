import React, { useState } from "react";
import { agregarProducto } from "../../../data/inventarioService";
import { useNavigate } from "react-router-dom";

function NuevoProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [rareza, setRareza] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [imagenFile, setImagenFile] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [referenciaExterna, setReferenciaExterna] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await agregarProducto({
        nombre,
        precio: Number(precio),
        categoria,
        rareza,
        imagenUrl,
        imagenFile,
        descripcion,
        referenciaExterna,
      });
      alert("Producto agregado!");
      setNombre("");
      setPrecio("");
      setCategoria("");
      setRareza("");
      setImagenUrl("");
      setImagenFile(null);
      setDescripcion("");
      setReferenciaExterna("");
    } catch (err) {
      alert("No se pudo agregar el producto: " + err.message);
    }
  };

  return (
    <>
      <div className="mb-3">
        <h3>Nuevo Producto</h3>
      </div>

      <form className="p-4 bg-white border rounded text-dark" onSubmit={handleSubmit}>
        <div className="m-1">
          <h3>Crear un producto</h3>
        </div>
        <div className="row g-3 m-1">
          <div className="col">
            <label className="form-label">Nombre</label>
            <input
              className="form-control"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="col">
            <label className="form-label">Precio</label>
            <input
              className="form-control"
              type="number"
              step="0.01"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>

          <div className="col">
            <label className="form-label">Categoría</label>
            <input
              className="form-control"
              placeholder="Rifle / Cuchillo / Colección"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            />
          </div>

          <div className="col">
            <label className="form-label">Rareza</label>
            <input
              className="form-control"
              placeholder="Exclusive / Deluxe / Premium"
              value={rareza}
              onChange={(e) => setRareza(e.target.value)}
            />
          </div>

          <div className="col">
            <label className="form-label">Imagen URL (opcional)</label>
            <input
              className="form-control"
              placeholder="https://..."
              value={imagenUrl}
              onChange={(e) => setImagenUrl(e.target.value)}
            />
          </div>

          <div className="col">
            <label className="form-label">Imagen (archivo)</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => setImagenFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        <div className="row g-3 m-1">
          <div className="col">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <div className="col">
            <label className="form-label">UUID Valorant (skinlevel)</label>
            <input
              className="form-control"
              placeholder="Opcional: bc8d1f88-4d76-8f70-8e3c-5dc63afcdd19"
              value={referenciaExterna}
              onChange={(e) => setReferenciaExterna(e.target.value)}
            />
            <small className="text-muted">
              Se usará para autocompletar nombre/icono/rareza desde valorant-api.com.
            </small>
          </div>
        </div>

        <div className="mt-5 d-flex justify-content-end gap-4">
          <button className="btn btn-primary" type="submit">
            Agregar Producto
          </button>
          <div>
            <button className="btn btn-danger" type="button" onClick={() => navigate("/admin/productos")}>
              Volver
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default NuevoProducto;
