import React, { useState } from "react";
import EdicionFiltro from "./EdicionFiltro";

function Search() {
    const [query, setQuery] = useState("");
    const [filtro, setFiltro] = useState("Todas");
    const [seleccionado, setSeleccionado] = useState(""); 

    const handleSearch = () => {
        console.log("Buscando:", query, "| Filtro:", filtro, "| Edición:", seleccionado);
    };

    const handleChange = (e) => {
        setSeleccionado(e.target.value);
    };

    return (
        <>
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
                <i className="bi bi-search"></i>
            </span>

            <input
                type="search"
                className="form-control"
                placeholder="Busca tu skin favorita: Vandal, Operator, Karambit…"
                aria-label="Buscar"
                aria-describedby="basic-addon1"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <button className="btn btn-primary" type="button" onClick={handleSearch}>
                Buscar
            </button>
        </div>

        <EdicionFiltro/>
        </>
    );
}

export default Search;
