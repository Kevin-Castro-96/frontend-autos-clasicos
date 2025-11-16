"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Header({
  onOpenLanguage,
}: {
  onOpenLanguage: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const router = useRouter();

  console.log(user)

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

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
          <Link href="/contactanos" className="hover:underline">Contáctanos</Link>
          <Link href="/documentacion" className="hover:underline">Documentación</Link>

          <button onClick={onOpenLanguage} className="hover:underline">
            Languages
          </button>

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="inline-flex items-center px-3 py-1.5 bg-blue-800 text-white rounded-md shadow-sm"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-1.5 bg-white text-black rounded-md shadow-sm ml-2"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center px-3 py-1.5 bg-white text-black rounded-md shadow-sm"
            >
              Iniciar Sesión
            </Link>
          )}
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-white/10"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-black/90 text-white px-6 py-4 flex flex-col gap-3 transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Link href="/contactanos" className="hover:underline">Contáctanos</Link>
        <Link href="/documentacion" className="hover:underline">Documentación</Link>

        <button onClick={onOpenLanguage} className="hover:underline text-left">
          Languages
        </button>

        {user ? (
          <>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-3 py-1.5 bg-blue-800 text-white rounded-md"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex px-3 py-1.5 bg-white text-black rounded-md"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="inline-flex px-3 py-1.5 bg-white text-black rounded-md shadow-sm"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </header>
  );
}
