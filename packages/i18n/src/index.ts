import { en } from './en';
import { ar } from './ar';
import { fr } from './fr';
import { ru } from './ru';

export type Locale = 'en' | 'fr' | 'es' | 'de' | 'pt' | 'it' | 'ja' | 'ko' | 'zh' | 'ar' | 'hi' | 'tr' | 'ru';
export type MessageKey = keyof typeof en;
export type MessageValues = Record<string, string | number>;
export type TextDirection = 'ltr' | 'rtl';

export const defaultLocale: Locale = 'en';
export const supportedLocales = ['en', 'fr', 'es', 'de', 'pt', 'it', 'ja', 'ko', 'zh', 'ar', 'hi', 'tr', 'ru'] as const;

const testCatalog = (title: string, language: string, story: string, direction: string): Partial<Record<MessageKey, string>> => ({
  'languageTest.title': title, 'languageTest.language': language, 'languageTest.description': title,
  'languageTest.interfaceSample': title, 'languageTest.storySample': title, 'languageTest.story': story,
  'languageTest.characters': 'Unicode', 'languageTest.direction': direction,
  'languageTest.fontReady': '✓ Font', 'languageTest.fontFallback': 'System font',
});
const catalogs: Partial<Record<Locale, Partial<Record<MessageKey, string>>>> = {
  en,
  fr,
  ar,
  ru,
};
const rtlLanguages = new Set(['ar']);

export function getDirection(locale: Locale): TextDirection {
  return rtlLanguages.has(locale.toLowerCase().split('-')[0]) ? 'rtl' : 'ltr';
}

export function normalizeLocale(value: string | null | undefined): Locale {
  const candidate = value?.toLowerCase().split('-')[0];
  return supportedLocales.includes(candidate as Locale) ? candidate as Locale : defaultLocale;
}

export function translate(key: MessageKey, values: MessageValues = {}, locale: Locale = defaultLocale): string {
  const template = catalogs[locale]?.[key] ?? en[key];
  return template.replace(/\{(\w+)\}/g, (_, token: string) => String(values[token] ?? `{${token}}`));
}

export { en } from './en';
export { ar } from './ar';
export { fr } from './fr';
export { ru } from './ru';
