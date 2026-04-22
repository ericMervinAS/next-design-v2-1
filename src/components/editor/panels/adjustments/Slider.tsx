import { useRef, useState } from "react";

type Props = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
  /**
   * Optional gradient used as the slider's base background (e.g. the
   * colour-spectrum for Saturation / Tint / Temperature sliders). Falls back
   * to a flat dark fill when not provided.
   */
  tintGradient?: string;
};

export function EditorSlider({ label, value, min = -100, max = 100, onChange, tintGradient }: Props) {
  const pillRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Is the slider bipolar (range crosses zero)?
  const bipolar = min < 0 && max > 0;

  // Compute the active bar in % of the pill width.
  // Bipolar sliders grow from centre outward; unipolar grow from the left.
  let fillLeftPct: number;
  let fillRightPct: number;
  if (bipolar) {
    const zeroPct = (-min / (max - min)) * 100;
    const valPct = ((value - min) / (max - min)) * 100;
    fillLeftPct = Math.min(zeroPct, valPct);
    fillRightPct = 100 - Math.max(zeroPct, valPct);
  } else {
    fillLeftPct = 0;
    fillRightPct = 100 - ((value - min) / (max - min)) * 100;
  }

  // The thumb marker sits at the current-value end of the active bar.
  const positivelyDirected = value >= (bipolar ? 0 : min);

  const setFromClientX = (clientX: number) => {
    const el = pillRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    onChange(min + ratio * (max - min));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!active) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setActive(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const onDoubleClick = () => {
    onChange(bipolar ? 0 : min);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const big = e.shiftKey ? 10 : 1;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      onChange(Math.max(min, value - big));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      onChange(Math.min(max, value + big));
    } else if (e.key === "Home") {
      e.preventDefault();
      onChange(min);
    } else if (e.key === "End") {
      e.preventDefault();
      onChange(max);
    }
  };

  const showThumb = hover || active;
  const textColor = active ? "#e2e2e2" /* type/1 */ : "#777" /* type/3 */;
  const thumbColor = active ? "#ababab" /* type/2 */ : "#777" /* type/3 */;

  const display = Number.isInteger(value) ? value : value.toFixed(2);

  return (
    <div
      ref={pillRef}
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={String(display)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      className="relative flex h-[28px] w-full cursor-ew-resize select-none items-center justify-between overflow-hidden rounded-lg px-2 py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      style={{
        background: tintGradient ?? "#242424",
        touchAction: "none",
        fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif",
        // On hover, amp the gradient saturation so tinted sliders (Saturation,
        // Vibrancy, Tint, Temperature) visibly pop. Flat-gray sliders just get
        // a tiny brightness bump as a subtle hover cue.
        filter: hover
          ? "saturate(3) brightness(1.2) contrast(1.1)"
          : "saturate(1) brightness(1) contrast(1)",
        transition: "filter 180ms ease-out",
      }}
    >
      {/* Active area — translucent white overlay indicating the value */}
      <div
        className="pointer-events-none absolute top-0 h-[28px] rounded-lg"
        style={{
          left: `${fillLeftPct}%`,
          right: `${fillRightPct}%`,
          backgroundColor: "rgba(226, 226, 226, 0.10)",
        }}
      >
        {/* Thumb marker — 2×21 rounded pill, 4px inset from the value-end */}
        <div
          className="absolute top-[3px] h-[21px] w-[2px] rounded-full transition-opacity"
          style={{
            [positivelyDirected ? "right" : "left"]: "4px",
            backgroundColor: thumbColor,
            opacity: showThumb ? 1 : 0,
          }}
        />
      </div>

      {/* Label (left) */}
      <span
        className="relative z-10 text-[13px] leading-4"
        style={{ color: textColor }}
      >
        {label}
      </span>

      {/* Value (right) */}
      <span
        className="relative z-10 text-[13px] leading-4 tabular-nums"
        style={{ color: textColor }}
      >
        {display}
      </span>
    </div>
  );
}
