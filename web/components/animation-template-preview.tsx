"use client";
import { useEffect, useRef, useState } from "react";
import "animate.css";
import { UiButton, UiCard, UiCardBody } from "@scenariom/design-system/ui";

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

export function AnimationTemplatePreview() {
  const [animation, setAnimation] = useState("bounce");
  const sandboxRef = useRef<HTMLDivElement>(null);

  const testAnim = (name: string) => {
    const el = sandboxRef.current;
    if (!el) return;
    const cls = `animate__${name} animate__animated`;
    el.classList.remove(...el.classList);
    el.classList.add(...cls.split(" "));
    el.addEventListener("animationend", () => el.classList.remove(...cls.split(" ")), { once: true });
  };

  const trigger = (value: string = animation) => {
    setAnimation(value);
    testAnim(value);
  };

  return (
    <UiCard>
      <UiCardBody>
        <h2 className="text-base font-semibold text-foreground">CSS3 Animation</h2>
        <p className="mt-2 text-sm text-muted">Just-add-water CSS animations.</p>

        <div className="mt-8 flex min-h-72 items-center justify-center overflow-hidden rounded-md bg-card p-6">
          <div ref={sandboxRef}>
            <img src="/assets/images/template-assets/small/img-1.jpg" alt="Animation preview" className="max-h-72 rounded-lg object-cover" />
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-[1fr_auto]">
          <select
            value={animation}
            onChange={(e) => trigger(e.target.value)}
            className="min-h-10 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-primary"
          >
            {animationGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.items.map((item) => <option key={item} value={item}>{item}</option>)}
              </optgroup>
            ))}
          </select>
          <UiButton onPress={() => trigger()}>Animate Me!</UiButton>
        </div>
      </UiCardBody>
    </UiCard>
  );
}
