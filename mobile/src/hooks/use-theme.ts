/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useThemeRuntime } from '@/contexts/theme-runtime-context';

export function useTheme() {
  return useThemeRuntime().colors;
}
