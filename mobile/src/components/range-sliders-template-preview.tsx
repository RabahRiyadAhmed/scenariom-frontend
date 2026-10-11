import { useRef, useState } from "react";
import { Text, View } from "react-native";
import { UiCard, UiCardBody, UiRangeSlider } from "@scenariom/design-system/ui/native";

function RangeSliderRange({ min = 0, max = 100, step = 1, value, onChange }: { min?: number; max?: number; step?: number; value: [number, number]; onChange: (value: [number, number]) => void }) {
  const [from, to] = value;
  const trackWidth = useRef(0);
  const activeThumb = useRef<"from" | "to" | null>(null);
  const left = Math.max(0, Math.min(100, ((from - min) / (max - min || 1)) * 100));
  const right = Math.max(0, Math.min(100, ((to - min) / (max - min || 1)) * 100));

  const valueFromX = (x: number) => {
    if (trackWidth.current <= 0) return min;
    const clampedX = Math.max(0, Math.min(trackWidth.current, x));
    return min + (clampedX / trackWidth.current) * (max - min);
  };

  const updateThumb = (x: number) => {
    const snapped = Math.min(max, Math.max(min, Math.round((valueFromX(x) - min) / step) * step + min));
    if (activeThumb.current === "from") {
      onChange([Math.min(snapped, to - step), to]);
    } else if (activeThumb.current === "to") {
      onChange([from, Math.max(snapped, from + step)]);
    }
  };

  return (
    <View
      onLayout={(event) => (trackWidth.current = event.nativeEvent.layout.width)}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderGrant={(event) => {
        const x = event.nativeEvent.locationX;
        const raw = valueFromX(x);
        activeThumb.current = Math.abs(raw - from) <= Math.abs(raw - to) ? "from" : "to";
        updateThumb(x);
      }}
      onResponderMove={(event) => updateThumb(event.nativeEvent.locationX)}
      onResponderRelease={() => { activeThumb.current = null; }}
      onResponderTerminate={() => { activeThumb.current = null; }}
      className="h-10 justify-center"
    >
      <View className="h-2 rounded-full bg-card" />
      <View className="absolute h-2 rounded-full bg-primary" style={{ left: `${left}%`, width: `${right - left}%` }} />
      <View pointerEvents="none" className="absolute size-5 rounded-full border-2 border-surface bg-primary" style={{ left: `${left}%`, transform: [{ translateX: -10 }] }} />
      <View pointerEvents="none" className="absolute size-5 rounded-full border-2 border-surface bg-primary" style={{ left: `${right}%`, transform: [{ translateX: -10 }] }} />
    </View>
  );
}

function Demo({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <UiCard>
      <UiCardBody>
        <Text className="text-base font-semibold text-foreground">{title}</Text>
        <Text className="mt-2 text-sm text-muted">{description}</Text>
        <View className="mt-5 gap-2">{children}</View>
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
    <View className="flex-row flex-wrap gap-5">
      <View className="w-full xl:w-[calc(50%-10px)]">
        <Demo title="Single" description="Slider with single selector.">
          <UiRangeSlider label="Volume" value={single} onValueChange={setSingle} min={0} max={100} valueLabel={`${single.toFixed(2)}%`} />
          <Text className="text-sm text-muted">Value: {single.toFixed(2)}, {single.toFixed(2)}%</Text>
        </Demo>
      </View>
      <View className="w-full xl:w-[calc(50%-10px)]">
        <Demo title="Range" description="Slider with range selector.">
          <RangeSliderRange min={10} max={150} value={range} onChange={setRange} />
          <Text className="text-sm text-muted">Value: {range[0].toFixed(2)}-{range[1].toFixed(2)}</Text>
        </Demo>
      </View>
      <View className="w-full xl:w-[calc(50%-10px)]">
        <Demo title="Slider Step" description="Slider with fixed step value.">
          <UiRangeSlider label="Step" value={step} onValueChange={setStep} min={0} max={100} step={10} valueLabel={`${step.toFixed(2)}%`} />
          <Text className="text-sm text-muted">Value: {step.toFixed(2)}, {step.toFixed(2)}%</Text>
        </Demo>
      </View>
      <View className="w-full xl:w-[calc(50%-10px)]">
        <Demo title="Range Slider with Steps" description="Slider with range selector and fixed step value.">
          <RangeSliderRange min={10} max={150} step={15} value={rangeStep} onChange={setRangeStep} />
          <Text className="text-sm text-muted">Value: {rangeStep[0].toFixed(2)}-{rangeStep[1].toFixed(2)}</Text>
        </Demo>
      </View>
    </View>
  );
}
