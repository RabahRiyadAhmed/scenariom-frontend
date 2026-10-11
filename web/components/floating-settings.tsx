"use client";
import { useEffect, useRef, useState } from "react";
import {
  supportedLocales,
  translate,
  type Locale,
  type MessageKey,
} from "@scenariom/i18n";
import { useThemeRuntime } from "@/components/theme-runtime-provider";

const languageLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  pt: "Português",
  it: "Italiano",
  ja: "日本語",
  ko: "한국어",
  zh: "中文",
  ar: "العربية",
  hi: "हिन्दी",
  tr: "Türkçe",
  ru: "Русский",
};

const themeCategory=(category?:unknown)=>{
  const value=String(category??'platform');
  if(['mystical','medieval-fantasy','fantasy'].includes(value))return 'fantasy';
  if(['futuristic','technical','industrial-period','sci-fi'].includes(value))return 'sci-fi';
  if(['nature','calm-nature','coastal','deep-ocean'].includes(value))return 'nature';
  if(['minimal','cinematic','romance','graphic'].includes(value))return 'graphic';
  if(['graphic-horror','horror'].includes(value))return 'horror';
  if(['period','historical'].includes(value))return 'historical';
  return 'platform';
};

export function FloatingSettings() {
  const {
    themes,
    themeSlug,
    setThemeSlug,
    mode,
    setMode,
    resolvedMode,
    language,
    setLanguage,
    backgroundEnabled,
    setBackgroundEnabled,
    backgroundOpacity,
    backgroundFilter,
    previewBackgroundOpacity,
    previewBackgroundFilter,
    saveBackgroundAppearance,
  } = useThemeRuntime();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const t = (key: MessageKey) => translate(key, {}, language);
  const themeGroups=Object.entries(Object.groupBy(themes,item=>themeCategory(item.extraData?.category)));
  const close = () => {
    previewBackgroundOpacity(null);
    previewBackgroundFilter(null);
    setStatus("");
    setOpen(false);
  };
  const save = async () => {
    setSaving(true);
    setStatus("");
    try {
      await saveBackgroundAppearance();
      setStatus(t("settings.saved"));
    } catch {
      setStatus(t("settings.saveError"));
    } finally {
      setSaving(false);
    }
  };
  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog?.open) dialog?.showModal();
    else if (!open && dialog?.open) dialog.close();
  }, [open]);
  return (
    <>
      <button
        type="button"
        aria-label={t("settings.open")}
        onClick={() => setOpen(true)}
        className="fixed bottom-5 end-5 z-[90] grid size-14 place-items-center rounded-full border border-border bg-primary text-xl text-white shadow-2xl transition hover:scale-105"
      >
        ⚙
      </button>
      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-auto w-[min(92vw,34rem)] rounded-2xl border border-border bg-surface p-0 text-foreground shadow-2xl backdrop:bg-black/60"
      >
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="text-xl font-bold">{t("settings.title")}</h2>
          <button
            type="button"
            aria-label={t("common.close")}
            onClick={close}
            className="size-10 rounded-full border border-border text-xl"
          >
            ×
          </button>
        </div>
        <div className="grid max-h-[75vh] gap-5 overflow-y-auto p-5">
          <label className="grid gap-2 text-sm font-semibold">
            {t("settings.language")}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Locale)}
              className="min-h-11 rounded-md border border-border bg-background px-3"
            >
              {supportedLocales.map((item) => (
                <option key={item} value={item}>
                  {languageLabels[item]}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            {t("settings.theme")}
            <select
              value={themeSlug}
              onChange={(e) => setThemeSlug(e.target.value)}
              className="min-h-11 rounded-md border border-border bg-background px-3"
            >
              {themeGroups.map(([category,items])=><optgroup key={category} label={t(`themeCategory.${category}` as MessageKey)}>{items?.map(item=><option key={item.slug} value={item.slug}>{item.name}</option>)}</optgroup>)}
            </select>
          </label>
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">
              {t("settings.mode")}
            </legend>
            <div className="grid grid-cols-3 gap-2">
              {(["system", "light", "dark"] as const).map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setMode(item)}
                  className={`min-h-11 rounded-md border px-3 ${mode === item ? "border-primary bg-primary text-white" : "border-border bg-background"}`}
                >
                  {t(`settings.${item}` as MessageKey)}
                </button>
              ))}
            </div>
          </fieldset>
          <button
            type="button"
            role="switch"
            aria-checked={backgroundEnabled}
            onClick={() => setBackgroundEnabled(!backgroundEnabled)}
            className="flex min-h-12 items-center justify-between rounded-md border border-border bg-background px-4"
          >
            <span>{t("settings.background")}</span>
            <span
              className={`h-7 w-12 rounded-full p-1 ${backgroundEnabled ? "bg-primary" : "bg-muted"}`}
            >
              <span
                className={`block size-5 rounded-full bg-white transition ${backgroundEnabled ? "translate-x-5 rtl:-translate-x-5" : ""}`}
              />
            </span>
          </button>
          <div className="grid gap-4 rounded-md border border-border bg-background p-4">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="background-opacity"
                  className="text-sm font-semibold"
                >
                  {t("settings.opacity")} · {resolvedMode}
                </label>
                <output className="font-mono text-sm">
                  {backgroundOpacity}%
                </output>
              </div>
              <input
                id="background-opacity"
                type="range"
                min="0"
                max="100"
                step="1"
                value={backgroundOpacity}
                onChange={(event) =>
                  previewBackgroundOpacity(Number(event.target.value))
                }
                className="w-full accent-primary"
              />
              <p className="text-xs text-muted">{t("settings.opacityHelp")}</p>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="background-filter"
                  className="text-sm font-semibold"
                >
                  {t("settings.filter")}
                </label>
                <output className="font-mono text-sm">
                  {backgroundFilter}%
                </output>
              </div>
              <input
                id="background-filter"
                type="range"
                min="0"
                max="100"
                step="1"
                value={backgroundFilter}
                onChange={(event) =>
                  previewBackgroundFilter(Number(event.target.value))
                }
                className="w-full accent-primary"
              />
              <p className="text-xs text-muted">{t("settings.filterHelp")}</p>
            </div>
            <div className="flex items-center justify-end gap-3">
              <span className="me-auto text-xs text-muted">{status}</span>
              <button
                type="button"
                disabled={saving || themeSlug === "scenariom"}
                onClick={save}
                className="min-h-10 rounded-md bg-primary px-4 font-semibold text-white disabled:opacity-50"
              >
                {saving ? "…" : t("settings.save")}
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
