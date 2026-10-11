import { Text, View } from "react-native";
import { SvgUri, Svg, Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import { apiUrl } from "@/contexts/theme-runtime-context";

// POC only, not wired into ThemeDefinition/DB.
//
// These buttons are built FROM the actual SVG pixels, not an icon glued next to a generic
// button: each circular asset is cut into its real left/right halves (a crop of the source
// artwork, not a copy) to form the two rounded ends of a pill, with a stretchable middle
// filled by a gradient sampled from that same asset's own colors. Wax seal keeps its central
// medallion as a real (uncropped, unstretched) piece of the artwork layered on top of an
// extensible frame built the same way, so the emblem itself is never distorted.
const SOURCE = 128;

// Crops a `sw x sh` source-pixel region at (sx, sy) from the asset and renders it at
// `displayW x displayH`, by rendering the *whole* asset at the scale that region requires and
// clipping everything else away - the RN equivalent of a CSS background-position sprite crop.
function CroppedAsset({ file, sx, sy, sw, sh, displayW, displayH }: { file: string; sx: number; sy: number; sw: number; sh: number; displayW: number; displayH: number }) {
  const scale = displayW / sw;
  const full = SOURCE * scale;
  return (
    <View style={{ width: displayW, height: displayH, overflow: "hidden" }}>
      <SvgUri width={full} height={full} uri={`${apiUrl}/assets/custom/button/${file}`} style={{ position: "absolute", left: -sx * scale, top: -sy * scale }} />
    </View>
  );
}

function BodyFill({ colors }: { colors: [string, string] }) {
  return (
    <Svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
      <Defs>
        <LinearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor={colors[0]} />
          <Stop offset="100%" stopColor={colors[1]} />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#body)" />
    </Svg>
  );
}

// Pill built from a round asset's real left/right halves + a gradient body sampled from its
// own palette (see each SVG's <linearGradient> stops).
function CapsuleButton({ file, label, bodyColors, borderColor, height = 56 }: { file: string; label: string; bodyColors: [string, string]; borderColor: string; height?: number }) {
  const cap = height / 2;
  return (
    <View style={{ flexDirection: "row", height, borderRadius: height / 2, overflow: "hidden", borderWidth: 1, borderColor }}>
      <CroppedAsset file={file} sx={0} sy={0} sw={SOURCE / 2} sh={SOURCE} displayW={cap} displayH={height} />
      <View style={{ height, justifyContent: "center" }}>
        <BodyFill colors={bodyColors} />
        <Text numberOfLines={1} className="px-3.5 font-bold text-white" style={{ writingDirection: "ltr" }}>{label}</Text>
      </View>
      <CroppedAsset file={file} sx={SOURCE / 2} sy={0} sw={SOURCE / 2} sh={SOURCE} displayW={cap} displayH={height} />
    </View>
  );
}

// Wax seal's central emblem IS the design (its teeth reach almost to the edge, ~x/y 20-108 out
// of 128), so there is no clean decoration-free strip left to use as fixed end caps: any crop
// narrow enough to avoid the emblem duplicates its outer points instead (that's exactly the
// artifact from the previous version). Per the reference notes, this asset stays `uniform`
// (proportional, not extensible) rather than horizontal-slice - a real, tappable, near-square
// button showing the whole seal, with the label constrained to its actual safe content area
// (18,18,92,92 in source px) so it wraps/shrinks instead of spilling onto the frame.
function WaxSealButton({ label, size = 88 }: { label: string; size?: number }) {
  const file = "btn_square_wax-seal_01_01.svg";
  const contentArea = { x: 18, y: 18, width: 92, height: 92 };
  const scale = size / SOURCE;
  const safe = { left: contentArea.x * scale, top: contentArea.y * scale, width: contentArea.width * scale, height: contentArea.height * scale };
  return (
    <View style={{ width: size, height: size }}>
      <SvgUri width={size} height={size} uri={`${apiUrl}/assets/custom/button/${file}`} style={{ position: "absolute" }} />
      <View style={{ position: "absolute", left: safe.left, top: safe.top, width: safe.width, height: safe.height, alignItems: "center", justifyContent: "center" }}>
        <Text numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.5} className="text-center font-bold text-white" style={{ writingDirection: "ltr", fontSize: Math.max(9, size * 0.14), textShadowColor: "rgba(0,0,0,0.65)", textShadowRadius: 3, textShadowOffset: { width: 0, height: 1 } }}>
          {label}
        </Text>
      </View>
    </View>
  );
}

export function UniformAssetPoc() {
  return (
    <View className="gap-4" style={{ direction: "ltr" }}>
      <CapsuleButton file="btn_circle_aurora-glass_01_01.svg" label="Aurora glass" bodyColors={["#241452", "#0D0820"]} borderColor="#D4A200" />
      <CapsuleButton file="btn_circle_blue-silver_02.svg" label="Blue silver" bodyColors={["#6DD5F7", "#0D6EAD"]} borderColor="#909090" />
      <CapsuleButton file="btn_circle_pastel-coral_01.svg" label="Pastel coral" bodyColors={["#FFB8A8", "#FFAA98"]} borderColor="#C06050" />
      <View className="flex-row flex-wrap items-end gap-4">
        <WaxSealButton label="Créer" />
        <WaxSealButton label="Créer un nouveau chapitre" size={112} />
      </View>
    </View>
  );
}
