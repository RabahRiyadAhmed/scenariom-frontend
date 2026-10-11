import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

const features = [
  ["Organiser", "Structurez scènes, personnages, lieux et branches narratives dans un même projet."],
  ["Écrire", "Rédigez vos scènes dans un espace calme, relié au reste de votre univers."],
  ["Mettre en scène", "Préparez le canvas, les interactions et les animations sans casser votre récit."],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_.9fr] lg:px-10 lg:py-28">
        <div className="flex flex-col items-start justify-center">
          <p className="mb-5 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted">Votre univers, de la première idée à l’expérience</p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-7xl">Les histoires méritent plus qu’une page blanche.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">Scenariom rassemble écriture, organisation visuelle et narration interactive dans un espace de création cohérent.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link className="rounded-md bg-primary px-6 py-3 font-semibold text-white transition hover:bg-accent" href="/projects">Voir mes projets</Link>
            <Link className="rounded-md border border-border bg-surface px-6 py-3 font-semibold transition hover:bg-card" href="/editor">Tester l’éditeur</Link>
          </div>
        </div>
        <div className="relative min-h-96 overflow-hidden rounded-xl border border-border bg-surface p-5 shadow-2xl shadow-primary/10">
          <div className="mb-5 flex items-center gap-2"><i className="size-2.5 rounded-full bg-danger"/><i className="size-2.5 rounded-full bg-warning"/><i className="size-2.5 rounded-full bg-success"/></div>
          <div className="grid h-[calc(100%-2rem)] grid-cols-[110px_1fr] gap-4">
            <aside className="rounded-lg bg-card p-3 text-xs text-muted"><p className="mb-4 font-semibold text-foreground">Chapitre I</p><p className="mb-3">01 · Arrivée</p><p className="mb-3 text-primary">02 · La porte</p><p>03 · Le choix</p></aside>
            <article className="rounded-lg border border-border p-7"><p className="text-xs font-semibold uppercase tracking-widest text-accent">Scène 02</p><h2 className="mt-3 text-2xl font-semibold">La porte sous la ville</h2><p className="mt-5 leading-7 text-muted">Le métal vibrait doucement sous sa paume. Derrière la porte, quelque chose attendait depuis longtemps.</p><div className="mt-8 h-28 rounded-md bg-gradient-to-br from-primary to-accent opacity-90"/></article>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 pb-24 md:grid-cols-3 lg:px-10">
        {features.map(([title, text], index) => <article key={title} className="rounded-lg border border-border bg-surface p-7"><span className="text-sm font-semibold text-primary">0{index + 1}</span><h2 className="mt-5 text-xl font-semibold">{title}</h2><p className="mt-3 leading-7 text-muted">{text}</p></article>)}
      </section>
    </main>
  );
}
