import { colorTokens, motionTokens, radiusTokens } from './tokens';

export const THEME_SCHEMA_VERSION = 1 as const;

export type ThemeColors = { [Key in keyof typeof colorTokens.light]: string };
export type ThemeShape = {
  type: 'rounded' | 'pill' | 'svg-path';
  viewBox?: string;
  path?: string;
};
export type ThemeEffect = 'none' | 'glow' | 'laser' | 'pulse';
export type ThemeBackground = {
  imageUrl?: string;
  opacity: number;
  overlay: number;
  fit: 'cover' | 'contain' | 'stretch' | 'repeat';
  position: 'center' | 'top' | 'bottom' | 'left' | 'right';
};
export type ThemeGlobals = {
  spacing: { xs: number; sm: number; md: number; lg: number; xl: number };
  typography: {
    fontFamily: string;
    monoFamily: string;
    baseSize: number;
    lineHeight: number;
    scale: number;
  };
  borderWidth: number;
  density: 'compact' | 'normal' | 'comfortable';
};
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
  globals?: Partial<ThemeGlobals>;
  backgrounds?: { light?: Partial<ThemeBackground>; dark?: Partial<ThemeBackground>; slideImageUrl?: string };
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
const safeAssetUrl = /^(https?:\/\/|\/)[^"'\\]{1,500}$/i;

export const defaultThemeGlobals: ThemeGlobals = {
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  typography: {
    fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
    monoFamily: 'var(--font-geist-mono), ui-monospace, monospace',
    baseSize: 16,
    lineHeight: 1.5,
    scale: 1.2,
  },
  borderWidth: 1,
  density: 'normal',
};

export const defaultThemeBackground: ThemeBackground = {
  opacity: 70,
  overlay: 12,
  fit: 'cover',
  position: 'center',
};

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
  if (theme.assets?.backgroundImageUrl && !safeAssetUrl.test(theme.assets.backgroundImageUrl)) return false;
  const globals = theme.globals;
  if (globals?.borderWidth !== undefined && (!Number.isFinite(globals.borderWidth) || globals.borderWidth < 0 || globals.borderWidth > 12)) return false;
  if (globals?.density !== undefined && !['compact', 'normal', 'comfortable'].includes(globals.density)) return false;
  for (const background of [theme.backgrounds?.light, theme.backgrounds?.dark]) {
    if (!background) continue;
    if (background.imageUrl && !safeAssetUrl.test(background.imageUrl)) return false;
    if (background.opacity !== undefined && (!Number.isFinite(background.opacity) || background.opacity < 0 || background.opacity > 100)) return false;
    if (background.overlay !== undefined && (!Number.isFinite(background.overlay) || background.overlay < 0 || background.overlay > 100)) return false;
  }
  return true;
}

export function resolveThemeGlobals(theme: ThemeDefinition): ThemeGlobals {
  return {
    ...defaultThemeGlobals,
    ...theme.globals,
    spacing: { ...defaultThemeGlobals.spacing, ...theme.globals?.spacing },
    typography: { ...defaultThemeGlobals.typography, ...theme.globals?.typography },
  };
}

export function resolveThemeBackground(theme: ThemeDefinition, mode: 'light' | 'dark'): ThemeBackground {
  return { ...defaultThemeBackground, ...theme.backgrounds?.[mode] };
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
  globals: defaultThemeGlobals,
  backgrounds: {
    light: defaultThemeBackground,
    dark: { ...defaultThemeBackground, opacity: 50, overlay: 24 },
  },
  components: { button: { shape: { type: 'rounded' }, effect: 'none', borderWidth: 1 }, card: { effect: 'none', borderWidth: 1 } },
};

export function themeCssVariables(theme: ThemeDefinition, mode: 'light' | 'dark') {
  const colors = resolveThemeColors(theme, mode);
  const globals = resolveThemeGlobals(theme);
  return Object.fromEntries([
    ...themeColorKeys.map((key) => [`--sc-${key}`, colors[key]]),
    ['--radius-sm', `${theme.radius.sm}px`], ['--radius-md', `${theme.radius.md}px`],
    ['--radius-lg', `${theme.radius.lg}px`], ['--radius-xl', `${theme.radius.xl}px`],
    ['--default-transition-duration', `${theme.motion.normal}ms`],
    ['--sc-font-family', globals.typography.fontFamily],
    ['--sc-font-family-mono', globals.typography.monoFamily],
    ['--sc-font-size-base', `${globals.typography.baseSize}px`],
    ['--sc-line-height', String(globals.typography.lineHeight)],
    ['--sc-type-scale', String(globals.typography.scale)],
    ['--sc-border-width', `${globals.borderWidth}px`],
    ['--sc-space-xs', `${globals.spacing.xs}px`],
    ['--sc-space-sm', `${globals.spacing.sm}px`],
    ['--sc-space-md', `${globals.spacing.md}px`],
    ['--sc-space-lg', `${globals.spacing.lg}px`],
    ['--sc-space-xl', `${globals.spacing.xl}px`],
    ['--spacing', `${globals.spacing.xs}px`],
  ]);
}
