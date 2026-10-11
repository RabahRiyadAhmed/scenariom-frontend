import { Text, View } from 'react-native';
import type { UiKbdProps } from '../../../ui/types';

export function UiKbd({ children }: UiKbdProps) {
  return (
    <View className="min-h-6 items-center justify-center rounded border border-border bg-card px-1.5">
      <Text className="font-mono text-xs font-medium text-muted">
        {children}
      </Text>
    </View>
  );
}
