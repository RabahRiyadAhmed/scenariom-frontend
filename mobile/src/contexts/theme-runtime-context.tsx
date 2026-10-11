import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";
import * as SystemUI from "expo-system-ui";
import { Image, Platform, useColorScheme, View } from "react-native";
import { VariableContextProvider } from "react-native-css";
import {
  isThemeDefinition,
  resolveThemeColors,
  scenariomTheme,
  themeCssVariables,
  type ThemeColors,
  type ThemeDefinition,
  type ThemeRecord,
} from "@scenariom/design-system/themes";
import { UiThemeProvider } from "@scenariom/design-system/ui-theme";
import { getAccessToken } from "@/services/auth";

export type ColorMode = "system" | "light" | "dark";
export type ScreenMode = "contained" | "fullscreen";
export type AppLanguage =
  "en" | "fr" | "es" | "de" | "pt" | "it" | "ja" | "ko" | "zh" | "ar" | "hi" | "tr" | "ru";
type RuntimeColors = ThemeColors & {
  text: string;
  backgroundElement: string;
  backgroundSelected: string;
  textSecondary: string;
};
type Runtime = {
  theme: ThemeDefinition;
  themes: ThemeRecord[];
  themeSlug: string;
  mode: ColorMode;
  resolvedMode: "light" | "dark";
  isDark: boolean;
  screenMode: ScreenMode;
  language: AppLanguage;
  isRTL: boolean;
  backgroundEnabled: boolean;
  backgroundOpacity: number;
  backgroundFilter: number;
  previewBackgroundOpacity: (value: number | null) => void;
  previewBackgroundFilter: (value: number | null) => void;
  saveBackgroundAppearance: () => Promise<void>;
  colors: RuntimeColors;
  setThemeSlug: (slug: string) => void;
  setMode: (mode: ColorMode) => void;
  setScreenMode: (mode: ScreenMode) => void;
  setLanguage: (language: AppLanguage) => void;
  setBackgroundEnabled: (enabled: boolean) => void;
  refreshThemes: () => Promise<void>;
  themesLoading: boolean;
  themesError: boolean;
};
const Context = createContext<Runtime | null>(null);
const fallbackHost = Platform.OS === "android" ? "10.0.2.2" : "localhost";
export const apiUrl =
  process.env.EXPO_PUBLIC_API_URL ?? `http://${fallbackHost}:4000/api`;

