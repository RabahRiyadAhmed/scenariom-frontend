import { router, type Href } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  componentCatalog,
  componentSlug,
} from "@scenariom/design-system/component-catalog";
import { translate, type MessageKey } from "@scenariom/i18n";
import { useThemeRuntime } from "@/contexts/theme-runtime-context";
import { ThemedText } from "@/components/themed-text";

export function ComponentListScreen() {
  const { language } = useThemeRuntime();
  const t = (key: MessageKey) => translate(key, {}, language);
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    if (!query.trim()) return componentCatalog;
    const q = query.toLowerCase();
    return componentCatalog.filter(([, name]) => name.toLowerCase().includes(q));
  }, [query]);
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["left", "right"]}>
      <ScrollView contentContainerClassName="gap-3 p-4 pb-24">
        <ThemedText readableOnBackground className="text-sm font-bold uppercase text-primary">
          {t("componentLab.eyebrow")}
        </ThemedText>
        <ThemedText readableOnBackground className="text-3xl font-bold text-foreground">
          {t("componentLab.title")}
        </ThemedText>
        <ThemedText readableOnBackground className="mb-3 leading-6 text-muted">
          {t("componentLab.description")}
        </ThemedText>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search components..."
          placeholderTextColor="var(--sc-muted)"
          className="min-h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-foreground"
        />
        {filtered.map(([group, name]) => (
          <Pressable
            key={name}
            onPress={() =>
              router.push(`/components/${componentSlug(name)}` as Href)
            }
            className="rounded-lg border border-border bg-surface p-4"
          >
            <Text className="text-xs font-bold uppercase text-muted">
              {t(`componentGroup.${group}` as MessageKey)}
            </Text>
            <Text className="mt-1 font-semibold text-foreground">{name}</Text>
          </Pressable>
        ))}
        {filtered.length === 0 && (
          <Text className="mt-8 text-muted">No components found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
