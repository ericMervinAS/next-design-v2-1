import { photos } from "@/lib/editor-data";

export function FilmStrip({
  activeId,
  onPick,
}: {
  activeId: string;
  onPick: (id: string) => void;
}) {
  return (
    <div className="border-t border-border bg-panel">
      <div className="flex h-1.5 items-center justify-center">
        <div className="h-1 w-10 rounded-full bg-panel-3" />
      </div>
      <div className="scroll-thin flex gap-2 overflow-x-auto px-3 py-3">
        {photos.map((p) => (
          <button
            key={p.id}
            onClick={() => onPick(p.id)}
            className={`relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-md border transition-all ${
              activeId === p.id ? "border-primary ring-2 ring-primary/40" : "border-transparent hover:border-border"
            }`}
          >
            <img src={p.url} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
