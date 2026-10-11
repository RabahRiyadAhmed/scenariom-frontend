'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { componentCatalog, componentSlug } from '@scenariom/design-system/component-catalog';
import { translate } from '@scenariom/i18n';
import { useThemeRuntime } from '@/components/theme-runtime-provider';

const groups = Array.from(new Set(componentCatalog.map(([group]) => group)));

function NavigationContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const{language}=useThemeRuntime();const t=(key:Parameters<typeof translate>[0])=>translate(key,{},language);
  return <div className="space-y-5">{groups.map(group => <section key={group}>
    <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">{t(`componentGroup.${group}` as Parameters<typeof translate>[0])}</h2>
    <nav className="space-y-1">{componentCatalog.filter(([itemGroup]) => itemGroup === group).map(([, name]) => {
      const href = `/components/${componentSlug(name)}`;
      return <Link key={name} href={href} onClick={onNavigate} className={`block rounded-md px-3 py-2 text-sm transition ${pathname === href ? 'bg-card font-semibold text-primary' : 'hover:bg-card hover:text-primary'}`}>{name}</Link>;
    })}</nav>
  </section>)}</div>;
}

export function ComponentsNavigation() {
  const [open, setOpen] = useState(false);
  const{language,slideImageUrl}=useThemeRuntime();const t=(key:Parameters<typeof translate>[0])=>translate(key,{},language);
  const slideBackground=slideImageUrl?{backgroundImage:`linear-gradient(color-mix(in srgb,var(--sc-surface) 48%,transparent),color-mix(in srgb,var(--sc-surface) 48%,transparent)),url("${slideImageUrl}")`,backgroundPosition:'center',backgroundSize:'cover'}:undefined;
  return <>
    <aside style={slideBackground} className="hidden h-screen self-start overflow-y-auto border-e border-border bg-surface p-4 md:sticky md:top-0 md:block"><NavigationContent /></aside>
    <div className="border-b border-border bg-surface px-4 py-3 md:hidden">
      <button type="button" onClick={() => setOpen(true)} className="min-h-11 w-full rounded-md border border-border bg-background px-4 text-start text-sm font-semibold">☰ {t('componentLab.openNavigation')}</button>
    </div>
    {open && <div className="fixed inset-0 z-[100] md:hidden">
      <button type="button" aria-label={t('componentLab.closeNavigation')} onClick={() => setOpen(false)} className="absolute inset-0 bg-black/55" />
      <aside style={slideBackground} className="absolute inset-y-0 start-0 w-[min(88vw,22rem)] overflow-y-auto border-e border-border bg-surface p-4 shadow-2xl">
        <div className="mb-4 flex items-center justify-between"><strong>{t('componentLab.title')}</strong><button type="button" aria-label={t('componentLab.closeNavigation')} onClick={() => setOpen(false)} className="size-10 rounded-md border border-border">×</button></div>
        <NavigationContent onNavigate={() => setOpen(false)} />
      </aside>
    </div>}
  </>;
}
