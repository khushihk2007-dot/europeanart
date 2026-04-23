import { useEffect, useRef, useState } from "react";
import type { Painting } from "@/data/paintings";

type Props = {
  paintings: Painting[];
};

export function PaintingWheel({ paintings }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [size, setSize] = useState({ w: 1200, h: 800 });

  useEffect(() => {
    const updateSize = () => {
      setSize({ w: window.innerWidth, h: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Rotate clockwise based on scrollY. 0.15 deg per pixel feels nice.
        setRotation(window.scrollY * 0.15);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Wheel sized larger than viewport so only the top arc is visible.
  const wheelDiameter = Math.max(size.w * 1.6, 1600);
  const radius = wheelDiameter / 2;
  const tileSize = Math.max(110, Math.min(180, size.w * 0.11));

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background"
      style={{ height: "100vh", minHeight: 700 }}
    >
      {/* Wheel container — anchored so its center sits well below the visible area,
          leaving only the upper arc inside the viewport. */}
      <div
        className="absolute left-1/2"
        style={{
          width: wheelDiameter,
          height: wheelDiameter,
          top: "55%",
          transform: `translateX(-50%) rotate(${rotation}deg)`,
          transition: "transform 0.05s linear",
          willChange: "transform",
        }}
      >
        {paintings.map((p, i) => {
          const angle = (360 / paintings.length) * i;
          const rad = (angle * Math.PI) / 180;
          // Position around the circle (top = -90deg offset)
          const x = Math.cos(rad - Math.PI / 2) * radius;
          const y = Math.sin(rad - Math.PI / 2) * radius;

          return (
            <div
              key={p.title}
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                width: tileSize,
                height: tileSize * 1.25,
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${-rotation + angle}deg)`,
                willChange: "transform",
              }}
            >
              <div
                className="w-full h-full overflow-hidden bg-card shadow-[0_20px_40px_-15px_rgba(0,0,0,0.25)] ring-1 ring-black/5"
                style={{ borderRadius: "14px" }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Center content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-serif text-foreground max-w-3xl leading-tight">
          A Living Gallery of Masterpieces
        </h1>
        <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl">
          Scroll to turn the wheel. Discover thirty timeless works of European art —
          from the Renaissance to the dawn of modernism.
        </p>
        <a
          href="#gallery"
          className="pointer-events-auto mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
        >
          Explore the Collection
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
