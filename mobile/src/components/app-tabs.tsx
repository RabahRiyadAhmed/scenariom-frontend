import { router, Tabs, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useAuth } from "@/contexts/auth-context";
import { useThemeRuntime } from "@/contexts/theme-runtime-context";
import { translate, type MessageKey } from "@scenariom/i18n";
import { UiButton, UiCombobox, UiRangeSlider } from "@scenariom/design-system/ui";

type ThemeChoice = "system" | "light" | "dark";
const themes: ThemeChoice[] = ["system", "light", "dark"];
const languages = [
  "EN",
  "FR",
  "AR",
  "RU",
  "ZH",
  "JA",
  "KO",
  "BN",
  "TR",
  "HY",
  "SYR",
] as const;
const languageLabels: Record<(typeof languages)[number], string> = {
  EN:"English", FR:"Français", AR:"العربية", RU:"Русский", ZH:"中文", JA:"日本語",
  KO:"한국어", BN:"বাংলা", TR:"Türkçe", HY:"Հայերեն", SYR:"ܐܪܡܝܐ",
};
const categoryOrder = [
  "platform",
  "fantasy",
  "sci-fi",
  "nature",
  "graphic",
  "horror",
  "historical",
] as const;
const themeCategory = (category?: unknown) => {
  const value = String(category ?? "platform");
  if (["mystical", "medieval-fantasy", "fantasy"].includes(value))
    return "fantasy";
  if (
    ["futuristic", "technical", "industrial-period", "sci-fi"].includes(value)
  )
    return "sci-fi";
  if (["nature", "calm-nature", "coastal", "deep-ocean"].includes(value))
    return "nature";
  if (["minimal", "cinematic", "romance", "graphic"].includes(value))
    return "graphic";
  if (["graphic-horror", "horror"].includes(value)) return "horror";
  if (["period", "historical"].includes(value)) return "historical";
  return "platform";
};

