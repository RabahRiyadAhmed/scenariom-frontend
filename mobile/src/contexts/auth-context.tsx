import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { authenticate, AuthUser, logout, restoreSession } from '@/services/auth';

type AuthContextValue = { user: AuthUser | null; loading: boolean; signIn(mode: 'login' | 'register', email: string, password: string): Promise<void>; signOut(): Promise<void> };
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { restoreSession().then(setUser).finally(() => setLoading(false)); }, []);
  const value: AuthContextValue = {
    user, loading,
    async signIn(mode, email, password) { setUser(await authenticate(mode, email, password)); },
    async signOut() { await logout(); setUser(null); },
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth doit être utilisé dans AuthProvider.');
  return value;
}
