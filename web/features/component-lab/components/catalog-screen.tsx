'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { componentCatalog, componentSlug } from '@scenariom/design-system/component-catalog';
import { translate } from '@scenariom/i18n';
import { useThemeRuntime } from '@/components/theme-runtime-provider';

export function CatalogScreen() {
  const { language } = useThemeRuntime();
  const t = (key: Parameters<typeof translate>[0]) => translate(key, {}, language);
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    if (!query.trim()) return componentCatalog;
    const q = query.toLowerCase();
    return componentCatalog.filter(([, name]) => name.toLowerCase().includes(q));
  }, [query]);

  return <section>
    <p className="text-sm font-semibold text-primary">{t('componentLab.eyebrow')}</p>
    <h1 className="mt-2 text-4xl font-semibold">{t('componentLab.title')}</h1>
    <p className="mt-3 max-w-2xl text-muted">{t('componentLab.description')}</p>
    <input
      type="search"
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Search components..."
      className="mt-6 min-h-11 w-full max-w-md rounded-md border border-border bg-surface px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
    />
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map(([, name]) => <Link key={name} href={`/components/${componentSlug(name)}`} className="rounded-lg border border-border bg-surface p-4 font-medium transition hover:-translate-y-0.5 hover:border-primary">{name}</Link>)}
    </div>
    {filtered.length === 0 && <p className="mt-8 text-muted">No components found.</p>}
  </section>;
}
