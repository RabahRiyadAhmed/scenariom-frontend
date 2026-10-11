"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authenticate } from "@/features/auth/services/auth-client";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const register = mode === "register";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError("");
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    try {
      await authenticate(mode, email, password);
      router.replace("/projects");
      router.refresh();
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Connexion impossible."); setPending(false); }
  }

  return <main className="grid min-h-screen bg-background text-foreground lg:grid-cols-2"><section className="hidden bg-gradient-to-br from-primary to-accent p-12 text-white lg:flex lg:flex-col lg:justify-between"><Image src="/assets/images/logos/logo-dark.jpg" alt="Scenariom" width={1024} height={1024} className="size-16 rounded-xl"/><div><p className="text-sm font-semibold uppercase tracking-[.25em] text-white/70">Scenariom</p><h1 className="mt-5 max-w-xl text-5xl font-semibold leading-tight">Construisez des univers qui dépassent la page.</h1><p className="mt-5 max-w-lg text-lg leading-8 text-white/75">Organisation, écriture et narration interactive dans un même espace de création.</p></div><p className="text-sm text-white/60">Votre histoire reste la vôtre.</p></section><section className="flex items-center justify-center p-6"><div className="w-full max-w-md"><Link href="/" className="readable-on-background mb-10 inline-flex items-center gap-3"><Image src="/assets/images/logos/logo-light.jpg" alt="" width={1024} height={1024} className="theme-logo-light size-11 rounded-lg"/><Image src="/assets/images/logos/logo-dark.jpg" alt="" width={1024} height={1024} className="theme-logo-dark size-11 rounded-lg"/><span className="text-xl font-semibold">Scenariom</span></Link><p className="readable-on-background text-sm font-semibold text-primary">{register ? "CRÉER UN COMPTE" : "BON RETOUR"}</p><h2 className="readable-on-background mt-2 text-3xl font-semibold">{register ? "Commencer à créer" : "Se connecter"}</h2><p className="readable-on-background mt-3 text-muted">{register ? "Un e-mail et un mot de passe suffisent pour commencer." : "Retrouvez vos projets et votre espace de création."}</p><form onSubmit={submit} className="mt-8 space-y-5"><label className="readable-on-background block text-sm font-medium">Adresse e-mail<input name="email" type="email" autoComplete="email" required className="mt-2 w-full rounded-md border border-border bg-surface px-4 py-3 outline-none focus:border-primary"/></label><label className="readable-on-background block text-sm font-medium">Mot de passe<input name="password" type="password" autoComplete={register ? "new-password" : "current-password"} minLength={register ? 12 : undefined} required className="mt-2 w-full rounded-md border border-border bg-surface px-4 py-3 outline-none focus:border-primary"/></label>{error&&<p role="alert" className="rounded-md bg-danger/10 p-3 text-sm text-danger">{error}</p>}<button disabled={pending} className="w-full rounded-md bg-primary px-5 py-3 font-semibold text-white disabled:opacity-60">{pending ? "Chargement…" : register ? "Créer mon compte" : "Se connecter"}</button></form><p className="readable-on-background mt-6 text-center text-sm text-muted">{register ? "Déjà un compte ?" : "Pas encore de compte ?"} <Link className="font-semibold text-primary" href={register ? "/login" : "/register"}>{register ? "Se connecter" : "S’inscrire"}</Link></p></div></section></main>;
}
