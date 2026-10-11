"use client";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { UiButton, UiCard, UiCardBody, UiIcon, UiModal, UiProgress } from "@scenariom/design-system/ui";
import type { UiTone } from "@scenariom/design-system/ui";

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

function LongContent() {
  return (
    <div className="max-h-80 overflow-y-auto rounded-md border border-border bg-card p-3 text-left rtl:text-right">
      <img src="/assets/images/template-assets/small/img-1.jpg" alt="" className="max-h-40 w-full rounded-md object-cover" />
      <p className="mt-3">This alert keeps the dialog usable when the content is taller than the viewport. Use this for rich confirmations, preview steps, policy text or any workflow that needs more context.</p>
      <div className="mt-3 space-y-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <p key={index}>Section {index + 1}: the content area scrolls while the action buttons stay easy to reach.</p>
        ))}
      </div>
    </div>
  );
}

export function SweetAlertsTemplatePreview() {
  const [active, setActive] = useState<AlertState | null>(null);
  const [timerLeft, setTimerLeft] = useState(2);
  const [ajaxLoading, setAjaxLoading] = useState(false);

  useEffect(() => {
    if (active?.id !== "timer") return;
    const timer = window.setInterval(() => {
      setTimerLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setActive(null);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [active?.id]);

  const config = useMemo(() => {
    if (!active) return null;
    const common = { type: "info" as SweetAlertType, title: "Scenariom", body: null as ReactNode, confirmText: "OK", cancelText: "Cancel", closeOnConfirm: true, closeOnCancel: true, onConfirm: undefined as (() => void) | undefined, onCancel: undefined as (() => void) | undefined, showCancel: false };
    switch (active.id) {
      case "basic": return { ...common, title: "Any fool can use a computer!" };
      case "title": return { ...common, type: "question" as const, title: "The Internet?", body: "That thing is still around?", showCancel: true };
      case "success": return { ...common, type: "success" as const, title: "Good job!", body: "You clicked the button!" };
      case "long": return { ...common, title: "Long content", body: <LongContent /> };
      case "position": return { ...common, type: "success" as const, title: "Your work has been saved", body: "This template keeps alerts consistent with UiModal and Tailwind tokens." };
      case "error": return { ...common, type: "danger" as const, title: "Oops...", body: <div><p>Something went wrong!</p><UiButton className="mt-2" variant="ghost" size="sm">Why do I have this issue?</UiButton></div> };
      case "confirm": return { ...common, type: "warning" as const, title: "Are you sure?", body: "You will not be able to revert this!", confirmText: "Yes, delete it!", closeOnConfirm: false, showCancel: true, onCancel: () => undefined, onConfirm: () => setActive({ id: "deleted" }) };
      case "params": return { ...common, type: "warning" as const, title: "Are you sure?", body: "Choose a path and the next alert will explain the result.", confirmText: "Yes, delete it!", cancelText: "No, cancel!", closeOnConfirm: false, closeOnCancel: false, showCancel: true, onConfirm: () => setActive({ id: "deleted" }), onCancel: () => setActive({ id: "cancelled" }) };
      case "image": return { ...common, title: "Scenariom", body: <div><img src="/assets/images/template-assets/small/img-2.jpg" alt="" className="mx-auto h-24 w-auto rounded-md object-cover" /><p className="mt-3">Responsive UI reference built with Tailwind and shared design tokens.</p></div> };
      case "timer": return { ...common, title: "Auto close alert!", body: <div className="space-y-3"><p>I will close in {timerLeft} seconds.</p><UiProgress value={(timerLeft / 2) * 100} size="sm" tone="info" /></div> };
      case "html": return { ...common, title: "HTML example", body: <div><p>You can compose <strong className="text-foreground">bold text</strong>, links and any React content.</p><div className="mt-3 rounded-md bg-card p-3 text-xs text-muted">Custom body slot from the sweet alert.</div></div>, showCancel: true, onCancel: () => undefined, confirmText: "Great!" };
      case "custom": return { ...common, title: "Custom width, padding, background.", body: <div className="rounded-md border border-border bg-card p-6"><p>This is the template-safe version of custom padding and background, using shared tokens instead of hardcoded styles.</p></div> };
      case "ajax": return { ...common, type: "question" as const, title: "Submit email to run ajax request", body: <div className="space-y-3"><input className="min-h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary" defaultValue="team@example.com" aria-label="Email" />{ajaxLoading && <div className="flex items-center justify-center gap-2 text-muted text-sm">Request running...</div>}</div>, confirmText: ajaxLoading ? "Submitting" : "Submit", closeOnConfirm: false, showCancel: true, onCancel: () => undefined, onConfirm: () => { setAjaxLoading(true); window.setTimeout(() => { setAjaxLoading(false); setActive({ id: "ajax-finished" }); }, 900); } };
      case "queue":
      case "queue-step": {
        const index = active.queueIndex ?? 0;
        return { ...common, type: "question" as const, title: queueTitles[index], body: <div className="space-y-3"><p>Chaining alert modals is useful for small wizard flows.</p><div className="flex justify-center gap-2">{queueTitles.map((_, stepIndex) => <span key={stepIndex} className={`h-2 w-8 rounded-full ${stepIndex <= index ? "bg-primary" : "bg-card"}`} />)}</div></div>, confirmText: index === queueTitles.length - 1 ? "Lovely!" : "Next", closeOnConfirm: false, showCancel: true, onCancel: () => undefined, onConfirm: () => { if (index === queueTitles.length - 1) { setActive({ id: "deleted" }); return; } setActive({ id: "queue-step", queueIndex: index + 1 }); } };
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
          <h2 className="text-base font-semibold text-foreground">Examples</h2>
          <p className="mt-2 text-sm text-muted">A beautiful, responsive replacement for JavaScript popup boxes.</p>
          <div className="mt-5 overflow-hidden rounded-md border border-border">
            <table className="w-full text-sm">
              <thead className="bg-card text-foreground">
                <tr>
                  <th className="w-1/2 px-4 py-3 text-left font-semibold rtl:text-right">Alert Type</th>
                  <th className="px-4 py-3 text-left font-semibold rtl:text-right">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((demo) => (
                  <tr key={demo.id}>
                    <td className="px-4 py-3 text-muted">{demo.label}</td>
                    <td className="px-4 py-3"><UiButton size="sm" tone="info" onPress={() => { setTimerLeft(2); setActive({ id: demo.id }); }}>Click me</UiButton></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </UiCardBody>
      </UiCard>

      {active && config && (() => {
        const cfg = config;
        if (!cfg) return null;
        const typeData = typeConfig[cfg.type];
        if (!typeData) return null;
        const { tone, icon } = typeData;
        return (
          <UiModal open={Boolean(active)} onClose={close} size="sm" showClose={false} footer={
            <div className="flex justify-center gap-2">
              {cfg.showCancel && <UiButton tone="secondary" variant="soft" onPress={() => { cfg.onCancel?.(); if (cfg.closeOnCancel) close(); }}>{cfg.cancelText}</UiButton>}
              <UiButton tone={tone} onPress={() => { cfg.onConfirm?.(); if (cfg.closeOnConfirm) close(); }}>{cfg.confirmText}</UiButton>
            </div>
          }>
            <div className="flex flex-col items-center p-2 text-center">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full" style={{ backgroundColor: `color-mix(in srgb, var(--sc-${tone}) 14%, var(--sc-surface))` }}>
                <UiIcon name={icon} size="lg" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{cfg.title}</h3>
              {cfg.body && <div className="mt-2 text-sm leading-6 text-muted">{cfg.body}</div>}
            </div>
          </UiModal>
        );
      })()}
    </>
  );
}
