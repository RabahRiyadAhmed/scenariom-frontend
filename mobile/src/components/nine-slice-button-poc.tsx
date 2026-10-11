import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

/**
 * Proof of concept only: NOT wired into ThemeDefinition or the database yet.
 *
 * React Native has no CSS `border-image`, so we simulate 9-slice by drawing
 * nine separate copies of the source SVG. Each copy uses a restricted viewBox
 * (instead of a clipPath) to only show one slice of the original 128x128 artwork.
 * `preserveAspectRatio="none"` then stretches the edges and center as expected.
 *
 * The source SVG is an octagon with 26px decorative corners; the flat middle
 * runs from 26 to 102 on both axes.
 */
const CORNER = 26;
const SOURCE = 128;

const defs = `
  <defs>
    <linearGradient id="frameGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#9AAABB"/>
      <stop offset="40%" stop-color="#5A6B7E"/>
      <stop offset="100%" stop-color="#2A3848"/>
    </linearGradient>
    <linearGradient id="faceGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2E5090"/>
      <stop offset="100%" stop-color="#152B52"/>
    </linearGradient>
    <linearGradient id="hlGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.0"/>
    </linearGradient>
  </defs>
`;

const shapes = `
  <polygon points="26,8 102,8 120,26 120,102 102,120 26,120 8,102 8,26" fill="url(#frameGrad)"/>
  <polygon points="31,13 97,13 115,31 115,97 97,115 31,115 13,97 13,31" fill="url(#faceGrad)"/>
  <polygon points="31,13 97,13 115,31 115,64 13,64 13,31" fill="url(#hlGrad)"/>
`;

function sliceXml(x: number, y: number, w: number, h: number) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${w} ${h}" preserveAspectRatio="none">
${defs}
${shapes}
</svg>`;
}

const mid = SOURCE - CORNER * 2;
const slices = {
  topLeft: sliceXml(0, 0, CORNER, CORNER),
  top: sliceXml(CORNER, 0, mid, CORNER),
  topRight: sliceXml(SOURCE - CORNER, 0, CORNER, CORNER),
  left: sliceXml(0, CORNER, CORNER, mid),
  center: sliceXml(CORNER, CORNER, mid, mid),
  right: sliceXml(SOURCE - CORNER, CORNER, CORNER, mid),
  bottomLeft: sliceXml(0, SOURCE - CORNER, CORNER, CORNER),
  bottom: sliceXml(CORNER, SOURCE - CORNER, mid, CORNER),
  bottomRight: sliceXml(SOURCE - CORNER, SOURCE - CORNER, CORNER, CORNER),
};

function Slice({ name, w, h }: { name: keyof typeof slices; w: number; h: number }) {
  return <SvgXml xml={slices[name]} width={w} height={h} preserveAspectRatio="none" />;
}

function NineSliceButton({ label, width, height, disabled }: { label: string; width: number; height: number; disabled?: boolean }) {
  // Clamp rendered corner size so it never overlaps when the target is short.
  const corner = Math.max(8, Math.min(CORNER, Math.floor(width / 2) - 1, Math.floor(height / 2) - 1));
  const middleWidth = Math.max(0, width - corner * 2);
  const middleHeight = Math.max(0, height - corner * 2);

  return (
    <View style={{ width, height, opacity: disabled ? 0.55 : 1, overflow: "hidden" }}>
      <View style={{ flexDirection: "row", height: corner }}>
        <Slice name="topLeft" w={corner} h={corner} />
        <Slice name="top" w={middleWidth} h={corner} />
        <Slice name="topRight" w={corner} h={corner} />
      </View>
      <View style={{ flexDirection: "row", height: middleHeight }}>
        <Slice name="left" w={corner} h={middleHeight} />
        <Slice name="center" w={middleWidth} h={middleHeight} />
        <Slice name="right" w={corner} h={middleHeight} />
      </View>
      <View style={{ flexDirection: "row", height: corner }}>
        <Slice name="bottomLeft" w={corner} h={corner} />
        <Slice name="bottom" w={middleWidth} h={corner} />
        <Slice name="bottomRight" w={corner} h={corner} />
      </View>
      <View pointerEvents="none" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center" }}>
        <Text className="px-3 text-center font-semibold text-white">{label}</Text>
      </View>
    </View>
  );
}

const sizes = [
  { width: 128, height: 48 },
  { width: 200, height: 48 },
  { width: 300, height: 64 },
];

export function NineSliceButtonPoc() {
  const [pressed, setPressed] = useState<string | null>(null);
  return (
    <View className="gap-5">
      {sizes.map(({ width, height }) => {
        const key = `${width}x${height}`;
        return (
          <View key={key} className="gap-2">
            <Text className="text-xs font-semibold uppercase text-muted" style={{ writingDirection: "ltr" }}>{width}×{height}</Text>
            <View className="flex-row flex-wrap items-center gap-4">
              <View className="gap-1">
                <Pressable accessibilityRole="button" onPressIn={() => setPressed(key)} onPressOut={() => setPressed(null)}>
                  <View style={pressed === key ? { transform: [{ scale: 0.97 }] } : {}}>
                    <NineSliceButton label="Continuer" width={width} height={height} />
                  </View>
                </Pressable>
                <Text className="text-center text-[10px] text-muted">↑ appuie-moi</Text>
              </View>
              <View className="gap-1"><NineSliceButton label="Aperçu disabled" width={width} height={height} disabled /><Text className="text-center text-[10px] text-muted">réel disabled</Text></View>
            </View>
          </View>
        );
      })}
    </View>
  );
}
