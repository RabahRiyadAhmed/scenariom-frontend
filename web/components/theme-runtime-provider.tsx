'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { isThemeDefinition, resolveThemeColors, scenariomTheme, themeCssVariables, type ThemeColors, type ThemeDefinition, type ThemeRecord } from '@scenariom/design-system/themes';
import { getDirection, supportedLocales, type Locale } from '@scenariom/i18n';

type ColorMode = 'system' | 'light' | 'dark';
type ThemeRuntime = { theme: ThemeDefinition; colors: ThemeColors; themes: ThemeRecord[]; themeSlug: string; mode: ColorMode; resolvedMode:'light'|'dark'; slideImageUrl?:string; backgroundOpacity:number; backgroundFilter:number; previewBackgroundOpacity:(value:number|null)=>void; previewBackgroundFilter:(value:number|null)=>void; saveBackgroundAppearance:()=>Promise<void>; setThemeSlug: (slug:string)=>void; setMode:(mode:ColorMode)=>void; language:Locale; setLanguage:(locale:Locale)=>void; backgroundEnabled: boolean; setBackgroundEnabled:(enabled:boolean)=>void };
const ThemeRuntimeContext=createContext<ThemeRuntime | null>(null);
export const apiUrl=process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export function ThemeRuntimeProvider({children}:{children:ReactNode}) {
  const[themes,setThemes]=useState<ThemeRecord[]>([]);const[themeSlug,setThemeSlugState]=useState('scenariom');const[mode,setModeState]=useState<ColorMode>('system');const[language,setLanguageState]=useState<Locale>('en');const[systemDark,setSystemDark]=useState(false);const[backgroundEnabled,setBackgroundEnabledState]=useState(true);const[preferencesReady,setPreferencesReady]=useState(false);const[opacityPreview,setOpacityPreview]=useState<{key:string;value:number}|null>(null);const[filterPreview,setFilterPreview]=useState<{key:string;value:number}|null>(null);
  useEffect(()=>{
    let active=true;
    const media=matchMedia('(prefers-color-scheme: dark)');
    queueMicrotask(()=>{
      if(!active)return;
      const storedTheme=localStorage.getItem('scenariom-style');if(storedTheme)setThemeSlugState(storedTheme);
      const storedMode=localStorage.getItem('scenariom-color-mode');if(storedMode==='system'||storedMode==='light'||storedMode==='dark')setModeState(storedMode);
      const stored=localStorage.getItem('scenariom-background');if(stored!==null)setBackgroundEnabledState(stored!=='false');
      const storedLanguage=localStorage.getItem('scenariom.language');if(storedLanguage&&supportedLocales.includes(storedLanguage as Locale))setLanguageState(storedLanguage as Locale);
      setSystemDark(media.matches);setPreferencesReady(true);
    });
    const update=()=>setSystemDark(media.matches);media.addEventListener('change',update);
    fetch(`${apiUrl}/themes`,{headers:{'Accept-Language':language}}).then(response=>response.ok?response.json():[]).then((records:ThemeRecord[])=>{if(active)setThemes(records.filter(record=>isThemeDefinition(record.definition)))}).catch(()=>{if(active)setThemes([])});
    return()=>{active=false;media.removeEventListener('change',update)};
  },[language]);
  const themeRecord=themes.find(item=>item.slug===themeSlug);const theme=themeRecord?.definition??scenariomTheme;const resolvedMode=mode==='system'?(systemDark?'dark':'light'):mode;
  const previewKey=`${themeSlug}:${resolvedMode}`;
  const generalBackgroundPath=themeRecord?.extraData?.backgroundImagePath as string|undefined;const darkBackgroundPath=themeRecord?.extraData?.backgroundImageDarkPath as string|undefined;const selectedBackgroundPath=resolvedMode==='dark'?(darkBackgroundPath??generalBackgroundPath):generalBackgroundPath;
  const backgroundImageUrl=selectedBackgroundPath?`${apiUrl}${selectedBackgroundPath}`:theme.assets?.backgroundImageUrl;const slideImagePath=themeRecord?.extraData?.slideImagePath as string|undefined;const slideImageUrl=slideImagePath?`${apiUrl}${slideImagePath}`:undefined;
  const bgOpacity=themeRecord?.extraData?.backgroundOpacity as {light:number;dark:number}|undefined;
  const backgroundOpacity=(opacityPreview?.key===previewKey?opacityPreview.value:null)??(resolvedMode==='dark'?bgOpacity?.dark??50:bgOpacity?.light??70);
  const bgFilter=themeRecord?.extraData?.backgroundFilter as {light:number;dark:number}|undefined;
  const backgroundFilter=(filterPreview?.key===previewKey?filterPreview.value:null)??(resolvedMode==='dark'?bgFilter?.dark??24:bgFilter?.light??12);
  useEffect(()=>{document.body.style.backgroundImage=''},[]);
  useEffect(()=>{if(!preferencesReady||(themeSlug!=='scenariom'&&!themeRecord))return;const root=document.documentElement;const variables=themeCssVariables(theme,resolvedMode);Object.entries(variables).forEach(([name,value])=>root.style.setProperty(name,String(value)));root.lang=language;root.dir=getDirection(language);root.dataset.theme=resolvedMode;root.dataset.style=theme.slug;root.dataset.bg=backgroundEnabled&&backgroundImageUrl?'true':'false';root.style.setProperty('--bg-image',backgroundEnabled&&backgroundImageUrl?`url("${backgroundImageUrl.replace(/["\\]/g,'')}")`:'none');root.style.setProperty('--bg-visibility',String(backgroundOpacity));root.style.setProperty('--bg-filter',String(backgroundFilter));localStorage.setItem('scenariom-theme-cache',JSON.stringify({slug:theme.slug,mode:resolvedMode,variables,backgroundEnabled,backgroundImageUrl,opacity:backgroundOpacity,filter:backgroundFilter}));},[preferencesReady,resolvedMode,theme,themeRecord,themeSlug,backgroundImageUrl,backgroundEnabled,backgroundOpacity,backgroundFilter,language]);
  const patchAppearance=async(path:string,body:object)=>{const response=await fetch(`${apiUrl}/themes/${encodeURIComponent(themeSlug)}/${path}`,{method:'PATCH',credentials:'include',headers:{'content-type':'application/json','Accept-Language':language},body:JSON.stringify(body)});if(!response.ok)throw new Error('Unable to save theme background appearance.');const updated=await response.json() as ThemeRecord;setThemes(items=>items.map(item=>item.slug===updated.slug?updated:item))};
  const saveBackgroundAppearance=async()=>{if(themeSlug==='scenariom')return;await patchAppearance('background-opacity',{mode:resolvedMode,opacity:backgroundOpacity});await patchAppearance('background-filter',{mode:resolvedMode,filter:backgroundFilter});setOpacityPreview(null);setFilterPreview(null)};
  const value=useMemo<ThemeRuntime>(()=>({theme,colors:resolveThemeColors(theme,resolvedMode),themes:[{slug:'scenariom',name:'Scenariom',description:'Built-in safe theme.',definition:scenariomTheme},...themes],themeSlug,mode,resolvedMode,slideImageUrl,backgroundOpacity,backgroundFilter,previewBackgroundOpacity:(next)=>setOpacityPreview(next===null?null:{key:previewKey,value:next}),previewBackgroundFilter:(next)=>setFilterPreview(next===null?null:{key:previewKey,value:next}),saveBackgroundAppearance,language,backgroundEnabled,setThemeSlug:(slug)=>{setThemeSlugState(slug);localStorage.setItem('scenariom-style',slug)},setMode:(next)=>{setModeState(next);localStorage.setItem('scenariom-color-mode',next)},setLanguage:(next)=>{setLanguageState(next);localStorage.setItem('scenariom.language',next)},setBackgroundEnabled:(enabled)=>{setBackgroundEnabledState(enabled);localStorage.setItem('scenariom-background',String(enabled))}}),[mode,resolvedMode,theme,themeSlug,themes,backgroundEnabled,backgroundOpacity,backgroundFilter,language,slideImageUrl,previewKey,saveBackgroundAppearance]);
  return <ThemeRuntimeContext.Provider value={value}>{children}</ThemeRuntimeContext.Provider>;
}
export function useThemeRuntime(){const value=useContext(ThemeRuntimeContext);if(!value)throw new Error('useThemeRuntime must be used inside ThemeRuntimeProvider');return value}
