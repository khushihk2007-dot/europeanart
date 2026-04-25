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
    </main>
  );
}
