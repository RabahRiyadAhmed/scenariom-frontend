import { SiteNav } from "@/components/site-nav";
import { SceneEditorScreen } from "@/features/scenes/components/scene-editor-screen";

export default function EditorPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="mx-auto max-w-4xl px-6 py-16">
        <SceneEditorScreen />
      </section>
    </main>
  );
}
