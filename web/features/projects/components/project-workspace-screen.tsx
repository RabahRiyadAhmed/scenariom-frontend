"use client";

import { useEffect, useState } from "react";
import { translate, type MessageKey } from "@scenariom/i18n";
import { UiAlert } from "@scenariom/design-system/components/ui/alert";
import { UiCard, UiCardBody, UiCardDescription, UiCardTitle } from "@scenariom/design-system/components/ui/card";
import { UiEmptyState } from "@scenariom/design-system/components/ui/empty-state";
import { UiPageHeader } from "@scenariom/design-system/components/ui/page-header";
import { UiSpinner } from "@scenariom/design-system/components/ui/spinner";
import { useThemeRuntime } from "@/components/theme-runtime-provider";
import { getProject } from "../services/projects-client";
import type { Project } from "../types";

export function ProjectWorkspaceScreen({ projectId }: { projectId?: string }) {
  const { language } = useThemeRuntime();
  const t = (key: MessageKey) => translate(key, {}, language);
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(Boolean(projectId));

  useEffect(() => {
    if (!projectId) return;
    let active = true;
    getProject(projectId)
      .then((value) => { if (active) setProject(value); })
      .catch(() => { if (active) setError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [projectId]);

  if (!projectId) {
    return <UiEmptyState title={t("workspace.missingProjectTitle")} description={t("workspace.missingProjectDescription")} />;
  }
  if (loading) return <div className="flex min-h-72 items-center justify-center"><UiSpinner label={t("common.loading")} /></div>;
  if (error || !project) return <UiAlert tone="danger" title={t("workspace.loadError")}>{t("workspace.loadErrorDescription")}</UiAlert>;

  return (
    <div className="space-y-8">
      <UiPageHeader title={project.title} description={project.description || t("projects.noDescription")} eyebrow={t("workspace.eyebrow")} />
      <UiCard>
        <UiCardBody>
          <UiCardTitle>{t("workspace.scenesTitle")}</UiCardTitle>
          <UiCardDescription>{t("workspace.scenesUnavailable")}</UiCardDescription>
        </UiCardBody>
      </UiCard>
    </div>
  );
}
