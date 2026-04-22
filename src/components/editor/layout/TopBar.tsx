import { MIcon } from "../shared/MIcon";

/**
 * Floating TopBar — sits on top of the canvas. Each control is its own
 * pill in `#1c1c1c`, separated with small gaps. No full-width bar background.
 * Matches Figma node 335:103413.
 */
export function TopBar({
  title,
  rating = 2,
  zoom = 1,
}: {
  title: string;
  rating?: number;
  /** Current canvas zoom. `1` = 100%. */
  zoom?: number;
}) {
  const pillBg = "#1c1c1c";
  const textColor = "#ababab";
  const fontFamily = "'Google Sans Flex', 'Google Sans', sans-serif";

  return (
    <div
      className="pointer-events-none flex w-full items-center gap-3 pl-3 pr-3 pt-2 select-none"
      style={{ fontFamily }}
    >
      {/* Back button — circular pill */}
      <button
        className="pointer-events-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#e2e2e2] hover:opacity-90"
        style={{ backgroundColor: pillBg }}
        title="Back"
      >
        <MIcon name="chevron_left" size={16} />
      </button>

      {/* Title pill — info icon + title + star rating + flag */}
      <div
        className="pointer-events-auto flex h-[34px] shrink-0 items-center gap-2 rounded-full px-2"
        style={{ backgroundColor: pillBg }}
      >
        <MIcon name="info" size={16} style={{ color: textColor }} />
        <span
          className="text-[13px] leading-4"
          style={{ color: textColor }}
        >
          {title}
        </span>
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <MIcon
              key={i}
              name={i < rating ? "star" : "star_border"}
              size={16}
              style={{ color: textColor }}
            />
          ))}
        </div>
        <MIcon name="flag" size={16} style={{ color: textColor }} />
      </div>

      {/* Flex spacer pushes the right cluster to the far right */}
      <div className="flex-1" />

      {/* Right cluster — filter, filter_list, zoom, compare */}
      <div className="pointer-events-auto flex shrink-0 items-center gap-1.5">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#e2e2e2] hover:opacity-90"
          style={{ backgroundColor: pillBg }}
          title="Filter"
        >
          <MIcon name="filter_alt" size={20} />
        </button>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#e2e2e2] hover:opacity-90"
          style={{ backgroundColor: pillBg }}
          title="Sort"
        >
          <MIcon name="filter_list" size={20} />
        </button>

        {/* Zoom pill: "Fit" | "100% ▲" */}
        <div
          className="flex h-9 items-center gap-3 rounded-full px-3"
          style={{ backgroundColor: pillBg }}
        >
          <span className="text-[13px] leading-4" style={{ color: textColor }}>
            Fit
          </span>
          <span
            className="block h-[18px] w-px"
            style={{ backgroundColor: "rgba(226, 226, 226, 0.2)" }}
          />
          <div className="flex items-center gap-1">
            <span
              className="tabular-nums text-[13px] leading-4"
              style={{ color: textColor }}
            >
              {Math.round(zoom * 100)}%
            </span>
            <MIcon name="arrow_drop_up" size={16} style={{ color: textColor }} />
          </div>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#e2e2e2] hover:opacity-90"
          style={{ backgroundColor: pillBg }}
          title="Compare"
        >
          <MIcon name="compare" size={16} />
        </button>
      </div>
    </div>
  );
}
