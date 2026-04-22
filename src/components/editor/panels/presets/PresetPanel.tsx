import { useState } from "react";
import { MIcon } from "../../shared/MIcon";
import { presets, type Preset } from "@/lib/editor-data";
import { PresetThumb } from "./PresetThumb";

export function PresetPanel({
  photoUrl,
  activePresetId,
  onPick,
  onHover,
}: {
  photoUrl: string;
  activePresetId: string | null;
  onPick: (p: Preset) => void;
  /** Called with the hovered preset, or `null` when the pointer leaves. */
  onHover?: (preset: Preset | null) => void;
}) {
  const groups = Array.from(new Set(presets.map((p) => p.group)));

  // Track which groups are expanded. Default: first group open, rest collapsed
  // (matches the Figma reference where most pills are collapsed).
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    groups.forEach((g, i) => (initial[g] = i === 0));
    return initial;
  });

  const toggle = (g: string) =>
    setOpenGroups((prev) => ({ ...prev, [g]: !prev[g] }));

  return (
    <div
      className="flex h-full w-[140px] flex-col gap-3 overflow-hidden rounded-[20px] p-3"
      style={{
        backgroundColor: "#1c1c1c",
        fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif",
      }}
    >
      {/* Header: add_circle  |  "Preset"  |  more_vert */}
      <div className="flex h-7 w-full shrink-0 items-center justify-between">
        <button className="flex size-4 items-center justify-center text-[#e2e2e2] hover:opacity-80">
          <MIcon name="add_circle" size={16} />
        </button>
        <span className="text-[12px] leading-4 text-[#e2e2e2]">Preset</span>
        <button className="flex size-4 items-center justify-center text-[#e2e2e2] hover:opacity-80">
          <MIcon name="more_vert" size={16} />
        </button>
      </div>

      {/* Scrollable list of collapsible groups */}
      <div className="scroll-thin flex flex-1 flex-col gap-3 overflow-y-auto">
        {groups.map((g) => {
          const items = presets.filter((p) => p.group === g);
          const open = !!openGroups[g];
          return (
            <div
              key={g}
              className="flex w-full shrink-0 flex-col overflow-hidden rounded-[12px]"
            >
              {/* Group label pill — click to expand/collapse */}
              <button
                type="button"
                onClick={() => toggle(g)}
                aria-expanded={open}
                className="flex w-full shrink-0 items-center justify-center py-1.5 transition-colors hover:brightness-125"
                style={{ backgroundColor: "rgba(36, 36, 36, 0.7)" }}
              >
                {g === "Top AI pics" ? (
                  <span
                    className="bg-clip-text text-[13px] leading-4 text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #f07455 0%, #f6cd35 22.6%, #39e3a8 54.3%, #33a4f9 78.4%, #325de7 100%)",
                    }}
                  >
                    Top AI pics
                  </span>
                ) : (
                  <span className="text-[13px] leading-4 text-[#ababab]">{g}</span>
                )}
              </button>

              {/* Thumbnails — rendered only when the group is expanded */}
              {open &&
                items.map((p) => (
                  <PresetThumb
                    key={p.id}
                    preset={p}
                    photoUrl={photoUrl}
                    active={activePresetId === p.id}
                    onClick={() => onPick(p)}
                    onHover={() => onHover?.(p)}
                    onLeave={() => onHover?.(null)}
                  />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
