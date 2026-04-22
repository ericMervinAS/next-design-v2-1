export type Adjustments = {
  exposure: number;
  contrast: number;
  shadow: number;
  highlight: number;
  whites: number;
  blacks: number;
  clarity: number;
  sharpen: number;
  saturation: number;
  vibrancy: number;
  tint: number;
  temperature: number;
};

export const defaultAdjustments: Adjustments = {
  exposure: 0,
  contrast: 0,
  shadow: 0,
  highlight: 0,
  whites: 0,
  blacks: 0,
  clarity: 0,
  sharpen: 0,
  saturation: 0,
  vibrancy: 0,
  tint: 0,
  temperature: 0,
};

export type Preset = { id: string; name: string; group: string; adj: Partial<Adjustments> };

export const presets: Preset[] = [
  { id: "ai-1", name: "Auto AI", group: "Top AI pics", adj: { exposure: 15, contrast: 10, saturation: 12, shadow: 20 } },
  { id: "ai-2", name: "Tokyo M4", group: "Top AI pics", adj: { exposure: 100, contrast: -5, shadow: -24, highlight: -24, whites: -12, clarity: 100, sharpen: -5, saturation: 45, tint: -28, temperature: 54 } },
  { id: "ai-3", name: "Golden Hour", group: "Top AI pics", adj: { exposure: 20, temperature: 40, saturation: 25, highlight: -30, shadow: 15 } },
  { id: "ai-4", name: "Crisp Blue", group: "Top AI pics", adj: { contrast: 25, clarity: 40, temperature: -30, saturation: 18 } },
  { id: "ai-5", name: "Soft Pastel", group: "Top AI pics", adj: { exposure: 10, contrast: -15, saturation: -10, highlight: -20 } },
  { id: "ai-6", name: "Mountain Pop", group: "Top AI pics", adj: { clarity: 60, contrast: 30, shadow: 25, vibrancy: 40 } },
  { id: "ai-7", name: "Faded Film", group: "Top AI pics", adj: { contrast: -25, blacks: 20, saturation: -15, temperature: 10 } },

  { id: "sp-1", name: "Fresh Bloom", group: "Spring one", adj: { exposure: 12, vibrancy: 35, saturation: 15, temperature: 10 } },
  { id: "sp-2", name: "Pastel Morning", group: "Spring one", adj: { exposure: 18, contrast: -10, saturation: -5, highlight: -15, tint: 8 } },
  { id: "sp-3", name: "Soft Meadow", group: "Spring one", adj: { clarity: -15, vibrancy: 25, shadow: 12, temperature: 15 } },

  { id: "rf-1", name: "Deep Canopy", group: "Rain forest", adj: { saturation: 20, vibrancy: 30, shadow: 25, temperature: -15, tint: 10 } },
  { id: "rf-2", name: "Moss Glow", group: "Rain forest", adj: { exposure: -8, contrast: 20, saturation: 15, highlight: -25, temperature: -10 } },
  { id: "rf-3", name: "Wet Leaf", group: "Rain forest", adj: { clarity: 30, vibrancy: 40, contrast: 15, tint: 5 } },

  { id: "tl-1", name: "Tokyo M4", group: "Tokyo lands", adj: { exposure: 100, contrast: -5, shadow: -24, highlight: -24, whites: -12, clarity: 100, saturation: 45, tint: -28, temperature: 54 } },
  { id: "tl-2", name: "Neon Alley", group: "Tokyo lands", adj: { contrast: 30, saturation: 25, shadow: -20, vibrancy: 35, temperature: -20 } },
  { id: "tl-3", name: "Subway Blue", group: "Tokyo lands", adj: { temperature: -35, saturation: 10, contrast: 20, blacks: -15 } },

  { id: "px-1", name: "Cinematic", group: "Protone proX", adj: { contrast: 35, shadow: -30, highlight: -20, saturation: -8, temperature: -10 } },
  { id: "px-2", name: "Warm Sunset", group: "Protone proX", adj: { temperature: 60, tint: 20, saturation: 30, exposure: 15 } },
  { id: "px-3", name: "Cool Mist", group: "Protone proX", adj: { temperature: -40, clarity: -10, highlight: 20, saturation: -5 } },
  { id: "px-4", name: "Bold B&W", group: "Protone proX", adj: { saturation: -100, contrast: 40, clarity: 30 } },
  { id: "px-5", name: "Sunlit Glow", group: "Protone proX", adj: { exposure: 25, temperature: 30, highlight: 15, vibrancy: 25 } },
];

