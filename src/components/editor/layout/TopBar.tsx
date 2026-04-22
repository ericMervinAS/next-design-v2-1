import { ChevronLeft, Info, Filter, SlidersHorizontal, Star, Flag, Columns2 } from "lucide-react";

export function TopBar({ title, rating = 2 }: { title: string; rating?: number }) {
  return (
    <div className="flex h-12 items-center gap-3 border-b border-border bg-panel px-3 select-none">
      <div className="flex items-center gap-2">
        <span className="traffic-light" style={{ background: "#ff5f57" }} />
        <span className="traffic-light" style={{ background: "#febc2e" }} />
        <span className="traffic-light" style={{ background: "#28c840" }} />
      </div>

      <button className="ml-2 rounded p-1.5 text-muted-foreground hover:bg-panel-2 hover:text-foreground">
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-2 rounded-md bg-panel-2 px-3 py-1.5">
        <Info className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-[13px] text-foreground/90">{title}</span>
        <div className="ml-2 flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < rating ? "fill-foreground text-foreground" : "text-muted-foreground"}`}
            />
          ))}
        </div>
        <Flag className="ml-1 h-3 w-3 text-muted-foreground" />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className="rounded p-1.5 text-muted-foreground hover:bg-panel-2 hover:text-foreground">
          <Filter className="h-4 w-4" />
        </button>
        <button className="rounded p-1.5 text-muted-foreground hover:bg-panel-2 hover:text-foreground">
          <SlidersHorizontal className="h-4 w-4" />
        </button>
        <div className="mx-1 flex items-center gap-1 rounded-md bg-panel-2 px-2 py-1 text-[12px] text-foreground/90">
          <span>Fit</span>
        </div>
        <div className="flex items-center gap-1 rounded-md bg-panel-2 px-2 py-1 text-[12px] text-foreground/90">
          <span>100%</span>
        </div>
        <button className="rounded p-1.5 text-muted-foreground hover:bg-panel-2 hover:text-foreground">
          <Columns2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
