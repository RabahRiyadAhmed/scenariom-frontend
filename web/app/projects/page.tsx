import { SiteNav } from "@/components/site-nav";
import { ProjectsScreen } from "@/features/projects/components/projects-screen";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <ProjectsScreen />
    </main>
  );
}
