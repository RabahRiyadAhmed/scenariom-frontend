import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { Image, Pressable, useColorScheme, View, StyleSheet } from 'react-native';
import { useState } from 'react';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton>Home</TabButton>
          </TabTrigger>
          <TabTrigger name="projects" href="/projects" asChild>
            <TabButton>Projets</TabButton>
          </TabTrigger>
          <TabTrigger name="organization" href="/organization" asChild>
            <TabButton>Projets</TabButton>
          </TabTrigger>
          <TabTrigger name="editor" href="/editor" asChild>
            <TabButton>Éditeur</TabButton>
          </TabTrigger>
          <TabTrigger name="languages" href="/language-test" asChild>
            <TabButton>Langues</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable {...props} style={({ pressed }) => pressed && styles.pressed}>
      <ThemedView
        type={isFocused ? 'backgroundSelected' : 'backgroundElement'}
        style={styles.tabButtonView}>
        <ThemedText type="small" themeColor={isFocused ? 'text' : 'textSecondary'}>
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const activeScheme = scheme === 'dark' ? 'dark' : 'light';
  const colors = Colors[activeScheme];
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system');
  const [language, setLanguage] = useState<'FR' | 'EN' | 'AR'>('FR');
  const changeTheme = () => {
    const next = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
    setTheme(next);
  };
  const changeLanguage = () => {
    const next = language === 'FR' ? 'EN' : language === 'EN' ? 'AR' : 'FR';
    setLanguage(next);
    document.documentElement.lang = next.toLowerCase();
    document.documentElement.dir = next === 'AR' ? 'rtl' : 'ltr';
  };

  return (
    <View {...props} style={styles.tabListContainer}>
      <ThemedView type="backgroundElement" style={styles.innerContainer}>
        <Image source={activeScheme === 'dark' ? require('@/assets/images/logos/logo-dark.jpg') : require('@/assets/images/logos/logo-light.jpg')} resizeMode="contain" style={styles.brandLogo}/>

        {props.children}

        <Pressable accessibilityLabel="Choisir la langue" onPress={changeLanguage} style={[styles.settingButton,{borderColor:colors.border}]}><ThemedText type="smallBold">文A</ThemedText></Pressable>
        <Pressable onPress={changeTheme} style={[styles.settingButton,{borderColor:colors.border}]}><ThemedText type="small">{theme === 'system' ? 'Système' : theme === 'light' ? 'Clair' : 'Sombre'}</ThemedText></Pressable>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    width: '100%',
    padding: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
    borderRadius: Spacing.five,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    gap: Spacing.two,
    maxWidth: MaxContentWidth,
  },
  brandLogo: {
    marginRight: 'auto',
    width: 40,
    height: 40,
  },
  pressed: {
    opacity: 0.7,
  },
  tabButtonView: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
  externalPressable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.one,
    marginLeft: Spacing.three,
  },
  settingButton: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 7 },
});
