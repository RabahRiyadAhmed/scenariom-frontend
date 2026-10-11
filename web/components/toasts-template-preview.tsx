"use client";

import { useState, type ReactNode } from "react";
import { UiButton, UiCard, UiCardBody, UiCardDescription, UiCardTitle, UiToast, UiToastViewport } from "@scenariom/design-system/ui";
import type { UiTone } from "@scenariom/design-system/ui";

function Demo({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <UiCard><UiCardBody><UiCardTitle>{title}</UiCardTitle><UiCardDescription>{description}</UiCardDescription><div className="mt-5">{children}</div></UiCardBody></UiCard>;
}

export function ToastsTemplatePreview() {
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<UiTone>("primary");
  const show = (next: UiTone) => { setTone(next); setOpen(true); };
  return <div className="grid gap-5 lg:grid-cols-2">
    <Demo title="Bootstrap Toasts" description="Lightweight messages that hide automatically."><div className="flex flex-wrap gap-2"><UiButton onPress={() => show("primary")}>Basic</UiButton><UiButton tone="secondary" onPress={() => show("secondary")}>Translucent</UiButton><UiButton tone="info" onPress={() => show("info")}>Placement</UiButton></div></Demo>
    <Demo title="Custom content" description="Toasts can include a message and actions."><div className="flex flex-wrap gap-2"><UiButton tone="success" onPress={() => show("success")}>Take action</UiButton><UiButton tone="warning" onPress={() => show("warning")}>Warning toast</UiButton></div></Demo>
    <Demo title="Placement" description="Toasts are positioned relative to the screen."><UiButton onPress={() => show("primary")}>Show toast</UiButton></Demo>
    {open && <UiToastViewport scope="screen" placement="bottom-end"><UiToast open={open} onClose={() => setOpen(false)} title="Scenariom" closeLabel="Close" tone={tone} duration={3500} action={<UiButton size="sm" onPress={() => setOpen(false)}>Close</UiButton>}>Hello, world! This is a toast message.</UiToast></UiToastViewport>}
  </div>;
}
