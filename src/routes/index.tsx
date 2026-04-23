import { createFileRoute } from "@tanstack/react-router";
import { PaintingWheel } from "@/components/PaintingWheel";
import { paintings } from "@/data/paintings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Échos de l'Art — A Journey Through European Masterpieces" },
      {
        name: "description",
        content:
          "Scroll through a rotating wheel of 30+ legendary European paintings, with notes on each work and its painter.",
      },
      { property: "og:title", content: "Échos de l'Art" },
      {
        property: "og:description",
        content:
          "An interactive scroll-driven gallery of European masterpieces.",
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
        <header className="max-w-2xl mb-16 text-center mx-auto">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-4">
            The Collection
          </p>
          <h2
            className="font-serif italic text-4xl md:text-5xl"
            style={{ color: "var(--gold)" }}
          >
            Thirty paintings, thirty stories.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Every work above appears below with a brief note — the painter, the year,
            and the spark that made it endure.
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
              <div className="p-6 text-center">
                <h3
                  className="font-serif text-2xl"
                  style={{ color: "var(--gold)" }}
                >
                  {p.title}
                </h3>
                <p className="mt-1 text-[0.7rem] tracking-[0.3em] uppercase text-muted-foreground">
                  {p.artist} · {p.year}
                </p>
                <p className="mt-4 italic font-serif text-base leading-relaxed text-foreground/80">
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
