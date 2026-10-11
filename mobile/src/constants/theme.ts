/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';
import { colorTokens, spacingTokens } from '@scenariom/design-system';

export const Colors = {
  light: {
    ...colorTokens.light,
    text: colorTokens.light.foreground,
    backgroundElement: colorTokens.light.card,
    backgroundSelected: colorTokens.light.border,
    textSecondary: colorTokens.light.muted,
  },
  dark: {
    ...colorTokens.dark,
    text: colorTokens.dark.foreground,
    backgroundElement: colorTokens.dark.card,
    backgroundSelected: colorTokens.dark.border,
    textSecondary: colorTokens.dark.muted,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: spacingTokens[1],
  two: spacingTokens[2],
  three: spacingTokens[4],
  four: spacingTokens[5],
  five: spacingTokens[6],
  six: spacingTokens[8],
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
