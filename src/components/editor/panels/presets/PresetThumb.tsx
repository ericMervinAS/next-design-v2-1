import { adjToFilter, adjToOverlayLayers, type Preset, defaultAdjustments } from "@/lib/editor-data";

export function PresetThumb({
  preset,
  photoUrl,
  active,
  onClick,
  onHover,
  onLeave,
}: {
  preset: Preset;
  photoUrl: string;
  active?: boolean;
  onClick: () => void;
  onHover?: () => void;
  onLeave?: () => void;
}) {
  const adj = { ...defaultAdjustments, ...preset.adj };
  return (
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      className="group relative block h-[80px] w-full shrink-0 overflow-hidden"
      style={{
        border: active
          ? "2px solid #3b82f6"
          : "0.535px solid rgba(226, 226, 226, 0.2)",
        boxShadow: active ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : undefined,
      }}
    >
      <img
        src={photoUrl}
        alt={preset.name}
        className="absolute inset-0 h-full w-full object-cover"
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
      {/* Darken overlay — always on for active, fades in on hover otherwise */}
      <div
        className={
          "pointer-events-none absolute inset-0 transition-opacity duration-150 " +
          (active
            ? "bg-black/60 opacity-100"
            : "bg-black/50 opacity-0 group-hover:opacity-100")
        }
      />
      {/* Preset name — shown when active or on hover */}
      <span
        className={
          "pointer-events-none absolute inset-0 flex items-center justify-center text-[13px] leading-4 text-[#e2e2e2] transition-opacity duration-150 " +
          (active ? "opacity-100" : "opacity-0 group-hover:opacity-100")
        }
        style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
      >
        {preset.name}
      </span>
    </button>
    // kuchbhi
  );
}
