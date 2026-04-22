import type { CSSProperties } from "react";

type Props = {
  name: string;
  className?: string;
  size?: number; // px
  style?: CSSProperties;
  title?: string;
};

/**
 * Material Icons (classic) wrapper.
 * Font is loaded globally in src/routes/__root.tsx.
 */
export function MIcon({ name, className, size = 18, style, title }: Props) {
  return (
    <span
      className={`material-icons ${className ?? ""}`}
      style={{ fontSize: size, ...style }}
      aria-hidden={title ? undefined : true}
      title={title}
    >
      {name}
    </span>
  );
}
