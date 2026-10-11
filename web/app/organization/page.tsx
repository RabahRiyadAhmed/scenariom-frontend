import { SiteNav } from "@/components/site-nav";
import { ProjectWorkspaceScreen } from "@/features/projects/components/project-workspace-screen";

export default async function OrganizationPage({ searchParams }: { searchParams: Promise<{ projectId?: string }> }) {
  const { projectId } = await searchParams;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <ProjectWorkspaceScreen projectId={projectId} />
      </section>
    </main>
  );
}
