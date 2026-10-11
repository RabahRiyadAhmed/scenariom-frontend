import { useEffect, useState } from "react";
import { ActivityIndicator, Animated, Pressable, Text, View } from "react-native";
import { UiCard, UiCardBody, UiProgress } from "@scenariom/design-system/ui/native";
import { useUiThemeColors } from "@scenariom/design-system/ui-theme";

type LoadingButtonStyle =
  | "expand-left" | "expand-right" | "expand-up" | "expand-down"
  | "contract" | "contract-overlay" | "zoom-in" | "zoom-out"
  | "slide-left" | "slide-right" | "slide-up" | "slide-down";

const BUTTON_WIDTH = 112;
const CONTRACT_WIDTH = 44;

function LoadingButton({ children, tone = "primary", loading = false, loadingStyle = "expand-right", progress, onPress }: {
  children: string;
  tone?: "primary" | "warning" | "info" | "danger";
  loading?: boolean;
  loadingStyle?: LoadingButtonStyle;
  progress?: number | null;
  onPress?: () => void;
}) {
  const colors = useUiThemeColors();
  const toneColor = colors?.[tone] ?? "#6366f1";
  const isContract = loading && loadingStyle === "contract";
  const isOverlay = loading && loadingStyle === "contract-overlay";
  const isVertical = loading && ["expand-up", "expand-down", "slide-up", "slide-down"].includes(loadingStyle);

  const [width] = useState(() => new Animated.Value(BUTTON_WIDTH));
  const [textOpacity] = useState(() => new Animated.Value(1));
  const [textTranslateX] = useState(() => new Animated.Value(0));
  const [textTranslateY] = useState(() => new Animated.Value(0));
  const [textScale] = useState(() => new Animated.Value(1));

  useEffect(() => {
    const configs: Partial<Record<LoadingButtonStyle, { tx?: number; ty?: number; scale?: number; fade?: boolean }>> = {
      "expand-left": {},
      "expand-right": {},
      "expand-up": { ty: 8 },
      "expand-down": { ty: -8 },
      "slide-left": { tx: -32, fade: true },
      "slide-right": { tx: 32, fade: true },
      "slide-up": { ty: -32, fade: true },
      "slide-down": { ty: 32, fade: true },
      "zoom-in": { scale: 0, fade: true },
      "zoom-out": { scale: 1.5, fade: true },
      "contract": {},
      "contract-overlay": { fade: true },
    };
    const cfg = loading ? configs[loadingStyle] : undefined;
    Animated.timing(width, { toValue: isContract ? CONTRACT_WIDTH : BUTTON_WIDTH, duration: 200, useNativeDriver: false }).start();
    Animated.parallel([
      Animated.timing(textTranslateX, { toValue: cfg?.tx ?? 0, duration: 200, useNativeDriver: true }),
      Animated.timing(textTranslateY, { toValue: cfg?.ty ?? 0, duration: 200, useNativeDriver: true }),
      Animated.timing(textScale, { toValue: cfg?.scale ?? 1, duration: 200, useNativeDriver: true }),
      Animated.timing(textOpacity, { toValue: cfg?.fade ? 0 : 1, duration: 200, useNativeDriver: true }),
    ]).start();
  }, [loading, loadingStyle, isContract]);

  const spinner = <ActivityIndicator size="small" color="#ffffff" />;

  return (
    <View className="items-center">
      <Animated.View
        style={{
          width,
          height: isVertical ? 56 : 44,
          borderRadius: 8,
          backgroundColor: toneColor,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          opacity: loading ? 0.9 : 1,
        }}
      >
        <Pressable
          accessibilityRole="button"
          disabled={loading}
          onPress={onPress}
          className="h-full w-full items-center justify-center"
          style={{ paddingHorizontal: isContract ? 0 : 16 }}
        >
          {isContract ? (
            spinner
          ) : isOverlay ? (
            <View className="absolute inset-0 z-10 items-center justify-center bg-black/45">{spinner}</View>
          ) : (
            <Animated.View
              style={{
                opacity: textOpacity,
                transform: [{ translateX: textTranslateX }, { translateY: textTranslateY }, { scale: textScale }],
              }}
            >
              <Text className="text-sm font-semibold text-white">{children}</Text>
            </Animated.View>
          )}

          {loading && !isContract && !isOverlay && (
            <View
              pointerEvents="none"
              className="absolute items-center justify-center"
              style={{
                ...(loadingStyle === "expand-left" ? { left: 12, top: 0, bottom: 0 } : {}),
                ...(loadingStyle === "expand-right" ? { right: 12, top: 0, bottom: 0 } : {}),
                ...(loadingStyle === "expand-up" ? { top: 4, left: 0, right: 0 } : {}),
                ...(loadingStyle === "expand-down" ? { bottom: 4, left: 0, right: 0 } : {}),
                ...(["slide-left", "slide-right", "slide-up", "slide-down", "zoom-in", "zoom-out"].includes(loadingStyle)
                  ? { top: 0, bottom: 0, left: 0, right: 0 }
                  : {}),
              }}
            >
              {spinner}
            </View>
          )}

        </Pressable>

        {progress != null && (
          <View className="absolute inset-x-0 bottom-0">
            <UiProgress value={Math.round(progress * 100)} size="sm" tone="primary" />
          </View>
        )}
      </Animated.View>
    </View>
  );
}

