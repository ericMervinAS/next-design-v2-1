import { Section } from "./Section";
import { EditorSlider } from "./Slider";
import { defaultAdjustments, type Adjustments } from "@/lib/editor-data";

// Gradients taken verbatim from the Figma "Colours" section (node 301:102700).
const GRADIENTS = {
  // Shared by Saturation + Vibrancy
  saturation:
    "linear-gradient(90deg, rgba(36, 36, 36, 0.2) 4.17%, rgba(124, 124, 124, 0.2) 50.41%, rgba(255, 127, 95, 0.16) 74.47%, rgba(227, 189, 22, 0.2) 82.70%, rgba(24, 167, 234, 0.2) 91.35%, rgba(65, 102, 233, 0.2) 100%)",
  tint:
    "linear-gradient(90deg, rgba(34, 208, 130, 0.24) 3.03%, rgba(159, 255, 175, 0.24) 23.84%, rgba(199, 74, 76, 0.24) 79.49%, rgba(244, 38, 110, 0.24) 100%)",
  temperature:
    "linear-gradient(90deg, rgba(40, 83, 232, 0.32) 3.03%, rgba(24, 167, 234, 0.32) 22.95%, rgba(227, 189, 22, 0.32) 80.42%, rgba(255, 127, 95, 0.32) 100%)",
};

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
    <div
      className="flex h-full w-[300px] flex-col justify-between"
      style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
    >
      <div className="scroll-thin flex-1 overflow-y-auto">
        <div className="flex flex-col gap-1.5">
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
              tintGradient={GRADIENTS.saturation}
            />
            <EditorSlider
              label="Vibrancy"
              value={adj.vibrancy}
              onChange={set("vibrancy")}
              tintGradient={GRADIENTS.saturation}
            />
            <EditorSlider
              label="Tint"
              value={adj.tint}
              onChange={set("tint")}
              tintGradient={GRADIENTS.tint}
            />
            <EditorSlider
              label="Temprature"
              value={adj.temperature}
              onChange={set("temperature")}
              tintGradient={GRADIENTS.temperature}
            />
          </Section>

          <Section title="HSL" defaultOpen={false} />
          <Section title="Tone curve" defaultOpen={false} />
          <Section title="Color mixer" defaultOpen={false} />
          <Section title="Color Grading" defaultOpen={false} />
        </div>
      </div>

      {/* Reset + Export pill buttons (docked at bottom of slider column) */}
      <div className="flex w-full shrink-0 items-center gap-1.5 pt-2">
        <button
          onClick={onReset}
          className="flex h-10 flex-1 items-center justify-center rounded-[26px] text-[15px] leading-4 text-[#e2e2e2] hover:opacity-90"
          style={{ backgroundColor: "#303030", border: "0.5px solid #474747" }}
        >
          Reset
        </button>
        <button
          onClick={onExport}
          className="flex h-10 flex-1 items-center justify-center rounded-[33px] text-[15px] leading-4 text-[#e2e2e2] hover:opacity-90"
          style={{ backgroundColor: "#2563eb" }}
        >
          Export
        </button>
      </div>
    </div>
  );
}
