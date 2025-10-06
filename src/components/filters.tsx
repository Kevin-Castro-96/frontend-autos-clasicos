import React, { useEffect, useState } from "react";

export default function Filters({
  brands,
  onFilterChange,
  onClear,
}: {
  brands: string[];
  onFilterChange: (
    filters: Partial<{ brand: string; year: string; engine: string; q: string }>
  ) => void;
  onClear: () => void;
}) {
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [engine, setEngine] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ brand, year, engine, q });
    }, 250);
    return () => clearTimeout(timer);
  }, [brand, year, engine, q]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="bg-white/5 p-4 rounded-md flex flex-wrap gap-4 items-center">
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="p-2 bg-transparent border rounded-md flex-1 min-w-[120px] sm:flex-auto"
        >
          <option value="" className="text-black">Marca (Todas)</option>
          {brands.map((b) => (
            <option key={b} value={b} className="text-black">
              {b}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 bg-transparent border rounded-md flex-1 min-w-[120px] sm:flex-auto "
        >
          <option value="">Año (Todos)</option>
          {[...Array(70)].map((_, i) => {
            const y = 2025 - i;
            return (
              <option key={y} value={String(y)} className="text-black">
                {y}
              </option>
            );
          })}
        </select>

        <select
          value={engine}
          onChange={(e) => setEngine(e.target.value)}
          className="p-2 bg-transparent border rounded-md flex-1 min-w-[120px] sm:flex-auto"
        >
          <option value="" className="text-black">Motor (Todos)</option>
          <option value="V6" className="text-black">V6</option>
          <option value="V8" className="text-black">V8</option>
          <option value="I4" className="text-black">I4</option>
          <option value="Boxer" className="text-black">Boxer</option>
        </select>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar modelo o nombre"
          className="flex-1 p-2 bg-transparent border rounded-md min-w-[150px]"
        />

        <button
          onClick={() => {
            setBrand("");
            setYear("");
            setEngine("");
            setQ("");
            onClear();
          }}
          className="px-4 py-2 bg-red-600 rounded-md flex-shrink-0 w-full sm:w-auto"
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}
