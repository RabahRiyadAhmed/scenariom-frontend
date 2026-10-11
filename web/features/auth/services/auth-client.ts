const gatewayUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
const getLanguage = () => typeof window === "undefined" ? "en" : localStorage.getItem("scenariom.language") ?? "en";
const languageHeaders = () => ({ "Accept-Language": getLanguage() });

export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
};

async function requestProfile() {
  return fetch(`${gatewayUrl}/auth/me`, {
    credentials: "include",
    cache: "no-store",
    headers: languageHeaders(),
  });
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  let response = await requestProfile().catch(() => null);
  if (response?.status === 401) {
    const refreshed = await fetch(`${gatewayUrl}/auth/web/refresh`, {
      method: "POST",
      credentials: "include",
      cache: "no-store",
    }).catch(() => null);
    if (refreshed?.ok) response = await requestProfile().catch(() => null);
  }
  if (!response?.ok) return null;
  return response.json() as Promise<AuthUser>;
}

export async function authenticate(mode: "login" | "register", email: string, password: string) {
  const payload = mode === "register" ? { email, password, displayName: email.split("@")[0] || "Créateur" } : { email, password };
  const response = await fetch(`${gatewayUrl}/auth/web/${mode}`, {
    method: "POST",
    credentials: "include",
    headers: { "content-type": "application/json", ...languageHeaders() },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null) as { message?: string | string[] } | null;
    throw new Error(Array.isArray(body?.message) ? body.message[0] : body?.message ?? "Connexion impossible.");
  }
}

export async function logout() {
  const response = await fetch(`${gatewayUrl}/auth/web/logout`, {
    method: "POST",
    credentials: "include",
    cache: "no-store",
    headers: languageHeaders(),
  });
  if (!response.ok && response.status !== 401) {
    throw new Error("Déconnexion impossible.");
  }
}