export const photos = [
  { id: "p1", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=85", title: "Mountain ridge at dawn" },
  { id: "p2", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85", title: "Misty peaks" },
  { id: "p3", url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=85", title: "Snowy summit" },
  { id: "p4", url: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1600&q=85", title: "Hiker silhouette" },
  { id: "p5", url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1600&q=85", title: "Alpine sunrise" },
  { id: "p6", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=85", title: "Lake reflection" },
  { id: "p7", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=85", title: "Forest light" },
  { id: "p8", url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1600&q=85", title: "Valley overlook" },
  { id: "p9", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=85", title: "Cloud sea" },
  { id: "p10", url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&q=85", title: "Pine forest" },
];

// Primary filter applied to the <img>. Combines all adjustments that map cleanly
// to CSS `filter` functions so every slider produces a visible change.
export function adjToFilter(a: Adjustments): string {
  // Exposure -100..100 -> brightness 0.4..1.8 (wide, very visible range)
  const exposure = 1 + (a.exposure / 100) * (a.exposure >= 0 ? 0.8 : 0.6);
  // Whites also lifts overall brightness on the bright end
  const whitesB = 1 + (a.whites / 100) * 0.25;
  // Blacks crushes overall brightness slightly downward when negative
  const blacksB = 1 + (a.blacks / 100) * -0.2;
  const brightness = exposure * whitesB * blacksB;

  // Contrast -100..100 -> 0.5..1.6, plus clarity & sharpen pile on micro-contrast
  const contrast = (1 + a.contrast / 200) * (1 + a.clarity / 250) * (1 + a.sharpen / 300);

  // Saturation 0..2.5, vibrancy nudges it further
  const saturate = Math.max(0, 1 + a.saturation / 100) * (1 + a.vibrancy / 250);

  // Temperature & tint produce real hue shifts so the image visibly warms/cools.
  const hue = (a.temperature / 100) * 25 + (a.tint / 100) * 60;

  return `brightness(${brightness.toFixed(3)}) contrast(${contrast.toFixed(3)}) saturate(${saturate.toFixed(3)}) hue-rotate(${hue.toFixed(2)}deg)`;
}

// Secondary filter on wrapper — a sharpen "edge" via drop-shadow stack.
export function adjToSecondaryFilter(a: Adjustments): string {
  const parts: string[] = [];
  if (a.sharpen !== 0) {
    const o = Math.min(1, Math.abs(a.sharpen) / 100);
    parts.push(`drop-shadow(0 0 0.4px rgba(0,0,0,${o.toFixed(3)}))`);
    parts.push(`drop-shadow(0 0 0.4px rgba(255,255,255,${(o * 0.5).toFixed(3)}))`);
  }
  if (a.clarity !== 0) {
    const o = Math.min(1, Math.abs(a.clarity) / 120);
    parts.push(`contrast(${(1 + a.clarity / 300).toFixed(3)})`);
    parts.push(`drop-shadow(0 0 1px rgba(0,0,0,${(o * 0.4).toFixed(3)}))`);
  }
  return parts.join(" ") || "none";
}

// Layered overlays for shadow / highlight / blacks / whites / temperature / tint.
// Each layer paints over the image with a blend mode for a tonal/wash effect.
export type OverlayLayer = {
  color: string;
  opacity: number;
  blend: "multiply" | "screen" | "overlay" | "soft-light" | "color";
};

export function adjToOverlayLayers(a: Adjustments): OverlayLayer[] {
  const layers: OverlayLayer[] = [];

  // Shadow: positive lifts shadows (screen white), negative crushes (multiply black)
  if (a.shadow > 0) {
    layers.push({ color: "rgb(120,120,140)", opacity: (a.shadow / 100) * 0.35, blend: "screen" });
  } else if (a.shadow < 0) {
    layers.push({ color: "rgb(20,20,30)", opacity: (-a.shadow / 100) * 0.45, blend: "multiply" });
  }

  // Highlight: positive boosts highlights (screen), negative tames them (multiply)
  if (a.highlight > 0) {
    layers.push({ color: "rgb(255,250,235)", opacity: (a.highlight / 100) * 0.3, blend: "screen" });
  } else if (a.highlight < 0) {
    layers.push({ color: "rgb(180,170,150)", opacity: (-a.highlight / 100) * 0.4, blend: "multiply" });
  }

  // Whites: lift bright end with overlay white
  if (a.whites !== 0) {
    layers.push({
      color: a.whites > 0 ? "rgb(255,255,255)" : "rgb(40,40,40)",
      opacity: (Math.abs(a.whites) / 100) * 0.25,
      blend: "overlay",
    });
  }

  // Blacks: deepen or lift the black point with soft-light black/white
  if (a.blacks !== 0) {
    layers.push({
      color: a.blacks > 0 ? "rgb(255,255,255)" : "rgb(0,0,0)",
      opacity: (Math.abs(a.blacks) / 100) * 0.35,
      blend: "soft-light",
    });
  }

  // Temperature wash: warm orange or cool blue
  if (a.temperature !== 0) {
    layers.push({
      color: a.temperature > 0 ? "rgb(255,150,40)" : "rgb(40,120,255)",
      opacity: (Math.abs(a.temperature) / 100) * 0.3,
      blend: "soft-light",
    });
  }

  // Tint wash: magenta or green
  if (a.tint !== 0) {
    layers.push({
      color: a.tint > 0 ? "rgb(220,60,180)" : "rgb(60,200,120)",
      opacity: (Math.abs(a.tint) / 100) * 0.25,
      blend: "soft-light",
    });
  }

  return layers;
}
