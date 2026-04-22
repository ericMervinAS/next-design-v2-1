import { useCallback, useEffect, useRef, useState } from "react";
import { adjToFilter, adjToOverlayLayers, adjToSecondaryFilter, type Adjustments } from "@/lib/editor-data";

const MIN_SCALE = 0.05;
const MAX_SCALE = 20;

export function PhotoCanvas({
  url,
  adj,
  onScaleChange,
}: {
  url: string;
  adj: Adjustments;
  /** Fired whenever the zoom scale changes. `1` = 100%. */
  onScaleChange?: (scale: number) => void;
}) {
  const layers = adjToOverlayLayers(adj);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);

  // Fit photo to container whenever image or container changes
  const fit = useCallback(() => {
    const container = containerRef.current;
    if (!container || !imgSize) return;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const padding = 40;
    const scale = Math.min(
      (cw - padding * 2) / imgSize.w,
      (ch - padding * 2) / imgSize.h,
      1,
    );
    setTransform({ x: 0, y: 0, scale: Math.max(scale, MIN_SCALE) });
  }, [imgSize]);

  useEffect(() => {
    fit();
  }, [fit]);

  // Notify parent whenever the scale changes so the TopBar can show live zoom
  useEffect(() => {
    onScaleChange?.(transform.scale);
  }, [transform.scale, onScaleChange]);

  // Refit on container resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => fit());
    ro.observe(container);
    return () => ro.disconnect();
  }, [fit]);

  // Wheel: pinch/ctrl = zoom (around cursor), else pan
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = container.getBoundingClientRect();
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = e.clientY - rect.top - rect.height / 2;

      if (e.ctrlKey || e.metaKey) {
        // Zoom around cursor
        setTransform((prev) => {
          const zoomFactor = Math.exp(-e.deltaY * 0.01);
          const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev.scale * zoomFactor));
          const ratio = next / prev.scale;
          return {
            scale: next,
            x: cx - (cx - prev.x) * ratio,
            y: cy - (cy - prev.y) * ratio,
          };
        });
      } else {
        // Pan
        setTransform((prev) => ({
          ...prev,
          x: prev.x - e.deltaX,
          y: prev.y - e.deltaY,
        }));
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  // Drag to pan with mouse (middle-click or space-held handled simply via left drag on empty canvas)
  const onPointerDown = (e: React.PointerEvent) => {
    // Only left button or middle button
    if (e.button !== 0 && e.button !== 1) return;
    setIsPanning(true);
    panStart.current = { x: e.clientX, y: e.clientY, tx: transform.x, ty: transform.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isPanning || !panStart.current) return;
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    setTransform((prev) => ({ ...prev, x: panStart.current!.tx + dx, y: panStart.current!.ty + dy }));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    setIsPanning(false);
    panStart.current = null;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const onDoubleClick = () => fit();

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-black"
      style={{ cursor: isPanning ? "grabbing" : "grab", touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onDoubleClick={onDoubleClick}
    >
      {/* Transform layer — positioned at container center, then translated + scaled */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          transform: `translate(-50%, -50%) translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        <div className="relative" style={{ filter: adjToSecondaryFilter(adj) }}>
          <img
            ref={imgRef}
            src={url}
            alt="Editing canvas"
            draggable={false}
            onLoad={(e) => {
              const el = e.currentTarget;
              setImgSize({ w: el.naturalWidth, h: el.naturalHeight });
            }}
            className="block select-none shadow-2xl"
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
  );
}
