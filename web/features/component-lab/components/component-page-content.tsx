'use client';
import { getDirection, translate, type MessageKey } from '@scenariom/i18n';
import type { ComponentCatalogName } from '@scenariom/design-system/component-catalog';
import { ComponentPreview } from '@/components/component-preview';
import { useThemeRuntime } from '@/components/theme-runtime-provider';

export function ComponentPageContent({group,name}:{group:string;name:ComponentCatalogName}){
  const{language}=useThemeRuntime();const t=(key:MessageKey)=>translate(key,{},language);
  return <section lang={language} dir={getDirection(language)}><p className="readable-on-background text-sm font-semibold uppercase text-primary">{t('componentTest.eyebrow')} · {t(`componentGroup.${group}` as MessageKey)}</p><h1 className="readable-on-background mt-2 text-3xl font-semibold">{name}</h1><p className="readable-on-background mt-2 text-muted">{t('componentTest.description')}</p><p className="mt-4 rounded-lg border border-border bg-card p-4 text-lg leading-8">{t('componentTest.sample')}</p><div className="theme-effect mt-8 min-h-72 rounded-xl border border-border bg-surface p-6"><ComponentPreview name={name} locale={language}/></div></section>;
}
