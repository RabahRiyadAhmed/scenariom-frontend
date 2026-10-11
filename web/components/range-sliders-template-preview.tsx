"use client";
import { useState } from "react";
import { UiCard, UiCardBody, UiRangeSlider } from "@scenariom/design-system/ui";

function percent(value: number, min: number, max: number) {
  return ((value - min) / (max - min) * 100);
}

const thumbClasses = "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-[3px] [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-border [&::-webkit-slider-thumb]:bg-surface [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:mt-2 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-20 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-[3px] [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-border [&::-moz-range-thumb]:bg-surface [&::-moz-range-thumb]:shadow-md [&::-webkit-slider-runnable-track]:h-9 [&::-webkit-slider-runnable-track]:appearance-none [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:h-9 [&::-moz-range-track]:bg-transparent";

const rangeInputClasses = `pointer-events-none ${thumbClasses}`;

function RangeSliderRange({ min = 0, max = 100, step = 1, value, onChange }: { min?: number; max?: number; step?: number; value: [number, number]; onChange: (value: [number, number]) => void }) {
  const [from, to] = value;
  const left = percent(from, min, max);
  const right = percent(to, min, max);
  return (
    <div className="relative block h-9">
      <div className="absolute left-0 right-0 top-4 h-1.5 rounded-sm bg-card shadow-inner" />
      <div className="absolute top-4 h-1.5 rounded-sm bg-primary" style={{ left: `${left}%`, width: `${right - left}%` }} />
      <input
        aria-label="Range minimum"
        type="range"
        min={min}
        max={max}
        step={step}
        value={from}
        onChange={(e) => onChange([Math.min(Number(e.currentTarget.value), to - step), to])}
        className={`absolute inset-0 h-9 w-full cursor-pointer appearance-none bg-transparent outline-none ${rangeInputClasses}`}
      />
      <input
        aria-label="Range maximum"
        type="range"
        min={min}
        max={max}
        step={step}
        value={to}
        onChange={(e) => onChange([from, Math.max(Number(e.currentTarget.value), from + step)])}
        className={`absolute inset-0 h-9 w-full cursor-pointer appearance-none bg-transparent outline-none ${rangeInputClasses}`}
      />
    </div>
  );
}

function Demo({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <UiCard>
      <UiCardBody>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="mt-2 text-sm text-muted">{description}</p>
        <div className="mt-5">{children}</div>
      </UiCardBody>
    </UiCard>
  );
}

export function RangeSlidersTemplatePreview() {
  const [single, setSingle] = useState(20);
  const [step, setStep] = useState(20);
  const [range, setRange] = useState<[number, number]>([20, 45]);
  const [rangeStep, setRangeStep] = useState<[number, number]>([25, 85]);

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <Demo title="Single" description="Slider with single selector.">
        <UiRangeSlider label="Volume" value={single} onValueChange={setSingle} min={0} max={100} valueLabel={`${single.toFixed(2)}%`} />
        <p className="mt-2 text-sm text-muted">Value: {single.toFixed(2)}, {single.toFixed(2)}%</p>
      </Demo>
      <Demo title="Range" description="Slider with range selector.">
        <RangeSliderRange min={10} max={150} value={range} onChange={setRange} />
        <p className="mt-2 text-sm text-muted">Value: {range[0].toFixed(2)}-{range[1].toFixed(2)}</p>
      </Demo>
      <Demo title="Slider Step" description="Slider with fixed step value.">
        <UiRangeSlider label="Step" value={step} onValueChange={setStep} min={0} max={100} step={10} valueLabel={`${step.toFixed(2)}%`} />
        <p className="mt-2 text-sm text-muted">Value: {step.toFixed(2)}, {step.toFixed(2)}%</p>
      </Demo>
      <Demo title="Range Slider with Steps" description="Slider with range selector and fixed step value.">
        <RangeSliderRange min={10} max={150} step={15} value={rangeStep} onChange={setRangeStep} />
        <p className="mt-2 text-sm text-muted">Value: {rangeStep[0].toFixed(2)}-{rangeStep[1].toFixed(2)}</p>
      </Demo>
    </div>
  );
}
