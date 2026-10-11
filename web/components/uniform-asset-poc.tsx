"use client";

import { apiUrl } from "@/components/theme-runtime-provider";

// POC only, not wired into ThemeDefinition/DB.
//
// These buttons are built FROM the actual SVG pixels, not an icon glued next to a generic
// button: each circular asset is cut into its real left/right halves (a crop of the source
// artwork, via a CSS background-position sprite) to form the two rounded ends of a pill, with a
// stretchable middle filled by a gradient sampled from that same asset's own colors. Wax seal
// keeps its central medallion as a real (uncropped, unstretched) piece of the artwork layered
// on top of an extensible frame built the same way, so the emblem itself is never distorted.
const SOURCE = 128;

// Crops a `sw x sh` source-pixel region at (sx, sy) and renders it at `displayW x displayH`, by
// rendering the *whole* asset as an oversized background image and shifting it with
// background-position so only that region shows through the fixed-size box.
function CroppedAsset({ file, sx, sy, sw, sh, displayW, displayH }: { file: string; sx: number; sy: number; sw: number; sh: number; displayW: number; displayH: number }) {
  const scale = displayW / sw;
  const full = SOURCE * scale;
  return (
    <span
      aria-hidden
      className="block shrink-0 overflow-hidden"
      style={{
        width: displayW,
        height: displayH,
        backgroundImage: `url("${apiUrl}/assets/custom/button/${file}")`,
        backgroundSize: `${full}px ${full}px`,
        backgroundPosition: `${-sx * scale}px ${-sy * scale}px`,
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

// Pill built from a round asset's real left/right halves + a gradient body sampled from its own
// palette (see each SVG's <linearGradient> stops).
function CapsuleButton({ file, label, bodyColors, borderColor, height = 56 }: { file: string; label: string; bodyColors: [string, string]; borderColor: string; height?: number }) {
  const cap = height / 2;
  return (
    <button type="button" dir="ltr" className="inline-flex items-stretch overflow-hidden border" style={{ height, borderRadius: height / 2, borderColor }}>
      <CroppedAsset file={file} sx={0} sy={0} sw={SOURCE / 2} sh={SOURCE} displayW={cap} displayH={height} />
      <span className="flex items-center px-3.5 font-bold text-white" style={{ background: `linear-gradient(${bodyColors[0]}, ${bodyColors[1]})` }} dir="ltr">
        {label}
      </span>
      <CroppedAsset file={file} sx={SOURCE / 2} sy={0} sw={SOURCE / 2} sh={SOURCE} displayW={cap} displayH={height} />
    </button>
  );
}

// Wax seal's central emblem IS the design (its teeth reach almost to the edge, ~x/y 20-108 out
// of 128), so there is no clean decoration-free strip left to use as fixed end caps: any crop
// narrow enough to avoid the emblem duplicates its outer points instead (that's exactly the
// artifact from the previous version). Per the reference notes, this asset stays `uniform`
// (proportional, not extensible) rather than horizontal-slice - a real, clickable, near-square
// button showing the whole seal, with the label constrained to its actual safe content area
// (18,18,92,92 in source px) so it wraps/shrinks instead of spilling onto the frame.
function WaxSealButton({ label, size = 88 }: { label: string; size?: number }) {
  const file = "btn_square_wax-seal_01_01.svg";
  const contentArea = { x: 18, y: 18, width: 92, height: 92 };
  const scale = size / SOURCE;
  const safe = { left: contentArea.x * scale, top: contentArea.y * scale, width: contentArea.width * scale, height: contentArea.height * scale };
  return (
    <button
      type="button"
      dir="ltr"
      className="relative inline-block bg-contain bg-center bg-no-repeat"
      style={{ width: size, height: size, backgroundImage: `url("${apiUrl}/assets/custom/button/${file}")` }}
    >
      <span
        dir="ltr"
        className="absolute line-clamp-2 flex items-center justify-center overflow-hidden text-center font-bold leading-tight text-white"
        style={{ left: safe.left, top: safe.top, width: safe.width, height: safe.height, fontSize: Math.max(9, size * 0.14), textShadow: "0 1px 3px rgba(0,0,0,0.65)" }}
      >
        {label}
      </span>
    </button>
  );
}

export function UniformAssetPoc() {
  return (
    <div className="flex flex-col items-start gap-4">
      <CapsuleButton file="btn_circle_aurora-glass_01_01.svg" label="Aurora glass" bodyColors={["#241452", "#0D0820"]} borderColor="#D4A200" />
      <CapsuleButton file="btn_circle_blue-silver_02.svg" label="Blue silver" bodyColors={["#6DD5F7", "#0D6EAD"]} borderColor="#909090" />
      <CapsuleButton file="btn_circle_pastel-coral_01.svg" label="Pastel coral" bodyColors={["#FFB8A8", "#FFAA98"]} borderColor="#C06050" />
      <div className="flex flex-wrap items-end gap-4">
        <WaxSealButton label="Créer" />
        <WaxSealButton label="Créer un nouveau chapitre" size={112} />
      </div>
    </div>
  );
}
