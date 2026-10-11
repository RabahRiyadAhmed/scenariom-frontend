import { SiteNav } from '@/components/site-nav';
import { ComponentsNavigation } from '@/features/component-lab/components/components-navigation';

export default function ComponentsLayout({children}:{children:React.ReactNode}){return <main className="min-h-screen bg-background text-foreground"><SiteNav/><div className="mx-auto max-w-[1500px] md:grid md:grid-cols-[260px_minmax(0,1fr)]"><ComponentsNavigation/><div className="min-w-0 p-4 sm:p-6 lg:p-8">{children}</div></div></main>}
