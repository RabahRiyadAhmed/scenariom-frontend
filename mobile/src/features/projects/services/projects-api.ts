import { API_URL, getAccessToken } from "@/services/auth";
import type { Project } from "../types";

export class ProjectsApiError extends Error {
  constructor(readonly code: "unauthorized" | "request_failed") {
    super(code);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const accessToken = await getAccessToken();
  if (!accessToken) throw new ProjectsApiError("unauthorized");

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${accessToken}`,
      ...(init?.body ? { "content-type": "application/json" } : {}),
      ...init?.headers,
    },
  }).catch(() => null);

  if (!response) throw new ProjectsApiError("request_failed");
  if (response.status === 401) throw new ProjectsApiError("unauthorized");
  if (!response.ok) throw new ProjectsApiError("request_failed");
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
