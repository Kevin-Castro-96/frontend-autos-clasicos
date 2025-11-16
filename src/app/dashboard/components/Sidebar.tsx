import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white h-full shadow p-4">
      <h2 className="font-bold text-lg mb-4">Dashboard</h2>

      <nav className="space-y-2">
        <Link href="/dashboard">
          <div className="p-2 rounded hover:bg-gray-200 cursor-pointer">
            Inicio
          </div>
        </Link>

        <Link href="/dashboard/cars">
          <div className="p-2 rounded hover:bg-gray-200 cursor-pointer">
            Vehículos
          </div>
        </Link>
      </nav>
    </aside>
  );
}