export function ThemeRuntimeProvider({ children }: { children: ReactNode }) {
  const systemMode = useColorScheme() === "dark" ? "dark" : "light";
  const [themes, setThemes] = useState<ThemeRecord[]>([]);
  const [themeSlug, setThemeSlugState] = useState("scenariom");
  const [mode, setModeState] = useState<ColorMode>("system");
  const [screenMode, setScreenModeState] = useState<ScreenMode>("contained");
  const [language, setLanguageState] = useState<AppLanguage>("en");
  const [backgroundEnabled, setBackgroundEnabledState] = useState(true);
  const [opacityPreview, setOpacityPreview] = useState<{ key: string; value: number } | null>(null);
  const [filterPreview, setFilterPreview] = useState<{ key: string; value: number } | null>(null);
  const [themesLoading,setThemesLoading]=useState(false);
  const [themesError,setThemesError]=useState(false);
  const refreshThemes=useCallback(async()=>{setThemesLoading(true);setThemesError(false);try{const response=await fetch(`${apiUrl}/themes`,{headers:{'Accept-Language':language}});if(!response.ok)throw new Error('Theme API unavailable');const records=await response.json() as ThemeRecord[];setThemes(records.filter(record=>isThemeDefinition(record.definition)))}catch{setThemesError(true)}finally{setThemesLoading(false)}},[language]);
  useEffect(() => {
    SecureStore.getItemAsync("scenariom.themeSlug").then(
      (value) => value && setThemeSlugState(value),
    );
    SecureStore.getItemAsync("scenariom.colorMode").then((value) => {
      if (value === "system" || value === "light" || value === "dark")
        setModeState(value);
    });
    SecureStore.getItemAsync("scenariom.screenMode").then((value) => {
      if (value === "contained" || value === "fullscreen")
        setScreenModeState(value);
    });
    SecureStore.getItemAsync("scenariom.language").then((value) => {
      if (
        value &&
        [
          "en",
          "fr",
          "es",
          "de",
          "pt",
          "it",
          "ja",
          "ko",
          "zh",
          "ar",
          "hi",
          "tr",
          "ru",
        ].includes(value)
      )
        setLanguageState(value as AppLanguage);
    });
    SecureStore.getItemAsync("scenariom.background").then((value) => {
      if (value !== null) setBackgroundEnabledState(value !== "false");
    });
    void Promise.resolve().then(refreshThemes);
  }, [refreshThemes]);
  const themeRecord = themes.find((item) => item.slug === themeSlug);
  const theme = themeRecord?.definition ?? scenariomTheme;
  const resolvedMode = mode === "system" ? systemMode : mode;
  const previewKey = `${themeSlug}:${resolvedMode}`;
  const variables = themeCssVariables(theme, resolvedMode);
  const baseColors = resolveThemeColors(theme, resolvedMode);
  const colors: RuntimeColors = {
    ...baseColors,
    text: baseColors.foreground,
    backgroundElement: baseColors.card,
    backgroundSelected: baseColors.border,
    textSecondary: baseColors.muted,
  };
  const generalBackgroundPath = themeRecord?.extraData?.backgroundImagePath as
    string | undefined;
  const darkBackgroundPath = themeRecord?.extraData?.backgroundImageDarkPath as
    string | undefined;
  const selectedBackgroundPath =
    resolvedMode === "dark"
      ? (darkBackgroundPath ?? generalBackgroundPath)
      : generalBackgroundPath;
  const backgroundImageUrl = selectedBackgroundPath
    ? `${apiUrl}${selectedBackgroundPath}`
    : undefined;
  const bgOpacity = themeRecord?.extraData?.backgroundOpacity as
    { light: number; dark: number } | undefined;
  const backgroundOpacity =
    (opacityPreview?.key === previewKey ? opacityPreview.value : null) ??
    (resolvedMode === "dark"
      ? (bgOpacity?.dark ?? 50)
      : (bgOpacity?.light ?? 70));
  const bgFilter = themeRecord?.extraData?.backgroundFilter as
    { light: number; dark: number } | undefined;
  const backgroundFilter =
    (filterPreview?.key === previewKey ? filterPreview.value : null) ??
    (resolvedMode === "dark"
      ? (bgFilter?.dark ?? 24)
      : (bgFilter?.light ?? 12));
  const hasBg = backgroundEnabled && !!backgroundImageUrl;
  const imageOpacity = backgroundOpacity / 100;
  const scrimOpacity = backgroundFilter / 100;
  // Keep design-system colors opaque. Only the native root layer becomes transparent;
  // changing --sc-background would also make inputs and nested controls transparent.
  const bgVariables = variables;
  // Android draws edge-to-edge: the system navigation bar is always transparent and shows
  // whatever the native root view background is. expo-navigation-bar can no longer set a
  // background color (removed with edge-to-edge enforcement), so we sync the root window
  // background with the active theme instead, otherwise the 3-button zone stays stuck on
  // the OS default color when the app switches between light and dark mode.
  useEffect(() => {
    void SystemUI.setBackgroundColorAsync(colors.background);
  }, [colors.background]);
  const patchAppearance = async (path: string, body: object) => {
    const token = await getAccessToken();
    const response = await fetch(
      `${apiUrl}/themes/${encodeURIComponent(themeSlug)}/${path}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "Accept-Language": language,
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
      },
    );
    if (!response.ok)
      throw new Error("Unable to save theme background appearance.");
    const updated = (await response.json()) as ThemeRecord;
    setThemes((items) =>
      items.map((item) => (item.slug === updated.slug ? updated : item)),
    );
  };
  const saveBackgroundAppearance = async () => {
    if (themeSlug === "scenariom") return;
    await patchAppearance("background-opacity", {
      mode: resolvedMode,
      opacity: backgroundOpacity,
    });
    await patchAppearance("background-filter", {
      mode: resolvedMode,
      filter: backgroundFilter,
    });
    setOpacityPreview(null);
    setFilterPreview(null);
  };
  const value = useMemo<Runtime>(
    () => ({
      theme,
      themes: [
        {
          slug: "scenariom",
          name: "Scenariom",
          description: "Built-in safe theme.",
          definition: scenariomTheme,
        },
        ...themes,
      ],
      themeSlug,
      mode,
      resolvedMode,
      isDark: resolvedMode === "dark",
      screenMode,
      language,
      isRTL: language === "ar",
      backgroundEnabled,
      backgroundOpacity,
      backgroundFilter,
      previewBackgroundOpacity: (next) => setOpacityPreview(next === null ? null : { key: previewKey, value: next }),
      previewBackgroundFilter: (next) => setFilterPreview(next === null ? null : { key: previewKey, value: next }),
      saveBackgroundAppearance,
      refreshThemes,
      themesLoading,
      themesError,
      colors,
      setThemeSlug: (slug) => {
        setThemeSlugState(slug);
        void SecureStore.setItemAsync("scenariom.themeSlug", slug);
      },
      setMode: (next) => {
        setModeState(next);
        void SecureStore.setItemAsync("scenariom.colorMode", next);
      },
      setScreenMode: (next) => {
        setScreenModeState(next);
        void SecureStore.setItemAsync("scenariom.screenMode", next);
      },
      setLanguage: (next) => {
        setLanguageState(next);
        void SecureStore.setItemAsync("scenariom.language", next);
      },
      setBackgroundEnabled: (enabled) => {
        setBackgroundEnabledState(enabled);
        void SecureStore.setItemAsync("scenariom.background", String(enabled));
      },
    }),
    [
      language,
      mode,
      resolvedMode,
      screenMode,
      theme,
      themeSlug,
      themes,
      backgroundEnabled,
      backgroundOpacity,
      backgroundFilter,
      previewKey,
      colors,
      refreshThemes,
      themesLoading,
      themesError,
    ],
  );
  const rootStyle = {
    flex: 1,
    backgroundColor: hasBg ? "transparent" : colors.background,
    direction: (language === "ar" ? "rtl" : "ltr") as
      "rtl" | "ltr",
  };
  return (
    <Context.Provider value={value}>
      <UiThemeProvider colors={colors as unknown as Record<string,string>}>
       <VariableContextProvider value={bgVariables}>
        <View style={rootStyle} pointerEvents="box-none">
          {hasBg ? (
            <>
              <Image
                source={{ uri: backgroundImageUrl }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: "100%",
                  height: "100%",
                  opacity: imageOpacity,
                }}
                resizeMode="cover"
              />
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: colors.background,
                  opacity: scrimOpacity,
                }}
                pointerEvents="none"
              />
            </>
          ) : null}
          {children}
        </View>
       </VariableContextProvider>
      </UiThemeProvider>
    </Context.Provider>
  );
}
export function useThemeRuntime() {
  const value = useContext(Context);
  if (!value)
    throw new Error("useThemeRuntime must be used inside ThemeRuntimeProvider");
  return value;
}
