import { useState, type ReactNode } from "react";
import Constants from "expo-constants";
import { Alert, Text, View } from "react-native";
import { UiButton, UiCard, UiCardBody, UiCardDescription, UiCardTitle, UiSelect, UiToast, UiToastViewport } from "@scenariom/design-system/ui/native";
import type { UiToastPlacement, UiTone } from "@scenariom/design-system/ui/native";

type ToastItem = { id: number; title: string; message: string; tone?: UiTone; variant?: "default" | "solid" | "translucent"; action?: boolean };
const placements: UiToastPlacement[] = ["top-start", "top-center", "top-end", "middle-start", "middle-center", "middle-end", "bottom-start", "bottom-center", "bottom-end"];
const isExpoGo = Constants.appOwnership === "expo" || Constants.executionEnvironment === "storeClient";

function Demo({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <UiCard><UiCardBody><UiCardTitle>{title}</UiCardTitle><UiCardDescription>{description}</UiCardDescription><View className="mt-5">{children}</View></UiCardBody></UiCard>;
}

export function NotificationsTemplatePreview() {
  const [placement, setPlacement] = useState<UiToastPlacement>("top-end");
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [containerOpen, setContainerOpen] = useState(false);
  const dismiss = (id: number) => setToasts(current => current.filter(item => item.id !== id));
  const show = (items: Omit<ToastItem, "id">[]) => setToasts(items.map((item, index) => ({ ...item, id: Date.now() + index })));
  const native = async () => {
    if (isExpoGo) {
      Alert.alert("Development build required", "Expo Go cannot test Android native notifications. This same button schedules a native notification in a development build.");
      return;
    }
    const Notifications = require("expo-notifications") as typeof import("expo-notifications");
    Notifications.setNotificationHandler({ handleNotification: async () => ({ shouldShowBanner: true, shouldShowList: true, shouldPlaySound: false, shouldSetBadge: false }) });
    const current = await Notifications.getPermissionsAsync();
    const permission = current.granted ? current : await Notifications.requestPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Allow notifications to test the local native notification.");
      return;
    }
    await Notifications.scheduleNotificationAsync({ content: { title: "Scenariom notification", body: "This is a local native notification." }, trigger: null });
  };

  return <View className="gap-5">
    <Demo title="Bootstrap Toasts" description="A toast is temporary feedback, positioned relative to the screen and dismissed automatically.">
      <View className="flex-row flex-wrap gap-2">
        <UiButton onPress={() => show([{ title: "Scenariom", message: "Hello, world! This is a toast message." }])}>Basic toast</UiButton>
        <UiButton tone="secondary" onPress={() => show([{ title: "Scenariom", message: "A translucent toast over the current screen.", variant: "translucent" }])}>Translucent toast</UiButton>
        <UiButton tone="info" onPress={() => show([{ title: "Scenariom", message: "First message." }, { title: "Scenariom", message: "Second message: toasts can stack.", tone: "info" }])}>Stacking</UiButton>
      </View>
    </Demo>
    <Demo title="Custom content" description="A toast can use a semantic tone and an action.">
      <UiButton tone="success" onPress={() => show([{ title: "Saved", message: "Your changes are available.", tone: "success", variant: "solid", action: true }])}>Show success toast</UiButton>
    </Demo>
    <Demo title="Placement" description="Screen is the normal toast behavior. The container option is kept only to test a local overlay.">
      <UiSelect label="Toast placement" value={placement} onValueChange={value => setPlacement(value as UiToastPlacement)} options={placements.map(value => ({ value, label: value }))} />
      <View className="mt-4 flex-row flex-wrap gap-2">
        <UiButton onPress={() => show([{ title: "Screen toast", message: "This toast is positioned relative to the screen." }])}>Show screen toast</UiButton>
        <UiButton variant="outline" onPress={() => setContainerOpen(true)}>Show container demo</UiButton>
      </View>
      {containerOpen && <UiToastViewport scope="container" placement={placement}><UiToast open onClose={() => setContainerOpen(false)} title="Container demo" closeLabel="Dismiss" duration={3500}>This is a local preview, not the standard global toast behavior.</UiToast></UiToastViewport>}
    </Demo>
    <Demo title="Native notification" description="Local native notification test. FCM/APNS and backend delivery are separate.">
      <UiButton onPress={native}>Show native notification</UiButton>
    </Demo>
    {toasts.length > 0 && <UiToastViewport scope="screen" placement={placement}>{toasts.map(item => <UiToast key={item.id} open onClose={() => dismiss(item.id)} title={item.title} closeLabel="Dismiss" tone={item.tone} variant={item.variant} duration={3500} action={item.action ? <UiButton size="sm" onPress={() => dismiss(item.id)}>Continue</UiButton> : undefined}>{item.message}</UiToast>)}</UiToastViewport>}
  </View>;
}
