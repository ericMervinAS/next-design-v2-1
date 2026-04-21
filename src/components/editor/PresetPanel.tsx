import { Plus, MoreVertical } from "lucide-react";
import { presets, type Preset } from "@/lib/editor-data";
import { PresetThumb } from "./PresetThumb";

export function PresetPanel({
  photoUrl,
  activePresetId,
  onPick,
}: {
  photoUrl: string;
  activePresetId: string | null;
  onPick: (p: Preset) => void;
}) {
  const groups = Array.from(new Set(presets.map((p) => p.group)));
  return (
    <div className="flex h-full w-[180px] flex-col border-r border-border bg-panel">
      <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
        <button className="text-muted-foreground hover:text-foreground">
          <Plus className="h-4 w-4" />
        </button>
        <span className="text-[13px] font-medium">Preset</span>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
      <div className="scroll-thin flex-1 overflow-y-auto px-3 py-3">
        {groups.map((g) => (
          <div key={g} className="mb-4">
            <div className="mb-2 text-center text-[12px] font-medium">
              {g === "Top AI pics" ? (
                <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-violet-400 bg-clip-text text-transparent">
                  Top AI pics
                </span>
              ) : (
                <span className="text-muted-foreground">{g}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {presets
                .filter((p) => p.group === g)
                .map((p) => (
                  <PresetThumb
                    key={p.id}
                    preset={p}
                    photoUrl={photoUrl}
                    active={activePresetId === p.id}
                    onClick={() => onPick(p)}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
