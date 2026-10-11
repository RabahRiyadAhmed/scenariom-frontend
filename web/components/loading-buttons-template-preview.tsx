"use client";
import { useEffect, useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { UiButton, UiCard, UiCardBody, UiProgress } from "@scenariom/design-system/ui";
import type { UiTone } from "@scenariom/design-system/ui";

export type LoadingButtonStyle =
  | "expand-left" | "expand-right" | "expand-up" | "expand-down"
  | "contract" | "contract-overlay" | "zoom-in" | "zoom-out"
  | "slide-left" | "slide-right" | "slide-up" | "slide-down";

type LoadingButtonProps = {
  children: ReactNode;
  tone?: UiTone;
  loading?: boolean;
  loadingStyle?: LoadingButtonStyle;
  loadingText?: ReactNode;
  progress?: number | null;
  onPress?: () => void;
};

function UiLoadingButton({ children, tone, loading = false, loadingStyle = "expand-right", loadingText, progress, onPress }: LoadingButtonProps) {
  const isContract = loading && loadingStyle === "contract";
  const isOverlay = loading && loadingStyle === "contract-overlay";
  const isZoomIn = loading && loadingStyle === "zoom-in";
  const isZoomOut = loading && loadingStyle === "zoom-out";
  const isVertical = loading && ["expand-up", "expand-down", "slide-up", "slide-down"].includes(loadingStyle);
  const spinner = <Loader2 className="h-4 w-4 shrink-0 animate-spin" />;

  const textClass: Partial<Record<LoadingButtonStyle, string>> = {
    "expand-up": loading ? "translate-y-2" : "",
    "expand-down": loading ? "-translate-y-2" : "",
    "slide-left": loading ? "-translate-x-8 opacity-0" : "",
    "slide-right": loading ? "translate-x-8 opacity-0" : "",
    "slide-up": loading ? "-translate-y-8 opacity-0" : "",
    "slide-down": loading ? "translate-y-8 opacity-0" : "",
    "zoom-in": loading ? "scale-0 opacity-0" : "",
    "zoom-out": loading ? "scale-150 opacity-0" : "",
    "contract-overlay": loading ? "opacity-0" : "",
  };

  const spinnerClass: Partial<Record<LoadingButtonStyle, string>> = {
    "expand-left": "left-3 top-1/2 -translate-y-1/2",
    "expand-right": "right-3 top-1/2 -translate-y-1/2",
    "expand-up": "left-1/2 top-1 -translate-x-1/2",
    "expand-down": "bottom-1 left-1/2 -translate-x-1/2",
    "slide-left": "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    "slide-right": "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    "slide-up": "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    "slide-down": "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    "zoom-in": "left-1/2 top-1/2 template-loading-zoom-in",
    "zoom-out": "left-1/2 top-1/2 template-loading-zoom-out",
  };

  return (
    <UiButton
      className={`relative min-w-28 overflow-hidden ${isContract ? "!h-10 !min-w-10 !w-10 !rounded-full !px-0" : ""} ${isVertical ? "!min-h-12" : ""} ${loading && ["expand-left", "slide-left"].includes(loadingStyle) ? "!pl-9" : ""} ${loading && ["expand-right", "slide-right"].includes(loadingStyle) ? "!pr-9" : ""}`}
      tone={tone}
      onPress={onPress}
      disabled={loading}
    >
      {isOverlay && (
        <span className="absolute inset-0 z-10 flex items-center justify-center bg-black/15">
          {spinner}
        </span>
      )}

      {isContract ? (
        <span className="flex items-center justify-center">{spinner}</span>
      ) : (
        <span className={`inline-flex items-center justify-center transition duration-200 ${textClass[loadingStyle] ?? ""}`}>
          {loadingText && loading ? loadingText : children}
        </span>
      )}

      {loading && !isContract && !isOverlay && (
        <span className={`absolute flex items-center justify-center transition duration-200 ${spinnerClass[loadingStyle] ?? ""}`}>
          {spinner}
        </span>
      )}

      {progress !== null && progress !== undefined && (
        <span className="absolute inset-x-0 bottom-0">
          <UiProgress value={Math.round(progress * 100)} size="sm" tone="primary" />
        </span>
      )}
    </UiButton>
  );
}

function useDemoLoading(duration = 1800) {
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), duration);
  };
  return { loading, start };
}

function useDemoProgress() {
  const [progress, setProgress] = useState<number | null>(null);
  const start = () => setProgress(0.05);
  useEffect(() => {
    if (progress === null) return;
    if (progress >= 1) {
      const timer = window.setTimeout(() => setProgress(null), 250);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => setProgress((current) => Math.min((current ?? 0) + 0.12, 1)), 180);
    return () => window.clearTimeout(timer);
  }, [progress]);
  return { progress, start };
}

const groups: Array<{ color: UiTone; items: LoadingButtonStyle[] }> = [
  { color: "primary", items: ["expand-left", "expand-right", "expand-up", "expand-down"] },
  { color: "warning", items: ["contract", "contract-overlay", "zoom-in", "zoom-out"] },
  { color: "info", items: ["slide-left", "slide-right", "slide-up", "slide-down"] },
];

function LoadingDemo({ color, style }: { color: UiTone; style: LoadingButtonStyle }) {
  const { loading, start } = useDemoLoading();
  return (
    <div className="p-3 text-center">
      <h3 className="mb-3 text-sm font-semibold text-muted">{style}</h3>
      <UiLoadingButton tone={color} loading={loading} loadingStyle={style} onPress={start}>Submit</UiLoadingButton>
    </div>
  );
}

function ProgressDemo({ style }: { style: LoadingButtonStyle }) {
  const { progress, start } = useDemoProgress();
  return (
    <div className="p-3 text-center">
      <h3 className="mb-3 text-sm font-semibold text-muted">{style}</h3>
      <UiLoadingButton tone="danger" loading={progress !== null} progress={progress} loadingStyle={style} onPress={start}>Submit</UiLoadingButton>
    </div>
  );
}

export function LoadingButtonsTemplatePreview() {
  return (
    <UiCard>
      <UiCardBody>
        <h2 className="text-base font-semibold text-foreground">Examples</h2>
        <p className="mt-2 text-sm text-muted">Click any button to preview the loading state.</p>
        {groups.map((group) => (
          <div key={group.color} className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {group.items.map((style) => <LoadingDemo key={style} color={group.color} style={style} />)}
          </div>
        ))}
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <ProgressDemo style="expand-right" />
          <ProgressDemo style="contract" />
        </div>
      </UiCardBody>
    </UiCard>
  );
}
