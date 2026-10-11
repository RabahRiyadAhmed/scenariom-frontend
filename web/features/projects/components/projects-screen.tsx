"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { translate, type MessageKey } from "@scenariom/i18n";
import { UiAlert } from "@scenariom/design-system/components/ui/alert";
import { UiButton } from "@scenariom/design-system/components/ui/button";
import { UiCard, UiCardBody, UiCardDescription, UiCardTitle } from "@scenariom/design-system/components/ui/card";
import { UiEmptyState } from "@scenariom/design-system/components/ui/empty-state";
import { UiSpinner } from "@scenariom/design-system/components/ui/spinner";
import { UiTextField } from "@scenariom/design-system/components/ui/text-field";
import { useThemeRuntime } from "@/components/theme-runtime-provider";
import { createProject, listProjects, ProjectsClientError } from "../services/projects-client";
import type { Project } from "../types";

export function ProjectsScreen() {
  const router = useRouter();
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
      if (reason instanceof ProjectsClientError && reason.code === "unauthorized") {
        router.replace("/login");
        return;
      }
      setError("projects.loadError");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    let active = true;
    listProjects()
      .then((items) => { if (active) setProjects(items); })
      .catch((reason) => {
        if (!active) return;
        if (reason instanceof ProjectsClientError && reason.code === "unauthorized") {
          router.replace("/login");
          return;
        }
        setError("projects.loadError");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [router]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedTitle = title.trim();
    if (!normalizedTitle) return;
    setCreating(true);
    setError(null);
    try {
      const project = await createProject({ title: normalizedTitle, description: "" });
      setProjects((current) => [project, ...current]);
      setTitle("");
    } catch (reason) {
      if (reason instanceof ProjectsClientError && reason.code === "unauthorized") {
        router.replace("/login");
        return;
      }
      setError("projects.createError");
    } finally {
      setCreating(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-sm font-semibold text-primary">{t("projects.eyebrow")}</p>
          <h1 className="mt-2 text-4xl font-semibold">{t("projects.title")}</h1>
          <p className="mt-3 text-muted">{t("projects.description")}</p>
        </div>
        <form onSubmit={submit} className="flex w-full max-w-xl items-end gap-3 sm:w-auto">
          <div className="min-w-0 flex-1 sm:w-72">
            <UiTextField
              label={t("projects.nameLabel")}
              value={title}
              onChangeText={setTitle}
              placeholder={t("projects.namePlaceholder")}
            />
          </div>
          <UiButton loading={creating} disabled={!title.trim()}>
            {creating ? t("projects.creating") : t("projects.create")}
          </UiButton>
        </form>
      </div>

      {error && (
        <div className="mt-8">
          <UiAlert tone="danger" title={t(error)}>
            <UiButton tone="danger" variant="outline" size="sm" onPress={() => void load()}>
              {t("common.retry")}
            </UiButton>
          </UiAlert>
        </div>
      )}

      {loading ? (
        <div className="flex min-h-72 items-center justify-center">
          <UiSpinner label={t("common.loading")} />
        </div>
      ) : projects.length === 0 ? (
        <div className="mt-10">
          <UiEmptyState title={t("projects.emptyTitle")} description={t("projects.emptyDescription")} />
        </div>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.id} href={`/organization?projectId=${encodeURIComponent(project.id)}`}>
              <UiCard interactive>
                <div className="h-32 bg-gradient-to-br from-primary to-accent p-5" aria-hidden="true">
                  <div className="h-full rounded-md border border-white/20 bg-black/10" />
                </div>
                <UiCardBody>
                  <UiCardTitle>{project.title}</UiCardTitle>
                  <UiCardDescription>
                    {project.description || t("projects.noDescription")}
                  </UiCardDescription>
                  <p className="text-xs text-muted">
                    {t("projects.updatedAt", { date: new Intl.DateTimeFormat(language).format(new Date(project.updatedAt)) })}
                  </p>
                </UiCardBody>
              </UiCard>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
