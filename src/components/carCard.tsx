export default function CarCard({ car }: { car: Car }) {
  return (
    <article className="bg-white/5 rounded-lg p-4 shadow hover:shadow-lg transition">
      <img
        src={car.image || "/placeholder-car.jpg"}
        alt={car.model}
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
        <a href="#" className="px-3 py-1 bg-white/90 text-black rounded">
          Ver
        </a>
        <a href="#" className="px-3 py-1 border rounded">
          Compartir
        </a>
      </div>
    </article>
  );
}