export default function AppTabs() {
  const { colors, backgroundEnabled } = useThemeRuntime();
  const { user, loading } = useAuth();
  const segments = useSegments();
  useEffect(() => {
    if (loading) return;
    const route = segments[0];
    const authRoute = route === "login" || route === "register";
    const protectedRoute =
      route === "projects" || route === "organization" || route === "editor";
    if (user && authRoute) router.replace("/projects");
    else if (!user && protectedRoute) router.replace("/login");
  }, [loading, segments, user]);

  return (
    <>
      <Tabs
        screenOptions={{
          header: () => <AppHeader />,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
          },
          sceneStyle: {
            backgroundColor: backgroundEnabled
              ? "transparent"
              : colors.background,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Accueil",
            tabBarIcon: ({ color }) => (
              <Image
                source={require("@/assets/images/tabIcons/home.png")}
                style={[styles.icon, { tintColor: color }]}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="projects"
          options={{
            title: "Projets",
            tabBarIcon: ({ color }) => (
              <Image
                source={require("@/assets/images/tabIcons/explore.png")}
                style={[styles.icon, { tintColor: color }]}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="ui-kit"
          options={{
            title: "UI",
            tabBarIcon: ({ color }) => (
              <Image
                source={require("@/assets/images/tabIcons/explore.png")}
                style={[styles.icon, { tintColor: color }]}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="components"
          options={{
            title: "Composants",
            tabBarIcon: ({ color }) => (
              <Image
                source={require("@/assets/images/tabIcons/explore.png")}
                style={[styles.icon, { tintColor: color }]}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="language-test"
          options={{
            title: "Langues",
            tabBarIcon: ({ color }) => (
              <Image
                source={require("@/assets/images/tabIcons/explore.png")}
                style={[styles.icon, { tintColor: color }]}
              />
            ),
          }}
        />
        <Tabs.Screen name="organization" options={{ href: null }} />
        <Tabs.Screen name="editor" options={{ href: null }} />
        <Tabs.Screen name="explore" options={{ href: null }} />
        <Tabs.Screen
          name="login"
          options={{ href: null, headerShown: false }}
        />
        <Tabs.Screen
          name="register"
          options={{ href: null, headerShown: false }}
        />
      </Tabs>
      <FloatingSettings />
    </>
  );
}

function AppHeader() {
  const { colors, isDark, isRTL, language } = useThemeRuntime();
  const t = (key: MessageKey) => translate(key, {}, language);
  const { user, signOut } = useAuth();
  return (
    <View
      style={[
        styles.header,
        isRTL && styles.headerRtl,
        { backgroundColor: colors.surface, borderBottomColor: colors.border },
      ]}
    >
      <Image
        source={
          isDark
            ? require("@/assets/images/logos/logo-dark.jpg")
            : require("@/assets/images/logos/logo-light.jpg")
        }
        resizeMode="contain"
        style={styles.logo}
      />
      <Pressable
        accessibilityLabel={user ? t("nav.logout") : t("nav.login")}
        onPress={() =>
          user
            ? signOut().then(() => router.replace("/login"))
            : router.push("/login")
        }
        style={[styles.authButton, { backgroundColor: colors.primary }]}
      >
        <ThemedText type="smallBold" style={styles.white}>
          {user ? t("nav.logout") : t("nav.login")}
        </ThemedText>
      </Pressable>
    </View>
  );
}

function FloatingSettings() {
  const {
    colors,
    themes: availableThemes,
    themeSlug,
    setThemeSlug,
    mode,
    setMode,
    resolvedMode,
    screenMode,
    setScreenMode,
    language,
    setLanguage,
    isRTL,
    backgroundEnabled,
    setBackgroundEnabled,
    backgroundOpacity,
    backgroundFilter,
    previewBackgroundOpacity,
    previewBackgroundFilter,
    saveBackgroundAppearance,
    refreshThemes,
    themesLoading,
    themesError,
  } = useThemeRuntime();
  const t = (key: MessageKey) => translate(key, {}, language);
  const themeGroups = categoryOrder
    .map((category) => ({
      category,
      items: availableThemes.filter(
        (item) => themeCategory(item.extraData?.category) === category,
      ),
    }))
    .filter((group) => group.items.length > 0);
  const themeOptions=themeGroups.flatMap(group=>[
    {value:`__${group.category}`,label:`── ${t(`themeCategory.${group.category}` as MessageKey)} ──`,disabled:true},
    ...group.items.map(item=>({value:item.slug,label:item.name})),
  ]);
  const languageOptions=languages.map(code=>({value:code.toLowerCase(),label:`${languageLabels[code]} · ${code}`}));
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const close = () => {
    previewBackgroundOpacity(null);
    previewBackgroundFilter(null);
    setStatus("");
    setOpen(false);
  };
  const save = async () => {
    setSaving(true);
    setStatus("");
    try {
      await saveBackgroundAppearance();
      setStatus(t("settings.saved"));
    } catch {
      setStatus(t("settings.saveError"));
    } finally {
      setSaving(false);
    }
  };
  return (
    <>
      <Pressable
        accessibilityLabel={t("settings.open")}
        onPress={() => setOpen(true)}
        style={[styles.floatingButton, { backgroundColor: colors.primary }]}
      >
        <ThemedText style={styles.floatingIcon}>⚙</ThemedText>
      </Pressable>
      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={close}
      >
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.modalPanel,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View style={[styles.modalHeader, isRTL && styles.headerRtl]}>
              <ThemedText type="subtitle">{t("settings.title")}</ThemedText>
              <Pressable
                accessibilityLabel={t("common.close")}
                onPress={close}
                style={[styles.closeButton, { borderColor: colors.border }]}
              >
                <ThemedText type="subtitle">×</ThemedText>
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <UiCombobox label={t("settings.language")} value={language} options={languageOptions} onValueChange={(value)=>setLanguage(value as import("@/contexts/theme-runtime-context").AppLanguage)} placeholder={t("settings.language")} searchPlaceholder={t("settings.language")} emptyMessage={t("settings.noTheme")} closeLabel={t("common.close")}/>
              <ThemedText type="smallBold">{t("settings.theme")}</ThemedText>
              <UiCombobox label={t("settings.theme")} value={themeSlug} options={themeOptions} onValueChange={setThemeSlug} placeholder={t("settings.theme")} searchPlaceholder={t("settings.searchTheme")} emptyMessage={t("settings.noTheme")} closeLabel={t("common.close")}/>
              <View style={styles.refreshRow}><ThemedText type="small" themeColor={themesError?"danger":"textSecondary"}>{themesError?t("settings.refreshError"):t("settings.refreshHelp")}</ThemedText><UiButton disabled={themesLoading} onPress={()=>void refreshThemes()}>{themesLoading?'…':t("settings.refresh")}</UiButton></View>
              <ThemedText type="smallBold">{t("settings.mode")}</ThemedText>
              <View style={styles.choiceGrid}>
                {themes.map((item) => (
                  <Pressable
                    key={item}
                    onPress={() => setMode(item)}
                    style={[
                      styles.choice,
                      {
                        borderColor:
                          mode === item ? colors.primary : colors.border,
                        backgroundColor:
                          mode === item ? colors.card : colors.background,
                      },
                    ]}
                  >
                    <ThemedText type="smallBold">
                      {t(`settings.${item}` as MessageKey)}
                    </ThemedText>
                  </Pressable>
                ))}
              </View>
              <Pressable
                onPress={() =>
                  setScreenMode(
                    screenMode === "contained" ? "fullscreen" : "contained",
                  )
                }
                style={[
                  styles.toggleRow,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                  },
                ]}
              >
                <ThemedText>{t("settings.screenMode")}</ThemedText>
                <ThemedText type="smallBold">
                  {t(
                    screenMode === "contained"
                      ? "settings.contained"
                      : "settings.fullscreen",
                  )}
                </ThemedText>
              </Pressable>
              <Pressable
                onPress={() => setBackgroundEnabled(!backgroundEnabled)}
                style={[
                  styles.toggleRow,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                  },
                ]}
              >
                <ThemedText>{t("settings.background")}</ThemedText>
                <ThemedText
                  type="smallBold"
                  style={{
                    color: backgroundEnabled ? colors.primary : colors.muted,
                  }}
                >
                  {t(
                    backgroundEnabled
                      ? "settings.enabled"
                      : "settings.disabled",
                  )}
                </ThemedText>
              </Pressable>
              <View
                style={[
                  styles.opacityPanel,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                  },
                ]}
              >
                <ThemedText type="smallBold">
                  {t("settings.opacity")} · {resolvedMode} · {backgroundOpacity}
                  %
                </ThemedText>
                <UiRangeSlider
                  label={t("settings.opacity")}
                  value={backgroundOpacity}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => previewBackgroundOpacity(value)}
                />
                <ThemedText type="small" themeColor="textSecondary">
                  {t("settings.opacityHelp")}
                </ThemedText>
                <ThemedText type="smallBold">
                  {t("settings.filter")} · {backgroundFilter}%
                </ThemedText>
                <UiRangeSlider
                  label={t("settings.filter")}
                  value={backgroundFilter}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => previewBackgroundFilter(value)}
                />
                <ThemedText type="small" themeColor="textSecondary">
                  {t("settings.filterHelp")}
                </ThemedText>
                <View style={styles.saveRow}>
                  <ThemedText type="small" themeColor="textSecondary">
                    {status}
                  </ThemedText>
                  <UiButton
                    disabled={saving || themeSlug === "scenariom"}
                    onPress={save}
                  >
                    {saving ? "…" : t("settings.save")}
                  </UiButton>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 64,
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 20,
  },
  headerRtl: { flexDirection: "row-reverse" },
  logo: { width: 44, height: 44, borderRadius: 8 },
  authButton: { borderRadius: 8, paddingHorizontal: 12, paddingVertical: 9 },
  floatingButton: {
    position: "absolute",
    right: 18,
    bottom: 84,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    elevation: 12,
  },
  floatingIcon: { color: "#fff", fontSize: 24 },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,.58)",
  },
  modalPanel: {
    maxHeight: "88%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    paddingBottom: 20,
  },
  modalHeader: {
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: { padding: 18, paddingTop: 0, gap: 12 },
  choiceGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  themeGroup: { gap: 6, marginBottom: 4 },
  refreshRow:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:12},
  choice: {
    minHeight: 42,
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  toggleRow: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  opacityPanel: { gap: 10, borderWidth: 1, borderRadius: 10, padding: 14 },
  saveRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  icon: { width: 22, height: 22 },
  white: { color: "#fff" },
});
