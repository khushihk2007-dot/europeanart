import { useEffect } from "react";
import { X } from "lucide-react";
import type { Painting } from "@/data/paintings";

type Props = {
  painting: Painting | null;
  onClose: () => void;
};

export function Lightbox({ painting, onClose }: Props) {
  useEffect(() => {
    if (!painting) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [painting, onClose]);

  if (!painting) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10 animate-fade-in"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
      >
        <X className="h-5 w-5" />
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center gap-4 max-w-6xl w-full animate-scale-in"
      >
        <img
          src={painting.image.replace(/width=\d+/, "width=1600")}
          alt={painting.title}
          className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl"
        />
        <div className="text-center text-white max-w-2xl">
          <h2 className="font-serif italic text-3xl md:text-4xl" style={{ color: "var(--gold)" }}>
            {painting.title}
          </h2>
          <p className="mt-1 text-xs tracking-[0.3em] uppercase text-white/70">
            {painting.artist} · {painting.year}
          </p>
          <p className="mt-3 italic font-serif text-lg text-white/90">{painting.description}</p>
        </div>
      </div>
    </div>
  );
}
