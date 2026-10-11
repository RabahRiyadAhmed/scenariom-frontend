"use client";

import { apiUrl } from "@/components/theme-runtime-provider";

/**
 * Proof of concept only: this is NOT wired into ThemeDefinition or the database yet.
 * It manually describes the geometry of one asset (btn_notched-corner_flat-navy_01_01.svg)
 * to validate whether a drawn SVG shape can become a real responsive 9-slice button, using
 * the browser's native `border-image` slicing instead of stretching the whole image.
 *
 * The source SVG is a 128x128 octagon with 18px diagonal corner notches, an 8px outer frame
 * and a face inset by 5px more. The flat (non-notched) part of each edge runs from 26px to
 * 102px, so 26px on every side is the amount of the image that must stay fixed for the
 * corners to keep their shape while the middle stretches.
 */
const notchedNavySlice = {
  asset: "btn_notched-corner_flat-navy_01_01.svg",
  viewBox: { width: 128, height: 128 },
  // Source-image pixels to preserve at each corner/edge (fed to border-image-slice).
  slice: { top: 26, right: 26, bottom: 26, left: 26 },
  // Where text is safe to sit without touching the frame, expressed as CSS padding.
  contentPadding: { top: 10, right: 20, bottom: 10, left: 20 },
};

const sizes = [
  { width: 128, height: 48, borderWidth: 16 },
  { width: 200, height: 48, borderWidth: 16 },
  { width: 300, height: 64, borderWidth: 22 },
];

function NineSliceButton({
  label,
  width,
  height,
  borderWidth,
  look,
  disabled,
}: {
  label: string;
  width: number;
  height: number;
  borderWidth: number;
  look?: "hover" | "active";
  disabled?: boolean;
}) {
  const { slice, contentPadding } = notchedNavySlice;
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={label}
      className={`inline-flex select-none items-center justify-center whitespace-nowrap border-solid bg-transparent font-semibold text-white transition disabled:cursor-not-allowed disabled:grayscale disabled:opacity-50 ${
        look === "hover" ? "brightness-110" : look === "active" ? "scale-[0.97] brightness-90" : "hover:brightness-110 active:scale-[0.97] active:brightness-90"
      }`}
      style={{
        width,
        height,
        borderWidth,
        borderImageSource: `url("${apiUrl}/assets/custom/button/${notchedNavySlice.asset}")`,
        borderImageSlice: `${slice.top} ${slice.right} ${slice.bottom} ${slice.left} fill`,
        borderImageRepeat: "stretch",
        paddingTop: contentPadding.top,
        paddingRight: contentPadding.right,
        paddingBottom: contentPadding.bottom,
        paddingLeft: contentPadding.left,
      }}
    >
      {label}
    </button>
  );
}

export function NineSliceButtonPoc() {
  return (
    <div className="space-y-5">
      {sizes.map(({ width, height, borderWidth }) => (
        <div key={`${width}x${height}`} className="space-y-2">
          <p className="text-xs font-semibold uppercase text-muted">
            {width}×{height}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="space-y-1"><NineSliceButton label="Continuer" width={width} height={height} borderWidth={borderWidth} /><p className="text-center text-[10px] text-muted">↑ survole/clique-moi</p></div>
            <div className="space-y-1"><NineSliceButton label="Aperçu hover" width={width} height={height} borderWidth={borderWidth} look="hover" /><p className="text-center text-[10px] text-muted">figé (pas interactif)</p></div>
            <div className="space-y-1"><NineSliceButton label="Aperçu active" width={width} height={height} borderWidth={borderWidth} look="active" /><p className="text-center text-[10px] text-muted">figé (pas interactif)</p></div>
            <div className="space-y-1"><NineSliceButton label="Disabled" width={width} height={height} borderWidth={borderWidth} disabled /><p className="text-center text-[10px] text-muted">réel disabled</p></div>
          </div>
        </div>
      ))}
    </div>
  );
}
