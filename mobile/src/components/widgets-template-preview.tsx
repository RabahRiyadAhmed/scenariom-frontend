import { useState, type ReactNode } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Svg, { Polygon, Polyline, Rect } from "react-native-svg";
import {
  Aperture, BarChart3, Cpu, DollarSign, Eye,
  Gift, Heart, ShoppingBag, ShoppingCart, Users,
  type LucideIcon,
} from "lucide-react-native";
import { UiBadge, UiButton, UiCard, UiCardBody, UiIcon, UiProgress } from "@scenariom/design-system/ui/native";
import { useUiThemeColors } from "@scenariom/design-system/ui-theme";
import type { UiTone } from "@scenariom/design-system/ui/native";

const user1 = require("@/assets/images/template-assets/users/user-1.jpg");
const user2 = require("@/assets/images/template-assets/users/user-2.jpg");
const user3 = require("@/assets/images/template-assets/users/user-3.jpg");
const user4 = require("@/assets/images/template-assets/users/user-4.jpg");
const user5 = require("@/assets/images/template-assets/users/user-5.jpg");

function StatWidget({ tone = "primary", description, icon: Icon, stats, trend }: { tone?: Exclude<UiTone, "neutral">; description: string; icon: LucideIcon; stats: string; trend?: string }) {
  const colors = useUiThemeColors();
  const toneColor = colors?.[tone] ?? "#6366f1";
  return (
    <UiCard>
      <UiCardBody>
        <View className="flex-row items-center gap-4">
          <View className="size-12 shrink-0 items-center justify-center rounded-md" style={{ backgroundColor: `${toneColor}22` }}>
            <Icon size={24} color={toneColor} />
          </View>
          <View className="min-w-0 flex-1">
            <Text className="text-sm text-muted">{description}</Text>
            <View className="mt-1 flex-row items-center gap-2">
              <Text className="text-2xl font-semibold text-foreground">{stats}</Text>
              {trend && <UiBadge tone={tone} variant="soft">{trend}</UiBadge>}
            </View>
          </View>
        </View>
      </UiCardBody>
    </UiCard>
  );
}

function InlineStats({ items }: { items: Array<{ label: string; value: string; tone: UiTone; icon: LucideIcon }> }) {
  const colors = useUiThemeColors();
  return (
    <UiCard>
      <UiCardBody>
        <View className="flex-row flex-wrap gap-5">
          {items.map((item) => (
            <View key={item.label} className="w-1/2 items-center p-2 xl:w-[calc(25%-15px)]">
              <item.icon size={28} color={colors?.[item.tone] ?? "#6366f1"} />
              <Text className="mt-2 text-2xl font-semibold text-foreground">{item.value}</Text>
              <Text className="mt-1 text-sm text-muted">{item.label}</Text>
            </View>
          ))}
        </View>
      </UiCardBody>
    </UiCard>
  );
}

function TrendWidget({ title, value, trend, trendDirection = "up" }: { title: string; value: string; trend: string; trendDirection?: "up" | "down" }) {
  const isUp = trendDirection === "up";
  return (
    <UiCard>
      <UiCardBody>
        <Text className="text-sm text-muted">{title}</Text>
        <Text className="mt-2 text-3xl font-semibold text-foreground">{value}</Text>
        <View className="mt-4 flex-row items-center justify-between gap-3">
          <Text className="text-sm text-muted">Total change</Text>
          <UiBadge tone={isUp ? "success" : "danger"} variant="soft">{trend}</UiBadge>
        </View>
      </UiCardBody>
    </UiCard>
  );
}

function ProgressStatWidget({ tone = "primary", description, icon: Icon, progress, stats }: { tone?: Exclude<UiTone, "neutral">; description: string; icon: LucideIcon; progress: number; stats: string }) {
  const colors = useUiThemeColors();
  return (
    <UiCard>
      <UiCardBody>
        <View className="flex-row items-start justify-between gap-4">
          <View className="flex-1">
            <Text className="text-sm text-muted">{description}</Text>
            <Text className="mt-1 text-2xl font-semibold text-foreground">{stats}</Text>
          </View>
          <Icon size={28} color={colors?.[tone] ?? "#6366f1"} />
        </View>
        <View className="mt-4">
          <UiProgress value={progress} tone={tone} size="sm" />
        </View>
      </UiCardBody>
    </UiCard>
  );
}

