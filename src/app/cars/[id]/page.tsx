"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Car } from "@/types/Car";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://back-autos-clasicos.vercel.app";

export default function CarDetailPage() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCar() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/cars/${id}`);
        if (!res.ok) throw new Error("Error al obtener los datos del auto");
        const json = await res.json();

        if (!json.success || !json.data) {
          throw new Error("No se encontró el auto");
        }

        setCar(json.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido al obtener el auto");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [id]);

  if (loading) return <p className="text-center py-10">Cargando...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!car) return <p className="text-center py-10">Auto no encontrado</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Link href="/" className="text-blue-400 hover:underline">
          ← Volver al inicio
        </Link>

        <h1 className="text-3xl font-bold mt-6 mb-4">
          {car.brand} {car.model} ({car.year})
        </h1>

        <Image
          src={car.image || "/placeholder-car.jpg"}
          alt={car.model}
          width={800}
          height={400}
          className="rounded-lg w-full object-cover"
        />

        <div className="mt-6 space-y-3 text-gray-300">
          <p>
            <strong>Motor:</strong> {car.engine}
          </p>
          <p>
            <strong>Descripción:</strong> {car.description || "No disponible"}
          </p>
          {/* <p><strong>Precio:</strong> {car.price ? `$${car.price}` : "Consultar"}</p> */}
        </div>
      </div>
    </div>
  );
}
