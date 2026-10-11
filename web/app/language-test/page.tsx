'use client';

import { useEffect, useState } from 'react';
import { getDirection, supportedLocales, translate, type Locale } from '@scenariom/i18n';
import { SiteNav } from '@/components/site-nav';
import { apiUrl } from '@/components/theme-runtime-provider';

const labels: Record<Locale, string> = { en:'English',fr:'Français',es:'Español',de:'Deutsch',pt:'Português',it:'Italiano',ja:'日本語',ko:'한국어',zh:'中文',ar:'العربية',hi:'हिन्दी',tr:'Türkçe',ru:'Русский' };

const writingSamples = [
  { language: 'English', lang: 'en', dir: 'ltr', text: 'Every story begins with a world waiting to be imagined.' },
  { language: 'Français', lang: 'fr', dir: 'ltr', text: 'Chaque histoire commence par un monde qui attend d’être imaginé.' },
  { language: '中文', lang: 'zh', dir: 'ltr', text: '每个故事都始于一个等待被想象的世界。' },
  { language: '日本語', lang: 'ja', dir: 'ltr', text: 'すべての物語は、想像されるのを待つ世界から始まります。' },
  { language: '한국어', lang: 'ko', dir: 'ltr', text: '모든 이야기는 상상되기를 기다리는 세계에서 시작됩니다.' },
  { language: 'বাংলা', lang: 'bn', dir: 'ltr', text: 'প্রতিটি গল্প শুরু হয় এমন একটি জগৎ দিয়ে, যা কল্পিত হওয়ার অপেক্ষায় থাকে।' },
  { language: 'Русский', lang: 'ru', dir: 'ltr', text: 'Каждая история начинается с мира, который ждёт, чтобы его представили.' },
  { language: 'Türkçe', lang: 'tr', dir: 'ltr', text: 'Her hikâye, hayal edilmeyi bekleyen bir dünyayla başlar.' },
  { language: 'العربية', lang: 'ar', dir: 'rtl', text: 'تبدأ كل قصة بعالم ينتظر أن نتخيله.' },
  { language: 'Հայերեն', lang: 'hy', dir: 'ltr', text: 'Յուրաքանչյուր պատմություն սկսվում է մի աշխարհից, որը սպասում է երևակայվելուն։' },
  { language: 'ܐܪܡܝܐ — Araméen', lang: 'syr', dir: 'rtl', text: 'ܟܠ ܫܘܥܝܬܐ ܫܪܝܐ ܒܥܠܡܐ ܕܡܣܟܐ ܠܕܡܝܢܘܬܐ.' },
] as const;

export default function LanguageTestPage() {
  const [locale, setLocale] = useState<Locale>('en');
  const [fontLoaded, setFontLoaded] = useState(false);
  const direction = getDirection(locale);
  const t = (key: Parameters<typeof translate>[0]) => translate(key, {}, locale);

  useEffect(() => {
    const family = locale === 'ar' ? 'Scenariom Arabic' : 'Scenariom Sans';
    const file = locale === 'ar' ? 'noto-sans-arabic-regular.ttf' : 'noto-sans-regular.ttf';
    new FontFace(family, `url(${apiUrl}/assets/fonts/${file})`).load()
      .then((font) => { document.fonts.add(font); setFontLoaded(true); })
      .catch(() => setFontLoaded(false));
  }, [locale]);

  return <main className="min-h-screen bg-background text-foreground"><SiteNav/><section lang={locale} dir={direction} style={{fontFamily: locale === 'ar' ? 'Scenariom Arabic, sans-serif' : 'Scenariom Sans, sans-serif'}} className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-wider text-primary">Unicode · LTR · RTL</p><h1 className="mt-2 text-4xl font-bold">{t('languageTest.title')}</h1><p className="mt-3 max-w-3xl leading-7 text-muted">{t('languageTest.description')}</p></div><label className="grid gap-2 text-sm font-semibold">{t('languageTest.language')}<select value={locale} onChange={(event)=>{setFontLoaded(false);setLocale(event.target.value as Locale)}} className="min-h-11 rounded-md border border-border bg-surface px-3">{supportedLocales.map(item=><option key={item} value={item}>{labels[item]}</option>)}</select></label></div>
    <div className="mt-8 grid gap-5 md:grid-cols-2"><article className="rounded-xl border border-border bg-surface p-6"><h2 className="text-xl font-bold">{t('languageTest.interfaceSample')}</h2><p className="mt-4 text-muted">{t('languageTest.direction')}</p><p className="mt-3 text-sm text-primary">{fontLoaded?t('languageTest.fontReady'):t('languageTest.fontFallback')}</p></article><article className="rounded-xl border border-border bg-surface p-6"><h2 className="text-xl font-bold">{t('languageTest.storySample')}</h2><p className="mt-4 text-xl leading-9">{t('languageTest.story')}</p></article></div>
    <article className="mt-5 rounded-xl border border-border bg-surface p-6"><h2 className="text-xl font-bold">{t('languageTest.characters')}</h2><p className="mt-4 break-words text-2xl leading-10">ABCDEFGHIJKLMNOPQRSTUVWXYZ · abcdefghijklmnopqrstuvwxyz · АБВГДЕЖЗИЙК · абвгдежзийк · ابتثجحخدذرزسشصضطظعغفقكلمنهوي · 0123456789 · !؟«»—</p></article>
    <section className="mt-5"><h2 className="text-2xl font-bold">Test de plusieurs écritures</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{writingSamples.map(sample=><article key={sample.lang} lang={sample.lang} dir={sample.dir} className="rounded-xl border border-border bg-surface p-5"><p className="text-sm font-semibold text-primary">{sample.language} · {sample.dir.toUpperCase()}</p><p className="mt-3 text-xl leading-9">{sample.text}</p></article>)}</div></section>
  </section></main>;
}
