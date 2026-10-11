import { useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import { UiButton, UiCard, UiCardBody, UiCombobox } from "@scenariom/design-system/ui/native";

const animationGroups: Array<{ label: string; items: string[] }> = [
  { label: "Attention Seekers", items: ["bounce", "flash", "pulse", "rubberBand", "shakeX", "shakeY", "headShake", "swing", "tada", "wobble", "jello", "heartBeat"] },
  { label: "Back entrances", items: ["backInDown", "backInLeft", "backInRight", "backInUp"] },
  { label: "Back exits", items: ["backOutDown", "backOutLeft", "backOutRight", "backOutUp"] },
  { label: "Bouncing entrances", items: ["bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp"] },
  { label: "Bouncing exits", items: ["bounceOut", "bounceOutDown", "bounceOutLeft", "bounceOutRight", "bounceOutUp"] },
  { label: "Fading entrances", items: ["fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig", "fadeInTopLeft", "fadeInTopRight", "fadeInBottomLeft", "fadeInBottomRight"] },
  { label: "Fading exits", items: ["fadeOut", "fadeOutDown", "fadeOutDownBig", "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig", "fadeOutUp", "fadeOutUpBig", "fadeOutTopLeft", "fadeOutTopRight", "fadeOutBottomRight", "fadeOutBottomLeft"] },
  { label: "Flippers", items: ["flip", "flipInX", "flipInY", "flipOutX", "flipOutY"] },
  { label: "Lightspeed", items: ["lightSpeedInRight", "lightSpeedInLeft", "lightSpeedOutRight", "lightSpeedOutLeft"] },
  { label: "Rotating entrances", items: ["rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight"] },
  { label: "Rotating exits", items: ["rotateOut", "rotateOutDownLeft", "rotateOutDownRight", "rotateOutUpLeft", "rotateOutUpRight"] },
  { label: "Specials", items: ["hinge", "jackInTheBox", "rollIn", "rollOut"] },
  { label: "Sliding entrances", items: ["slideInDown", "slideInLeft", "slideInRight", "slideInUp"] },
  { label: "Sliding exits", items: ["slideOutDown", "slideOutLeft", "slideOutRight", "slideOutUp"] },
  { label: "Zooming entrances", items: ["zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp"] },
  { label: "Zooming exits", items: ["zoomOut", "zoomOutDown", "zoomOutLeft", "zoomOutRight", "zoomOutUp"] },
];

const previewImage = require("@/assets/images/template-assets/small/img-1.jpg");
const DURATION = 1000;

type AnimValues = {
  opacity: Animated.Value;
  scale: Animated.Value;
  translateX: Animated.Value;
  translateY: Animated.Value;
  rotate: Animated.Value;
  rotateX: Animated.Value;
  rotateY: Animated.Value;
};

const DEFAULTS = { opacity: 1, scale: 1, translateX: 0, translateY: 0, rotate: 0, rotateX: 0, rotateY: 0 };

type Built = {
  initial: Partial<typeof DEFAULTS>;
  anim: Animated.CompositeAnimation;
};

function buildAnimation(name: string, v: AnimValues): Built {
  const t = (val: Animated.Value, to: number, dur = DURATION) =>
    Animated.timing(val, { toValue: to, duration: dur, useNativeDriver: true });
  const s = (val: Animated.Value, to: number) =>
    Animated.spring(val, { toValue: to, tension: 40, friction: 4, useNativeDriver: true });
  const seq = (steps: Animated.CompositeAnimation[]) => Animated.sequence(steps);
  const par = (steps: Animated.CompositeAnimation[]) => Animated.parallel(steps);

  // Entry helper: element starts hidden, animates to default.
  const fadeIn = (initial: Partial<typeof DEFAULTS>, anim: Animated.CompositeAnimation): Built => ({ initial: { opacity: 0, ...initial }, anim });
  const exit = (anim: Animated.CompositeAnimation): Built => ({ initial: {}, anim });

  switch (name) {
    // ── Attention Seekers ──
    case "bounce": return { initial: {}, anim: seq([t(v.translateY, -30, 400), t(v.translateY, 0, 200), t(v.translateY, -15, 300), t(v.translateY, 0, 150), t(v.translateY, -4, 200), t(v.translateY, 0, 100)]) };
    case "flash": return { initial: {}, anim: seq([t(v.opacity, 0, 250), t(v.opacity, 1, 250), t(v.opacity, 0, 250), t(v.opacity, 1, 250)]) };
    case "pulse": return { initial: {}, anim: seq([t(v.scale, 1.1, 500), t(v.scale, 1, 500)]) };
    case "rubberBand": return { initial: {}, anim: seq([t(v.scale, 1.25, 300), t(v.scale, 0.75, 100), t(v.scale, 1.15, 100), t(v.scale, 0.95, 100), t(v.scale, 1.05, 100), t(v.scale, 1, 100)]) };
    case "shakeX": return { initial: {}, anim: seq([t(v.translateX, -10, 100), t(v.translateX, 10, 100), t(v.translateX, -10, 100), t(v.translateX, 10, 100), t(v.translateX, -10, 100), t(v.translateX, 10, 100), t(v.translateX, 0, 100)]) };
    case "shakeY": return { initial: {}, anim: seq([t(v.translateY, -10, 100), t(v.translateY, 10, 100), t(v.translateY, -10, 100), t(v.translateY, 10, 100), t(v.translateY, -10, 100), t(v.translateY, 10, 100), t(v.translateY, 0, 100)]) };
    case "headShake": return { initial: {}, anim: seq([par([t(v.translateX, -6, 125), t(v.rotate, -9, 125)]), par([t(v.translateX, 5, 125), t(v.rotate, 7, 125)]), par([t(v.translateX, -3, 125), t(v.rotate, -5, 125)]), par([t(v.translateX, 2, 125), t(v.rotate, 3, 125)]), par([t(v.translateX, 0, 125), t(v.rotate, 0, 125)])]) };
    case "swing": return { initial: {}, anim: seq([t(v.rotate, 10, 200), t(v.rotate, -10, 200), t(v.rotate, 5, 200), t(v.rotate, -5, 200), t(v.rotate, 0, 200)]) };
    case "tada": return { initial: {}, anim: seq([par([t(v.scale, 0.9, 100), t(v.rotate, -3, 100)]), par([t(v.scale, 1.1, 100), t(v.rotate, -3, 100)]), par([t(v.rotate, 3, 100), t(v.scale, 1.1, 100)]), t(v.rotate, -3, 100), t(v.rotate, 3, 100), par([t(v.scale, 1, 100), t(v.rotate, 0, 100)])]) };
    case "wobble": return { initial: {}, anim: seq([par([t(v.translateX, -50, 200), t(v.rotate, -5, 200)]), par([t(v.translateX, 40, 200), t(v.rotate, 3, 200)]), par([t(v.translateX, -30, 200), t(v.rotate, -3, 200)]), par([t(v.translateX, 20, 200), t(v.rotate, 2, 200)]), par([t(v.translateX, -10, 100), t(v.rotate, -1, 100)]), par([t(v.translateX, 0, 100), t(v.rotate, 0, 100)])]) };
    case "jello": return { initial: {}, anim: seq([t(v.rotate, -12, 200), t(v.rotate, 8, 150), t(v.rotate, -5, 150), t(v.rotate, 3, 150), t(v.rotate, -1, 150), t(v.rotate, 0, 200)]) };
    case "heartBeat": return { initial: {}, anim: seq([t(v.scale, 1.3, 250), t(v.scale, 1, 250), t(v.scale, 1.3, 250), t(v.scale, 1, 250)]) };

    // ── Back entrances (scale up from smaller with translate) ──
    case "backInDown": return fadeIn({ translateY: -600, scale: 0.7 }, par([t(v.opacity, 1, 300), seq([t(v.translateY, 60, 700), s(v.translateY, 0), s(v.scale, 1)])]));
    case "backInLeft": return fadeIn({ translateX: -600, scale: 0.7 }, par([t(v.opacity, 1, 300), seq([t(v.translateX, 60, 700), s(v.translateX, 0), s(v.scale, 1)])]));
    case "backInRight": return fadeIn({ translateX: 600, scale: 0.7 }, par([t(v.opacity, 1, 300), seq([t(v.translateX, -60, 700), s(v.translateX, 0), s(v.scale, 1)])]));
    case "backInUp": return fadeIn({ translateY: 600, scale: 0.7 }, par([t(v.opacity, 1, 300), seq([t(v.translateY, -60, 700), s(v.translateY, 0), s(v.scale, 1)])]));

    // ── Back exits ──
    case "backOutDown": return exit(seq([t(v.translateY, -60, 200), s(v.scale, 0.7), t(v.translateY, 600, 500), t(v.opacity, 0, 300)]));
    case "backOutLeft": return exit(seq([t(v.translateX, 60, 200), s(v.scale, 0.7), t(v.translateX, -600, 500), t(v.opacity, 0, 300)]));
    case "backOutRight": return exit(seq([t(v.translateX, -60, 200), s(v.scale, 0.7), t(v.translateX, 600, 500), t(v.opacity, 0, 300)]));
    case "backOutUp": return exit(seq([t(v.translateY, 60, 200), s(v.scale, 0.7), t(v.translateY, -600, 500), t(v.opacity, 0, 300)]));

    // ── Bouncing entrances ──
    case "bounceIn": return fadeIn({ scale: 0.3 }, par([t(v.opacity, 1, 300), seq([s(v.scale, 1.1), s(v.scale, 0.9), s(v.scale, 1.03), s(v.scale, 0.97), s(v.scale, 1)])]));
    case "bounceInDown": return fadeIn({ translateY: -600 }, par([t(v.opacity, 1, 300), seq([t(v.translateY, 25, 600), s(v.translateY, -10), s(v.translateY, 5), s(v.translateY, 0)])]));
    case "bounceInLeft": return fadeIn({ translateX: -600 }, par([t(v.opacity, 1, 300), seq([t(v.translateX, 25, 600), s(v.translateX, -10), s(v.translateX, 5), s(v.translateX, 0)])]));
    case "bounceInRight": return fadeIn({ translateX: 600 }, par([t(v.opacity, 1, 300), seq([t(v.translateX, -25, 600), s(v.translateX, 10), s(v.translateX, -5), s(v.translateX, 0)])]));
    case "bounceInUp": return fadeIn({ translateY: 600 }, par([t(v.opacity, 1, 300), seq([t(v.translateY, -20, 600), s(v.translateY, 10), s(v.translateY, -5), s(v.translateY, 0)])]));

    // ── Bouncing exits ──
    case "bounceOut": return exit(seq([t(v.scale, 0.9, 200), t(v.scale, 1.1, 200), t(v.scale, 1.1, 200), par([t(v.opacity, 0, 300), t(v.scale, 0.3, 300)])]));
    case "bounceOutDown": return exit(seq([t(v.translateY, 10, 200), t(v.translateY, -20, 100), t(v.translateY, 20, 100), par([t(v.translateY, 500, 400), t(v.opacity, 0, 400)])]));
    case "bounceOutLeft": return exit(seq([t(v.translateX, 20, 200), t(v.translateX, -20, 100), par([t(v.translateX, -500, 400), t(v.opacity, 0, 400)])]));
    case "bounceOutRight": return exit(seq([t(v.translateX, -20, 200), t(v.translateX, 20, 100), par([t(v.translateX, 500, 400), t(v.opacity, 0, 400)])]));
    case "bounceOutUp": return exit(seq([t(v.translateY, -10, 200), t(v.translateY, 20, 100), t(v.translateY, -20, 100), par([t(v.translateY, -500, 400), t(v.opacity, 0, 400)])]));

    // ── Fading entrances ──
    case "fadeIn": return fadeIn({}, t(v.opacity, 1, DURATION));
    case "fadeInDown": return fadeIn({ translateY: -100 }, par([t(v.opacity, 1, DURATION), t(v.translateY, 0, DURATION)]));
    case "fadeInDownBig": return fadeIn({ translateY: -500 }, par([t(v.opacity, 1, DURATION), t(v.translateY, 0, DURATION)]));
    case "fadeInLeft": return fadeIn({ translateX: -100 }, par([t(v.opacity, 1, DURATION), t(v.translateX, 0, DURATION)]));
    case "fadeInLeftBig": return fadeIn({ translateX: -500 }, par([t(v.opacity, 1, DURATION), t(v.translateX, 0, DURATION)]));
    case "fadeInRight": return fadeIn({ translateX: 100 }, par([t(v.opacity, 1, DURATION), t(v.translateX, 0, DURATION)]));
    case "fadeInRightBig": return fadeIn({ translateX: 500 }, par([t(v.opacity, 1, DURATION), t(v.translateX, 0, DURATION)]));
    case "fadeInUp": return fadeIn({ translateY: 100 }, par([t(v.opacity, 1, DURATION), t(v.translateY, 0, DURATION)]));
    case "fadeInUpBig": return fadeIn({ translateY: 500 }, par([t(v.opacity, 1, DURATION), t(v.translateY, 0, DURATION)]));
    case "fadeInTopLeft": return fadeIn({ translateX: -100, translateY: -100 }, par([t(v.opacity, 1, DURATION), t(v.translateX, 0, DURATION), t(v.translateY, 0, DURATION)]));
    case "fadeInTopRight": return fadeIn({ translateX: 100, translateY: -100 }, par([t(v.opacity, 1, DURATION), t(v.translateX, 0, DURATION), t(v.translateY, 0, DURATION)]));
    case "fadeInBottomLeft": return fadeIn({ translateX: -100, translateY: 100 }, par([t(v.opacity, 1, DURATION), t(v.translateX, 0, DURATION), t(v.translateY, 0, DURATION)]));
    case "fadeInBottomRight": return fadeIn({ translateX: 100, translateY: 100 }, par([t(v.opacity, 1, DURATION), t(v.translateX, 0, DURATION), t(v.translateY, 0, DURATION)]));

    // ── Fading exits ──
    case "fadeOut": return exit(t(v.opacity, 0, DURATION));
    case "fadeOutDown": return exit(par([t(v.opacity, 0, DURATION), t(v.translateY, 100, DURATION)]));
    case "fadeOutDownBig": return exit(par([t(v.opacity, 0, DURATION), t(v.translateY, 500, DURATION)]));
    case "fadeOutLeft": return exit(par([t(v.opacity, 0, DURATION), t(v.translateX, -100, DURATION)]));
    case "fadeOutLeftBig": return exit(par([t(v.opacity, 0, DURATION), t(v.translateX, -500, DURATION)]));
    case "fadeOutRight": return exit(par([t(v.opacity, 0, DURATION), t(v.translateX, 100, DURATION)]));
    case "fadeOutRightBig": return exit(par([t(v.opacity, 0, DURATION), t(v.translateX, 500, DURATION)]));
    case "fadeOutUp": return exit(par([t(v.opacity, 0, DURATION), t(v.translateY, -100, DURATION)]));
    case "fadeOutUpBig": return exit(par([t(v.opacity, 0, DURATION), t(v.translateY, -500, DURATION)]));
    case "fadeOutTopLeft": return exit(par([t(v.opacity, 0, DURATION), t(v.translateX, -100, DURATION), t(v.translateY, -100, DURATION)]));
    case "fadeOutTopRight": return exit(par([t(v.opacity, 0, DURATION), t(v.translateX, 100, DURATION), t(v.translateY, -100, DURATION)]));
    case "fadeOutBottomRight": return exit(par([t(v.opacity, 0, DURATION), t(v.translateX, 100, DURATION), t(v.translateY, 100, DURATION)]));
    case "fadeOutBottomLeft": return exit(par([t(v.opacity, 0, DURATION), t(v.translateX, -100, DURATION), t(v.translateY, 100, DURATION)]));

    // ── Flippers (3D rotateX / rotateY with perspective) ──
    case "flip": return { initial: {}, anim: seq([t(v.rotateY, -360, 400), t(v.scale, 1.1, 150), t(v.scale, 0.95, 100), t(v.scale, 1, 100), t(v.rotateY, 0, 250)]) };
    case "flipInX": return fadeIn({ rotateX: 90 }, seq([par([t(v.opacity, 1, 400), t(v.rotateX, -20, 400)]), t(v.rotateX, 10, 200), t(v.rotateX, -5, 200), t(v.rotateX, 0, 200)]));
    case "flipInY": return fadeIn({ rotateY: 90 }, seq([par([t(v.opacity, 1, 400), t(v.rotateY, -20, 400)]), t(v.rotateY, 10, 200), t(v.rotateY, -5, 200), t(v.rotateY, 0, 200)]));
    case "flipOutX": return exit(seq([t(v.rotateX, -20, 300), par([t(v.opacity, 0, 400), t(v.rotateX, 90, 400)])]));
    case "flipOutY": return exit(seq([t(v.rotateY, -20, 300), par([t(v.opacity, 0, 400), t(v.rotateY, 90, 400)])]));

    // ── Lightspeed ──
    case "lightSpeedInRight": return fadeIn({ translateX: 200 }, par([t(v.opacity, 1, DURATION), t(v.translateX, 0, DURATION)]));
    case "lightSpeedInLeft": return fadeIn({ translateX: -200 }, par([t(v.opacity, 1, DURATION), t(v.translateX, 0, DURATION)]));
    case "lightSpeedOutRight": return exit(par([t(v.opacity, 0, DURATION), t(v.translateX, 200, DURATION)]));
    case "lightSpeedOutLeft": return exit(par([t(v.opacity, 0, DURATION), t(v.translateX, -200, DURATION)]));

    // ── Rotating entrances ──
    case "rotateIn": return fadeIn({ rotate: -200 }, par([t(v.opacity, 1, DURATION), t(v.rotate, 0, DURATION)]));
    case "rotateInDownLeft": return fadeIn({ rotate: -45 }, par([t(v.opacity, 1, DURATION), t(v.rotate, 0, DURATION)]));
    case "rotateInDownRight": return fadeIn({ rotate: 45 }, par([t(v.opacity, 1, DURATION), t(v.rotate, 0, DURATION)]));
    case "rotateInUpLeft": return fadeIn({ rotate: 45 }, par([t(v.opacity, 1, DURATION), t(v.rotate, 0, DURATION)]));
    case "rotateInUpRight": return fadeIn({ rotate: -45 }, par([t(v.opacity, 1, DURATION), t(v.rotate, 0, DURATION)]));

    // ── Rotating exits ──
    case "rotateOut": return exit(par([t(v.opacity, 0, DURATION), t(v.rotate, 200, DURATION)]));
    case "rotateOutDownLeft": return exit(par([t(v.opacity, 0, DURATION), t(v.rotate, 45, DURATION)]));
    case "rotateOutDownRight": return exit(par([t(v.opacity, 0, DURATION), t(v.rotate, -45, DURATION)]));
    case "rotateOutUpLeft": return exit(par([t(v.opacity, 0, DURATION), t(v.rotate, -45, DURATION)]));
    case "rotateOutUpRight": return exit(par([t(v.opacity, 0, DURATION), t(v.rotate, 45, DURATION)]));

    // ── Specials ──
    case "hinge": return exit(seq([t(v.rotate, 80, 200), t(v.rotate, 60, 200), t(v.rotate, 80, 200), t(v.rotate, 60, 200), par([t(v.translateY, 700, 300), t(v.opacity, 0, 300)])]));
    case "jackInTheBox": return fadeIn({ scale: 0.1, rotate: 30 }, seq([par([t(v.opacity, 1, 500), t(v.rotate, -10, 500)]), t(v.rotate, 3, 150), t(v.rotate, 0, 150), s(v.scale, 1)]));
    case "rollIn": return fadeIn({ translateX: -100, rotate: -120 }, par([t(v.opacity, 1, DURATION), t(v.translateX, 0, DURATION), t(v.rotate, 0, DURATION)]));
    case "rollOut": return exit(par([t(v.opacity, 0, DURATION), t(v.translateX, 100, DURATION), t(v.rotate, 120, DURATION)]));

    // ── Sliding entrances ──
    case "slideInDown": return { initial: { translateY: -300 }, anim: t(v.translateY, 0, DURATION) };
    case "slideInLeft": return { initial: { translateX: -300 }, anim: t(v.translateX, 0, DURATION) };
    case "slideInRight": return { initial: { translateX: 300 }, anim: t(v.translateX, 0, DURATION) };
    case "slideInUp": return { initial: { translateY: 300 }, anim: t(v.translateY, 0, DURATION) };

    // ── Sliding exits ──
    case "slideOutDown": return exit(t(v.translateY, 300, DURATION));
    case "slideOutLeft": return exit(t(v.translateX, -300, DURATION));
    case "slideOutRight": return exit(t(v.translateX, 300, DURATION));
    case "slideOutUp": return exit(t(v.translateY, -300, DURATION));

    // ── Zooming entrances ──
    case "zoomIn": return fadeIn({ scale: 0.3 }, par([t(v.opacity, 1, 500), s(v.scale, 1)]));
    case "zoomInDown": return fadeIn({ scale: 0.1, translateY: -500 }, par([t(v.opacity, 1, 600), t(v.scale, 0.475, 600), t(v.translateY, 60, 600), s(v.scale, 1), s(v.translateY, 0)]));
    case "zoomInLeft": return fadeIn({ scale: 0.1, translateX: -500 }, par([t(v.opacity, 1, 600), t(v.scale, 0.475, 600), t(v.translateX, 60, 600), s(v.scale, 1), s(v.translateX, 0)]));
    case "zoomInRight": return fadeIn({ scale: 0.1, translateX: 500 }, par([t(v.opacity, 1, 600), t(v.scale, 0.475, 600), t(v.translateX, -60, 600), s(v.scale, 1), s(v.translateX, 0)]));
    case "zoomInUp": return fadeIn({ scale: 0.1, translateY: 500 }, par([t(v.opacity, 1, 600), t(v.scale, 0.475, 600), t(v.translateY, -60, 600), s(v.scale, 1), s(v.translateY, 0)]));

    // ── Zooming exits ──
    case "zoomOut": return exit(seq([t(v.scale, 0.3, 500), t(v.opacity, 0, 500)]));
    case "zoomOutDown": return exit(seq([t(v.scale, 0.475, 300), par([t(v.opacity, 0, 400), t(v.scale, 0.1, 400), t(v.translateY, 500, 400)])]));
    case "zoomOutLeft": return exit(seq([t(v.scale, 0.475, 300), par([t(v.opacity, 0, 400), t(v.scale, 0.1, 400), t(v.translateX, -500, 400)])]));
    case "zoomOutRight": return exit(seq([t(v.scale, 0.475, 300), par([t(v.opacity, 0, 400), t(v.scale, 0.1, 400), t(v.translateX, 500, 400)])]));
    case "zoomOutUp": return exit(seq([t(v.scale, 0.475, 300), par([t(v.opacity, 0, 400), t(v.scale, 0.1, 400), t(v.translateY, -500, 400)])]));

    default: return { initial: {}, anim: t(v.opacity, 1, DURATION) };
  }
}

export function AnimationTemplatePreview() {
  const [animation, setAnimation] = useState("bounce");
  const [opacity] = useState(() => new Animated.Value(1));
  const [scale] = useState(() => new Animated.Value(1));
  const [translateX] = useState(() => new Animated.Value(0));
  const [translateY] = useState(() => new Animated.Value(0));
  const [rotate] = useState(() => new Animated.Value(0));
  const [rotateX] = useState(() => new Animated.Value(0));
  const [rotateY] = useState(() => new Animated.Value(0));
  const currentAnim = useRef<Animated.CompositeAnimation | null>(null);

  const values: AnimValues = { opacity, scale, translateX, translateY, rotate, rotateX, rotateY };

  const reset = () => {
    opacity.setValue(DEFAULTS.opacity);
    scale.setValue(DEFAULTS.scale);
    translateX.setValue(DEFAULTS.translateX);
    translateY.setValue(DEFAULTS.translateY);
    rotate.setValue(DEFAULTS.rotate);
    rotateX.setValue(DEFAULTS.rotateX);
    rotateY.setValue(DEFAULTS.rotateY);
  };

  const run = (name: string) => {
    if (currentAnim.current) currentAnim.current.stop();
    reset();
    const built = buildAnimation(name, values);
    if (built.initial.opacity !== undefined) opacity.setValue(built.initial.opacity);
    if (built.initial.scale !== undefined) scale.setValue(built.initial.scale);
    if (built.initial.translateX !== undefined) translateX.setValue(built.initial.translateX);
    if (built.initial.translateY !== undefined) translateY.setValue(built.initial.translateY);
    if (built.initial.rotate !== undefined) rotate.setValue(built.initial.rotate);
    if (built.initial.rotateX !== undefined) rotateX.setValue(built.initial.rotateX);
    if (built.initial.rotateY !== undefined) rotateY.setValue(built.initial.rotateY);
    currentAnim.current = built.anim;
    currentAnim.current.start(() => reset());
  };

  const trigger = (value: string = animation) => {
    setAnimation(value);
    run(value);
  };

  const rotateStr = rotate.interpolate({ inputRange: [-360, 360], outputRange: ["-360deg", "360deg"] });
  const rotateXStr = rotateX.interpolate({ inputRange: [-360, 360], outputRange: ["-360deg", "360deg"] });
  const rotateYStr = rotateY.interpolate({ inputRange: [-360, 360], outputRange: ["-360deg", "360deg"] });

  const selectOptions = animationGroups.flatMap((group) => [
    { value: `__group_${group.label}`, label: `── ${group.label} ──`, disabled: true },
    ...group.items.map((item) => ({ value: item, label: item })),
  ]);

  return (
    <UiCard>
      <UiCardBody>
        <View className="gap-4">
          <View>
            <Text className="text-base font-semibold text-foreground">CSS3 Animation</Text>
            <Text className="mt-2 text-sm text-muted">Just-add-water animations using the React Native Animated API.</Text>
          </View>

          <View className="min-h-72 items-center justify-center overflow-hidden rounded-md bg-card p-6">
            <Animated.Image
              source={previewImage}
              className="rounded-lg"
              resizeMode="cover"
              style={{
                height: 240,
                width: 240,
                opacity,
                transform: [
                  { perspective: 800 },
                  { translateX },
                  { translateY },
                  { scale },
                  { rotate: rotateStr },
                  { rotateX: rotateXStr },
                  { rotateY: rotateYStr },
                ],
              }}
            />
          </View>

          <UiCombobox
            label="Animation"
            value={animation}
            options={selectOptions}
            onValueChange={trigger}
            placeholder="Select animation"
            searchPlaceholder="Search animation..."
            emptyMessage="No animation found"
            closeLabel="Close"
          />
          <UiButton onPress={() => trigger()}>Animate Me!</UiButton>
        </View>
      </UiCardBody>
    </UiCard>
  );
}
