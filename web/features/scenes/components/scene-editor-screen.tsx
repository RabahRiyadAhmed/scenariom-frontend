"use client";

import { UiEmptyState } from "@scenariom/design-system/components/ui/empty-state";
import { translate } from "@scenariom/i18n";
import { useThemeRuntime } from "@/components/theme-runtime-provider";

export function SceneEditorScreen() {
  const { language } = useThemeRuntime();
  return (
    <UiEmptyState
      title={translate("editor.unavailableTitle", {}, language)}
      description={translate("editor.unavailableDescription", {}, language)}
    />
  );
}
