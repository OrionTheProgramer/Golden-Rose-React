import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerProductoPorId, editarProducto } from "../../../data/inventarioService";

function EditarProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [rareza, setRareza] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [imagenFile, setImagenFile] = useState(null);
  const [referenciaExterna, setReferenciaExterna] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const encontrado = await obtenerProductoPorId(id);
        setProducto(encontrado);
        setNombre(encontrado.nombre || "");
        setPrecio(encontrado.precio || "");
        setCategoria(encontrado.categoria || "");
        setRareza(encontrado.rareza || "");
        setDescripcion(encontrado.descripcion || "");
        setImagenUrl(encontrado.imagenUrl || "");
        setReferenciaExterna(encontrado.referenciaExterna || "");
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!producto) return alert("No se encontró el producto.");

    try {
      await editarProducto(id, {
        nombre,
        precio: Number(precio),
        categoria,
        rareza,
        descripcion,
        imagenUrl,
        imagenFile,
        referenciaExterna,
      });
      alert("Producto actualizado correctamente.");
    } catch (err) {
      alert("No se pudo actualizar: " + err.message);
    }
  };

  if (!producto) return <p className="text-center mt-5">Cargando producto...</p>;

  return (
    <div className="p-4 bg-white border rounded text-dark">
      <h3>Editar Producto</h3>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
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
          <label className="form-label">Categoría</label>
          <input className="form-control" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Rareza</label>
          <input className="form-control" value={rareza} onChange={(e) => setRareza(e.target.value)} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Imagen URL</label>
          <input className="form-control" value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Imagen (archivo)</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) => setImagenFile(e.target.files?.[0] || null)}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Descripción</label>
          <textarea className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </div>

        <div className="col-12">
          <label className="form-label">UUID Valorant (skinlevel)</label>
          <input
            className="form-control"
            value={referenciaExterna}
            onChange={(e) => setReferenciaExterna(e.target.value)}
            placeholder="Opcional: bc8d1f88-4d76-8f70-8e3c-5dc63afcdd19"
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
