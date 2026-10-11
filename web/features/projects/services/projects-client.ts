import type { Project } from "../types";

const gatewayUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export class ProjectsClientError extends Error {
  constructor(readonly code: "unauthorized" | "request_failed") {
    super(code);
  }
}

function languageHeaders() {
  const language = typeof window === "undefined"
    ? "en"
    : localStorage.getItem("scenariom.language") ?? "en";
  return { "Accept-Language": language };
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${gatewayUrl}${path}`, {
    ...init,
    credentials: "include",
    cache: "no-store",
    headers: {
      ...languageHeaders(),
      ...(init?.body ? { "content-type": "application/json" } : {}),
      ...init?.headers,
    },
  }).catch(() => null);

  if (!response) throw new ProjectsClientError("request_failed");
  if (response.status === 401) throw new ProjectsClientError("unauthorized");
  if (!response.ok) throw new ProjectsClientError("request_failed");
  return response.json() as Promise<T>;
}

export function listProjects() {
  return request<Project[]>("/projects");
}

export function getProject(projectId: string) {
  return request<Project>(`/projects/${encodeURIComponent(projectId)}`);
}

export function createProject(input: Pick<Project, "title" | "description">) {
  return request<Project>("/projects", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
