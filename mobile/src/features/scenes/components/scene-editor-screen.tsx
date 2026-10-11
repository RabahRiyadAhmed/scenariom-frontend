import { View } from "react-native";
import { translate, type MessageKey } from "@scenariom/i18n";
import { UiEmptyState } from "@scenariom/design-system/components/ui/empty-state";
import { useThemeRuntime } from "@/contexts/theme-runtime-context";

export function SceneEditorScreen() {
  const { language } = useThemeRuntime();
  const t = (key: MessageKey) => translate(key, {}, language);
  return (
    <View className="flex-1 justify-center bg-background p-5">
      <UiEmptyState title={t("editor.unavailableTitle")} description={t("editor.unavailableDescription")} />
    </View>
  );
}
