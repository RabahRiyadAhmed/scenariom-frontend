import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeRuntimeProvider } from "@/components/theme-runtime-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scenariom",
  description: "Créez et partagez des univers narratifs interactifs.",
  icons: { icon: "/assets/images/logos/logo.ico" },
};

const themeBootScript = `(()=>{try{const r=document.documentElement;const stored=localStorage.getItem('scenariom-color-mode');const mode=stored==='light'||stored==='dark'||stored==='system'?stored:'system';const resolved=mode==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):mode;const style=localStorage.getItem('scenariom-style')||'scenariom';const language=localStorage.getItem('scenariom.language')||'en';r.dataset.theme=resolved;r.dataset.style=style;r.lang=language;r.dir=language==='ar'?'rtl':'ltr';const raw=localStorage.getItem('scenariom-theme-cache');if(raw){const cache=JSON.parse(raw);if(cache.slug===style&&cache.mode===resolved&&cache.variables)Object.entries(cache.variables).forEach(([key,value])=>r.style.setProperty(key,String(value)));if(cache.slug===style&&cache.mode===resolved){r.dataset.bg=cache.backgroundEnabled&&cache.backgroundImageUrl?'true':'false';r.style.setProperty('--bg-opacity',String(cache.opacity??100));if(cache.backgroundEnabled&&cache.backgroundImageUrl){document.addEventListener('DOMContentLoaded',()=>{document.body.style.backgroundImage='url("'+String(cache.backgroundImageUrl).replace(/["\\]/g,'')+'")';document.body.style.backgroundSize='cover';document.body.style.backgroundPosition='center';document.body.style.backgroundAttachment='fixed'})}}}}catch{}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head><Script id="scenariom-theme-boot" strategy="beforeInteractive" dangerouslySetInnerHTML={{__html:themeBootScript}} /></head>
      <body className="min-h-full flex flex-col"><ThemeRuntimeProvider>{children}</ThemeRuntimeProvider></body>
    </html>
  );
}
