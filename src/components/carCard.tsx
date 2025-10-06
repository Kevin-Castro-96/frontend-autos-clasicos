import Image from "next/image";
import { Car } from "@/types/Car";
import Link from "next/link";

export default function CarCard({ car }: { car: Car }) {
  return (
    <article className="bg-white/5 rounded-lg p-4 shadow hover:shadow-lg transition">
      <Image
        src={car.image || "/placeholder-car.jpg"}
        alt={car.model}
        width={400}
        height={160}
        className="h-40 w-full object-cover rounded-md"
      />
      <h3 className="mt-3 font-bold">
        {car.brand} {car.model}
      </h3>
      <p className="text-sm">
        Año: {car.year} • Motor: {car.engine}
      </p>
      <p className="mt-2 text-sm text-gray-300">
        {car.description || "Descripción no disponible."}
      </p>
      <div className="mt-3 flex gap-2">
        <Link href="#" className="px-3 py-1 bg-white/90 text-black rounded">
          Ver
        </Link>
        <Link href="#" className="px-3 py-1 border rounded">
          Compartir
        </Link>
      </div>
    </article>
  );
}
