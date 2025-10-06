export default function Footer() {
  return (
    <footer className="mt-8 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap justify-between items-center">
        <a href="/" className="flex items-center gap-3">
          <img src="/logo-autos-clasicos.webp" alt="Logo" className="h-16 w-16" />
        </a>
        <nav className="flex gap-4">
          <a href="/contactanos" className="hover:underline">
            Contactanos
          </a>
          <a href="/documentacion" className="hover:underline">
            Documentación
          </a>
          <a href="/login" className="hover:underline">
            Iniciar sesión
          </a>
        </nav>
      </div>
    </footer>
  );
}
