import { Section } from "./Section";
import { EditorSlider } from "./Slider";
import { defaultAdjustments, type Adjustments } from "@/lib/editor-data";
import { Settings2 } from "lucide-react";

export function AdjustmentsPanel({
  adj,
  onChange,
  onReset,
  onExport,
}: {
  adj: Adjustments;
  onChange: (next: Adjustments) => void;
  onReset: () => void;
  onExport: () => void;
}) {
  const set = (k: keyof Adjustments) => (v: number) => onChange({ ...adj, [k]: v });
  const resetKeys = (keys: (keyof Adjustments)[]) => () => {
    const next = { ...adj };
    keys.forEach((k) => (next[k] = defaultAdjustments[k]));
    onChange(next);
  };

  return (
    <div className="flex h-full w-[300px] flex-col bg-panel">
      <div className="scroll-thin flex-1 overflow-y-auto">
        <Section title="Light" onReset={resetKeys(["exposure", "contrast", "shadow", "highlight", "whites", "blacks"])}>
          <EditorSlider label="Exposure" value={adj.exposure} onChange={set("exposure")} />
          <EditorSlider label="Contrast" value={adj.contrast} onChange={set("contrast")} />
          <EditorSlider label="Shadow" value={adj.shadow} onChange={set("shadow")} />
          <EditorSlider label="Highlight" value={adj.highlight} onChange={set("highlight")} />
          <EditorSlider label="Whites" value={adj.whites} onChange={set("whites")} />
          <EditorSlider label="Blacks" value={adj.blacks} onChange={set("blacks")} />
        </Section>

        <Section title="Details" onReset={resetKeys(["clarity", "sharpen"])}>
          <EditorSlider label="Clarity" value={adj.clarity} onChange={set("clarity")} />
          <EditorSlider label="Sharpen" value={adj.sharpen} onChange={set("sharpen")} />
        </Section>

        <Section title="Colours" onReset={resetKeys(["saturation", "vibrancy", "tint", "temperature"])}>
          <EditorSlider
            label="Saturation"
            value={adj.saturation}
            onChange={set("saturation")}
            tintGradient="linear-gradient(to right, oklch(0.5 0.02 30), oklch(0.7 0.18 30))"
          />
          <EditorSlider
            label="Vibrancy"
            value={adj.vibrancy}
            onChange={set("vibrancy")}
            tintGradient="linear-gradient(to right, #6b21a8, #1e3a8a, #166534, #ca8a04, #b91c1c)"
          />
          <EditorSlider
            label="Tint"
            value={adj.tint}
            onChange={set("tint")}
            tintGradient="linear-gradient(to right, #15803d, #f5f5f4, #be185d)"
          />
          <EditorSlider
            label="Temprature"
            value={adj.temperature}
            onChange={set("temperature")}
            tintGradient="linear-gradient(to right, #1d4ed8, #f5f5f4, #ea580c)"
          />
        </Section>

        <Section title="HSL" defaultOpen={false} />
        <Section title="Tone curve" defaultOpen={false} />
        <Section title="Color mixer" defaultOpen={false} />
        <Section title="Color Grading" defaultOpen={false} />
      </div>

      <div className="flex items-center gap-2 border-t border-border bg-panel-2 px-3 py-3">
        <button
          onClick={onReset}
          className="flex-1 rounded-md bg-panel-3 px-4 py-2 text-[13px] font-medium text-foreground hover:bg-panel-3/80"
        >
          Reset
        </button>
        <button
          onClick={onExport}
          className="flex-[1.4] rounded-md bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Export
        </button>
        <button className="rounded-md p-2 text-muted-foreground hover:bg-panel-3 hover:text-foreground">
          <Settings2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
