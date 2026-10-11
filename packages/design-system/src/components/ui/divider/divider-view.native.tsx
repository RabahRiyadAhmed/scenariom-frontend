import { Text, View } from 'react-native';
import type { UiDividerProps } from '../../../ui/types';

export function UiDivider({ label }: UiDividerProps) {
  return (
    <View className="flex-row items-center gap-3">
      <View className="h-px flex-1 bg-border" />
      {label && <Text className="text-xs text-muted">{label}</Text>}
      <View className="h-px flex-1 bg-border" />
    </View>
  );
}
