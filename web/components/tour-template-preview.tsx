"use client";
import { useEffect, useState, type ReactNode } from "react";
import { UiButton, UiCard, UiCardBody } from "@scenariom/design-system/ui";

export type TourStep = {
  target: string;
  title?: ReactNode;
  content: ReactNode;
  placement?: "top" | "bottom" | "left" | "right" | "center";
};

function UiTour({ run, steps, onClose }: { run: boolean; steps: TourStep[]; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const step = steps[index];
  const [rect, setRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  useEffect(() => {
    if (!run || !step || step.placement === "center") return;
    const measure = () => {
      const element = document.querySelector(step.target);
      if (!element) { setRect(null); return; }
      const bounds = element.getBoundingClientRect();
      setRect({ top: bounds.top, left: bounds.left, width: bounds.width, height: bounds.height });
    };
    measure();
    const element = document.querySelector(step.target);
    element?.scrollIntoView({ block: "center", behavior: "smooth" });
    const delayed = window.setTimeout(measure, 400);
    const delayedAgain = window.setTimeout(measure, 900);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      clearTimeout(delayed);
      clearTimeout(delayedAgain);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [index, run, step]);

  const [viewport, setViewport] = useState<{ width: number; height: number } | null>(null);
  useEffect(() => {
    const update = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!viewport || !run || !step) return null;

  const finish = () => { setIndex(0); onClose(); };

  const viewportWidth = viewport.width;
  const viewportHeight = viewport.height;
  const popoverWidth = Math.min(320, viewportWidth - 32);
  const popoverHeight = 190;
  const visibleRect = step.placement === "center" ? null : rect;
  const rawTop = visibleRect ? (step.placement === "top" ? visibleRect.top - popoverHeight - 14 : visibleRect.top + visibleRect.height + 14) : viewportHeight / 2 - 120;
  const rawLeft = visibleRect ? visibleRect.left + visibleRect.width / 2 - popoverWidth / 2 : viewportWidth / 2 - popoverWidth / 2;
  const top = Math.max(16, Math.min(rawTop, viewportHeight - popoverHeight - 16));
  const left = Math.max(16, Math.min(rawLeft, viewportWidth - popoverWidth - 16));

  return (
    <div className="pointer-events-none fixed inset-0 z-[180]">
      <div className="absolute inset-0 bg-black/55" />
      {visibleRect && (
        <div
          className="absolute rounded-md border-2 border-primary shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]"
          style={{ top: visibleRect.top - 6, left: visibleRect.left - 6, width: visibleRect.width + 12, height: visibleRect.height + 12 }}
        />
      )}
      <div
        className="pointer-events-auto absolute w-[calc(100vw-2rem)] max-w-80 rounded-md border border-border bg-card p-4 text-foreground shadow-xl"
        style={{ top: step.placement === "center" ? "50%" : top, left: step.placement === "center" ? "50%" : left, transform: step.placement === "center" ? "translate(-50%, -50%)" : undefined }}
      >
        {step.title && <h3 className="text-base font-semibold text-foreground">{step.title}</h3>}
        <div className="mt-2 text-sm leading-6 text-muted">{step.content}</div>
        <div className="mt-4 flex justify-between gap-2">
          <UiButton size="sm" tone="secondary" variant="soft" onPress={finish}>Skip</UiButton>
          <div className="flex gap-2">
            {index > 0 && <UiButton size="sm" tone="secondary" variant="soft" onPress={() => setIndex(index - 1)}>Back</UiButton>}
            <UiButton size="sm" onPress={() => (index === steps.length - 1 ? finish() : setIndex(index + 1))}>
              {index === steps.length - 1 ? "Done" : "Next"}
            </UiButton>
          </div>
        </div>
      </div>
    </div>
  );
}

const steps: TourStep[] = [
  { target: "#logo-tour", placement: "center", content: <h3 className="text-lg font-semibold text-foreground">Let us begin our journey!</h3> },
  { target: "#logo-tour", placement: "bottom", title: "Logo here", content: "Use the tour to explain a brand area, status indicator or feature entry point." },
  { target: "#display-title-tour", placement: "bottom", title: "Display Text", content: "Point the user to important content without forcing a page change." },
  { target: "#tour-heading-2", placement: "bottom", title: "Content blocks", content: "Tours should highlight a focused block so the user does not need to zoom out." },
  { target: "#thankyou-tour", placement: "top", title: "Thank you!", content: "Restart the tour from this button when you need to replay onboarding." },
];

const headings = [
  { title: "This is a Heading 2", className: "text-2xl font-semibold", body: "In nec rhoncus eros. Vestibulum eu mattis nisl. Quisque viverra viverra magna nec pulvinar." },
  { title: "This is a Heading 3", className: "text-xl font-semibold", body: "Vestibulum auctor tincidunt semper. Phasellus ut vulputate lacus. Suspendisse ultricies mi eros." },
  { title: "This is a Heading 4", className: "text-lg font-semibold", body: "Nulla et mattis nunc. Curabitur scelerisque commodo condimentum and keeps the reader oriented." },
  { title: "This is a Heading 5", className: "text-base font-semibold", body: "Quisque nec turpis at urna dictum luctus. Suspendisse convallis dignissim eros at volutpat." },
  { title: "This is a Heading 6", className: "text-sm font-semibold uppercase", body: "Donec ultricies, lacus id tempor condimentum, orci leo faucibus sem, a molestie libero lectus ac justo." },
];

export function TourTemplatePreview() {
  const [run, setRun] = useState(true);

  return (
    <>
      <UiTour run={run} steps={steps} onClose={() => setRun(false)} />

      <UiCard>
        <UiCardBody>
          <div className="text-center">
            <img
              id="logo-tour"
              src="/assets/images/logos/logo-dark-ltr.jpg"
              alt="Scenariom logo"
              className="theme-logo-light mx-auto h-10 w-auto rounded-md object-contain"
            />
            <img
              src="/assets/images/logos/logo-light-ltr.jpg"
              alt="Scenariom logo"
              className="theme-logo-dark mx-auto h-10 w-auto rounded-md object-contain"
            />
          </div>

          <div className="mt-8 space-y-6">
            <div id="display-title-tour" className="rounded-md border border-border bg-card p-5">
              <h1 className="text-3xl font-bold text-foreground">This is a Heading 1</h1>
              <p className="mt-2 text-muted">
                Use this first step to focus the user on the page purpose. The highlight can target a full hero,
                a title or any practical feature zone.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {headings.map((item, index) => (
                <section key={item.title} id={index === 0 ? "tour-heading-2" : undefined} className="rounded-md border border-border bg-card p-5">
                  <h2 className={`${item.className} text-foreground`}>{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
                </section>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-md border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground">Feature hint</h3>
                <p className="mt-2 text-sm text-muted">Explain small controls, filters or shortcuts with a focused step.</p>
              </div>
              <div className="rounded-md border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground">Workflow hint</h3>
                <p className="mt-2 text-sm text-muted">Chain steps to teach a sequence without opening a separate page.</p>
              </div>
              <div className="rounded-md border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground">Mobile hint</h3>
                <p className="mt-2 text-sm text-muted">The overlay can guide users on compact layouts too.</p>
              </div>
            </div>

            <div className="pt-2 text-center">
              <span id="thankyou-tour" className="inline-block">
                <UiButton tone="danger" onPress={() => setRun(true)}>Thank you!</UiButton>
              </span>
            </div>
          </div>
        </UiCardBody>
      </UiCard>
    </>
  );
}
