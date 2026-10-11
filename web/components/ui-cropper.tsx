"use client";

import { useRef, useState, type ChangeEvent, type PointerEvent } from "react";
import { UiButton } from "@scenariom/design-system/ui";

type Crop = { x: number; y: number; width: number; height: number; aspect: number | null };
type DragMode = "move" | "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
const fullCrop: Crop = { x: 0, y: 0, width: 100, height: 100, aspect: null };
const formats = [["Free", null], ["1:1", 1], ["4:3", 4 / 3], ["16:9", 16 / 9], ["3:4", 3 / 4], ["9:16", 9 / 16]] as const;
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const fit = (value: Crop): Crop => {
  const width = clamp(value.width, 8, 100), height = clamp(value.height, 8, 100);
  return { ...value, width, height, x: clamp(value.x, 0, 100 - width), y: clamp(value.y, 0, 100 - height) };
};

export function UiCropper({ alt = "", onExport }: { alt?: string; onExport?: (dataUrl: string) => void }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<{ mode: DragMode; x: number; y: number; crop: Crop } | null>(null);
  const [imageSrc, setImageSrc] = useState<string>();
  const [crop, setCrop] = useState<Crop>(fullCrop);
  const [imageRatio, setImageRatio] = useState(16 / 9);
  const update = (next: Crop) => setCrop(fit(next));
  const setFormat = (aspect: number | null) => {
    if (aspect === null) return setCrop(fullCrop);
    const stageRatio = imageRatio;
    let width = 88, height = (width * stageRatio) / aspect;
    if (height > 88) { height = 88; width = (height * aspect) / stageRatio; }
    update({ x: (100 - width) / 2, y: (100 - height) / 2, width, height, aspect });
  };
  const choose = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0]; if (!file) return;
    setImageSrc(URL.createObjectURL(file)); setCrop(fullCrop); event.currentTarget.value = "";
  };
  const start = (event: PointerEvent<HTMLElement>, mode: DragMode) => {
    event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { mode, x: event.clientX, y: event.clientY, crop };
  };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current, stage = stageRef.current?.getBoundingClientRect(); if (!drag || !stage) return;
    const dx = ((event.clientX - drag.x) / stage.width) * 100, dy = ((event.clientY - drag.y) / stage.height) * 100;
    if (drag.mode === "move") return update({ ...drag.crop, x: drag.crop.x + dx, y: drag.crop.y + dy });
    const next = { ...drag.crop }, left = drag.mode.includes("w"), right = drag.mode.includes("e"), top = drag.mode.includes("n"), bottom = drag.mode.includes("s");
    if (left) { const x = clamp(drag.crop.x + dx, 0, drag.crop.x + drag.crop.width - 8); next.x = x; next.width = drag.crop.width + drag.crop.x - x; }
    if (right) next.width = clamp(drag.crop.width + dx, 8, 100 - drag.crop.x);
    if (top) { const y = clamp(drag.crop.y + dy, 0, drag.crop.y + drag.crop.height - 8); next.y = y; next.height = drag.crop.height + drag.crop.y - y; }
    if (bottom) next.height = clamp(drag.crop.height + dy, 8, 100 - drag.crop.y);
    if (drag.crop.aspect) {
      const height = clamp((next.width * imageRatio) / drag.crop.aspect, 8, 100 - next.y);
      if (top && !bottom) next.y = clamp(drag.crop.y + drag.crop.height - height, 0, 100 - height);
      next.height = height;
    }
    update(next);
  };
  const exportCrop = () => {
    if (!imageSrc) return;
    const image = new Image(); image.crossOrigin = "anonymous";
    image.onload = () => { const canvas = document.createElement("canvas"), sx = image.naturalWidth * crop.x / 100, sy = image.naturalHeight * crop.y / 100, sw = image.naturalWidth * crop.width / 100, sh = image.naturalHeight * crop.height / 100, width = 1200; canvas.width = width; canvas.height = Math.round(width * sh / sw); canvas.getContext("2d")?.drawImage(image, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height); onExport?.(canvas.toDataURL("image/png")); }; image.src = imageSrc;
  };
  const handles: [DragMode, string][] = [["n", "left-1/2 top-0 h-3 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ns-resize"], ["s", "bottom-0 left-1/2 h-3 w-10 -translate-x-1/2 translate-y-1/2 cursor-ns-resize"], ["e", "right-0 top-1/2 h-10 w-3 -translate-y-1/2 translate-x-1/2 cursor-ew-resize"], ["w", "left-0 top-1/2 h-10 w-3 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize"], ["nw", "-left-2 -top-2 size-5 cursor-nwse-resize"], ["ne", "-right-2 -top-2 size-5 cursor-nesw-resize"], ["sw", "-bottom-2 -left-2 size-5 cursor-nesw-resize"], ["se", "-bottom-2 -right-2 size-5 cursor-nwse-resize"]];
  if (!imageSrc) return <section className="rounded-md border border-border bg-surface p-4"><h3 className="text-base font-semibold">Image cropper</h3><p className="mt-2 text-sm text-muted">Choose an image to open the crop area.</p><input ref={inputRef} className="hidden" type="file" accept="image/*" onChange={choose}/><UiButton className="mt-4" onPress={() => inputRef.current?.click()}>Crop image</UiButton></section>;
  return <section className="rounded-md border border-border bg-surface p-4"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h3 className="text-base font-semibold">Image cropper</h3><div className="flex flex-wrap gap-2"><input ref={inputRef} className="hidden" type="file" accept="image/*" onChange={choose}/><UiButton size="sm" tone="secondary" variant="soft" onPress={() => inputRef.current?.click()}>Select image</UiButton><UiButton size="sm" tone="secondary" variant="soft" onPress={() => setCrop(fullCrop)}>Reset</UiButton><UiButton size="sm" onPress={exportCrop}>Export PNG</UiButton></div></div><div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_16rem]"><div className="rounded-md p-6" style={{ backgroundImage: "url('/assets/images/alpha-channel-pattern-background.jpg')", backgroundSize: "20px 20px" }}><div ref={stageRef} className="relative w-full touch-none select-none" style={{ aspectRatio: imageRatio }} onPointerMove={move} onPointerUp={() => { dragRef.current = null; }} onPointerCancel={() => { dragRef.current = null; }}><img src={imageSrc} alt={alt} draggable={false} className="size-full rounded-md object-contain" onLoad={event => setImageRatio(event.currentTarget.naturalWidth / event.currentTarget.naturalHeight)}/><div className="absolute cursor-move border-2 border-primary" style={{ left: `${crop.x}%`, top: `${crop.y}%`, width: `${crop.width}%`, height: `${crop.height}%` }} onPointerDown={event => start(event, "move")}>{handles.map(([mode, position]) => <span key={mode} className={`absolute rounded-full border-2 border-surface bg-primary ${position}`} onPointerDown={event => { event.stopPropagation(); start(event, mode); }}/>)}</div></div></div><div><p className="mb-2 text-sm font-medium">Crop format</p><div className="grid grid-cols-2 gap-2">{formats.map(([label, aspect]) => <UiButton key={label} size="sm" tone={crop.aspect === aspect ? "primary" : "secondary"} variant={crop.aspect === aspect ? "solid" : "soft"} onPress={() => setFormat(aspect)}>{label}</UiButton>)}</div><p className="mt-4 rounded-md bg-card p-3 text-xs leading-5 text-muted">Free starts with the complete image. Drag the frame or use any of its eight handles to resize it.</p></div></div></section>;
}
