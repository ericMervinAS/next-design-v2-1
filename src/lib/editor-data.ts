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
  { id: "px-1", name: "Cinematic", group: "Protone proX", adj: { contrast: 35, shadow: -30, highlight: -20, saturation: -8, temperature: -10 } },
  { id: "px-2", name: "Warm Sunset", group: "Protone proX", adj: { temperature: 60, tint: 20, saturation: 30, exposure: 15 } },
  { id: "px-3", name: "Cool Mist", group: "Protone proX", adj: { temperature: -40, clarity: -10, highlight: 20, saturation: -5 } },
  { id: "px-4", name: "Bold B&W", group: "Protone proX", adj: { saturation: -100, contrast: 40, clarity: 30 } },
  { id: "px-5", name: "Sunlit Glow", group: "Protone proX", adj: { exposure: 25, temperature: 30, highlight: 15, vibrancy: 25 } },
];

// Curated Unsplash travel/mountain photos (free to hotlink)
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

// Translate adjustments to CSS filter
export function adjToFilter(a: Adjustments): string {
  // exposure -100..100 -> brightness 0.5..1.5
  const brightness = 1 + a.exposure / 200;
  // contrast -100..100 -> 0.5..1.5
  const contrast = 1 + a.contrast / 200;
  // saturation -100..100 -> 0..2
  const saturate = 1 + a.saturation / 100;
  // tint shifts hue slightly
  const hue = (a.tint / 100) * 30 + (a.temperature / 100) * -10;
  return `brightness(${brightness}) contrast(${contrast}) saturate(${saturate}) hue-rotate(${hue}deg)`;
}

// Temperature/tint also overlay color wash
export function adjToOverlay(a: Adjustments): { color: string; opacity: number } {
  // Warm (positive temp) => orange wash, cool => blue wash
  const t = a.temperature;
  const tn = a.tint;
  let r = 0, g = 0, b = 0;
  if (t >= 0) { r = 255; g = 160; b = 60; } else { r = 60; g = 140; b = 255; }
  // Tint adds magenta (+) or green (-)
  if (tn >= 0) { r = Math.round((r + 220) / 2); b = Math.round((b + 180) / 2); }
  else { g = Math.round((g + 220) / 2); }
  const opacity = (Math.abs(t) + Math.abs(tn)) / 600; // subtle
  return { color: `rgb(${r}, ${g}, ${b})`, opacity };
}

// Clarity / shadow / highlight approximated with extra contrast layer
export function adjToSecondaryFilter(a: Adjustments): string {
  const clarity = 1 + a.clarity / 300;
  const sat2 = 1 + a.vibrancy / 200;
  return `contrast(${clarity}) saturate(${sat2})`;
}
