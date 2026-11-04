'use client';

import { useState, type CSSProperties } from 'react';
import {
  isThemeDefinition,
  resolveThemeBackground,
  resolveThemeGlobals,
  scenariomTheme,
  themeCssVariables,
  type ThemeColors,
  type ThemeDefinition,
  type ThemeRecord,
} from '@scenariom/design-system/themes';
import { UiButton, UiCard, UiCardBody, UiCardDescription, UiCardFooter, UiCardHeader, UiCardTitle, UiModal } from '@scenariom/design-system/ui';
import { apiUrl } from '@/components/theme-runtime-provider';

const colorKeys: Array<keyof ThemeColors> = [
  'background', 'surface', 'card', 'border', 'primary', 'secondary', 'accent',
  'info', 'foreground', 'muted', 'disabled', 'metallic', 'gold', 'success',
  'warning', 'danger', 'pink', 'purple', 'orange', 'teal',
];

function cloneTheme(theme: ThemeDefinition): ThemeDefinition {
  return JSON.parse(JSON.stringify(theme)) as ThemeDefinition;
}

function initialCustomTheme(): ThemeDefinition {
  return { ...cloneTheme(scenariomTheme), slug: 'custom', name: 'Custom' };
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="flex items-center justify-between gap-3 rounded-md border border-border bg-background px-3 py-2 text-xs">
    <span>{label}</span>
    <span className="flex items-center gap-2 font-mono text-[11px] text-muted">
      <input type="color" value={value} onChange={event => onChange(event.target.value)} className="size-8 cursor-pointer border-0 bg-transparent p-0" />
      {value}
    </span>
  </label>;
}

function RangeField({ label, value, min, max, step = 1, suffix = '', onChange }: { label: string; value: number; min: number; max: number; step?: number; suffix?: string; onChange: (value: number) => void }) {
  return <label className="grid gap-1.5 text-xs font-medium text-muted">
    <span className="flex justify-between gap-3"><span>{label}</span><output className="text-foreground">{value}{suffix}</output></span>
    <input type="range" min={min} max={max} step={step} value={value} onChange={event => onChange(Number(event.target.value))} className="w-full accent-primary" />
  </label>;
}

