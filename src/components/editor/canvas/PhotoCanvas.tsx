import { adjToFilter, adjToOverlayLayers, adjToSecondaryFilter, type Adjustments } from "@/lib/editor-data";

export function PhotoCanvas({ url, adj }: { url: string; adj: Adjustments }) {
  const layers = adjToOverlayLayers(adj);
  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="relative max-h-full max-w-full" style={{ filter: adjToSecondaryFilter(adj) }}>
          <div className="relative">
            <img
              src={url}
              alt="Editing canvas"
              className="block max-h-[calc(100vh-200px)] max-w-full object-contain shadow-2xl"
              style={{ filter: adjToFilter(adj) }}
            />
            {layers.map((layer, i) => (
              <div
                key={i}
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundColor: layer.color,
                  opacity: layer.opacity,
                  mixBlendMode: layer.blend,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
