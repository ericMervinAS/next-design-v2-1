import { useEffect, useRef, useState } from "react";
import { photos } from "@/lib/editor-data";

const MIN_THUMB_H = 0;
const MAX_THUMB_H = 220;
const DEFAULT_THUMB_H = 56;
/** Below this height the thumbs row is hidden entirely — the strip becomes
 * just the drag handle, which the user can grab to pull it back up. */
const COLLAPSE_THRESHOLD = 24;

export function FilmStrip({
  activeId,
  onPick,
}: {
  activeId: string;
  onPick: (id: string) => void;
}) {
  const [thumbH, setThumbH] = useState(DEFAULT_THUMB_H);
  const dragStart = useRef<{ y: number; h: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onHandlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    dragStart.current = { y: e.clientY, h: thumbH };
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: PointerEvent) => {
      if (!dragStart.current) return;
      // Dragging UP (negative dy) should grow the strip
      const dy = dragStart.current.y - e.clientY;
      const next = Math.min(MAX_THUMB_H, Math.max(MIN_THUMB_H, dragStart.current.h + dy));
      setThumbH(next);
    };
    const onUp = () => {
      setIsDragging(false);
      dragStart.current = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [isDragging]);

  // Natural 16:10 aspect per thumb, driven by the draggable height
  const thumbW = Math.round(thumbH * 1.6);

  // Repeat the photo list a few times so the strip visually fills on wider
  // viewports. (Real deployments would have enough photos to not need this.)
  const filled = [...photos, ...photos, ...photos];

  const collapsed = thumbH < COLLAPSE_THRESHOLD;

  // The selected thumbnail is ALWAYS centered in the strip. We disable normal
  // horizontal scrolling and position the track via `translateX` instead, so
  // the active thumb's center aligns with the container's center at all times
  // (on selection change, on resize, on thumb-height drag).
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLButtonElement | null>(null);
  const firstActiveIdx = filled.findIndex((p) => p.id === activeId);
  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
    if (collapsed) return;
    const recenter = () => {
      const viewport = viewportRef.current;
      const active = activeRef.current;
      if (!viewport || !active) return;
      const viewportW = viewport.clientWidth;
      const activeCenter = active.offsetLeft + active.offsetWidth / 2;
      setOffsetX(viewportW / 2 - activeCenter);
    };
    recenter();
    const ro = new ResizeObserver(recenter);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, [activeId, thumbH, collapsed]);

  return (
    <div
      className="m-2 overflow-hidden rounded-[24px] shadow-2xl"
      style={{
        backgroundColor: "rgba(30, 30, 30, 0.5)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        border: "0.5px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Drag handle (notch) — centered at top */}
      <div
        onPointerDown={onHandlePointerDown}
        className="group flex h-3 items-center justify-center"
        style={{ cursor: isDragging ? "grabbing" : "ns-resize", touchAction: "none" }}
        title="Drag to resize"
      >
        <div
          className={`h-1 w-10 rounded-full transition-colors ${
            isDragging ? "bg-primary" : "bg-white/20 group-hover:bg-white/40"
          }`}
        />
      </div>

      {/* Thumbnails — hidden entirely when the strip is collapsed. Drag the
          handle up from the collapsed state to reveal them again.
          The viewport is overflow-hidden (not scrollable); the inner track is
          translated so the selected thumb sits in the middle of the viewport. */}
      {!collapsed && (
        <div ref={viewportRef} className="relative overflow-hidden">
          <div
            ref={trackRef}
            className="relative flex items-center gap-[2px]"
            style={{
              transform: `translateX(${offsetX}px)`,
              transition: "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
              willChange: "transform",
            }}
          >
            {filled.map((p, i) => {
              const isActive = activeId === p.id;
              const attachRef = i === firstActiveIdx;
              return (
                <button
                  ref={attachRef ? activeRef : undefined}
                  key={`${p.id}-${i}`}
                  onClick={() => onPick(p.id)}
                  className={
                    "relative flex-shrink-0 overflow-hidden transition-all duration-200 " +
                    (isActive
                      ? "mx-3 rounded-[6px] ring-[3px] ring-primary ring-inset shadow-lg shadow-black/40"
                      : "rounded-[4px] hover:brightness-110")
                  }
                  style={{ height: thumbH, width: thumbW }}
                >
                  <img
                    src={p.url}
                    alt={p.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
