import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { UiButton, UiCard, UiCardBody, UiIcon, UiModal, UiProgress } from "@scenariom/design-system/ui/native";
import type { UiTone } from "@scenariom/design-system/ui/native";
import { useUiThemeColors } from "@scenariom/design-system/ui-theme";

type SweetAlertType = "info" | "success" | "warning" | "danger" | "question";
type DemoId = "basic" | "title" | "success" | "long" | "position" | "error" | "confirm" | "params" | "image" | "timer" | "html" | "custom" | "ajax" | "queue" | "dynamic";
type AlertState = { id: DemoId | "deleted" | "cancelled" | "ajax-finished" | "queue-step" | "dynamic-finished"; queueIndex?: number };

const rows: Array<{ id: DemoId; label: string }> = [
  { id: "basic", label: "A basic message" },
  { id: "title", label: "A title with a text under" },
  { id: "success", label: "A success message!" },
  { id: "long", label: "A modal window with a long content inside" },
  { id: "position", label: "A custom positioned dialog" },
  { id: "error", label: "A modal with a title, an error icon, text and footer" },
  { id: "confirm", label: "A confirm dialog with a function attached" },
  { id: "params", label: "Confirm and cancel paths with different results" },
  { id: "image", label: "A message with custom image header" },
  { id: "timer", label: "A message with auto close timer" },
  { id: "html", label: "Custom HTML description and buttons" },
  { id: "custom", label: "Custom width, padding and background treatment" },
  { id: "ajax", label: "Ajax request example" },
  { id: "queue", label: "Chaining modals queue example" },
  { id: "dynamic", label: "Dynamic queue example" },
];

const queueTitles = ["Question 1", "Question 2", "Question 3"];

const typeConfig: Record<SweetAlertType, { tone: UiTone; icon: "info" | "check" | "warning" | "x" }> = {
  info: { tone: "info", icon: "info" },
  success: { tone: "success", icon: "check" },
  warning: { tone: "warning", icon: "warning" },
  danger: { tone: "danger", icon: "x" },
  question: { tone: "primary", icon: "info" },
};

const longImage = Image.resolveAssetSource(require("@/assets/images/template-assets/small/img-1.jpg")).uri;
const headerImage = Image.resolveAssetSource(require("@/assets/images/template-assets/small/img-2.jpg")).uri;

function LongContent() {
  return (
    <ScrollView className="max-h-80 rounded-md border border-border bg-card p-3">
      <Image source={{ uri: longImage }} className="max-h-40 w-full rounded-md" resizeMode="cover" />
      <Text className="mt-3 text-foreground">This alert keeps the dialog usable when the content is taller than the viewport. Use this for rich confirmations, preview steps, policy text or any workflow that needs more context.</Text>
      <View className="mt-3 gap-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <Text key={index} className="text-foreground">Section {index + 1}: the content area scrolls while the action buttons stay easy to reach.</Text>
        ))}
      </View>
    </ScrollView>
  );
}