function ProfileWidget({ avatar, name, role }: { avatar: number; name: string; role: string }) {
  return (
    <UiCard>
      <UiCardBody>
        <View className="flex-row items-center gap-4">
          <Image source={avatar} style={{ width: 40, height: 40, borderRadius: 20 }} resizeMode="cover" />
          <View className="min-w-0 flex-1">
            <Text className="text-base font-semibold text-foreground" numberOfLines={1}>{name}</Text>
            <Text className="text-sm text-muted">{role}</Text>
          </View>
          <UiButton variant="ghost" size="sm" accessibilityLabel="More actions" onPress={() => undefined}><UiIcon name="more" size="sm" /></UiButton>
        </View>
      </UiCardBody>
    </UiCard>
  );
}

function ListWidget({ children, title }: { children: ReactNode; title: string }) {
  return (
    <UiCard>
      <UiCardBody>
        <View className="mb-4 flex-row items-center justify-between gap-3">
          <Text className="text-base font-semibold text-foreground">{title}</Text>
          <UiButton variant="ghost" size="sm" accessibilityLabel={`${title} actions`} onPress={() => undefined}><UiIcon name="more" size="sm" /></UiButton>
        </View>
        {children}
      </UiCardBody>
    </UiCard>
  );
}

function SparklineWidget({ tone, description, icon: Icon, points, stats, type = "line" }: { tone: UiTone; description: string; icon: LucideIcon; points: number[]; stats: string; type?: "line" | "bar" | "area" }) {
  const colors = useUiThemeColors();
  const toneColor = colors?.[tone] ?? "#6366f1";
  const max = Math.max(...points);
  const normalized = points.map((point, index) => {
    const x = (index / Math.max(points.length - 1, 1)) * 100;
    const y = 42 - (point / max) * 34;
    return `${x},${y}`;
  });
  const polyline = normalized.join(" ");
  const area = `0,46 ${polyline} 100,46`;

  return (
    <UiCard>
      <UiCardBody>
        <View className="flex-row items-center gap-3">
          <View className="size-10 items-center justify-center rounded-md" style={{ backgroundColor: `${toneColor}22` }}>
            <Icon size={20} color={toneColor} />
          </View>
          <View>
            <Text className="text-xl font-semibold text-foreground">{stats}</Text>
            <Text className="text-sm text-muted">{description}</Text>
          </View>
        </View>
        <Svg viewBox="0 0 100 50" style={{ marginTop: 16, height: 56, width: "100%" }}>
          {type === "bar" ? (
            points.map((point, index) => {
              const barWidth = 100 / points.length - 2;
              const barHeight = (point / max) * 38;
              return <Rect key={index} x={index * (100 / points.length)} y={46 - barHeight} width={barWidth} height={barHeight} rx={1.5} fill={toneColor} opacity={index % 2 ? 0.35 : 0.9} />;
            })
          ) : (
            <>
              {type === "area" && <Polygon points={`0,46 ${polyline} 100,46`} fill={toneColor} opacity={0.18} />}
              <Polyline points={polyline} fill="none" stroke={toneColor} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            </>
          )}
        </Svg>
      </UiCardBody>
    </UiCard>
  );
}

const users = [
  { name: "Thelma Fridley", role: "Admin User", avatar: user1 },
  { name: "Chandler Hervieux", role: "Manager", avatar: user2 },
  { name: "Percy Demers", role: "Director", avatar: user3 },
  { name: "Antoine Masson", role: "Premium User", avatar: user4 },
];

const messages = [
  { user: "Geneva", text: "Hello!", time: "10:00", avatar: user5 },
  { user: "Dominic", text: "Hi, how are you? What about our next meeting?", time: "10:01", avatar: user1 },
  { user: "Geneva", text: "Yeah everything is fine.", time: "10:02", avatar: user5 },
  { user: "Dominic", text: "Great, I will send the updated files.", time: "10:03", avatar: user1 },
];

