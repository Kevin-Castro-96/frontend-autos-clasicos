"use client";

import Link from "next/link";
import { X } from "lucide-react";

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      {/* Overlay con animación fade-in */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden animate-fadeIn"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static z-30 bg-white shadow h-full w-60 p-4 transform 
          transition-all duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Botón cerrar mobile */}
        <button
          className="md:hidden mb-4"
          onClick={() => setOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-bold text-lg mb-4">Dashboard</h2>

        <nav className="space-y-2">

          {/* Cerrar sidebar al seleccionar opción en mobile */}
          <Link href="/dashboard" onClick={() => setOpen(false)}>
            <div className="p-2 rounded hover:bg-gray-200 cursor-pointer transition-all">
              Inicio
            </div>
          </Link>

          <Link href="/dashboard/cars" onClick={() => setOpen(false)}>
            <div className="p-2 rounded hover:bg-gray-200 cursor-pointer transition-all">
              Vehículos
            </div>
          </Link>
        </nav>
      </aside>
    </>
  );
}
