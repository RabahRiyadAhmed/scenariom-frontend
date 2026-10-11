"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout, type AuthUser } from "@/features/auth/services/auth-client";
import { FloatingSettings } from '@/components/floating-settings';
import { useThemeRuntime } from '@/components/theme-runtime-provider';
import { translate, type MessageKey } from '@scenariom/i18n';

export function SiteNav({ project }: { project?: string }) {
  const router = useRouter();
  const{language}=useThemeRuntime();const t=(key:MessageKey)=>translate(key,{},language);const labels=[t('nav.projects'),t('nav.organization'),t('nav.writing'),t('nav.ui'),t('nav.components'),t('nav.languages'),t('nav.login'),t('nav.logout')];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    let active = true;
    getCurrentUser()
      .then((currentUser) => { if (active) setUser(currentUser); })
      .finally(() => { if (active) setAuthLoading(false); });
    return () => { active = false; };
  }, []);
  const signOut = async () => {
    setAuthLoading(true);
    try {
      await logout();
      setUser(null);
      router.replace("/login");
      router.refresh();
    } finally {
      setAuthLoading(false);
    }
  };

  return (<>
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center gap-3 px-4 py-2 sm:px-6 lg:px-10">
        <Link href="/" aria-label="Accueil Scenariom" className="shrink-0">
          <Image src="/assets/images/logos/logo-light.jpg" alt="Scenariom" width={1024} height={1024} className="theme-logo-light size-10 rounded-md" priority />
          <Image src="/assets/images/logos/logo-dark.jpg" alt="Scenariom" width={1024} height={1024} className="theme-logo-dark size-10 rounded-md" priority />
        </Link>
        {project && <><span className="text-muted">/</span><span className="hidden text-sm font-semibold sm:inline">{project}</span></>}
        <button type="button" aria-label="Open navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(current => !current)} className="ms-auto size-11 rounded-md border border-border bg-surface text-xl lg:hidden">{mobileOpen ? '×' : '☰'}</button>
        <nav className="ml-auto hidden items-center gap-1 text-sm font-medium lg:flex">
          {[['/projects',labels[0]],['/organization',labels[1]],['/editor',labels[2]],['/ui-kit',labels[3]],['/components',labels[4]],['/language-test',labels[5]]].map(([href,label])=><Link key={href} className="rounded-md px-3 py-2 hover:bg-card" href={href}>{label}</Link>)}
          {authLoading ? (
            <span className="rounded-md bg-card px-3 py-2 text-muted" aria-label="Vérification de la session">…</span>
          ) : user ? (
            <div className="flex items-center gap-2">
              <span className="hidden max-w-32 truncate text-muted lg:inline" title={user.email}>{user.displayName}</span>
              <button type="button" onClick={signOut} className="rounded-md bg-primary px-3 py-2 text-white">{labels[7]}</button>
            </div>
          ) : (
            <Link className="rounded-md bg-primary px-3 py-2 text-white" href="/login">{labels[6]}</Link>
          )}
        </nav>
      </div>
      {mobileOpen && <div className="border-t border-border px-4 py-4 lg:hidden">
        <nav className="grid gap-1 text-sm font-medium">{[['/projects',labels[0]],['/organization',labels[1]],['/editor',labels[2]],['/ui-kit',labels[3]],['/components',labels[4]],['/language-test',labels[5]]].map(([href,label])=><Link key={href} onClick={()=>setMobileOpen(false)} className="min-h-11 rounded-md px-3 py-3 hover:bg-card" href={href}>{label}</Link>)}</nav>
        <div className="mt-3">{authLoading?<span className="text-muted">…</span>:user?<button type="button" onClick={signOut} className="min-h-11 w-full rounded-md bg-primary px-4 text-white">{labels[7]}</button>:<Link onClick={()=>setMobileOpen(false)} href="/login" className="flex min-h-11 items-center justify-center rounded-md bg-primary px-4 text-white">{labels[6]}</Link>}</div>
      </div>}
    </header><FloatingSettings /></>
  );
}
