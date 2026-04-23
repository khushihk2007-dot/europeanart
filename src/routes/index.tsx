import { createFileRoute } from "@tanstack/react-router";
import { PaintingWheel } from "@/components/PaintingWheel";
import { paintings } from "@/data/paintings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maestros — A Wheel of European Masterpieces" },
      {
        name: "description",
        content:
          "Scroll through a rotating wheel of 30+ legendary European paintings, from the Renaissance to Post-Impressionism, with notes on each work and its painter.",
      },
      { property: "og:title", content: "Maestros — A Wheel of European Masterpieces" },
      {
        property: "og:description",
        content:
          "An interactive scroll-driven gallery of European art masterpieces with painter and painting notes.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <PaintingWheel paintings={paintings} />

      <section id="gallery" className="px-6 md:px-10 py-24 max-w-7xl mx-auto">
        <header className="max-w-2xl mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground mb-4">
            The Collection
          </p>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight">
            Thirty paintings, thirty stories.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Each work below appears on the wheel above. A brief note offers a way in —
            the painter, the year, and the spark that made it endure.
          </p>
        </header>

        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {paintings.map((p) => (
            <li
              key={p.title}
              className="group flex flex-col rounded-2xl bg-card overflow-hidden ring-1 ring-border transition-all hover:shadow-[0_25px_60px_-30px_rgba(0,0,0,0.4)] hover:-translate-y-1"
            >
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={p.image}
                  alt={`${p.title} by ${p.artist}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl leading-snug">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p.artist} · <span className="italic">{p.year}</span>
                </p>
                <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                  {p.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        Images courtesy of Wikimedia Commons · Public domain works of European art.
      </footer>
    </main>
  );
}
