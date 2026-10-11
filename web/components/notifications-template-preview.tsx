"use client";

import { useState, type ReactNode } from "react";
import { UiButton, UiCard, UiCardBody, UiCardDescription, UiCardTitle, UiToast, UiToastViewport } from "@scenariom/design-system/ui";
import type { UiToastPlacement, UiTone } from "@scenariom/design-system/ui";

type ToastItem = { id: number; title: string; message: string; tone?: UiTone; variant?: "default" | "solid" | "translucent"; action?: boolean };
const placements: UiToastPlacement[] = ["top-start", "top-center", "top-end", "middle-start", "middle-center", "middle-end", "bottom-start", "bottom-center", "bottom-end"];

function Demo({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <UiCard><UiCardBody><UiCardTitle>{title}</UiCardTitle><UiCardDescription>{description}</UiCardDescription><div className="mt-5">{children}</div></UiCardBody></UiCard>;
}

export function NotificationsTemplatePreview() {
  const [placement, setPlacement] = useState<UiToastPlacement>("top-end");
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [containerOpen, setContainerOpen] = useState(false);
  const dismiss = (id: number) => setToasts(current => current.filter(item => item.id !== id));
  const show = (items: Omit<ToastItem, "id">[]) => setToasts(items.map((item, index) => ({ ...item, id: Date.now() + index })));
  const browser = async () => {
    if (!("Notification" in window)) return;
    const permission = Notification.permission === "default" ? await Notification.requestPermission() : Notification.permission;
    if (permission === "granted") new Notification("Scenariom notification", { body: "This is a real browser notification." });
  };

  return <div className="grid gap-5 lg:grid-cols-2">
    <Demo title="Bootstrap Toasts" description="A toast is temporary feedback, positioned relative to the screen and dismissed automatically.">
      <div className="flex flex-wrap gap-2"><UiButton onPress={() => show([{ title: "Scenariom", message: "Hello, world! This is a toast message." }])}>Basic toast</UiButton><UiButton tone="secondary" onPress={() => show([{ title: "Scenariom", message: "A translucent toast over the current screen.", variant: "translucent" }])}>Translucent toast</UiButton><UiButton tone="info" onPress={() => show([{ title: "Scenariom", message: "First message." }, { title: "Scenariom", message: "Second message: toasts can stack.", tone: "info" }])}>Stacking</UiButton></div>
    </Demo>
    <Demo title="Custom content" description="A toast can use a semantic tone and an action."><UiButton tone="success" onPress={() => show([{ title: "Saved", message: "Your changes are available.", tone: "success", variant: "solid", action: true }])}>Show success toast</UiButton></Demo>
    <Demo title="Placement" description="Screen is the normal toast behavior. The container option is kept only to test a local overlay.">
      <label className="text-sm font-medium">Toast placement<select value={placement} onChange={event => setPlacement(event.target.value as UiToastPlacement)} className="mt-2 min-h-10 w-full rounded border border-border bg-background px-3">{placements.map(item => <option key={item}>{item}</option>)}</select></label>
      <div className="mt-4 flex flex-wrap gap-2"><UiButton onPress={() => show([{ title: "Screen toast", message: "This toast is positioned relative to the screen." }])}>Show screen toast</UiButton><UiButton variant="outline" onPress={() => setContainerOpen(true)}>Show container demo</UiButton></div>
      {containerOpen && <UiToastViewport scope="container" placement={placement} className="mt-4"><UiToast open onClose={() => setContainerOpen(false)} title="Container demo" closeLabel="Dismiss" duration={3500}>This is a local preview, not the standard global toast behavior.</UiToast></UiToastViewport>}
    </Demo>
    <Demo title="Browser notification" description="Uses the real browser Notification API. Push delivery through backend is separate."><UiButton onPress={browser}>Show browser notification</UiButton></Demo>
    {toasts.length > 0 && <UiToastViewport scope="screen" placement={placement}>{toasts.map(item => <UiToast key={item.id} open onClose={() => dismiss(item.id)} title={item.title} closeLabel="Dismiss" tone={item.tone} variant={item.variant} duration={3500} action={item.action ? <UiButton size="sm" onPress={() => dismiss(item.id)}>Continue</UiButton> : undefined}>{item.message}</UiToast>)}</UiToastViewport>}
  </div>;
}
