import { createContext, useContext, type ReactNode } from "react";

export type UiRuntimeColors = Record<string, string>;
const UiThemeContext = createContext<UiRuntimeColors | null>(null);

export function UiThemeProvider({colors,children}:{colors:UiRuntimeColors;children:ReactNode}){
  return <UiThemeContext.Provider value={colors}>{children}</UiThemeContext.Provider>;
}

export function useUiThemeColors(){return useContext(UiThemeContext)}

export function readableColor(background:string|undefined){
  if(!background||!/^#[0-9a-f]{6}/i.test(background))return "#ffffff";
  const values=[1,3,5].map(index=>parseInt(background.slice(index,index+2),16)/255).map(value=>value<=0.04045?value/12.92:Math.pow((value+0.055)/1.055,2.4));
  const luminance=0.2126*values[0]+0.7152*values[1]+0.0722*values[2];
  const whiteContrast=1.05/(luminance+0.05);
  const darkContrast=(luminance+0.05)/0.05;
  return darkContrast>=whiteContrast?"#111827":"#ffffff";
}