export function StyleLabScreen() {
  const [theme, setTheme] = useState<ThemeDefinition>(initialCustomTheme);
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [editorOpen, setEditorOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [status, setStatus] = useState('Thème Scenariom par défaut');
  const globals = resolveThemeGlobals(theme);
  const background = resolveThemeBackground(theme, mode);
  const variables = themeCssVariables(theme, mode) as CSSProperties;
  const previewStyle = {
    ...variables,
    backgroundColor: background.imageUrl ? 'transparent' : theme.modes[mode].background,
    fontFamily: globals.typography.fontFamily,
    fontSize: globals.typography.baseSize,
    lineHeight: globals.typography.lineHeight,
  } as CSSProperties;
  const backgroundSize = background.fit === 'stretch' ? '100% 100%' : background.fit === 'repeat' ? 'auto' : background.fit;

  const updateColors = (key: keyof ThemeColors, value: string) => setTheme(current => ({ ...current, modes: { ...current.modes, [mode]: { ...current.modes[mode], [key]: value } } }));
  const updateRadius = (key: keyof ThemeDefinition['radius'], value: number) => setTheme(current => ({ ...current, radius: { ...current.radius, [key]: value } }));
  const updateMotion = (key: keyof ThemeDefinition['motion'], value: number) => setTheme(current => ({ ...current, motion: { ...current.motion, [key]: value } }));
  const updateGlobal = (patch: Partial<typeof globals>) => setTheme(current => ({ ...current, globals: { ...resolveThemeGlobals(current), ...patch } }));
  const updateTypography = (patch: Partial<typeof globals.typography>) => updateGlobal({ typography: { ...globals.typography, ...patch } });
  const updateSpacing = (key: keyof typeof globals.spacing, value: number) => updateGlobal({ spacing: { ...globals.spacing, [key]: value } });
  const updateBackground = (patch: Partial<typeof background>) => setTheme(current => ({ ...current, backgrounds: { ...current.backgrounds, [mode]: { ...resolveThemeBackground(current, mode), ...patch } } }));
  const save = async () => {
    setStatus('Sauvegarde…');
    try {
      const response = await fetch(`${apiUrl}/themes/custom`, { method: 'PATCH', credentials: 'include', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ definition: theme }) });
      if (!response.ok) throw new Error('save_failed');
      const record = await response.json() as ThemeRecord;
      if (!isThemeDefinition(record.definition)) throw new Error('invalid_response');
      setTheme(record.definition);
      setStatus('Thème custom partagé sauvegardé. Actualisez Next ou Expo pour le recharger.');
    } catch { setStatus('Échec de sauvegarde : une session valide est nécessaire.'); }
  };
  const load = async () => {
    setStatus('Chargement…');
    try {
      const response = await fetch(`${apiUrl}/themes/custom`, { cache: 'no-store' });
      if (!response.ok) throw new Error('load_failed');
      const record = await response.json() as ThemeRecord;
      if (!isThemeDefinition(record.definition)) throw new Error('invalid_theme');
      setTheme(record.definition);
      setStatus('Thème custom partagé chargé');
    } catch { setTheme(initialCustomTheme()); setStatus('Aucun thème custom partagé : base Scenariom chargée'); }
  };
  const reset = () => { setTheme(initialCustomTheme()); setStatus('Base Scenariom restaurée dans l’éditeur, non sauvegardée'); };

  return <main style={previewStyle} className="relative isolate min-h-screen text-foreground">
    {background.imageUrl && <><div aria-hidden className="fixed inset-0 -z-20" style={{ backgroundImage: `url("${background.imageUrl.replace(/["\\]/g, '')}")`, backgroundSize, backgroundRepeat: background.fit === 'repeat' ? 'repeat' : 'no-repeat', backgroundPosition: background.position, opacity: background.opacity / 100 }} /><div aria-hidden className="fixed inset-0 -z-10 bg-background" style={{ opacity: background.overlay / 100 }} /></>}
    <header className="border-b border-border bg-surface/95 px-5 py-4">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
        <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">Scenariom · thème global</p><h1 className="mt-1 text-2xl font-semibold">Style Lab</h1><p className="mt-1 text-sm text-muted">Une page simple pour vérifier uniquement les fondations globales.</p></div>
        <div className="flex flex-wrap gap-2"><UiButton variant="ghost" onPress={load}>Charger</UiButton><UiButton variant="outline" onPress={reset}>Réinitialiser</UiButton><UiButton onPress={() => setEditorOpen(true)} icon="settings">Modifier le thème</UiButton></div>
      </div>
    </header>

    <div className="mx-auto max-w-5xl px-5 py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold text-accent">Aperçu {mode}</p><h2 className="mt-2 text-4xl font-semibold">Un univers narratif cohérent</h2><p className="mt-3 max-w-2xl text-muted">Les couleurs, rayons, espacements, textes, bordures, animations et backgrounds viennent du même thème global.</p></div><div className="flex rounded-md border border-border bg-surface p-1">{(['light', 'dark'] as const).map(value => <button key={value} type="button" onClick={() => setMode(value)} className={`rounded px-4 py-2 text-sm ${mode === value ? 'bg-primary text-white' : 'text-muted'}`}>{value}</button>)}</div></div>

      <div className="grid gap-6 md:grid-cols-2">
        <UiCard><UiCardHeader><UiCardTitle>La forêt silencieuse</UiCardTitle><UiCardDescription>Une Card simple utilisée uniquement pour observer le thème global.</UiCardDescription></UiCardHeader><UiCardBody><p>Le brouillard se lève entre les arbres. Aucun réglage propre à Card n’est exposé dans ce laboratoire.</p></UiCardBody><UiCardFooter><UiButton>Continuer</UiButton><UiButton variant="outline">Détails</UiButton></UiCardFooter></UiCard>
        <UiCard><UiCardHeader><UiCardTitle>États généraux</UiCardTitle><UiCardDescription>Couleurs sémantiques et contraste.</UiCardDescription></UiCardHeader><UiCardBody><div className="flex flex-wrap gap-2"><span className="rounded-md bg-success px-3 py-2 text-white">Succès</span><span className="rounded-md bg-warning px-3 py-2 text-white">Attention</span><span className="rounded-md bg-danger px-3 py-2 text-white">Erreur</span><span className="rounded-md bg-info px-3 py-2 text-white">Information</span></div></UiCardBody><UiCardFooter><UiButton tone="accent" onPress={() => setDemoModalOpen(true)}>Ouvrir la modal</UiButton></UiCardFooter></UiCard>
      </div>
      <p className="mt-6 text-sm text-muted">{status}</p>
    </div>

    {editorOpen && <div role="dialog" aria-modal="true" aria-labelledby="theme-editor-title" className="fixed inset-0 z-[100] grid place-items-center bg-black/60 p-4" onMouseDown={event => { if (event.target === event.currentTarget) setEditorOpen(false); }}>
      <section className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
        <header className="flex items-center justify-between border-b border-border p-5"><div><h2 id="theme-editor-title" className="text-xl font-semibold">Valeurs globales</h2><p className="mt-1 text-xs text-muted">Mode édité : {mode}</p></div><button type="button" onClick={() => setEditorOpen(false)} aria-label="Fermer" className="size-10 rounded-full border border-border text-xl">×</button></header>
        <div className="grid max-h-[72vh] gap-6 overflow-y-auto p-5 md:grid-cols-2">
          <fieldset className="grid content-start gap-2"><legend className="mb-2 font-semibold">Couleurs générales</legend>{colorKeys.map(key => <ColorField key={key} label={key} value={theme.modes[mode][key]} onChange={value => updateColors(key, value)} />)}</fieldset>
          <div className="grid content-start gap-6">
            <fieldset className="grid gap-3"><legend className="mb-1 font-semibold">Rayons globaux</legend>{(Object.keys(theme.radius) as Array<keyof ThemeDefinition['radius']>).map(key => <RangeField key={key} label={key} value={theme.radius[key]} min={0} max={48} suffix=" px" onChange={value => updateRadius(key, value)} />)}</fieldset>
            <fieldset className="grid gap-3"><legend className="mb-1 font-semibold">Espacements</legend>{(Object.keys(globals.spacing) as Array<keyof typeof globals.spacing>).map(key => <RangeField key={key} label={key} value={globals.spacing[key]} min={0} max={64} suffix=" px" onChange={value => updateSpacing(key, value)} />)}</fieldset>
            <fieldset className="grid gap-3"><legend className="mb-1 font-semibold">Typographie</legend><label className="grid gap-1 text-xs text-muted">Famille principale<input value={globals.typography.fontFamily} onChange={event => updateTypography({ fontFamily: event.target.value })} className="min-h-10 rounded-md border border-border bg-background px-3 text-foreground" /></label><RangeField label="Taille de base" value={globals.typography.baseSize} min={12} max={22} suffix=" px" onChange={baseSize => updateTypography({ baseSize })} /><RangeField label="Interligne" value={globals.typography.lineHeight} min={1} max={2} step={0.05} onChange={lineHeight => updateTypography({ lineHeight })} /><RangeField label="Échelle" value={globals.typography.scale} min={1.05} max={1.5} step={0.01} onChange={scale => updateTypography({ scale })} /></fieldset>
            <fieldset className="grid gap-3"><legend className="mb-1 font-semibold">Bordures et densité</legend><RangeField label="Épaisseur globale" value={globals.borderWidth} min={0} max={6} suffix=" px" onChange={borderWidth => updateGlobal({ borderWidth })} /><label className="grid gap-1 text-xs text-muted">Densité<select value={globals.density} onChange={event => updateGlobal({ density: event.target.value as typeof globals.density })} className="min-h-10 rounded-md border border-border bg-background px-3 text-foreground"><option value="compact">compact</option><option value="normal">normal</option><option value="comfortable">comfortable</option></select></label></fieldset>
            <fieldset className="grid gap-3"><legend className="mb-1 font-semibold">Mouvement</legend>{(Object.keys(theme.motion) as Array<keyof ThemeDefinition['motion']>).map(key => <RangeField key={key} label={key} value={theme.motion[key]} min={0} max={1200} step={10} suffix=" ms" onChange={value => updateMotion(key, value)} />)}</fieldset>
            <fieldset className="grid gap-3"><legend className="mb-1 font-semibold">Background {mode}</legend><label className="grid gap-1 text-xs text-muted">URL ou chemin d’asset<input value={background.imageUrl ?? ''} onChange={event => updateBackground({ imageUrl: event.target.value || undefined })} placeholder="/assets/themes/..." className="min-h-10 rounded-md border border-border bg-background px-3 text-foreground" /></label><RangeField label="Opacité image" value={background.opacity} min={0} max={100} suffix=" %" onChange={opacity => updateBackground({ opacity })} /><RangeField label="Overlay" value={background.overlay} min={0} max={100} suffix=" %" onChange={overlay => updateBackground({ overlay })} /><label className="grid gap-1 text-xs text-muted">Ajustement<select value={background.fit} onChange={event => updateBackground({ fit: event.target.value as typeof background.fit })} className="min-h-10 rounded-md border border-border bg-background px-3 text-foreground"><option value="cover">cover</option><option value="contain">contain</option><option value="stretch">stretch</option><option value="repeat">repeat</option></select></label><label className="grid gap-1 text-xs text-muted">Position<select value={background.position} onChange={event => updateBackground({ position: event.target.value as typeof background.position })} className="min-h-10 rounded-md border border-border bg-background px-3 text-foreground">{['center','top','bottom','left','right'].map(value => <option key={value}>{value}</option>)}</select></label></fieldset>
          </div>
        </div>
        <footer className="flex items-center justify-end gap-3 border-t border-border p-5"><span className="me-auto text-xs text-muted">{status}</span><UiButton variant="outline" onPress={() => setEditorOpen(false)}>Fermer</UiButton><UiButton icon="save" onPress={save}>Sauver le thème custom</UiButton></footer>
      </section>
    </div>}

    <UiModal open={demoModalOpen} onClose={() => setDemoModalOpen(false)} title="Modal de démonstration" closeLabel="Fermer" footer={<UiButton onPress={() => setDemoModalOpen(false)}>Compris</UiButton>}><p>Cette modal sert seulement à vérifier l’application des valeurs globales.</p></UiModal>
  </main>;
}
