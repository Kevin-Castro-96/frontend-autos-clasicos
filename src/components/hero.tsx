export default function Hero() {
  const slides = [
    {
      title: "Belleza clásica",
      subtitle: "Autos de los años 60 y 70",
      image: "/muestra-autos.jpg",
      cta: "Ver colección",
    },
    {
      title: "Potencia y estilo",
      subtitle: "Músculos y líneas atemporales",
      image: "/motor-auto.jpg",
      cta: "Descubrir",
    },
    {
      title: "Historia sobre ruedas",
      subtitle: "Modelos restaurados y originales",
      image: "/restaurado.webp",
      cta: "Explorar",
    },
  ];

  return (
    <section className="h-[90vh] flex flex-wrap gap-4 p-6 justify-center">
      {slides.map((s, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-lg shadow-lg 
                 flex-grow flex-shrink flex-basis-[250px]"
        >
          <img
            src={s.image}
            alt={s.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative z-10 p-6 bg-black/40 h-full flex flex-col justify-end">
            <h2 className="text-2xl font-bold text-white">{s.title}</h2>
            <p className="mt-1 text-white">{s.subtitle}</p>
            <a
              href="#"
              className="mt-4 inline-block px-4 py-2 bg-black/70 hover:bg-black/40 text-white rounded-md transition"
            >
              {s.cta}
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}
