import { DarkTheme, DefaultTheme, ThemeProvider, type Theme } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { NavigationBar } from 'expo-navigation-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import '@/global.css';
import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { AuthProvider } from '@/contexts/auth-context';
import { ThemeRuntimeProvider, useThemeRuntime } from '@/contexts/theme-runtime-context';

SplashScreen.preventAutoHideAsync();

function AppShell(){const{colors,isDark,screenMode,backgroundEnabled}=useThemeRuntime();const base=isDark?DarkTheme:DefaultTheme;const navigationTheme:Theme={...base,dark:isDark,colors:{...base.colors,primary:colors.primary,background:colors.background,card:colors.surface,text:colors.foreground,border:colors.border,notification:colors.danger}};const fullscreen=screenMode==='fullscreen';return <ThemeProvider value={navigationTheme}><StatusBar animated hidden={fullscreen} style={isDark?'light':'dark'}/><NavigationBar hidden={fullscreen} style={isDark?'dark':'light'}/><SafeAreaView edges={fullscreen?[]:['top','bottom','left','right']} style={{flex:1,backgroundColor:backgroundEnabled?'transparent':colors.background}}><AuthProvider><AnimatedSplashOverlay/><AppTabs/></AuthProvider></SafeAreaView></ThemeProvider>}

export default function RootLayout(){return <SafeAreaProvider><ThemeRuntimeProvider><AppShell/></ThemeRuntimeProvider></SafeAreaProvider>}
