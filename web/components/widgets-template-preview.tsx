"use client";
import { type ReactNode } from "react";
import {
  Aperture, BarChart3, Cpu, DollarSign, Eye, Gift, Heart, MessageSquare,
  ShoppingBag, ShoppingCart, Users, ArrowDownRight, ArrowUpRight, MoreHorizontal,
  type LucideIcon,
} from "lucide-react";
import { UiAvatar, UiBadge, UiButton, UiCard, UiCardBody, UiProgress } from "@scenariom/design-system/ui";
import type { UiTone } from "@scenariom/design-system/ui";

const toneVar = (tone: string) => `var(--sc-${tone})`;

function StatWidget({ color, description, icon: Icon, stats, trend }: { color: UiTone; description: string; icon: LucideIcon; stats: string; trend?: string }) {
  return (
    <UiCard>
      <UiCardBody>
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md" style={{ backgroundColor: `color-mix(in srgb, var(--sc-${color}) 14%, var(--sc-surface))`, color: `var(--sc-${color})` }}>
            <Icon className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="text-sm text-muted">{description}</p>
            <div className="mt-1 flex items-center gap-2">
              <h3 className="text-2xl font-semibold text-foreground">{stats}</h3>
              {trend && <UiBadge tone={color} variant="soft">{trend}</UiBadge>}
            </div>
          </div>
        </div>
      </UiCardBody>
    </UiCard>
  );
}

function InlineStats({ items }: { items: Array<{ label: string; value: string; color: UiTone; icon: LucideIcon }> }) {
  return (
    <UiCard>
      <UiCardBody>
        <div className="grid gap-5 text-center sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="p-2">
              <item.icon className="mx-auto h-7 w-7" style={{ color: `var(--sc-${item.color})` }} />
              <h3 className="mt-2 text-2xl font-semibold text-foreground">{item.value}</h3>
              <p className="mt-1 text-sm text-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </UiCardBody>
    </UiCard>
  );
}

function TrendWidget({ title, value, trend, trendDirection = "up" }: { title: string; value: string; trend: string; trendDirection?: "up" | "down" }) {
  const isUp = trendDirection === "up";
  const Icon = isUp ? ArrowUpRight : ArrowDownRight;
  return (
    <UiCard>
      <UiCardBody>
        <p className="text-sm text-muted">{title}</p>
        <h3 className="mt-2 text-3xl font-semibold text-foreground">{value}</h3>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-sm text-muted">Total change</span>
          <UiBadge tone={isUp ? "success" : "danger"} variant="soft">
            <Icon className="h-3.5 w-3.5" />
            {trend}
          </UiBadge>
        </div>
      </UiCardBody>
    </UiCard>
  );
}

function ProgressStatWidget({ color, description, icon: Icon, progress, stats }: { color?: Exclude<UiTone, "neutral">; description: string; icon: LucideIcon; progress: number; stats: string }) {
  return (
    <UiCard>
      <UiCardBody>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted">{description}</p>
            <h3 className="mt-1 text-2xl font-semibold text-foreground">{stats}</h3>
          </div>
          <Icon className="h-7 w-7" style={{ color: `var(--sc-${color})` }} />
        </div>
        <div className="mt-4">
          <UiProgress value={progress} tone={color} size="sm" />
        </div>
      </UiCardBody>
    </UiCard>
  );
}

function ProfileWidget({ avatar, name, role }: { avatar: string; name: string; role: string }) {
  return (
    <UiCard>
      <UiCardBody>
        <div className="flex items-center gap-4">
          <img src={avatar} alt={name} className="size-10 rounded-full object-cover" />
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted">{role}</p>
          </div>
          <UiButton className="ml-auto" variant="ghost" size="sm" accessibilityLabel="More actions">
            <MoreHorizontal className="h-4 w-4" />
          </UiButton>
        </div>
      </UiCardBody>
    </UiCard>
  );
}

