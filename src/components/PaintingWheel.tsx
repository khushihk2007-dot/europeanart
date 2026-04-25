import { useEffect, useRef, useState } from "react";
import type { Painting } from "@/data/paintings";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";

type Props = { paintings: Painting[] };

export function PaintingWheel({ paintings }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 within section
  const [vw, setVw] = useState(1200);
  const [zoomed, setZoomed] = useState<Painting | null>(null);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
        setProgress(p);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const N = paintings.length;
  // The wheel rotates clockwise as you scroll. One full turn over the pinned section.
  // Negative rotation = clockwise visual movement as you scroll down.
  const rotation = -progress * 360;

  // Wheel geometry
  const wheelDiameter = Math.max(vw * 1.9, 1700);
  const radius = wheelDiameter / 2;
  const tileW = Math.max(140, Math.min(230, vw * 0.14));
  const tileH = tileW * 1.55;

  // Determine which painting sits closest to the top (12 o'clock).
  const step = 360 / N;
  const focusedIndex = ((Math.round(-rotation / step) % N) + N) % N;
  const focused = paintings[focusedIndex];

  return (
    <section
      ref={sectionRef}
      className="relative bg-background"
      style={{ height: `${N * 60}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Title */}
        <div className="absolute inset-x-0 top-0 z-20 pt-8 md:pt-12 text-center px-6 pointer-events-none">
          <h1
            className="font-serif italic text-5xl md:text-7xl"
            style={{ color: "var(--gold)", letterSpacing: "-0.01em" }}
          >
            Échos de l'Art
          </h1>
          <p className="mt-2 text-[0.7rem] md:text-xs tracking-[0.35em] uppercase text-muted-foreground">
            A Journey Through European Masterpieces
          </p>
        </div>

        {/* Rotating wheel */}
        <div
          className="absolute left-1/2"
          style={{
            width: wheelDiameter,
            height: wheelDiameter,
            top: "44%",
            transform: `translateX(-50%) rotate(${rotation}deg)`,
            willChange: "transform",
            transition: "transform 0.08s linear",
          }}
        >
          {paintings.map((p, i) => {
            const angle = step * i; // degrees from 12 o'clock
            const rad = (angle * Math.PI) / 180;
            const x = Math.sin(rad) * radius;
            const y = -Math.cos(rad) * radius;

            return (
              <div
                key={p.title}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  width: tileW,
                  height: tileH,
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${angle}deg)`,
                  willChange: "transform",
                }}
              >
                <button
                  type="button"
                  onClick={() => setZoomed(p)}
                  className="block w-full h-full overflow-hidden bg-card ring-1 ring-black/10 cursor-pointer transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                  style={{
                    borderRadius: 14,
                    boxShadow:
                      "0 30px 60px -25px rgba(0,0,0,0.45), 0 10px 25px -10px rgba(0,0,0,0.25)",
                  }}
                  aria-label={`View ${p.title}`}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    draggable={false}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Focused painting info card */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center pb-2 md:pb-4 px-6 -mb-2">
          <div
            key={focused.title}
            className="w-full max-w-2xl rounded-2xl bg-card/95 backdrop-blur px-8 py-7 text-center ring-1 ring-border"
            style={{
              boxShadow: "0 30px 70px -30px rgba(0,0,0,0.35)",
              animation: "fadeUp 0.4s ease-out",
            }}
          >
            <h2
              className="font-serif text-3xl md:text-4xl"
              style={{ color: "var(--gold)" }}
            >
              {focused.title}
            </h2>
            <p className="mt-2 text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground">
              {focused.artist}
            </p>
            <p className="mt-4 italic text-foreground/80 font-serif text-lg leading-snug">
              {focused.description}
            </p>
          </div>

          <div className="mt-5 text-center text-xs text-muted-foreground">
            <p>Scroll to Rotate</p>
            <div className="mx-auto mt-2 h-7 w-4 rounded-full border border-muted-foreground/40 flex items-start justify-center pt-1">
              <span className="block h-1.5 w-0.5 bg-muted-foreground/60 rounded-full animate-bounce" />
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>

      <Dialog open={!!zoomed} onOpenChange={(o) => !o && setZoomed(null)}>
        <DialogContent className="max-w-5xl bg-transparent border-0 p-0 sm:rounded-none shadow-none [&>button]:hidden">
          {zoomed && (
            <div className="flex items-center justify-center p-4 md:p-8">
              <img
                src={zoomed.image}
                alt={zoomed.title}
                className="block max-h-[85vh] max-w-full w-auto h-auto object-contain"
                style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6)" }}
              />
            </div>
          )}
        </DialogContent>
        {zoomed && (
          <DialogClose className="fixed right-4 top-4 z-[100] text-white opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <span className="text-3xl leading-none" aria-hidden="true">×</span>
            <span className="sr-only">Close</span>
          </DialogClose>
        )}
      </Dialog>
    </section>
  );
}
