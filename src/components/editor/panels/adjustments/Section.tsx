import { ChevronDown, ChevronRight, Eye, RotateCcw } from "lucide-react";
import { useState, type ReactNode } from "react";

export function Section({
  title,
  children,
  defaultOpen = true,
  onReset,
}: {
  title: string;
  children?: ReactNode;
  defaultOpen?: boolean;
  onReset?: () => void;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/60">
      <div className="flex items-center justify-between px-3 py-2.5">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 text-[13px] font-medium text-foreground hover:text-foreground/80"
        >
          {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          {title}
        </button>
        <div className="flex items-center gap-2 text-muted-foreground">
          <button className="hover:text-foreground" title="Toggle visibility">
            <Eye className="h-3.5 w-3.5" />
          </button>
          <button className="hover:text-foreground" title="Reset" onClick={onReset}>
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      {open && <div className="pb-2">{children}</div>}
    </div>
  );
}
