"use client";
import { UiAccordion,UiCard,UiCardBody,UiCardTitle,UiCollapse,UiTabs } from "@scenariom/design-system/ui";

const tabs=[
  {value:'home',label:'Home',content:'Home — Food truck quinoa dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.'},
  {value:'profile',label:'Profile',content:'Profile — Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.'},
  {value:'messages',label:'Messages',content:'Messages — Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec.'},
];
const accordions=[
  {value:'one',title:'What is Vakal text here?',content:'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.'},
  {value:'two',title:'What is Vakal text here?',content:'Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee.'},
  {value:'three',title:'How many variations exist?',content:'Food truck quinoa nesciunt laborum eiusmod.'},
  {value:'four',title:'What is Vakal text here?',content:'Nihil anim keffiyeh helvetica, craft beer labore.'},
];
const faq=[
  {value:'license',title:'Can I use this template for my client?',content:'Yes, the marketplace license allows use in end products.'},
  {value:'wordpress',title:'Can this theme work with Wordpress?',content:'No. This is an application template.'},
  {value:'support',title:'How do I get help with the theme?',content:'Use the dedicated support channel.'},
  {value:'updates',title:'Will you regularly give updates?',content:'Future updates remain available.'},
];
function Demo({title,children}:{title:string;children:React.ReactNode}){return <UiCard><UiCardBody><UiCardTitle>{title}</UiCardTitle><div className="mt-4">{children}</div></UiCardBody></UiCard>}
export function TabsAccordionsTemplatePreview(){return <div className="grid gap-5 xl:grid-cols-2">
  <Demo title="Default Tabs"><UiTabs items={tabs} defaultValue="profile"/></Demo>
  <Demo title="Tabs Justified"><UiTabs items={tabs} defaultValue="profile" variant="pills" justified/></Demo>
  <Demo title="Tabs Vertical Left"><UiTabs items={tabs} defaultValue="home" variant="pills" orientation="vertical-left"/></Demo>
  <Demo title="Tabs Vertical Right"><UiTabs items={tabs} defaultValue="home" variant="pills" orientation="vertical-right"/></Demo>
  <Demo title="Tabs Bordered"><UiTabs items={tabs} defaultValue="profile" variant="bordered"/></Demo>
  <Demo title="Tabs Bordered Justified"><p className="mb-3 text-sm text-muted">Navigation with a simple bottom border and justified items.</p><UiTabs items={tabs} defaultValue="profile" variant="bordered" justified/></Demo>
  <UiAccordion items={accordions} defaultValue="one"/><UiAccordion items={faq} defaultValue="license" variant="question"/>
  <UiCollapse trigger="Link with href" secondTrigger="Button with data-bs-target">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore.</UiCollapse>
  <UiCollapse trigger="Toggle width collapse" defaultOpen={false} horizontal>This is some placeholder content for a horizontal collapse. It is hidden by default and shown when triggered.</UiCollapse>
</div>}
