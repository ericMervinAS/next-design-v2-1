import { useState } from "react";
import { defaultAdjustments, photos, presets, type Adjustments, type Preset } from "@/lib/editor-data";
import { TopBar } from "@/components/editor/layout/TopBar";
import { PresetPanel } from "@/components/editor/panels/presets/PresetPanel";
import { AdjustmentsPanel } from "@/components/editor/panels/adjustments/AdjustmentsPanel";
import { PhotoCanvas } from "@/components/editor/canvas/PhotoCanvas";
import { FilmStrip } from "@/components/editor/layout/FilmStrip";
import { RightRail } from "@/components/editor/layout/RightRail";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  const [activePhotoId, setActivePhotoId] = useState(photos[0].id);
  const [adj, setAdj] = useState<Adjustments>({ ...defaultAdjustments });
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  const [showPreset, setShowPreset] = useState(true);
  const [showAdjustments, setShowAdjustments] = useState(true);

  const [hoverPreset, setHoverPreset] = useState<Preset | null>(null);
  const [zoom, setZoom] = useState(1);

  const photo = photos.find((p) => p.id === activePhotoId)!;
  const displayAdj: Adjustments = hoverPreset
    ? { ...defaultAdjustments, ...hoverPreset.adj }
    : adj;

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
      <div className="relative flex flex-1 overflow-hidden">
        <div className="absolute inset-0">
          <PhotoCanvas url={photo.url} adj={displayAdj} onScaleChange={setZoom} />
        </div>

        <div className="pointer-events-none relative z-10 flex min-w-0 flex-1 flex-col">
          <div className="pointer-events-auto">
            <TopBar title="Travel 2026 bali" rating={2} zoom={zoom} />
          </div>
          <div className="flex-1" />
          <div className="pointer-events-auto min-w-0 overflow-hidden">
            <FilmStrip activeId={activePhotoId} onPick={handlePick} />
          </div>
        </div>

        <div
          className="relative z-10 m-2 flex shrink-0 items-stretch gap-1.5 overflow-hidden rounded-[24px] p-1.5 shadow-2xl"
          style={{
            backgroundColor: "rgba(30, 30, 30, 0.5)",
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
            border: "0.5px solid rgba(255,255,255,0.06)",
          }}
        >
          {showPreset && (
            <PresetPanel
              photoUrl={photo.url}
              activePresetId={activePresetId}
              onPick={applyPreset}
              onHover={setHoverPreset}
            />
          )}
          {showAdjustments && (
            <AdjustmentsPanel
              adj={adj}
              onChange={(next) => {
                setAdj(next);
                setActivePresetId(null);
              }}
              onReset={reset}
              onExport={() =>
                toast.success("Export queued", {
                  description: `${photo.title} • ${presets.length} presets available`,
                })
              }
            />
          )}
          <RightRail
            showPreset={showPreset}
            showAdjustments={showAdjustments}
            onTogglePreset={() => setShowPreset((v) => !v)}
            onToggleAdjustments={() => setShowAdjustments((v) => !v)}
          />
        </div>
      </div>

      <Toaster />
    </div>
  );
}
