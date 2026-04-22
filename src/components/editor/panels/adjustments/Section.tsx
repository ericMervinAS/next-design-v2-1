import { useState, type ReactNode } from "react";
import { MIcon } from "../../shared/MIcon";

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
    <div
      className="flex w-full flex-col rounded-[20px] p-3"
      style={{ backgroundColor: "#1c1c1c" }}
    >
      {/* Header */}
      <div className="flex w-full items-center justify-between">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 text-[12px] leading-4 text-white hover:opacity-80"
          style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
        >
          {/* Caret rotates from ▶ (closed) to ▼ (open) */}
          <span
            className="inline-flex h-2.5 w-2.5 items-center justify-center transition-transform duration-150"
            style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            <MIcon name="chevron_right" size={16} className="-m-1" />
          </span>
          {title}
        </button>

        <div className="flex items-center" style={{ color: "#777" }}>
          <button
            className="flex items-center justify-center rounded-[12px] p-2 hover:text-foreground"
            title="Toggle visibility"
          >
            <MIcon name="visibility" size={12} />
          </button>
          <button
            className="flex items-center justify-center rounded-[12px] p-2 hover:text-foreground"
            title="Reset"
            onClick={onReset}
          >
            <MIcon name="restart_alt" size={12} />
          </button>
        </div>
      </div>

      {/* Content */}
      {open && children && (
        <div className="mt-3 flex w-full flex-col gap-2.5">{children}</div>
      )}
    </div>
  );
}