export function SweetAlertsTemplatePreview() {
  const [active, setActive] = useState<AlertState | null>(null);
  const [timerLeft, setTimerLeft] = useState(2);
  const [ajaxLoading, setAjaxLoading] = useState(false);
  const colors = useUiThemeColors();

  useEffect(() => {
    if (active?.id !== "timer") return;
    const timer = setInterval(() => {
      setTimerLeft((current) => {
        if (current <= 1) {
          clearInterval(timer);
          setActive(null);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [active?.id]);

  const config = useMemo(() => {
    if (!active) return null;
    const common = { type: "info" as SweetAlertType, title: "Scenariom", body: null as ReactNode, confirmText: "OK", cancelText: "Cancel", closeOnConfirm: true, closeOnCancel: true, onConfirm: undefined as (() => void) | undefined, onCancel: undefined as (() => void) | undefined, showCancel: false };
    switch (active.id) {
      case "basic": return { ...common, title: "Any fool can use a computer!" };
      case "title": return { ...common, type: "question" as const, title: "The Internet?", body: "That thing is still around?", showCancel: true };
      case "success": return { ...common, type: "success" as const, title: "Good job!", body: "You clicked the button!" };
      case "long": return { ...common, title: "Long content", body: <LongContent /> };
      case "position": return { ...common, type: "success" as const, title: "Your work has been saved", body: "This template keeps alerts consistent with UiModal and NativeWind tokens." };
      case "error": return { ...common, type: "danger" as const, title: "Oops...", body: <View><Text className="text-foreground">Something went wrong!</Text><UiButton className="mt-2" variant="ghost" size="sm">Why do I have this issue?</UiButton></View> };
      case "confirm": return { ...common, type: "warning" as const, title: "Are you sure?", body: "You will not be able to revert this!", confirmText: "Yes, delete it!", closeOnConfirm: false, showCancel: true, onCancel: () => undefined, onConfirm: () => setActive({ id: "deleted" }) };
      case "params": return { ...common, type: "warning" as const, title: "Are you sure?", body: "Choose a path and the next alert will explain the result.", confirmText: "Yes, delete it!", cancelText: "No, cancel!", closeOnConfirm: false, closeOnCancel: false, showCancel: true, onConfirm: () => setActive({ id: "deleted" }), onCancel: () => setActive({ id: "cancelled" }) };
      case "image": return { ...common, title: "Scenariom", body: <View className="items-center gap-3"><Image source={{ uri: headerImage }} className="h-24 w-24 rounded-md" resizeMode="cover" /><Text className="text-foreground">Responsive UI reference built with NativeWind and shared design tokens.</Text></View> };
      case "timer": return { ...common, title: "Auto close alert!", body: <View className="gap-3"><Text className="text-foreground">I will close in {timerLeft} seconds.</Text><UiProgress value={(timerLeft / 2) * 100} size="sm" tone="info" /></View> };
      case "html": return { ...common, title: "HTML example", body: <View className="gap-2"><Text className="text-foreground">You can compose bold text, links and any React content.</Text><View className="mt-2 rounded-md bg-card p-3"><Text className="text-xs text-muted">Custom body slot from the sweet alert.</Text></View></View>, showCancel: true, onCancel: () => undefined, confirmText: "Great!" };
      case "custom": return { ...common, title: "Custom width, padding, background.", body: <View className="rounded-md border border-border bg-card p-6"><Text className="text-foreground">This is the template-safe version of custom padding and background, using shared tokens instead of hardcoded styles.</Text></View> };
      case "ajax": return { ...common, type: "question" as const, title: "Submit email to run ajax request", body: <View className="gap-3"><View className="min-h-11 rounded-md border border-border bg-background px-3 justify-center"><Text className="text-foreground">team@example.com</Text></View>{ajaxLoading && <Text className="text-center text-muted">Request running...</Text>}</View>, confirmText: ajaxLoading ? "Submitting" : "Submit", closeOnConfirm: false, showCancel: true, onCancel: () => undefined, onConfirm: () => { setAjaxLoading(true); setTimeout(() => { setAjaxLoading(false); setActive({ id: "ajax-finished" }); }, 900); } };
      case "queue":
      case "queue-step": {
        const index = active.queueIndex ?? 0;
        return { ...common, type: "question" as const, title: queueTitles[index], body: <View className="gap-3"><Text className="text-foreground">Chaining alert modals is useful for small wizard flows.</Text><View className="flex-row justify-center gap-2">{queueTitles.map((_, stepIndex) => <View key={stepIndex} className={`h-2 w-8 rounded-full ${stepIndex <= index ? "bg-primary" : "bg-card"}`} />)}</View></View>, confirmText: index === queueTitles.length - 1 ? "Lovely!" : "Next", closeOnConfirm: false, showCancel: true, onCancel: () => undefined, onConfirm: () => { if (index === queueTitles.length - 1) { setActive({ id: "deleted" }); return; } setActive({ id: "queue-step", queueIndex: index + 1 }); } };
      }
      case "dynamic": return { ...common, title: "Your public IP", body: "Dynamic queue examples can insert the next step after a server response. This demo simulates that response locally.", confirmText: "Show simulated result", closeOnConfirm: false, showCancel: true, onCancel: () => undefined, onConfirm: () => setActive({ id: "dynamic-finished" }) };
      case "deleted": return { ...common, type: "success" as const, title: "Deleted!", body: "Your file has been deleted." };
      case "cancelled": return { ...common, type: "danger" as const, title: "Cancelled", body: "Your imaginary file is safe." };
      case "ajax-finished": return { ...common, type: "success" as const, title: "Ajax request finished!", body: "Submitted email: team@example.com" };
      case "dynamic-finished": return { ...common, type: "success" as const, title: "Dynamic step inserted", body: "Result: 127.0.0.1 demo response." };
      default: return common;
    }
  }, [active, ajaxLoading, timerLeft]);

  const close = () => setActive(null);

  return (
    <>
      <UiCard>
        <UiCardBody>
          <Text className="text-base font-semibold text-foreground">Examples</Text>
          <Text className="mt-2 text-sm text-muted">A beautiful, responsive replacement for JavaScript popup boxes.</Text>
          <View className="mt-5 overflow-hidden rounded-md border border-border">
            {rows.map((demo, index) => (
              <View key={demo.id} className={`flex-row items-center justify-between px-4 py-3 ${index > 0 ? "border-t border-border" : ""}`}>
                <Text className="flex-1 text-muted">{demo.label}</Text>
                <UiButton size="sm" tone="info" onPress={() => { setTimerLeft(2); setActive({ id: demo.id }); }}>Click me</UiButton>
              </View>
            ))}
          </View>
        </UiCardBody>
      </UiCard>

      {active && config && (() => {
        const cfg = config;
        const { tone, icon } = typeConfig[cfg.type];
        const iconColor = colors?.[tone] ?? "#0369A1";
        return (
          <UiModal open={Boolean(active)} onClose={close} size="sm" showClose={false} footer={
            <View className="flex-row justify-center gap-2">
              {cfg.showCancel && <UiButton tone="secondary" variant="soft" onPress={() => { cfg.onCancel?.(); if (cfg.closeOnCancel) close(); }}>{cfg.cancelText}</UiButton>}
              <UiButton tone={tone} onPress={() => { cfg.onConfirm?.(); if (cfg.closeOnConfirm) close(); }}>{cfg.confirmText}</UiButton>
            </View>
          }>
            <View className="items-center gap-4 p-2">
              <View className="size-14 items-center justify-center rounded-full" style={{ backgroundColor: `${iconColor}22` }}>
                <UiIcon name={icon} size="lg" tintColor={iconColor} />
              </View>
              <Text className="text-lg font-semibold text-foreground">{cfg.title}</Text>
              {cfg.body && (typeof cfg.body === "string" ? <Text className="text-center text-sm leading-6 text-muted">{cfg.body}</Text> : <View className="gap-2">{cfg.body}</View>)}
            </View>
          </UiModal>
        );
      })()}
    </>
  );
}