const tasks = [
  { label: "Review template routes", done: true },
  { label: "Prepare reusable widget cards", done: true },
  { label: "Validate RTL states", done: false },
  { label: "Connect charts to API data", done: false },
];

export function WidgetsTemplatePreview() {
  return (
    <View className="gap-5">
      <View className="flex-row flex-wrap gap-5">
        {[
          { tone: "primary" as Exclude<UiTone, "neutral">, icon: Heart, description: "Total Revenue", stats: "$58,947", trend: "+10.4%" },
          { tone: "success" as Exclude<UiTone, "neutral">, icon: ShoppingCart, description: "Today's Sales", stats: "127", trend: "+4.8%" },
          { tone: "info" as Exclude<UiTone, "neutral">, icon: BarChart3, description: "Conversion", stats: "0.58%", trend: "+2.1%" },
          { tone: "warning" as Exclude<UiTone, "neutral">, icon: Eye, description: "Today's Visits", stats: "78,412", trend: "+9.6%" },
          { tone: "danger" as Exclude<UiTone, "neutral">, icon: ShoppingBag, description: "Available Stores", stats: "178", trend: "-1.8%" },
          { tone: "secondary" as Exclude<UiTone, "neutral">, icon: Cpu, description: "Gitlab Commits", stats: "289", trend: "+7.2%" },
          { tone: "purple" as Exclude<UiTone, "neutral">, icon: Gift, description: "Free Gifts", stats: "1,021", trend: "+11%" },
          { tone: "pink" as Exclude<UiTone, "neutral">, icon: Users, description: "Paid Users", stats: "154k", trend: "+3.4%" },
        ].map((item) => (
          <View key={item.description} className="w-full md:w-[calc(50%-10px)] xl:w-[calc(25%-15px)]">
            <StatWidget tone={item.tone} icon={item.icon} description={item.description} stats={item.stats} trend={item.trend} />
          </View>
        ))}
      </View>

      <InlineStats
        items={[
          { label: "Lifetime Sales", value: "8,954", tone: "primary", icon: ShoppingCart },
          { label: "Income Amounts", value: "$7,841", tone: "success", icon: DollarSign },
          { label: "Total Users", value: "6,521", tone: "danger", icon: Users },
          { label: "Total Visits", value: "325k", tone: "info", icon: Eye },
        ]}
      />

      <View className="flex-row flex-wrap gap-5">
        {[
          { title: "Income Status", value: "$31,570", trend: "10.25%" },
          { title: "Sales Status", value: "683", trend: "7.85%", trendDirection: "down" as const },
          { title: "Recent Users", value: "3.2M", trend: "3.64%" },
          { title: "Total Revenue", value: "$68,541", trend: "17.48%" },
        ].map((item) => (
          <View key={item.title} className="w-full md:w-[calc(50%-10px)] xl:w-[calc(25%-15px)]">
            <TrendWidget title={item.title} value={item.value} trend={item.trend} trendDirection={item.trendDirection} />
          </View>
        ))}
      </View>

      <View className="flex-row flex-wrap gap-5">
        {[
          { tone: "purple" as Exclude<UiTone, "neutral">, icon: Aperture, description: "Income Status", stats: "$12,145", progress: 60 },
          { tone: "success" as Exclude<UiTone, "neutral">, icon: ShoppingCart, description: "January's Sales", stats: "1,576", progress: 49 },
          { tone: "warning" as Exclude<UiTone, "neutral">, icon: BarChart3, description: "Payouts", stats: "8,947", progress: 18 },
          { tone: "info" as Exclude<UiTone, "neutral">, icon: Cpu, description: "Available Stores", stats: "178", progress: 74 },
        ].map((item) => (
          <View key={item.description} className="w-full md:w-[calc(50%-10px)] xl:w-[calc(25%-15px)]">
            <ProgressStatWidget tone={item.tone} icon={item.icon} description={item.description} stats={item.stats} progress={item.progress} />
          </View>
        ))}
      </View>

      <View className="flex-row flex-wrap gap-5">
        {users.map((user) => (
          <View key={user.name} className="w-full md:w-[calc(50%-10px)] xl:w-[calc(25%-15px)]">
            <ProfileWidget {...user} />
          </View>
        ))}
      </View>

      <Text className="mt-2 text-lg font-semibold text-foreground">Other Widgets</Text>
      <View className="flex-row flex-wrap gap-5">
        <View className="w-full xl:w-[calc(33.333%-14px)]">
          <ListWidget title="Messages">
            <View className="gap-4">
              {messages.slice(0, 3).map((message) => (
                <View key={`${message.user}-${message.time}`} className="flex-row gap-3">
                  <Image source={message.avatar} style={{ width: 32, height: 32, borderRadius: 16 }} resizeMode="cover" />
                  <View className="min-w-0 flex-1">
                    <View className="flex-row items-center justify-between gap-3">
                      <Text className="flex-1 text-sm font-semibold text-foreground" numberOfLines={1}>{message.user}</Text>
                      <Text className="text-xs text-muted">{message.time}</Text>
                    </View>
                    <Text className="mt-1 text-sm text-muted" numberOfLines={2}>{message.text}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ListWidget>
        </View>

        <View className="w-full xl:w-[calc(33.333%-10px)]">
          <ListWidget title="Chat List">
            <View className="gap-3">
              {messages.map((message, index) => (
                <View key={`${message.user}-${index}`} className="flex-row items-center gap-3 rounded-md bg-card p-3">
                  <Image source={message.avatar} style={{ width: 24, height: 24, borderRadius: 12 }} resizeMode="cover" />
                  <View className="min-w-0 flex-1">
                    <Text className="text-sm font-medium text-foreground" numberOfLines={1}>{message.text}</Text>
                    <Text className="text-xs text-muted">{message.user} - {message.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ListWidget>
        </View>

        <View className="w-full xl:w-[calc(33.333%-10px)]">
          <ListWidget title="Todo List">
            <View className="gap-3">
              {tasks.map((task) => (
                <TaskRow key={task.label} label={task.label} done={task.done} />
              ))}
              <UiButton fullWidth variant="soft" tone="primary">Add Task</UiButton>
            </View>
          </ListWidget>
        </View>
      </View>

      <Text className="mt-2 text-lg font-semibold text-foreground">Chart Widgets</Text>
      <View className="flex-row flex-wrap gap-5">
        <View className="w-full xl:w-[calc(33.333%-14px)]">
          <SparklineWidget tone="warning" icon={Aperture} stats="$8,145" description="Income Status" type="bar" points={[5, 9, 5, 7, 5, 9, 2, 3, 2, 7, 5, 9]} />
        </View>
        <View className="w-full xl:w-[calc(33.333%-10px)]">
          <SparklineWidget tone="info" icon={ShoppingBag} stats="367" description="Sales Status" type="line" points={[5, 3, 9, 6, 5, 9, 7, 3, 5, 2]} />
        </View>
        <View className="w-full xl:w-[calc(33.333%-10px)]">
          <SparklineWidget tone="success" icon={Users} stats="7,204" description="Recent Users" type="area" points={[3, 5, 2, 9, 7, 2, 5, 3, 9, 6, 5, 9, 7]} />
        </View>
      </View>
    </View>
  );
}

function TaskRow({ label, done }: { label: string; done: boolean }) {
  const [checked, setChecked] = useState(done);
  return (
    <Pressable
      onPress={() => setChecked(!checked)}
      className="flex-row items-center gap-3 rounded-md border border-border p-3"
    >
      <View className={`size-4 items-center justify-center rounded border ${checked ? "border-primary bg-primary" : "border-border"}`}>
        {checked && <Text className="text-[10px] font-bold text-white">✓</Text>}
      </View>
      <Text className="flex-1 text-sm text-foreground">{label}</Text>
      {done && <UiBadge tone="success" variant="soft">Done</UiBadge>}
    </Pressable>
  );
}
