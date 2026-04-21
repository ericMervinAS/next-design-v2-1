import { adjToFilter, adjToOverlayLayers, type Preset, defaultAdjustments } from "@/lib/editor-data";

export function PresetThumb({
  preset,
  photoUrl,
  active,
  onClick,
}: {
  preset: Preset;
  photoUrl: string;
  active?: boolean;
  onClick: () => void;
}) {
  const adj = { ...defaultAdjustments, ...preset.adj };
  return (
    <button
      onClick={onClick}
      className={`relative w-full overflow-hidden rounded-md border transition-all ${
        active ? "border-primary ring-2 ring-primary/40" : "border-transparent hover:border-border"
      }`}
      style={{ aspectRatio: "16/7" }}
    >
      <img
        src={photoUrl}
        alt={preset.name}
        className="h-full w-full object-cover"
        style={{ filter: adjToFilter(adj) }}
        loading="lazy"
      />
      {adjToOverlayLayers(adj).map((layer, i) => (
        <div
          key={i}
          className="pointer-events-none absolute inset-0"
          style={{ backgroundColor: layer.color, opacity: layer.opacity, mixBlendMode: layer.blend }}
        />
      ))}
      {active && (
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1 text-left text-[11px] font-medium text-white">
          {preset.name}
        </span>
      )}
    </button>
  );
}
