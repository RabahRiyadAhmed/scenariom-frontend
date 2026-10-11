import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const fallbackHost = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? `http://${fallbackHost}:4000/api`;

type AuthResponse = { accessToken: string; refreshToken: string; user: { id: string; email: string; displayName: string } };
export type AuthUser = AuthResponse['user'];
const ACCESS_KEY = 'scenariom.accessToken';
const REFRESH_KEY = 'scenariom.refreshToken';
const LANGUAGE_KEY = 'scenariom.language';
async function languageHeaders() { return { 'Accept-Language': await SecureStore.getItemAsync(LANGUAGE_KEY) ?? 'en' }; }

export async function authenticate(mode: 'login' | 'register', email: string, password: string) {
  const payload = mode === 'register' ? { email, password, displayName: email.split('@')[0] || 'Créateur' } : { email, password };
  const response = await fetch(`${API_URL}/auth/mobile/${mode}`, { method: 'POST', headers: { 'content-type': 'application/json', ...(await languageHeaders()) }, body: JSON.stringify(payload) });
  const body = await response.json().catch(() => null) as AuthResponse | { message?: string | string[] } | null;
  if (!response.ok) { const message = body && 'message' in body ? body.message : undefined; throw new Error(Array.isArray(message) ? message[0] : message ?? 'Connexion impossible.'); }
  const auth = body as AuthResponse;
  await saveTokens(auth);
  return auth.user;
}

export async function getAccessToken() { return SecureStore.getItemAsync(ACCESS_KEY); }

export async function restoreSession(): Promise<AuthUser | null> {
  let accessToken = await SecureStore.getItemAsync(ACCESS_KEY);
  const refreshToken = await SecureStore.getItemAsync(REFRESH_KEY);
  if (!accessToken || !refreshToken) return null;
  let response = await fetch(`${API_URL}/auth/me`, { headers: { authorization: `Bearer ${accessToken}`, ...(await languageHeaders()) } });
  if (response.status === 401) {
    const refreshed = await fetch(`${API_URL}/auth/mobile/refresh`, { method: 'POST', headers: { 'content-type': 'application/json', ...(await languageHeaders()) }, body: JSON.stringify({ refreshToken }) });
    if (!refreshed.ok) { await clearSession(); return null; }
    const auth = await refreshed.json() as AuthResponse;
    await saveTokens(auth); accessToken = auth.accessToken;
    response = await fetch(`${API_URL}/auth/me`, { headers: { authorization: `Bearer ${accessToken}`, ...(await languageHeaders()) } });
  }
  if (!response.ok) { await clearSession(); return null; }
  return response.json() as Promise<AuthUser>;
}

export async function logout() {
  const refreshToken = await SecureStore.getItemAsync(REFRESH_KEY);
  if (refreshToken) await fetch(`${API_URL}/auth/mobile/logout`, { method: 'POST', headers: { 'content-type': 'application/json', ...(await languageHeaders()) }, body: JSON.stringify({ refreshToken }) }).catch(() => undefined);
  await clearSession();
}

async function saveTokens(auth: Pick<AuthResponse, 'accessToken' | 'refreshToken'>) {
  await Promise.all([SecureStore.setItemAsync(ACCESS_KEY, auth.accessToken), SecureStore.setItemAsync(REFRESH_KEY, auth.refreshToken)]);
}
async function clearSession() { await Promise.all([SecureStore.deleteItemAsync(ACCESS_KEY), SecureStore.deleteItemAsync(REFRESH_KEY)]); }
