import { router, useLocalSearchParams, type Href } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  componentCatalog,
  componentSlug,
  findCatalogComponent,
} from "@scenariom/design-system/component-catalog";
import { translate, type MessageKey } from "@scenariom/i18n";
import { ComponentPreview } from "@/components/component-preview";
import { apiUrl, useThemeRuntime } from "@/contexts/theme-runtime-context";

export function ComponentDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [menu, setMenu] = useState(false);
  const component = findCatalogComponent(slug ?? "");
  const { language, isRTL, themes, themeSlug } = useThemeRuntime();
  const t = (key: MessageKey) => translate(key, {}, language);
  const slidePath = themes.find((item) => item.slug === themeSlug)?.extraData
    ?.slideImagePath as string | undefined;
  const slideSource = slidePath ? { uri: `${apiUrl}${slidePath}` } : undefined;
  if (!component)
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <Text className="text-foreground">
          {t("componentPreview.notFound")}
        </Text>
      </SafeAreaView>
    );
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["left", "right"]}>
      <View
        className={`items-center gap-3 border-b border-border bg-surface p-3 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
      >
        <Pressable
          accessibilityLabel={t("componentPreview.openMenu")}
          onPress={() => setMenu(true)}
          className="size-11 items-center justify-center rounded-md border border-border"
        >
          <Text className="text-xl text-foreground">☰</Text>
        </Pressable>
        <View>
          <Text className="text-xs font-bold uppercase text-primary">
            {component[0]}
          </Text>
          <Text className="text-lg font-bold text-foreground">
            {component[1]}
          </Text>
        </View>
      </View>
      <ScrollView contentContainerClassName="p-4 pb-24">
        <View className="min-h-72 justify-center gap-5 rounded-xl border border-border bg-surface p-5">
          <ComponentPreview name={component[1]} locale={language} />
        </View>
      </ScrollView>
      <Modal
        visible={menu}
        transparent
        animationType="slide"
        onRequestClose={() => setMenu(false)}
      >
        <View
          className={`flex-1 bg-black/40 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
        >
          <View className="relative h-full w-4/5 max-w-80 overflow-hidden bg-surface">
            {slideSource ? (
              <Image
                source={slideSource}
                resizeMode="cover"
                className="absolute inset-0 h-full w-full opacity-60"
              />
            ) : null}
            <View className="flex-row items-center justify-between border-b border-border bg-surface/80 p-4">
              <Text className="text-lg font-bold text-foreground">
                {t("componentPreview.components")}
              </Text>
              <Pressable
                accessibilityLabel={t("componentPreview.closeMenu")}
                onPress={() => setMenu(false)}
                className="size-10 items-center justify-center"
              >
                <Text className="text-xl text-foreground">×</Text>
              </Pressable>
            </View>
          <ScrollView
            className="bg-surface/45"
              contentContainerClassName="p-3 pb-12"
            >
              {componentCatalog.map(([, name]) => (
                <Pressable
                  key={name}
                  onPress={() => {
                    setMenu(false);
                    router.replace(
                      `/components/${componentSlug(name)}` as Href,
                    );
                  }}
                  className={`rounded-md px-3 py-3 ${name === component[1] ? "bg-card" : ""}`}
                >
                  <Text
                    className={
                      name === component[1]
                        ? "font-bold text-primary"
                        : "text-foreground"
                    }
                  >
                    {name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
          <Pressable
            accessibilityLabel={t("componentPreview.closeMenu")}
            onPress={() => setMenu(false)}
            className="flex-1"
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}
