export const colorTokens = {
  light: {
    background: '#F8FAFC', surface: '#FFFFFF', card: '#F1F5F9', border: '#D8DEE9',
    primary: '#1E3A8A', secondary: '#475569', accent: '#6D28D9', info: '#0369A1', foreground: '#111827', muted: '#64748B',
    disabled: '#9CA3AF', metallic: '#9CA3AF', gold: '#D4AF37', success: '#15803D',
    warning: '#B45309', danger: '#B91C1C',
    pink: '#DB2777', purple: '#9333EA', orange: '#C2410C', teal: '#0F766E',
  },
  dark: {
    background: '#0F1420', surface: '#171E2E', card: '#20293A', border: '#303A4D',
    primary: '#3B5CCC', secondary: '#94A3B8', accent: '#7C3AED', info: '#38BDF8', foreground: '#F1F5F9', muted: '#A8B3C5',
    disabled: '#667085', metallic: '#9CA3AF', gold: '#D4AF37', success: '#4ADE80',
    warning: '#FBBF24', danger: '#F87171',
    pink: '#F472B6', purple: '#C084FC', orange: '#FB923C', teal: '#2DD4BF',
  },
} as const;

export const spacingTokens = { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 7: 48, 8: 64 } as const;
export const radiusTokens = { sm: 6, md: 10, lg: 16, xl: 24, full: 9999 } as const;
export const motionTokens = { fast: 150, normal: 220, slow: 350 } as const;

export type ColorSchemeName = keyof typeof colorTokens;
export type SemanticColor = keyof typeof colorTokens.light;

export type UiToneName = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'danger' | 'pink' | 'purple' | 'orange' | 'teal' | 'neutral';

export const foregroundTokens: Record<ColorSchemeName, Record<UiToneName, string>> = {
  light: {
    primary: '#ffffff', secondary: '#ffffff', accent: '#ffffff', info: '#ffffff',
    success: '#ffffff', warning: '#ffffff', danger: '#ffffff',
    pink: '#ffffff', purple: '#ffffff', orange: '#ffffff', teal: '#ffffff', neutral: '#ffffff',
  },
  dark: {
    primary: '#ffffff', secondary: '#0f1420', accent: '#ffffff', info: '#083344',
    success: '#083344', warning: '#1a1200', danger: '#1a0808',
    pink: '#1a0a14', purple: '#1a0a2e', orange: '#1a0a00', teal: '#003330', neutral: '#0f1420',
  },
} as const;

export const hoverTokens: Record<ColorSchemeName, Record<UiToneName, string>> = {
  light: {
    primary: '#172d6f', secondary: '#3b4655', accent: '#5d1fb8', info: '#025480',
    success: '#106b32', warning: '#924407', danger: '#991515',
    pink: '#b91e64', purple: '#7c28c4', orange: '#a13508', teal: '#0c5f58', neutral: '#475569',
  },
  dark: {
    primary: '#4d6fe0', secondary: '#a8b8cc', accent: '#8d50f0', info: '#5cc9f9',
    success: '#6ee894', warning: '#fcc944', danger: '#f88d8d',
    pink: '#f68dc6', purple: '#cc9afd', orange: '#fca75c', teal: '#45ddca', neutral: '#bcc7d8',
  },
} as const;