function ListWidget({ children, title }: { children: ReactNode; title: string }) {
  return (
    <UiCard>
      <UiCardBody>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <UiButton variant="ghost" size="sm" accessibilityLabel={`${title} actions`}>
            <MoreHorizontal className="h-4 w-4" />
          </UiButton>
        </div>
        {children}
      </UiCardBody>
    </UiCard>
  );
}

function SparklineWidget({ color, description, icon: Icon, points, stats, type = "line" }: { color: UiTone; description: string; icon: LucideIcon; points: number[]; stats: string; type?: "line" | "bar" | "area" }) {
  const max = Math.max(...points);
  const normalized = points.map((point, index) => {
    const x = (index / Math.max(points.length - 1, 1)) * 100;
    const y = 42 - (point / max) * 34;
    return `${x},${y}`;
  });
  const polyline = normalized.join(" ");
  const area = `0,46 ${polyline} 100,46`;
  const widgetColor = `var(--sc-${color})`;
  const widgetSoft = `color-mix(in srgb, var(--sc-${color}) 14%, var(--sc-surface))`;

  return (
    <UiCard>
      <UiCardBody>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md" style={{ backgroundColor: `color-mix(in srgb, var(--sc-${color}) 14%, var(--sc-surface))`, color: `var(--sc-${color})` }}>
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-xl font-semibold text-foreground">{stats}</h3>
              <p className="text-sm text-muted">{description}</p>
            </div>
          </div>
        </div>
        <svg viewBox="0 0 100 50" className="mt-4 h-14 w-full" role="img" aria-label={`${description} chart`}>
          {type === "bar" ? (
            points.map((point, index) => {
              const width = 100 / points.length - 2;
              const height = (point / max) * 38;
              return <rect key={index} x={index * (100 / points.length)} y={46 - height} width={width} height={height} rx="1.5" fill={widgetColor} opacity={index % 2 ? 0.35 : 0.9} />;
            })
          ) : (
            <>
              {type === "area" && <polygon points={area} fill={widgetSoft} />}
              <polyline points={polyline} fill="none" stroke={widgetColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </>
          )}
        </svg>
      </UiCardBody>
    </UiCard>
  );
}

const users = [
  { name: "Thelma Fridley", role: "Admin User", avatar: "/assets/images/template-assets/users/user-1.jpg" },
  { name: "Chandler Hervieux", role: "Manager", avatar: "/assets/images/template-assets/users/user-2.jpg" },
  { name: "Percy Demers", role: "Director", avatar: "/assets/images/template-assets/users/user-3.jpg" },
  { name: "Antoine Masson", role: "Premium User", avatar: "/assets/images/template-assets/users/user-4.jpg" },
];

const messages = [
  { user: "Geneva", text: "Hello!", time: "10:00", avatar: "/assets/images/template-assets/users/user-5.jpg" },
  { user: "Dominic", text: "Hi, how are you? What about our next meeting?", time: "10:01", avatar: "/assets/images/template-assets/users/user-1.jpg" },
  { user: "Geneva", text: "Yeah everything is fine.", time: "10:02", avatar: "/assets/images/template-assets/users/user-5.jpg" },
  { user: "Dominic", text: "Great, I will send the updated files.", time: "10:03", avatar: "/assets/images/template-assets/users/user-1.jpg" },
];

const tasks = [
  { label: "Review template routes", done: true },
  { label: "Prepare reusable widget cards", done: true },
  { label: "Validate RTL states", done: false },
  { label: "Connect charts to API data", done: false },
];

export function WidgetsTemplatePreview() {
  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatWidget color="primary" icon={Heart} description="Total Revenue" stats="$58,947" trend="+10.4%" />
        <StatWidget color="success" icon={ShoppingCart} description="Today's Sales" stats="127" trend="+4.8%" />
        <StatWidget color="info" icon={BarChart3} description="Conversion" stats="0.58%" trend="+2.1%" />
        <StatWidget color="warning" icon={Eye} description="Today's Visits" stats="78,412" trend="+9.6%" />
        <StatWidget color="danger" icon={ShoppingBag} description="Available Stores" stats="178" trend="-1.8%" />
        <StatWidget color="secondary" icon={Cpu} description="Gitlab Commits" stats="289" trend="+7.2%" />
        <StatWidget color="pink" icon={Gift} description="Free Gifts" stats="1,021" trend="+11%" />
        <StatWidget color="purple" icon={Users} description="Paid Users" stats="154k" trend="+3.4%" />
      </div>

      <div className="mt-5">
        <InlineStats
          items={[
            { label: "Lifetime Sales", value: "8,954", color: "primary", icon: ShoppingCart },
            { label: "Income Amounts", value: "$7,841", color: "success", icon: DollarSign },
            { label: "Total Users", value: "6,521", color: "danger", icon: Users },
            { label: "Total Visits", value: "325k", color: "info", icon: Eye },
          ]}
        />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <TrendWidget title="Income Status" value="$31,570" trend="10.25%" />
        <TrendWidget title="Sales Status" value="683" trend="7.85%" trendDirection="down" />
        <TrendWidget title="Recent Users" value="3.2M" trend="3.64%" />
        <TrendWidget title="Total Revenue" value="$68,541" trend="17.48%" />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <ProgressStatWidget color="info" icon={Aperture} description="Income Status" stats="$12,145" progress={60} />
        <ProgressStatWidget color="success" icon={ShoppingCart} description="January's Sales" stats="1,576" progress={49} />
        <ProgressStatWidget color="warning" icon={BarChart3} description="Payouts" stats="8,947" progress={18} />
        <ProgressStatWidget color="info" icon={Cpu} description="Available Stores" stats="178" progress={74} />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {users.map((user) => <ProfileWidget key={user.name} {...user} />)}
      </div>

      <h2 className="mt-7 text-lg font-semibold text-foreground">Other Widgets</h2>
      <div className="mt-4 grid gap-5 xl:grid-cols-3">
        <ListWidget title="Messages">
          <div className="space-y-4">
            {messages.slice(0, 3).map((message) => (
              <div key={`${message.user}-${message.time}`} className="flex gap-3">
                <img src={message.avatar} alt={message.user} className="size-8 shrink-0 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="truncate text-sm font-semibold text-foreground">{message.user}</h4>
                    <span className="text-xs text-muted">{message.time}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ListWidget>

        <ListWidget title="Chat List">
          <div className="space-y-3">
            {messages.map((message, index) => (
              <div key={`${message.user}-${index}`} className="flex items-center gap-3 rounded-md bg-card p-3">
                <img src={message.avatar} alt={message.user} className="size-6 shrink-0 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{message.text}</p>
                  <p className="text-xs text-muted">{message.user} - {message.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ListWidget>

        <ListWidget title="Todo List">
          <div className="space-y-3">
            {tasks.map((task) => (
              <label key={task.label} className="flex items-center gap-3 rounded-md border border-border p-3">
                <input type="checkbox" defaultChecked={task.done} className="h-4 w-4 rounded border-border accent-primary" />
                <span className="text-sm text-foreground">{task.label}</span>
                {task.done && <span className="ml-auto"><UiBadge tone="success" variant="soft">Done</UiBadge></span>}
              </label>
            ))}
            <UiButton fullWidth variant="soft" tone="primary">Add Task</UiButton>
          </div>
        </ListWidget>
      </div>

      <h2 className="mt-7 text-lg font-semibold text-foreground">Chart Widgets</h2>
      <div className="mt-4 grid gap-5 xl:grid-cols-3">
        <SparklineWidget color="warning" icon={Aperture} stats="$8,145" description="Income Status" type="bar" points={[5, 9, 5, 7, 5, 9, 2, 3, 2, 7, 5, 9]} />
        <SparklineWidget color="info" icon={ShoppingBag} stats="367" description="Sales Status" type="line" points={[5, 3, 9, 6, 5, 9, 7, 3, 5, 2]} />
        <SparklineWidget color="success" icon={Users} stats="7,204" description="Recent Users" type="area" points={[3, 5, 2, 9, 7, 2, 5, 3, 9, 6, 5, 9, 7]} />
      </div>
    </div>
  );
}
