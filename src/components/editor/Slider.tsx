type Props = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
  tintGradient?: string;
};

export function EditorSlider({ label, value, min = -100, max = 100, onChange, tintGradient }: Props) {
  return (
    <div className="grid grid-cols-[78px_1fr_44px] items-center gap-3 px-3 py-1.5">
      <span className="text-[12px] text-muted-foreground select-none">{label}</span>
      <div
        className="relative"
        style={tintGradient ? ({ ["--tint-bg" as string]: tintGradient } as React.CSSProperties) : undefined}
      >
        <input
          type="range"
          min={min}
          max={max}
          step={0.01}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`as-slider ${tintGradient ? "as-slider-tinted" : ""}`}
        />
      </div>
      <span className="text-[12px] text-foreground/90 text-right tabular-nums">
        {Number.isInteger(value) ? value : value.toFixed(2)}
      </span>
    </div>
  );
}