function useDemoLoading(duration = 1800) {
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), duration);
  };
  return { loading, start };
}

function useDemoProgress() {
  const [progress, setProgress] = useState<number | null>(null);
  const start = () => setProgress(0.05);
  useEffect(() => {
    if (progress === null) return;
    if (progress >= 1) {
      const timer = setTimeout(() => setProgress(null), 250);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setProgress((current) => Math.min((current ?? 0) + 0.12, 1)), 180);
    return () => clearTimeout(timer);
  }, [progress]);
  return { progress, start };
}

const groups: Array<{ color: "primary" | "warning" | "info"; items: LoadingButtonStyle[] }> = [
  { color: "primary", items: ["expand-left", "expand-right", "expand-up", "expand-down"] },
  { color: "warning", items: ["contract", "contract-overlay", "zoom-in", "zoom-out"] },
  { color: "info", items: ["slide-left", "slide-right", "slide-up", "slide-down"] },
];

function LoadingDemo({ color, style }: { color: "primary" | "warning" | "info"; style: LoadingButtonStyle }) {
  const { loading, start } = useDemoLoading();
  return (
    <View className="items-center gap-3 p-3">
      <Text className="text-sm font-semibold text-muted">{style}</Text>
      <LoadingButton tone={color} loading={loading} loadingStyle={style} onPress={start}>Submit</LoadingButton>
    </View>
  );
}

function ProgressDemo({ style }: { style: LoadingButtonStyle }) {
  const { progress, start } = useDemoProgress();
  return (
    <View className="items-center gap-3 p-3">
      <Text className="text-sm font-semibold text-muted">{style}</Text>
      <LoadingButton tone="danger" loading={progress !== null} progress={progress} loadingStyle={style} onPress={start}>Submit</LoadingButton>
    </View>
  );
}

export function LoadingButtonsTemplatePreview() {
  return (
    <UiCard>
      <UiCardBody>
        <Text className="text-base font-semibold text-foreground">Examples</Text>
        <Text className="mt-2 text-sm text-muted">Click any button to preview the loading state.</Text>
        {groups.map((group) => (
          <View key={group.color} className="mt-5 flex-row flex-wrap justify-center gap-3">
            {group.items.map((style) => <LoadingDemo key={style} color={group.color} style={style} />)}
          </View>
        ))}
        <View className="mt-5 flex-row flex-wrap justify-center gap-3">
          <ProgressDemo style="expand-right" />
          <ProgressDemo style="contract" />
        </View>
      </UiCardBody>
    </UiCard>
  );
}
