import { MIcon } from "../shared/MIcon";

type Props = {
  showPreset: boolean;
  showAdjustments: boolean;
  onTogglePreset: () => void;
  onToggleAdjustments: () => void;
};

export function RightRail({
  showPreset,
  showAdjustments,
  onTogglePreset,
  onToggleAdjustments,
}: Props) {
  // Static tools below the two panel-toggles (non-functional for now).
  const extraTools: { icon: string }[] = [
    { icon: "crop" },
    { icon: "brush" }, // "ink_eraser" in Figma — classic Material Icons uses `brush`
    { icon: "more_horiz" },
  ];

  // Active = solid Surface 1 token (#1c1c1c). Inactive = no background / no
  // border — just the icon, so the selected pill is the only shape visible.
  const activeStyle: React.CSSProperties = {
    backgroundColor: "#1c1c1c",
    color: "#ffffff",
  };
  const inactiveStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    border: "none",
  };

  return (
    <div className="flex h-full w-10 flex-col items-center justify-between">
      <div className="flex flex-col items-center gap-[7px]">
        {/* Preset toggle — sparkle icon */}
        <button
          onClick={onTogglePreset}
          aria-pressed={showPreset}
          title="Presets"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#e2e2e2]"
          style={showPreset ? activeStyle : inactiveStyle}
        >
          <MIcon name="auto_awesome" size={16} />
        </button>

        {/* Adjustments/editing panel toggle — tune icon (big pill when selected) */}
        <button
          onClick={onToggleAdjustments}
          aria-pressed={showAdjustments}
          title="Adjustments"
          className={
            "flex w-10 shrink-0 items-center justify-center text-[#e2e2e2] " +
            (showAdjustments ? "h-[80px] rounded-[20px]" : "h-10 rounded-full")
          }
          style={showAdjustments ? activeStyle : inactiveStyle}
        >
          <MIcon name="tune" size={16} />
        </button>

        {extraTools.map((t, i) => (
          <button
            key={i}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#e2e2e2]"
            style={inactiveStyle}
          >
            <MIcon name={t.icon} size={16} />
          </button>
        ))}
      </div>

      {/* Settings / build_circle docked at bottom */}
      <button
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#e2e2e2]"
        style={inactiveStyle}
      >
        <MIcon name="build_circle" size={20} />
      </button>
    </div>
  );
}
