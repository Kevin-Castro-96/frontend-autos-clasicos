"use client";
import React, { useEffect, useState } from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import CarCard from "@/components/carCard";
import Hero from "@/components/hero";
import Filters from "@/components/filters";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://back-autos-clasicos.vercel.app";

export default function HomePage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filtered, setFiltered] = useState<Car[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [langOpen, setLangOpen] = useState(false);
  const [error, setError] = useState<string | null>(null); // 👈 para manejar errores
  const [loading, setLoading] = useState(true); // 👈 para mostrar un loading
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/cars`);

        if (!res.ok) {
          throw new Error(`Error HTTP ${res.status}`);
        }
        const json: ApiResponse = await res.json();
        console.log(json);

        if (!json.success || !Array.isArray(json.data)) {
          throw new Error(json.message || "Formato de respuesta inválido");
        }

        const carsData = json.data;

        setCars(carsData);
        setFiltered(carsData);

        const uniqueBrands = Array.from(
          new Set(carsData.map((c) => c.brand))
        ).slice(0, 20);

        setBrands(uniqueBrands);
        setError(null);
      } catch (err: any) {
        console.error("Error cargando autos:", err);
        setError(err.message || "Error al cargar los autos");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function handleFilterChange(
    filters: Partial<{ brand: string; year: string; engine: string; q: string }>
  ) {
    let list = [...cars];
    if (filters.brand) list = list.filter((c) => c.brand === filters.brand);
    if (filters.year)
      list = list.filter((c) => String(c.year) === filters.year);
    if (filters.engine) list = list.filter((c) => c.engine === filters.engine);
    if (filters.q) {
      const q = filters.q.toLowerCase();
      list = list.filter((c) =>
        (c.model + " " + c.brand).toLowerCase().includes(q)
      );
    }
    setFiltered(list);
  }

  function handleClear() {
    setFiltered(cars);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-gray-900 text-white">
      <Header onOpenLanguage={() => setLangOpen((v) => !v)} />

      {langOpen && (
        <div className="fixed right-6 top-20 bg-white text-black rounded shadow-lg p-4 z-50">
          <ul>
            <li>
              <a href="#" className="block p-2">
                English
              </a>
            </li>
            <li>
              <a href="#" className="block p-2">
                Español
              </a>
            </li>
            <li>
              <a href="#" className="block p-2">
                Português
              </a>
            </li>
          </ul>
        </div>
      )}

      <main>
        <Hero />

        <Filters
          brands={brands}
          onFilterChange={handleFilterChange}
          onClear={handleClear}
        />

        <section className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <p>No hay autos para mostrar.</p>
          ) : (
            filtered.map((car) => <CarCard key={car.id} car={car} />)
          )}
        </section>

        <Footer />
      </main>
    </div>
  );
}
