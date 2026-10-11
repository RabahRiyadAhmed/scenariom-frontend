import { View, type ViewProps } from 'react-native';

import { ThemeColor } from '@/constants/theme';
import { useThemeRuntime } from '@/contexts/theme-runtime-context';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

export function ThemedView({ style, lightColor, darkColor, type, ...otherProps }: ThemedViewProps) {
  const { colors, backgroundEnabled } = useThemeRuntime();
  const colorName = type ?? 'background';
  const isBackground = colorName === 'background';
  const bg = isBackground && backgroundEnabled ? 'transparent' : colors[colorName];

  return <View style={[{ backgroundColor: bg }, style]} {...otherProps} />;
}
