import { useCallback, useEffect, useState } from "react";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { translate, type MessageKey } from "@scenariom/i18n";
import { UiAlert } from "@scenariom/design-system/components/ui/alert";
import { UiButton } from "@scenariom/design-system/components/ui/button";
import { UiCard, UiCardBody, UiCardDescription, UiCardTitle } from "@scenariom/design-system/components/ui/card";
import { UiEmptyState } from "@scenariom/design-system/components/ui/empty-state";
import { UiSpinner } from "@scenariom/design-system/components/ui/spinner";
import { UiTextField } from "@scenariom/design-system/components/ui/text-field";
import { useAuth } from "@/contexts/auth-context";
import { useThemeRuntime } from "@/contexts/theme-runtime-context";
import { createProject, listProjects, ProjectsApiError } from "../services/projects-api";
import type { Project } from "../types";

export function ProjectsScreen() {
  const { user, loading: sessionLoading } = useAuth();
  const { language } = useThemeRuntime();
  const t = useCallback((key: MessageKey, values = {}) => translate(key, values, language), [language]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<MessageKey | null>(null);
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setProjects(await listProjects());
    } catch (reason) {
      if (reason instanceof ProjectsApiError && reason.code === "unauthorized") {
        router.replace("/login");
        return;
      }
      setError("projects.loadError");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (sessionLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    let active = true;
    listProjects()
      .then((items) => { if (active) setProjects(items); })
      .catch((reason) => {
        if (!active) return;
        if (reason instanceof ProjectsApiError && reason.code === "unauthorized") {
          router.replace("/login");
          return;
        }
        setError("projects.loadError");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [sessionLoading, user]);

  async function submit() {
    const normalizedTitle = title.trim();
    if (!normalizedTitle) return;
    setCreating(true);
    setError(null);
    try {
      const project = await createProject({ title: normalizedTitle, description: "" });
      setProjects((current) => [project, ...current]);
      setTitle("");
    } catch (reason) {
      if (reason instanceof ProjectsApiError && reason.code === "unauthorized") {
        router.replace("/login");
        return;
      }
      setError("projects.createError");
    } finally {
      setCreating(false);
    }
  }

  if (sessionLoading || loading) {
    return (
      <View className="flex-1 items-center justify-center bg-background p-6">
        <UiSpinner label={t("common.loading")} />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="mx-auto w-full max-w-4xl gap-5 p-5 pb-28">
      <View className="gap-2">
        <UiCardTitle>{t("projects.title")}</UiCardTitle>
        <UiCardDescription>{t("projects.description")}</UiCardDescription>
      </View>

      <UiCard>
        <UiCardBody>
          <UiTextField
            label={t("projects.nameLabel")}
            value={title}
            onChangeText={setTitle}
            placeholder={t("projects.namePlaceholder")}
          />
          <UiButton fullWidth loading={creating} disabled={!title.trim()} onPress={() => void submit()}>
            {creating ? t("projects.creating") : t("projects.create")}
          </UiButton>
        </UiCardBody>
      </UiCard>

      {error && (
        <UiAlert tone="danger" title={t(error)}>
          <UiButton tone="danger" variant="outline" size="sm" onPress={() => void load()}>
            {t("common.retry")}
          </UiButton>
        </UiAlert>
      )}

      {projects.length === 0 ? (
        <UiEmptyState title={t("projects.emptyTitle")} description={t("projects.emptyDescription")} />
      ) : (
        projects.map((project) => (
          <UiCard
            key={project.id}
            interactive
            onPress={() => router.push({ pathname: "/organization", params: { projectId: project.id } })}
          >
            <View className="h-24 bg-primary" />
            <UiCardBody>
              <UiCardTitle>{project.title}</UiCardTitle>
              <UiCardDescription>{project.description || t("projects.noDescription")}</UiCardDescription>
              <UiCardDescription>
                {t("projects.updatedAt", { date: new Intl.DateTimeFormat(language).format(new Date(project.updatedAt)) })}
              </UiCardDescription>
            </UiCardBody>
          </UiCard>
        ))
      )}
    </ScrollView>
  );
}
