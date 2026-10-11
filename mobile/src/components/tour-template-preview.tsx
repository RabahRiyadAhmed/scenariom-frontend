import { useEffect, useRef, useState } from "react";
import { Dimensions, Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { UiButton, UiCard, UiCardBody } from "@scenariom/design-system/ui/native";
import { useThemeRuntime } from "@/contexts/theme-runtime-context";

export type TourStep = {
  target: string;
  title?: string;
  content: string;
  placement?: "top" | "bottom" | "center";
};

type Rect = { x: number; y: number; width: number; height: number };

function UiTour({ run, steps, rects, onIndexChange, onClose }: { run: boolean; steps: TourStep[]; rects: Record<string, Rect | null>; onIndexChange?: (index: number) => void; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const step = steps[index];
  const rect = step ? rects[step.target] ?? null : null;

  useEffect(() => {
    onIndexChange?.(index);
  }, [index]);

  if (!run || !step) return null;

  const finish = () => {
    setIndex(0);
    onClose();
  };

  const popoverWidth = 300;
  const popoverHeight = 190;
  const centered = step.placement === "center";
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const popoverTop = rect
    ? step.placement === "top"
      ? Math.max(16, rect.y - popoverHeight - 14)
      : rect.y + rect.height + 14
    : screenHeight / 2 - popoverHeight / 2;
  const popoverLeft = rect
    ? Math.max(12, Math.min(rect.x + rect.width / 2 - popoverWidth / 2, screenWidth - popoverWidth - 12))
    : 0;

  return (
    <Modal visible={run} transparent animationType="fade" onRequestClose={finish}>
      <Pressable onPress={finish} className="flex-1 bg-black/55">
        <View className="flex-1">
          {rect && (
            <View
              pointerEvents="none"
              className="absolute rounded-md border-2 border-primary"
              style={{ top: rect.y - 6, left: rect.x - 6, width: rect.width + 12, height: rect.height + 12 }}
            />
          )}
          <View
            className="absolute rounded-md border border-border bg-card p-4 shadow-xl"
            style={
              centered
                ? { left: "10%", right: "10%", top: "38%" }
                : { left: popoverLeft, width: popoverWidth, top: Math.max(16, Math.min(popoverTop, screenHeight - popoverHeight - 16)) }
            }
          >
            {step.title && <Text className="text-base font-semibold text-foreground">{step.title}</Text>}
            <Text className="mt-2 text-sm leading-6 text-muted">{step.content}</Text>
            <View className="mt-4 flex-row justify-between gap-2">
              <UiButton size="sm" tone="secondary" variant="soft" onPress={finish}>Skip</UiButton>
              <View className="flex-row gap-2">
                {index > 0 && <UiButton size="sm" tone="secondary" variant="soft" onPress={() => setIndex(index - 1)}>Back</UiButton>}
                <UiButton size="sm" onPress={() => (index === steps.length - 1 ? finish() : setIndex(index + 1))}>
                  {index === steps.length - 1 ? "Done" : "Next"}
                </UiButton>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const steps: TourStep[] = [
  { target: "logo-tour", placement: "center", content: "Let us begin our journey!" },
  { target: "logo-tour", placement: "bottom", title: "Logo here", content: "Use the tour to explain a brand area, status indicator or feature entry point." },
  { target: "display-title-tour", placement: "bottom", title: "Display Text", content: "Point the user to important content without forcing a page change." },
  { target: "tour-heading-2", placement: "bottom", title: "Content blocks", content: "Tours should highlight a focused block so the user does not need to zoom out." },
  { target: "thankyou-tour", placement: "top", title: "Thank you!", content: "Restart the tour from this button when you need to replay onboarding." },
];

const headings = [
  { title: "This is a Heading 2", className: "text-2xl font-semibold", body: "In nec rhoncus eros. Vestibulum eu mattis nisl. Quisque viverra viverra magna nec pulvinar." },
  { title: "This is a Heading 3", className: "text-xl font-semibold", body: "In nec rhoncus eros. Vestibulum eu mattis nisl. Quisque viverra viverra magna nec pulvinar." },
  { title: "This is a Heading 4", className: "text-lg font-semibold", body: "Nulla et mattis nunc. Curabitur scelerisque commodo condimentum and keeps the reader oriented." },
  { title: "This is a Heading 5", className: "text-base font-semibold", body: "Quisque nec turpis at urna dictum luctus. Suspendisse convallis dignissim eros at volutpat." },
  { title: "This is a Heading 6", className: "text-sm font-semibold uppercase", body: "Donec ultricies, lacus id tempor condimentum, orci leo faucibus sem, a molestie libero lectus ac justo." },
];

export function TourTemplatePreview() {
  const [run, setRun] = useState(true);
  const [rects, setRects] = useState<Record<string, Rect | null>>({});
  const logoRef = useRef<View>(null);
  const displayRef = useRef<View>(null);
  const headingRef = useRef<View>(null);
  const thankyouRef = useRef<View>(null);
  const scrollRef = useRef<ScrollView>(null);
  const contentRef = useRef<View>(null);
  const targetView = (id: string) => {
    if (id === "logo-tour") return logoRef.current;
    if (id === "display-title-tour") return displayRef.current;
    if (id === "tour-heading-2") return headingRef.current;
    return thankyouRef.current;
  };

  const measureAll = () => {
    const uniqueTargets = Array.from(new Set(steps.map((step) => step.target)));
    for (const id of uniqueTargets) {
      const view = targetView(id);
      if (!view) continue;
      view.measureInWindow((x, y, width, height) => {
        setRects((current) => ({ ...current, [id]: { x, y, width, height } }));
      });
    }
  };

  const scrollToTarget = (id: string) => {
    const view = targetView(id);
    const container = contentRef.current;
    if (!view || !container) return;
    view.measureLayout(
      container as never,
      (_x, y) => {
        const screenHeight = Dimensions.get("window").height;
        const targetY = Math.max(0, y - 120);
        scrollRef.current?.scrollTo({ y: targetY, animated: true });
      },
      () => undefined,
    );
  };

  useEffect(() => {
    if (run) {
      const timer = setTimeout(measureAll, 350);
      const interval = setInterval(measureAll, 600);
      return () => { clearTimeout(timer); clearInterval(interval); };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);

  const handleStepChange = (index: number) => {
    if (!run) return;
    const step = steps[index];
    if (step && step.placement !== "center") {
      setTimeout(() => scrollToTarget(step.target), 120);
    }
    setTimeout(measureAll, 450);
  };

  const { isDark } = useThemeRuntime();
  const logo = isDark
    ? require("@/assets/images/logos/logo-light-ltr.jpg")
    : require("@/assets/images/logos/logo-dark-ltr.jpg");

  return (
    <>
      <UiTour run={run} steps={steps} rects={rects} onIndexChange={handleStepChange} onClose={() => setRun(false)} />

      <ScrollView
        ref={scrollRef}
        nestedScrollEnabled
        style={{ height: Dimensions.get("window").height - 200 }}
        contentContainerStyle={{ padding: 4 }}
      >
        <View ref={contentRef}>
          <UiCard>
            <UiCardBody>
              <View className="items-center">
                <View ref={logoRef} className="rounded-md">
                  <Image source={logo} resizeMode="contain" style={{ height: 40, width: 160 }} />
                </View>
              </View>

              <View className="mt-8 gap-6">
                <View ref={displayRef} className="rounded-md border border-border bg-card p-5">
                  <Text className="text-3xl font-bold text-foreground">This is a Heading 1</Text>
                  <Text className="mt-2 text-muted">
                    Use this first step to focus the user on the page purpose. The highlight can target a full hero, a title or any practical feature zone.
                  </Text>
                </View>

                <View className="gap-4">
                  {headings.map((item, index) => (
                    <View key={item.title} ref={index === 0 ? headingRef : undefined} className="rounded-md border border-border bg-card p-5">
                      <Text className={`${item.className} text-foreground`}>{item.title}</Text>
                      <Text className="mt-2 text-sm leading-6 text-muted">{item.body}</Text>
                    </View>
                  ))}
                </View>

                <View className="gap-4">
                  <View className="rounded-md border border-border bg-card p-5">
                    <Text className="text-base font-semibold text-foreground">Feature hint</Text>
                    <Text className="mt-2 text-sm text-muted">Explain small controls, filters or shortcuts with a focused step.</Text>
                  </View>
                  <View className="rounded-md border border-border bg-card p-5">
                    <Text className="text-base font-semibold text-foreground">Workflow hint</Text>
                    <Text className="mt-2 text-sm text-muted">Chain steps to teach a sequence without opening a separate page.</Text>
                  </View>
                  <View className="rounded-md border border-border bg-card p-5">
                    <Text className="text-base font-semibold text-foreground">Mobile hint</Text>
                    <Text className="mt-2 text-sm text-muted">The overlay can guide users on compact layouts too.</Text>
                  </View>
                </View>

                <View className="items-center pt-2">
                  <View ref={thankyouRef}>
                    <UiButton tone="danger" onPress={() => setRun(true)}>Thank you!</UiButton>
                  </View>
                </View>
              </View>
            </UiCardBody>
          </UiCard>
        </View>
      </ScrollView>
    </>
  );
}
