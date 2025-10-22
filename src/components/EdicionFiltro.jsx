import React, { useState } from "react";

function EdicionFiltro() {

  
  const [selected, setSelected] = useState("Todos");
  const tiers = [
    {
      name: "Todos",
      img: null,
    },
    {
      name: "Edición selecta",
      img: "https://c-valorant-api.op.gg/Assets/ContentTiers/12683D76-48D7-84A3-4E09-6985794F0445.svg",
    },
    {
      name: "Edición de lujo",
      img: "https://c-valorant-api.op.gg/Assets/ContentTiers/0CEBB8BE-46D7-C12A-D306-E9907BFC5A25.svg",
    },
    {
      name: "Edición prémium",
      img: "https://c-valorant-api.op.gg/Assets/ContentTiers/60BCA009-4182-7998-DEE7-B8A2558DC369.svg",
    },
    {
      name: "Edición exclusiva",
      img: "https://c-valorant-api.op.gg/Assets/ContentTiers/E046854E-406C-37F4-6607-19A9BA8426FC.svg",
    },
    {
      name: "Edición ultra",
      img: "https://c-valorant-api.op.gg/Assets/ContentTiers/411E4A55-4E59-7757-41F0-86A53F101BB5.svg",
    },
  ];

  return (
    <>
    <div>Nivel de precio</div>
      <div className="flex flex-wrap gap-4 ">
        {tiers.map((tier) => (
          <button
            key={tier.name}
            onClick={() => setSelected(tier.name)}
            className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition-all border btn btn-primary me-4
              ${
                selected === tier.name
                  ? "bg-main-500 border-main-600 text-white shadow-md"
                  : "bg-darkpurple-900 border-darkpurple-700 text-darkpurple-200 hover:bg-darkpurple-700"
              }`}
          >
            {tier.img && (
              <img
                alt={tier.name}
                src={tier.img}
                width="20"
                height="20"
                className="size-5"
                loading="lazy"
              />
            )}
            {tier.name}
          </button>
        ))}
      </div>
    </>
  );
}

export default EdicionFiltro;
