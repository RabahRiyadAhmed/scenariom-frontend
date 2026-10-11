import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { translate, type MessageKey } from "@scenariom/i18n";
import { UiAlert } from "@scenariom/design-system/components/ui/alert";
import { UiButton } from "@scenariom/design-system/components/ui/button";
import { UiCard, UiCardBody, UiCardDescription, UiCardTitle } from "@scenariom/design-system/components/ui/card";
import { UiEmptyState } from "@scenariom/design-system/components/ui/empty-state";
import { UiSpinner } from "@scenariom/design-system/components/ui/spinner";
import { useThemeRuntime } from "@/contexts/theme-runtime-context";
import { getProject } from "../services/projects-api";
import type { Project } from "../types";

export function ProjectWorkspaceScreen() {
  const { projectId } = useLocalSearchParams<{ projectId?: string }>();
  const { language } = useThemeRuntime();
  const t = (key: MessageKey) => translate(key, {}, language);
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!projectId) return;
    let active = true;
    getProject(projectId)
      .then((value) => { if (active) setProject(value); })
      .catch(() => { if (active) setError(true); });
    return () => { active = false; };
  }, [projectId]);

  if (!projectId) {
    return <View className="flex-1 justify-center bg-background p-5"><UiEmptyState title={t("workspace.missingProjectTitle")} description={t("workspace.missingProjectDescription")} /></View>;
  }
  if (error) {
    return <View className="flex-1 justify-center bg-background p-5"><UiAlert tone="danger" title={t("workspace.loadError")}>{t("workspace.loadErrorDescription")}</UiAlert></View>;
  }
  if (!project) {
    return <View className="flex-1 items-center justify-center bg-background p-5"><UiSpinner label={t("common.loading")} /></View>;
  }

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="mx-auto w-full max-w-4xl gap-5 p-5 pb-28">
      <UiButton variant="ghost" onPress={() => router.back()}>{t("workspace.back")}</UiButton>
      <UiCard>
        <UiCardBody>
          <UiCardTitle>{project.title}</UiCardTitle>
          <UiCardDescription>{project.description || t("projects.noDescription")}</UiCardDescription>
        </UiCardBody>
      </UiCard>
      <UiCard>
        <UiCardBody>
          <UiCardTitle>{t("workspace.scenesTitle")}</UiCardTitle>
          <UiCardDescription>{t("workspace.scenesUnavailable")}</UiCardDescription>
        </UiCardBody>
      </UiCard>
    </ScrollView>
  );
}
