import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-8 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-autos-clasicos.webp"
            alt="Logo"
            width={64}
            height={64}
            className="h-16 w-16"
          />
        </Link>
        <nav className="flex gap-4">
          <Link href="/contactanos" className="hover:underline">
            Contactanos
          </Link>
          <Link href="/documentacion" className="hover:underline">
            Documentación
          </Link>
          <Link href="/login" className="hover:underline">
            Iniciar sesión
          </Link>
        </nav>
      </div>
    </footer>
  );
}
