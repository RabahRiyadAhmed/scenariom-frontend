import { notFound } from 'next/navigation';
import { componentCatalog, componentSlug, findCatalogComponent } from '@scenariom/design-system/component-catalog';
import { ComponentPageContent } from '@/features/component-lab/components/component-page-content';
export function generateStaticParams(){return componentCatalog.map(([,name])=>({slug:componentSlug(name)}))}
export default async function ComponentPage({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const component=findCatalogComponent(slug);if(!component)notFound();return <ComponentPageContent group={component[0]} name={component[1]}/>}
