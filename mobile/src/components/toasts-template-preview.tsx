import { useState, type ReactNode } from "react";
import { View } from "react-native";
import { UiButton, UiCard, UiCardBody, UiCardDescription, UiCardTitle, UiToast, UiToastViewport } from "@scenariom/design-system/ui/native";
import type { UiTone } from "@scenariom/design-system/ui/native";

function Demo({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <UiCard><UiCardBody><UiCardTitle>{title}</UiCardTitle><UiCardDescription>{description}</UiCardDescription><View className="mt-5">{children}</View></UiCardBody></UiCard>;
}

export function ToastsTemplatePreview() {
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<UiTone>("primary");
  const show = (next: UiTone) => { setTone(next); setOpen(true); };
  return <View className="gap-5">
    <Demo title="Bootstrap Toasts" description="Lightweight messages that hide automatically."><View className="flex-row flex-wrap gap-2"><UiButton onPress={() => show("primary")}>Basic</UiButton><UiButton tone="secondary" onPress={() => show("secondary")}>Translucent</UiButton><UiButton tone="info" onPress={() => show("info")}>Placement</UiButton></View></Demo>
    <Demo title="Custom content" description="Toasts can include a message and actions."><View className="flex-row flex-wrap gap-2"><UiButton tone="success" onPress={() => show("success")}>Take action</UiButton><UiButton tone="warning" onPress={() => show("warning")}>Warning toast</UiButton></View></Demo>
    <Demo title="Placement" description="Toasts are positioned relative to the screen."><UiButton onPress={() => show("primary")}>Show toast</UiButton></Demo>
    {open && <UiToastViewport scope="screen" placement="bottom-end"><UiToast open={open} onClose={() => setOpen(false)} title="Scenariom" closeLabel="Close" tone={tone} duration={3500} action={<UiButton size="sm" onPress={() => setOpen(false)}>Close</UiButton>}>Hello, world! This is a toast message.</UiToast></UiToastViewport>}
  </View>;
}
