import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { defaultAdjustments, photos, presets, type Adjustments, type Preset } from "@/lib/editor-data";
import { TopBar } from "@/components/editor/TopBar";
import { PresetPanel } from "@/components/editor/PresetPanel";
import { AdjustmentsPanel } from "@/components/editor/AdjustmentsPanel";
import { PhotoCanvas } from "@/components/editor/PhotoCanvas";
import { FilmStrip } from "@/components/editor/FilmStrip";
import { RightRail } from "@/components/editor/RightRail";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  component: EditorPage,
  head: () => ({
    meta: [
      { title: "Aftershoot Next — Photo Editor" },
      { name: "description", content: "Aftershoot Next: AI-assisted photo editor with live presets, sliders, and a film strip workflow." },
    ],
  }),
});

function EditorPage() {
  const [activePhotoId, setActivePhotoId] = useState(photos[0].id);
  const [adj, setAdj] = useState<Adjustments>({ ...defaultAdjustments });
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  const photo = photos.find((p) => p.id === activePhotoId)!;

  const applyPreset = (p: Preset) => {
    setAdj({ ...defaultAdjustments, ...p.adj });
    setActivePresetId(p.id);
  };

  const reset = () => {
    setAdj({ ...defaultAdjustments });
    setActivePresetId(null);
  };

  const handlePick = (id: string) => {
    setActivePhotoId(id);
    setAdj({ ...defaultAdjustments });
    setActivePresetId(null);
  };

  return (
    <div className="dark flex h-screen w-screen flex-col overflow-hidden bg-background text-foreground">
      <TopBar title="Travel 2026 bali" rating={2} />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <PhotoCanvas url={photo.url} adj={adj} />
          </div>
          <FilmStrip activeId={activePhotoId} onPick={handlePick} />
        </main>
        <PresetPanel photoUrl={photo.url} activePresetId={activePresetId} onPick={applyPreset} />
        <AdjustmentsPanel
          adj={adj}
          onChange={(next) => {
            setAdj(next);
            setActivePresetId(null);
          }}
          onReset={reset}
          onExport={() => toast.success("Export queued", { description: `${photo.title} • ${presets.length} presets available` })}
        />
        <RightRail />
      </div>
      <Toaster />
    </div>
  );
}
