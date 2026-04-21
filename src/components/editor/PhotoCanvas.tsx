import { adjToFilter, adjToOverlay, adjToSecondaryFilter, type Adjustments } from "@/lib/editor-data";

export function PhotoCanvas({ url, adj }: { url: string; adj: Adjustments }) {
  const overlay = adjToOverlay(adj);
  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="relative max-h-full max-w-full" style={{ filter: adjToSecondaryFilter(adj) }}>
          <img
            src={url}
            alt="Editing canvas"
            className="max-h-[calc(100vh-200px)] max-w-full object-contain shadow-2xl"
            style={{ filter: adjToFilter(adj) }}
          />
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            style={{ backgroundColor: overlay.color, opacity: overlay.opacity }}
          />
        </div>
      </div>
    </div>
  );
}
