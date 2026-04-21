

## Make all sliders actually affect the photo

The slider state IS updating (verified in session replay — values change as you drag). The problem is the image doesn't visibly respond because most adjustments in `src/lib/editor-data.ts` either map to filters too weakly or aren't applied at all (`shadow`, `highlight`, `whites`, `blacks`, `sharpen` are completely unused).

I'll rewrite the adjustment-to-CSS pipeline so every one of the 12 sliders produces a clearly visible change on the photo, then verify by dragging in the preview.

### What each slider will do

| Slider | Effect on the image |
|---|---|
| Exposure | Brightness 0.4 → 1.8 (much wider range) |
| Contrast | Contrast 0.5 → 1.6 |
| Shadow | Lifts/crushes dark tones via a black radial overlay with screen/multiply blend |
| Highlight | Lifts/crushes bright tones via a white overlay with screen/multiply blend |
| Whites | Brightness boost + contrast lift on the bright end |
| Blacks | Black-level offset via dark overlay opacity |
| Clarity | Local contrast: contrast multiplier + drop-shadow micro-edge |
| Sharpen | CSS `filter: contrast()` + a sharp `drop-shadow(0 0 0.3px)` stack for crisp edges |
| Saturation | saturate() 0 → 2.5 (full desaturation to oversaturation) |
| Vibrancy | Secondary saturate layer + slight contrast |
| Tint | hue-rotate ±60° + magenta/green overlay wash |
| Temperature | hue-rotate ±25° + strong orange (warm) / blue (cool) overlay |

### Technical changes

1. **`src/lib/editor-data.ts`** — rewrite `adjToFilter`, `adjToOverlay`, `adjToSecondaryFilter`, plus add a new `adjToShadowHighlightLayers()` helper that returns up to 3 overlay layer descriptors (color, blend mode, opacity) for shadow/highlight/blacks/whites.

2. **`src/components/editor/PhotoCanvas.tsx`** — render the new overlay layers as stacked absolutely-positioned divs above the `<img>`, each with its own `mix-blend-mode` (`multiply` for darkening, `screen` for lightening). Apply the primary filter to the `<img>` and the secondary filter to the wrapper.

3. **`src/components/editor/PresetThumb.tsx`** — use the same combined filter so preset previews keep matching the live canvas.

4. No changes to the slider component itself — it already works.

### Verification

After the edit I'll open the preview, drag each slider group, and confirm visible change on the photo (especially shadow / highlight / blacks / whites / sharpen which currently do nothing).

