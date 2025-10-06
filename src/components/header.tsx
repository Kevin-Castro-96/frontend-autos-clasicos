import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header({ onOpenLanguage }: { onOpenLanguage: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-slate-900 via-gray-900 to-black text-white shadow-md md:shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-1 md:py-2 flex items-center justify-between h-14 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-3">
          <Image
            src="/logo-autos-clasicos.webp"
            alt="Autos Clásicos"
            width={64}
            height={64}
            className="rounded-md object-cover"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-3 md:gap-4 text-sm md:text-base">
          <Link href="/contactanos" className="hover:underline">
            Contáctanos
          </Link>
          <Link href="/documentacion" className="hover:underline">
            Documentación
          </Link>
          <button onClick={onOpenLanguage} className="rounded-md cursor-pointer hover:underline">
            Languages
          </button>
          <Link
            href="/login"
            className="ml-2 inline-flex items-center gap-2 px-3 py-1.5 md:py-2 bg-white text-black rounded-md shadow-sm text-sm md:text-base"
          >
            Iniciar Sesion
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center p-2 rounded-md hover:bg-white/10 focus:outline-none transition"
          >
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-black/90 text-white px-6 py-4 flex flex-col gap-3 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Link href="/contactanos" className="hover:underline">
          Contáctanos
        </Link>
        <Link href="/documentacion" className="hover:underline">
          Documentación
        </Link>
        <button onClick={onOpenLanguage} className="rounded-md cursor-pointer hover:underline text-left">
          Languages
        </button>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white text-black rounded-md shadow-sm text-sm"
        >
          Iniciar Sesion
        </Link>
      </div>
    </header>
  );
}
