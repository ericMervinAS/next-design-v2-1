import { Sparkles, SlidersHorizontal, Crop, Brush, MoreHorizontal } from "lucide-react";

export function RightRail() {
  const items = [
    { icon: Sparkles, active: true },
    { icon: SlidersHorizontal },
    { icon: Crop },
    { icon: Brush },
    { icon: MoreHorizontal },
  ];
  return (
    <div className="flex w-11 flex-col items-center gap-1 border-l border-border bg-panel py-3">
      {items.map((it, i) => (
        <button
          key={i}
          className={`flex h-8 w-8 items-center justify-center rounded-md ${
            it.active
              ? "bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg shadow-primary/20"
              : "text-muted-foreground hover:bg-panel-2 hover:text-foreground"
          }`}
        >
          <it.icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}
