import { colorTokens, motionTokens, radiusTokens } from './tokens';

export const THEME_SCHEMA_VERSION = 1 as const;

export type ThemeColors = { [Key in keyof typeof colorTokens.light]: string };
export type ThemeShape = {
  type: 'rounded' | 'pill' | 'svg-path';
  viewBox?: string;
  path?: string;
};
export type ThemeEffect = 'none' | 'glow' | 'laser' | 'pulse';
export type ThemeDefinition = {
  schemaVersion: typeof THEME_SCHEMA_VERSION;
  slug: string;
  name: string;
  modes: { light: ThemeColors; dark: ThemeColors };
  radius: { sm: number; md: number; lg: number; xl: number };
  motion: { fast: number; normal: number; slow: number };
  components?: {
    button?: { shape?: ThemeShape; effect?: ThemeEffect; borderWidth?: number };
    card?: { effect?: ThemeEffect; borderWidth?: number };
  };
  assets?: { backgroundImageUrl?: string };
};

export type ThemeRecord = {
  id?: string;
  slug: string;
  name: string;
  description?: string | null;
  definition: ThemeDefinition;
  extraData?: Record<string, unknown> | null;
};

const themeColorKeys = Object.keys(colorTokens.light) as (keyof ThemeColors)[];
// Tones added after the initial schema. Older theme rows saved in the database (or crafted
// before these tones existed) won't have them yet: treat them as optional so a theme isn't
// rejected wholesale just because it predates a new color. Missing values fall back to the
// built-in Scenariom defaults via `withColorDefaults`/`resolveThemeColors`.
const optionalThemeColorKeys: (keyof ThemeColors)[] = ['pink', 'purple', 'orange', 'teal'];
const requiredThemeColorKeys = themeColorKeys.filter((key) => !optionalThemeColorKeys.includes(key));
const hexColor = /^#[0-9a-f]{6}([0-9a-f]{2})?$/i;
const safeSlug = /^[a-z0-9][a-z0-9-]{1,49}$/;
const safeSvgPath = /^[MmLlHhVvCcSsQqTtAaZz0-9,\.\-+\s]+$/;

export function isThemeDefinition(value: unknown): value is ThemeDefinition {
  if (!value || typeof value !== 'object') return false;
  const theme = value as Partial<ThemeDefinition>;
  if (theme.schemaVersion !== THEME_SCHEMA_VERSION || typeof theme.slug !== 'string' || !safeSlug.test(theme.slug) || typeof theme.name !== 'string') return false;
  if (!theme.modes || !theme.radius || !theme.motion) return false;
  for (const mode of ['light', 'dark'] as const) {
    const colors = theme.modes[mode];
    if (!colors) return false;
    if (requiredThemeColorKeys.some((key) => typeof colors[key] !== 'string' || !hexColor.test(colors[key]))) return false;
    if (optionalThemeColorKeys.some((key) => colors[key] !== undefined && (typeof colors[key] !== 'string' || !hexColor.test(colors[key])))) return false;
  }
  const shape = theme.components?.button?.shape;
  if (shape?.type === 'svg-path' && (!shape.path || shape.path.length > 12_000 || !safeSvgPath.test(shape.path) || !shape.viewBox)) return false;
  if (theme.assets?.backgroundImageUrl && !/^https?:\/\//i.test(theme.assets.backgroundImageUrl)) return false;
  return true;
}

/** Fills any tone missing from an (older) theme's palette with the built-in Scenariom default for that mode. */
export function withColorDefaults(colors: Partial<ThemeColors>, mode: 'light' | 'dark'): ThemeColors {
  return { ...colorTokens[mode], ...colors };
}

export function resolveThemeColors(theme: ThemeDefinition, mode: 'light' | 'dark'): ThemeColors {
  return withColorDefaults(theme.modes[mode], mode);
}

export function parseThemeDefinition(value: unknown): ThemeDefinition {
  if (!isThemeDefinition(value)) throw new Error('Invalid Scenariom theme definition.');
  return value;
}

export const scenariomTheme: ThemeDefinition = {
  schemaVersion: THEME_SCHEMA_VERSION,
  slug: 'scenariom',
  name: 'Scenariom',
  modes: { light: colorTokens.light, dark: colorTokens.dark },
  radius: { sm: radiusTokens.sm, md: radiusTokens.md, lg: radiusTokens.lg, xl: radiusTokens.xl },
  motion: motionTokens,
  components: { button: { shape: { type: 'rounded' }, effect: 'none', borderWidth: 1 }, card: { effect: 'none', borderWidth: 1 } },
};

export function themeCssVariables(theme: ThemeDefinition, mode: 'light' | 'dark') {
  const colors = resolveThemeColors(theme, mode);
  return Object.fromEntries([
    ...themeColorKeys.map((key) => [`--sc-${key}`, colors[key]]),
    ['--radius-sm', `${theme.radius.sm}px`], ['--radius-md', `${theme.radius.md}px`],
    ['--radius-lg', `${theme.radius.lg}px`], ['--radius-xl', `${theme.radius.xl}px`],
    ['--default-transition-duration', `${theme.motion.normal}ms`],
  ]);
}
