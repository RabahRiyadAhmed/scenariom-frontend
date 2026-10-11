"use client";
import { useEffect, useState, type ReactNode } from "react";
import {
  UiAccordion,
  UiAlert,
  UiAvatar,
  UiBadge,
  UiButton,
  UiCard,
  UiCardBody,
  UiCardFooter,
  UiCardHeader,
  UiPortlet,
  UiCheckbox,
  UiDivider,
  UiEmptyState,
  UiIconButton,
  UiKbd,
  UiList,
  UiListItem,
  UiPagination,
  UiPasswordField,
  UiProgress,
  UiRadioGroup,
  UiRangeSlider,
  UiSearchField,
  UiSelect,
  UiSkeleton,
  UiSpinner,
  UiStatCard,
  UiSwitch,
  UiTabs,
  UiTextarea,
  UiTextField,
} from "@scenariom/design-system/ui";
import { ThemeShapeButton as SpecializedShapeButton } from "@/components/theme-shape-button";
import { SpecializedCarousel } from "@/components/specialized-ui";
import { NineSliceButtonPoc } from "@/components/nine-slice-button-poc";
import { UniformAssetPoc } from "@/components/uniform-asset-poc";
import { apiUrl, useThemeRuntime } from "@/components/theme-runtime-provider";
import type { ComponentCatalogName } from "@scenariom/design-system/component-catalog";
import { translate, type Locale, type MessageKey } from "@scenariom/i18n";
import { CardTemplatePreview } from "@/components/card-template-preview";
import { TabsAccordionsTemplatePreview } from "@/components/tabs-accordions-template-preview";
import { ProgressTemplatePreview } from "@/components/progress-template-preview";
import { ModalsTemplatePreview } from "@/components/modals-template-preview";
import { NotificationsTemplatePreview } from "@/components/notifications-template-preview";
import { OffcanvasTemplatePreview } from "@/components/offcanvas-template-preview";
import { PlaceholdersTemplatePreview } from "@/components/placeholders-template-preview";
import { AlertsTemplatePreview } from "@/components/alerts-template-preview";
import { ToastsTemplatePreview } from "@/components/toasts-template-preview";
import { InertiaTemplatePreview } from "@/components/inertia-template-preview";
import { ReferencePagesPreview } from "@/components/reference-pages-preview";
import { DragDropTemplatePreview } from "@/components/drag-drop-template-preview";
import { NestableListTemplatePreview } from "@/components/nestable-list-template-preview";
import { RangeSlidersTemplatePreview } from "@/components/range-sliders-template-preview";
import { SweetAlertsTemplatePreview } from "@/components/sweet-alerts-template-preview";
import { AnimationTemplatePreview } from "@/components/animation-template-preview";
import { TourTemplatePreview } from "@/components/tour-template-preview";
import { LoadingButtonsTemplatePreview } from "@/components/loading-buttons-template-preview";
import { WidgetsTemplatePreview } from "@/components/widgets-template-preview";
import { FormsTemplatePreview } from "@/components/forms-template-preview";
import { FormWizardTemplatePreview } from "@/components/form-wizard-template-preview";
import { ChartsTemplatePreview } from "@/components/charts-template-preview";
import { TablesTemplatePreview } from "@/components/tables-template-preview";

const sourceKey: Record<string, MessageKey> = {
  Primary: "componentPreview.primary",
  Secondary: "componentPreview.secondary",
  Success: "componentPreview.success",
  Warning: "componentPreview.warning",
  Danger: "componentPreview.danger",
  Info: "componentPreview.info",
  Information: "componentPreview.info",
  Default: "componentPreview.default",
  Ready: "componentPreview.ready",
  Draft: "componentPreview.draft",
  Create: "componentPreview.create",
  Save: "componentPreview.save",
  Send: "componentPreview.send",
  Delete: "componentPreview.delete",
  Copy: "componentPreview.copy",
  Approve: "componentPreview.approve",
  Reject: "componentPreview.reject",
  Loading: "componentPreview.loading",
  Saving: "componentPreview.saving",
  Settings: "componentPreview.settings",
  "Card title": "componentPreview.cardTitle",
  "Theme-aware card content.": "componentPreview.cardContent",
  Section: "componentPreview.section",
  "First item": "componentPreview.firstItem",
  "Second item": "componentPreview.secondItem",
  "Interactive list row": "componentPreview.listRow",
  "Another row": "componentPreview.anotherRow",
  Progress: "componentPreview.progress",
  Projects: "componentPreview.projects",
  "This month": "componentPreview.thisMonth",
  "This alert follows the active theme.": "componentPreview.alertBody",
  "Nothing here": "componentPreview.emptyTitle",
  "Create an item to begin.": "componentPreview.emptyDescription",
  "Enable option": "componentPreview.enableOption",
  Publication: "componentPreview.publication",
  Title: "componentPreview.title",
  Description: "componentPreview.description",
  Password: "componentPreview.password",
  Show: "componentPreview.show",
  Hide: "componentPreview.hide",
  Search: "componentPreview.search",
  Clear: "componentPreview.clear",
  Status: "componentPreview.status",
  Visibility: "componentPreview.visibility",
  Private: "componentPreview.private",
  Public: "componentPreview.public",
  Preview: "componentPreview.preview",
  Code: "componentPreview.code",
  Previous: "componentPreview.previous",
  Next: "componentPreview.next",
  Volume: "componentPreview.volume",
  "Theme shape": "componentPreview.themeShape",
  "Default buttons": "componentPreview.buttons.default",
  "Button labels": "componentPreview.buttons.labels",
  "Hover and action states": "componentPreview.buttons.actions",
  "Action buttons": "componentPreview.buttons.actionButtons",
  "Outlined tools": "componentPreview.buttons.outlinedTools",
  "Loading states": "componentPreview.buttons.loadingStates",
  "Button width, sizes and disabled states":
    "componentPreview.buttons.sizesStates",
  "Button sizes": "componentPreview.buttons.sizes",
  "Button disabled": "componentPreview.buttons.disabled",
  "Icon buttons": "componentPreview.buttons.icons",
  "Button group": "componentPreview.buttons.group",
  "Block buttons": "componentPreview.buttons.block",
  "Custom SVG assets": "componentPreview.buttons.assets",
};
const ct = (locale: Locale, text: string) => {
  const key = sourceKey[text];
  return key
    ? translate(key, {}, locale)
    : locale === "en"
      ? text
      : `componentPreview.${text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, ".")
          .replace(/^\.|\.$/g, "")}`;
};

const buttonTones = [
  "primary",
  "secondary",
  "accent",
  "info",
  "success",
  "warning",
  "danger",
  "pink",
  "purple",
  "orange",
  "teal",
] as const;

const toneLabel: Record<(typeof buttonTones)[number], string> = {
  primary: "Primary",
  secondary: "Secondary",
  accent: "Accent",
  info: "Info",
  success: "Success",
  warning: "Warning",
  danger: "Danger",
  pink: "Pink",
  purple: "Purple",
  orange: "Orange",
  teal: "Teal",
};

const customButtonAssets = [
  { file: "btn_circle_aurora-glass_01_01.svg", label: "Aurora glass" },
  { file: "btn_circle_blue-silver_02.svg", label: "Blue silver" },
  { file: "btn_circle_pastel-coral_01.svg", label: "Pastel coral" },
  { file: "btn_square_wax-seal_01_01.svg", label: "Wax seal" },
];

function CustomAssetButton({ file, label }: { file: string; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex w-20 flex-col items-center gap-1.5 bg-transparent"
    >
      <span
        aria-hidden
        className="size-16 bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${apiUrl}/assets/custom/button/${file}")`,
        }}
      />
      <span className="text-center text-xs font-medium text-muted">
        {label}
      </span>
    </button>
  );
}

function CustomGradientButton({
  file,
  label,
}: {
  file: string;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-14 w-full items-center justify-center rounded-md bg-cover bg-center font-semibold text-white"
      style={{
        backgroundImage: `url("${apiUrl}/assets/custom/gradients/${file}")`,
      }}
    >
      {label}
    </button>
  );
}

function ButtonList({
  variant,
  locale,
  rounded = false,
  limit,
}: {
  variant: "solid" | "outline" | "soft";
  locale: Locale;
  rounded?: boolean;
  limit?: number;
}) {
  return (
    <div className="grid min-w-0 grid-cols-2 gap-3 sm:flex sm:flex-wrap">
      {buttonTones.slice(0, limit ?? buttonTones.length).map((tone) => (
        <UiButton
          key={`${variant}-${rounded}-${tone}`}
          tone={tone}
          variant={variant}
          rounded={rounded}
        >
          {ct(locale, toneLabel[tone])}
        </UiButton>
      ))}
      {variant === "solid" && (
        <>
          <UiButton tone="neutral" variant="ghost">
            {ct(locale, "Neutral ghost")}
          </UiButton>
          <UiButton tone="neutral" variant="soft">
            {ct(locale, "Neutral soft")}
          </UiButton>
        </>
      )}
    </div>
  );
}

function ButtonGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex min-w-max overflow-hidden rounded-md border">
      {children}
    </div>
  );
}

function GroupButton({
  children,
  first,
  last,
  active,
  onPress,
}: {
  children: React.ReactNode;
  first?: boolean;
  last?: boolean;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPress}
      className={`min-h-10 px-4 text-sm font-semibold transition hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/30 disabled:opacity-50 ${active ? "bg-primary text-white" : "bg-transparent text-foreground"} ${first ? "" : "border-s border-border"} ${last ? "rounded-e-md" : first ? "rounded-s-md" : ""}`}
    >
      {children}
    </button>
  );
}

function ButtonPreview({ locale }: { locale: Locale }) {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="mb-3 text-sm font-semibold">{ct(locale, "Default")}</h3>
        <ButtonList variant="solid" locale={locale} />
      </section>
      <div className="grid gap-5 xl:grid-cols-2">
        <section>
          <h3 className="mb-3 text-sm font-semibold">
            {ct(locale, "Primary")}
          </h3>
          <ButtonList variant="solid" locale={locale} rounded limit={10} />
        </section>
        <section>
          <h3 className="mb-3 text-sm font-semibold">
            {ct(locale, "Secondary")}
          </h3>
          <ButtonList variant="outline" locale={locale} />
        </section>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <section>
          <h3 className="mb-3 text-sm font-semibold">
            {ct(locale, "Preview")}
          </h3>
          <ButtonList variant="outline" locale={locale} rounded limit={10} />
        </section>
        <section>
          <h3 className="mb-3 text-sm font-semibold">
            {ct(locale, "Information")}
          </h3>
          <ButtonList variant="soft" locale={locale} />
        </section>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <section>
          <h3 className="mb-3 text-sm font-semibold">{ct(locale, "Ready")}</h3>
          <ButtonList variant="soft" locale={locale} rounded limit={10} />
        </section>
        <section>
          <h3 className="mb-3 text-sm font-semibold">
            {ct(locale, "Button labels")}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <UiButton tone="success" icon="check">
                {ct(locale, "Success")}
              </UiButton>
              <UiButton tone="danger" icon="x">
                {ct(locale, "Danger")}
              </UiButton>
              <UiButton tone="info" icon="arrow-right">
                {ct(locale, "Info")}
              </UiButton>
              <UiButton tone="warning" icon="warning">
                {ct(locale, "Warning")}
              </UiButton>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <UiButton tone="success" rounded icon="check" iconPosition="end">
                {ct(locale, "Success")}
              </UiButton>
              <UiButton tone="danger" rounded icon="x" iconPosition="end">
                {ct(locale, "Danger")}
              </UiButton>
              <UiButton
                tone="info"
                rounded
                icon="arrow-right"
                iconPosition="end"
              >
                {ct(locale, "Info")}
              </UiButton>
              <UiButton
                tone="warning"
                rounded
                icon="warning"
                iconPosition="end"
              >
                {ct(locale, "Warning")}
              </UiButton>
            </div>
          </div>
        </section>
      </div>
      <section>
        <h3 className="mb-3 text-sm font-semibold">
          {ct(locale, "Hover and action states")}
        </h3>
        <div className="grid gap-5 xl:grid-cols-3">
          <div>
            <h4 className="text-sm font-semibold">
              {ct(locale, "Action buttons")}
            </h4>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <UiButton tone="primary" onPress={() => undefined} icon="plus">
                {ct(locale, "Create")}
              </UiButton>
              <UiButton tone="success" icon="save">
                {ct(locale, "Save")}
              </UiButton>
              <UiButton tone="info" icon="send">
                {ct(locale, "Send")}
              </UiButton>
              <UiButton tone="danger" icon="trash">
                {ct(locale, "Delete")}
              </UiButton>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold">
              {ct(locale, "Outlined tools")}
            </h4>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <UiButton tone="primary" variant="outline" icon="copy">
                {ct(locale, "Copy")}
              </UiButton>
              <UiButton tone="success" variant="outline" icon="check">
                {ct(locale, "Approve")}
              </UiButton>
              <UiButton tone="danger" variant="outline" icon="x">
                {ct(locale, "Reject")}
              </UiButton>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold">
              {ct(locale, "Loading states")}
            </h4>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <UiButton tone="primary" loading>
                {ct(locale, "Loading")}
              </UiButton>
              <UiButton tone="secondary" loading disabled>
                {ct(locale, "Saving")}
              </UiButton>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-sm font-semibold">
          {ct(locale, "Button width, sizes and disabled states")}
        </h3>
        <div className="grid gap-8 xl:grid-cols-3">
          <div>
            <h4 className="text-sm font-semibold">
              {ct(locale, "Button width")}
            </h4>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {[
                ["XS", 48, "primary"],
                ["Small", 80, "success"],
                ["Middle", 112, "info"],
                ["Large", 144, "warning"],
                ["Extra Large", 176, "danger"],
              ].map(([label, width, tone]) => (
                <div key={label as string} style={{ width: width as number }}>
                  <UiButton
                    tone={tone as (typeof buttonTones)[number]}
                    fullWidth
                  >
                    {ct(locale, label as string)}
                  </UiButton>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold">
              {ct(locale, "Button sizes")}
            </h4>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <UiButton tone="pink" size="lg">
                {ct(locale, "Large")}
              </UiButton>
              <UiButton tone="primary">{ct(locale, "Default")}</UiButton>
              <UiButton tone="info" size="sm">
                {ct(locale, "Small")}
              </UiButton>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold">
              {ct(locale, "Button disabled")}
            </h4>
            <div className="mt-4 flex flex-wrap gap-3">
              {(["primary", "success", "info", "warning"] as const).map(
                (tone) => (
                  <UiButton key={tone} tone={tone} disabled>
                    {ct(locale, toneLabel[tone])}
                  </UiButton>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="grid gap-5 xl:grid-cols-2">
        <section>
          <h3 className="mb-3 text-sm font-semibold">
            {ct(locale, "Icon buttons")}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-3 sm:flex sm:flex-wrap">
              {(
                ["success", "danger", "info", "warning", "purple"] as const
              ).map((tone) => (
                <UiIconButton
                  key={tone}
                  tone={tone}
                  variant="outline"
                  accessibilityLabel={ct(locale, toneLabel[tone])}
                  icon="star"
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <UiButton tone="success" icon="heart">
                {ct(locale, "Like")}
              </UiButton>
              <UiButton tone="secondary" icon="share">
                {ct(locale, "Share")}
              </UiButton>
              <UiButton tone="info" icon="upload">
                {ct(locale, "Cloud Hosting")}
              </UiButton>
              <UiButton tone="warning">
                {ct(locale, "Donate")} <span className="font-bold">BTC</span>
              </UiButton>
            </div>
          </div>
        </section>
        <section>
          <h3 className="mb-3 text-sm font-semibold">
            {ct(locale, "Button group")}
          </h3>
          <div className="space-y-4">
            <div className="max-w-full overflow-x-auto pb-1">
              <ButtonGroup>
                {["Left", "Middle", "Right"].map((label, index, arr) => (
                  <GroupButton
                    key={label}
                    first={index === 0}
                    last={index === arr.length - 1}
                  >
                    {ct(locale, label)}
                  </GroupButton>
                ))}
              </ButtonGroup>
            </div>
            <div className="max-w-full overflow-x-auto pb-1">
              <ButtonGroup>
                {[1, 2, 3, 4].map((item, index, arr) => (
                  <GroupButton
                    key={item}
                    first={index === 0}
                    last={index === arr.length - 1}
                    active={item === 2}
                  >
                    {item}
                  </GroupButton>
                ))}
                <GroupButton last>
                  {ct(locale, "Dropdown")} <span>⌄</span>
                </GroupButton>
              </ButtonGroup>
            </div>
          </div>
        </section>
      </div>
      <section>
        <h3 className="mb-3 text-sm font-semibold">
          {ct(locale, "Block buttons")}
        </h3>
        <div className="grid gap-3">
          <UiButton tone="primary" fullWidth>
            {ct(locale, "Block Button")}
          </UiButton>
          <UiButton tone="pink" fullWidth>
            {ct(locale, "Block Button")}
          </UiButton>
          <UiButton tone="success" fullWidth>
            {ct(locale, "Block Button")}
          </UiButton>
          <UiButton tone="danger" fullWidth disabled icon="trash">
            {ct(locale, "Disabled Delete")}
          </UiButton>
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-sm font-semibold">
          {ct(locale, "Custom SVG assets")}
        </h3>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            {customButtonAssets.map((asset) => (
              <CustomAssetButton
                key={asset.file}
                file={asset.file}
                label={ct(locale, asset.label)}
              />
            ))}
          </div>
          <CustomGradientButton
            file="gr_forest-canopy_01.svg"
            label={ct(locale, "Gradient button")}
          />
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-sm font-semibold">
          {ct(locale, "Notched navy — responsive 9-slice (POC)")}
        </h3>
        <NineSliceButtonPoc />
      </section>
    </div>
  );
}

const templateImages = Array.from(
  { length: 7 },
  (_, index) => `/assets/images/template-assets/small/img-${index + 1}.jpg`,
);
const templateUsers = Array.from(
  { length: 7 },
  (_, index) => `/assets/images/template-assets/users/user-${index + 2}.jpg`,
);
const previewTones = [
  "primary",
  "success",
  "info",
  "warning",
  "danger",
  "purple",
  "pink",
  "orange",
  "teal",
] as const;
const demoCopy =
  "Some quick example text to build on the card title and make up the bulk of the card content.";
function DemoCard({
  index = 0,
  tone,
  variant = "default",
  image = true,
  title = "Card title",
}: {
  index?: number;
  tone?: (typeof previewTones)[number];
  variant?: "default" | "solid" | "outline";
  image?: boolean;
  title?: string;
}) {
  return (
    <UiCard tone={tone} variant={variant}>
      {image && (
        <img
          src={templateImages[index % 7]}
          alt=""
          className="h-36 w-full object-cover"
        />
      )}
      <UiCardHeader>{title}</UiCardHeader>
      <UiCardBody>
        <p className="text-sm leading-6 text-muted">{demoCopy}</p>
        <UiButton size="sm">Button</UiButton>
      </UiCardBody>
      <UiCardFooter>Last updated 3 mins ago</UiCardFooter>
    </UiCard>
  );
}
function CardsTemplatePreview() {
  return (
    <div className="space-y-8">
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <DemoCard key={`top-${i}`} index={i} />
        ))}
      </section>
      <section className="grid gap-5 md:grid-cols-2">
        {Array.from({ length: 2 }, (_, i) => (
          <DemoCard
            key={`special2-${i}`}
            image={false}
            title="Special title treatment"
          />
        ))}
      </section>
      <section className="grid gap-5 md:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <DemoCard
            key={`special3-${i}`}
            image={false}
            title="Special title treatment"
          />
        ))}
      </section>
      <section className="grid gap-5 md:grid-cols-3">
        {["Featured", "Quote", "Featured"].map((title, i) => (
          <DemoCard key={`featured-${i}`} image={false} title={title} />
        ))}
      </section>
      <section>
        <h3 className="mb-4 font-semibold">Image caps</h3>
        <div className="grid gap-5 md:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <DemoCard key={`caps-${i}`} index={i + 4} />
          ))}
        </div>
      </section>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {previewTones.map((tone) => (
          <DemoCard key={tone} tone={tone} variant="solid" image={false} />
        ))}
      </section>
      <section className="grid gap-5 md:grid-cols-3">
        {previewTones.slice(0, 3).map((tone) => (
          <DemoCard
            key={`text-${tone}`}
            tone={tone}
            image={false}
            title={`${tone} card title`}
          />
        ))}
      </section>
      <section>
        <h3 className="mb-4 font-semibold">Card Group</h3>
        <div className="grid overflow-hidden rounded-lg border border-border md:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <DemoCard key={`group-${i}`} index={i} />
          ))}
        </div>
      </section>
      <section>
        <h3 className="mb-4 font-semibold">Navigation</h3>
        <div className="grid gap-5 md:grid-cols-2">
          {Array.from({ length: 2 }, (_, i) => (
            <DemoCard
              key={`nav-${i}`}
              image={false}
              title={i ? "Pills navigation" : "Tabs navigation"}
            />
          ))}
        </div>
      </section>
      <section>
        <h3 className="mb-4 font-semibold">Horizontal Card</h3>
        <div className="grid gap-5 md:grid-cols-2">
          {Array.from({ length: 2 }, (_, i) => (
            <DemoCard key={`horizontal-${i}`} index={i + 1} />
          ))}
        </div>
      </section>
      <section>
        <h3 className="mb-4 font-semibold">Card styles</h3>
        <div className="grid gap-5 md:grid-cols-3">
          {previewTones
            .slice(0, 3)
            .flatMap((tone) =>
              (["solid", "outline"] as const).map((variant) => (
                <DemoCard
                  key={`${tone}-${variant}`}
                  tone={tone}
                  variant={variant}
                  image={false}
                />
              )),
            )}
        </div>
      </section>
      <section>
        <h3 className="mb-4 font-semibold">Grid Cards</h3>
        <div className="grid gap-5 md:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <DemoCard key={`grid-${i}`} index={i} image={i % 3 !== 1} />
          ))}
        </div>
      </section>
    </div>
  );
}
function AvatarsTemplatePreview() {
  const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
  const labelledAvatar = (label: string, avatar: ReactNode) => (
    <div key={label} className="flex flex-col items-center gap-2">
      {avatar}<code className="text-xs text-muted">{label}</code>
    </div>
  );
  return (
    <div className="space-y-6">
      <section className="grid gap-5 xl:grid-cols-2">
        <UiCard>
          <UiCardHeader>Sizing - Images</UiCardHeader>
          <UiCardBody>
            <div className="flex flex-wrap items-end gap-6">
              {sizes.map((size, i) => labelledAvatar(`size=\"${size}\"`, <UiAvatar
                  key={`image-${i}`}
                  name={`User ${i + 2}`}
                  imageUrl={templateUsers[i]}
                  size={size}
                />))}
            </div>
          </UiCardBody>
        </UiCard>
        <UiCard>
          <UiCardHeader>Rounded circle</UiCardHeader>
          <UiCardBody>
            <div className="flex items-end gap-6">
              {(["md", "lg", "xl"] as const).map((size, i) => labelledAvatar(`size=\"${size}\" shape=\"circle\"`, <UiAvatar
                  key={`circle-${i}`}
                  name="Profile user"
                  imageUrl={templateUsers[1]}
                  size={size}
                  shape="circle"
                />))}
            </div>
          </UiCardBody>
        </UiCard>
      </section>
      <section className="grid gap-5 xl:grid-cols-2">
        <UiCard>
          <UiCardHeader>Sizing - Background color</UiCardHeader>
          <UiCardBody>
            <div className="flex flex-wrap items-end gap-6">
              {sizes.map((size, i) => labelledAvatar(`size=\"${size}\"`, <UiAvatar
                  key={`initial-${i}`}
                  name={
                    [
                      "Extra Small",
                      "Small Medium",
                      "Medium Demo",
                      "Large Demo",
                      "Extra Large",
                    ][i]
                  }
                  size={size}
                />))}
            </div>
          </UiCardBody>
        </UiCard>
        <UiCard>
          <UiCardHeader>Rounded circle background</UiCardHeader>
          <UiCardBody>
            <div className="flex items-end gap-6">
              {(["md", "lg", "xl"] as const).map((size, i) => labelledAvatar(`size=\"${size}\" shape=\"circle\"`, <UiAvatar
                  key={`initial-circle-${i}`}
                  name={["Medium Demo", "Large Demo", "Extra Large"][i]}
                  size={size}
                  shape="circle"
                />))}
            </div>
          </UiCardBody>
        </UiCard>
      </section>
      <UiCard>
        <UiCardHeader>Image shapes</UiCardHeader>
        <UiCardBody>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <figure><img
              src="/assets/images/market-assets/furniture/banner/3.jpg"
              alt=""
              className="aspect-video w-full rounded-lg object-cover"
            /><figcaption className="mt-2 text-xs text-muted">Image fills a 16:9 container</figcaption></figure>
            {labelledAvatar('shape="rounded"', <UiAvatar
              name="Rounded avatar"
              imageUrl={templateUsers[3]}
              size="lg"
            />)}
            {labelledAvatar('shape="circle"', <UiAvatar
              name="Circle avatar"
              imageUrl={templateUsers[5]}
              size="lg"
              shape="circle"
            />)}
            <figure><img
              src="/assets/images/market-assets/furniture/banner/4.jpg"
              alt=""
              className="aspect-video w-full rounded-lg border-4 border-surface object-cover outline outline-border"
            /><figcaption className="mt-2 text-xs text-muted">Thumbnail constrained by its container</figcaption></figure>
            {labelledAvatar('thumbnail shape="circle"', <UiAvatar
              name="Circle thumbnail"
              imageUrl={templateUsers[6]}
              size="lg"
              shape="circle"
              thumbnail
            />)}
          </div>
        </UiCardBody>
      </UiCard>
    </div>
  );
}
function BadgeTemplatePreview() {
  const tones = ["primary","secondary","accent","success","info","warning","danger","pink","purple","orange","teal","neutral"] as const;
  const samples = [{lang:"en",text:"Published"},{lang:"fr",text:"Brouillon"},{lang:"ar",text:"قيد الكتابة"},{lang:"zh",text:"已发布"},{lang:"ja",text:"公開済み"},{lang:"ko",text:"게시됨"},{lang:"ru",text:"Опубликовано"},{lang:"tr",text:"Yayınlandı"},{lang:"hy",text:"Հրապարակված"},{lang:"syr",text:"ܦܪܝܣܐ"}];
  const [labVariant,setLabVariant]=useState<'solid'|'soft'|'outline'>('solid');
  const [labSize,setLabSize]=useState<'sm'|'md'|'lg'>('md');
  const [labScript,setLabScript]=useState(0);
  const [labFont,setLabFont]=useState('sans');
  return <div className="space-y-6">
    <UiCard><UiCardHeader>Interactive badge laboratory</UiCardHeader><UiCardBody><div className="grid gap-4 md:grid-cols-4"><UiSelect label="Language / script" value={String(labScript)} options={samples.map((item,index)=>({value:String(index),label:`${item.lang.toUpperCase()} · ${item.text}`}))} onValueChange={value=>setLabScript(Number(value))}/><UiSelect label="Font family" value={labFont} options={[{value:'sans',label:'Sans-serif'},{value:'serif',label:'Serif'},{value:'mono',label:'Monospace'}]} onValueChange={setLabFont}/><UiSelect label="Variant" value={labVariant} options={['solid','soft','outline'].map(value=>({value,label:value}))} onValueChange={value=>setLabVariant(value as typeof labVariant)}/><UiSelect label="Size" value={labSize} options={['sm','md','lg'].map(value=>({value,label:value}))} onValueChange={value=>setLabSize(value as typeof labSize)}/></div><div dir={['ar','syr'].includes(samples[labScript].lang)?'rtl':'ltr'} lang={samples[labScript].lang} className="mt-6 flex flex-wrap items-center gap-3" style={{fontFamily:labFont==='serif'?'Georgia, serif':labFont==='mono'?'monospace':'inherit'}}>{tones.map(tone=><UiBadge key={tone} tone={tone} variant={labVariant} size={labSize}>{samples[labScript].text} · {tone}</UiBadge>)}</div></UiCardBody></UiCard>
    {(["solid","soft","outline"] as const).map(variant => <UiCard key={variant}><UiCardHeader>{variant[0].toUpperCase()+variant.slice(1)} badges</UiCardHeader><UiCardBody><div className="flex flex-wrap items-center gap-3">{tones.map(tone=><UiBadge key={tone} tone={tone} variant={variant} size="md">{tone}</UiBadge>)}</div></UiCardBody></UiCard>)}
    <UiCard><UiCardHeader>Sizes and strength</UiCardHeader><UiCardBody><div className="flex flex-wrap items-center gap-3"><UiBadge size="sm" variant="soft">Low · sm</UiBadge><UiBadge size="md">Medium · md</UiBadge><UiBadge size="lg" tone="danger">Strong · lg</UiBadge><UiBadge pill tone="success">Pill status</UiBadge></div></UiCardBody></UiCard>
    <UiCard><UiCardHeader>Writing systems, long labels and wrapping</UiCardHeader><UiCardBody><div className="flex flex-wrap gap-3">{samples.map((sample,i)=><span key={sample.lang} lang={sample.lang} dir={['ar','syr'].includes(sample.lang)?'rtl':'ltr'}><UiBadge tone={tones[i%tones.length]} variant="soft" size="lg">{sample.text}</UiBadge></span>)}<UiBadge tone="warning" variant="outline" size="lg">A very long editorial workflow status</UiBadge><UiBadge tone="danger" pill size="lg">99+</UiBadge></div></UiCardBody></UiCard>
  </div>;
}
function PortletsTemplatePreview() {
  const tones = [
    "neutral",
    "primary",
    "success",
    "info",
    "warning",
    "danger",
    "accent",
    "pink",
    "purple",
    "orange",
    "teal",
    "secondary",
    "neutral",
  ] as const;
  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-3">
        <UiPortlet>{demoCopy}</UiPortlet>
        <UiPortlet tone="primary" variant="solid">
          {demoCopy}
        </UiPortlet>
        <UiPortlet tone="success" variant="solid">
          {demoCopy}
        </UiPortlet>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {tones.map((tone, i) => (
          <UiPortlet key={`${tone}-${i}`} tone={tone} variant="header">
            {demoCopy}
          </UiPortlet>
        ))}
      </div>
    </div>
  );
}

export function ComponentPreview({
  name,
  locale = "en",
}: {
  name: ComponentCatalogName;
  locale?: Locale;
}) {
  const { slideImageUrl } = useThemeRuntime();
  const [value, setValue] = useState(ct(locale, "Title"));
  const [checked, setChecked] = useState(true);
  const [page, setPage] = useState(2);
  const [tab, setTab] = useState("one");
  const [sliderValue, setSliderValue] = useState(40);
  if (String(name) === "UiSpinner") return <InertiaTemplatePreview kind="spinners"/>;
  if (String(name) === "UiImages") return <InertiaTemplatePreview kind="images"/>;
  if (String(name) === "UiList") return <InertiaTemplatePreview kind="lists"/>;
  if (String(name) === "SpecializedCarousel") return <InertiaTemplatePreview kind="carousel"/>;
  if (String(name) === "SpecializedVideo") return <InertiaTemplatePreview kind="video"/>;
  if (String(name) === "UiDropdownMenu") return <ReferencePagesPreview kind="dropdowns"/>;
  if (String(name) === "UiRibbons") return <ReferencePagesPreview kind="ribbons"/>;
  if (String(name) === "UiTooltipsPopovers") return <ReferencePagesPreview kind="overlays"/>;
  if (String(name) === "UiGeneral") return <ReferencePagesPreview kind="general"/>;
  if (String(name) === "UiTypography") return <ReferencePagesPreview kind="typography"/>;
  if (String(name) === "UiGrid") return <ReferencePagesPreview kind="grid"/>;
  if (String(name) === "UiDragDrop") return <DragDropTemplatePreview/>;
  if (String(name) === "UiNestableList") return <NestableListTemplatePreview/>;
  if (String(name) === "UiAnimation") return <AnimationTemplatePreview/>;
  if (String(name) === "UiSweetAlert") return <SweetAlertsTemplatePreview/>;
  if (String(name) === "UiTour") return <TourTemplatePreview/>;
  if (String(name) === "UiLoadingButton") return <LoadingButtonsTemplatePreview/>;
  if (String(name) === "UiWidgets") return <WidgetsTemplatePreview/>;
  if (String(name) === "UiFormBasic") return <FormsTemplatePreview kind="basic"/>;
  if (String(name) === "UiFormAdvanced") return <FormsTemplatePreview kind="advanced"/>;
  if (String(name) === "UiFormValidation") return <FormsTemplatePreview kind="validation"/>;
  if (String(name) === "UiFormFileUpload") return <FormsTemplatePreview kind="upload"/>;
  if (String(name) === "SpecializedRichTextEditor") return <FormsTemplatePreview kind="editors"/>;
  if (String(name) === "UiFormWizard") return <FormWizardTemplatePreview/>;
  if (String(name) === "UiChart") return <ChartsTemplatePreview/>;
  if (String(name) === "UiTableBasic") return <TablesTemplatePreview kind="basic"/>;
  if (String(name) === "UiTableAdvanced") return <TablesTemplatePreview kind="advanced"/>;
  switch (name) {
    case "UiButton":
      return <ButtonPreview locale={locale} />;
    case "UiAvatar":
      return <AvatarsTemplatePreview />;
    case "UiBadge":
      return <BadgeTemplatePreview />;
    case "UiCard":
      return <CardTemplatePreview />;
    case "UiImages": return <InertiaTemplatePreview kind="images"/>;
    case "UiPortlet":
      return <PortletsTemplatePreview />;
    case "UiDivider":
      return <UiDivider label={ct(locale, "Section")} />;
    case "UiKbd":
      return (
        <div className="flex gap-1">
          <UiKbd>Ctrl</UiKbd>
          <UiKbd>K</UiKbd>
        </div>
      );
    case "UiList":
      return (
        <UiList>
          <UiListItem
            title={ct(locale, "First item")}
            description={ct(locale, "Interactive list row")}
          />
          <UiListItem
            title={ct(locale, "Second item")}
            description={ct(locale, "Another row")}
          />
        </UiList>
      );
    case "UiProgress":
      return <ProgressTemplatePreview/>;
    case "UiSkeleton":
      return (
        <div className="space-y-3">
          <UiSkeleton height={18} />
          <UiSkeleton width="70%" height={18} />
        </div>
      );
    case "UiSpinner":
      return <UiSpinner label={ct(locale, "Loading")} />;
    case "UiStatCard":
      return (
        <UiStatCard
          label={ct(locale, "Projects")}
          value="24"
          description={ct(locale, "This month")}
        />
      );
    case "UiAlert":
      return <AlertsTemplatePreview/>;
    case "UiToast": return <ToastsTemplatePreview/>;
    case "UiModal":
      return <ModalsTemplatePreview/>;
    case "UiNotifications": return <NotificationsTemplatePreview/>;
    case "UiOffcanvas": return <OffcanvasTemplatePreview/>;
    case "UiPlaceholders": return <PlaceholdersTemplatePreview/>;
    case "UiEmptyState":
      return (
        <UiEmptyState
          title={ct(locale, "Nothing here")}
          description={ct(locale, "Create an item to begin.")}
          action={<UiButton>{ct(locale, "Create")}</UiButton>}
        />
      );
    case "UiCheckbox":
      return (
        <UiCheckbox
          label={ct(locale, "Enable option")}
          checked={checked}
          onCheckedChange={setChecked}
        />
      );
    case "UiSwitch":
      return (
        <UiSwitch
          label={ct(locale, "Publication")}
          checked={checked}
          onCheckedChange={setChecked}
        />
      );
    case "UiTextField":
      return (
        <UiTextField
          label={ct(locale, "Title")}
          value={value}
          onChangeText={setValue}
        />
      );
    case "UiTextarea":
      return (
        <UiTextarea
          label={ct(locale, "Description")}
          value={value}
          onChangeText={setValue}
        />
      );
    case "UiPasswordField":
      return (
        <UiPasswordField
          label={ct(locale, "Password")}
          value={value}
          onChangeText={setValue}
          showPasswordLabel={ct(locale, "Show")}
          hidePasswordLabel={ct(locale, "Hide")}
        />
      );
    case "UiSearchField":
      return (
        <UiSearchField
          label={ct(locale, "Search")}
          value={value}
          onChangeText={setValue}
          clearLabel={ct(locale, "Clear")}
          submitLabel={ct(locale, "Search")}
        />
      );
    case "UiSelect":
      return (
        <UiSelect
          label={ct(locale, "Status")}
          value={value}
          onValueChange={setValue}
          options={[
            { value: "draft", label: ct(locale, "Draft") },
            { value: "ready", label: ct(locale, "Ready") },
          ]}
        />
      );
    case "UiRadioGroup":
      return (
        <UiRadioGroup
          label={ct(locale, "Visibility")}
          value={value}
          onValueChange={setValue}
          options={[
            { value: "private", label: ct(locale, "Private") },
            { value: "public", label: ct(locale, "Public") },
          ]}
        />
      );
    case "UiTabs":
      return <TabsAccordionsTemplatePreview/>;
    case "UiAccordion":
      return <TabsAccordionsTemplatePreview/>;
    case "UiPagination":
      return (
        <UiPagination
          page={page}
          pageCount={8}
          onPageChange={setPage}
          labels={{
            previous: ct(locale, "Previous"),
            next: ct(locale, "Next"),
            page: (value) => `${ct(locale, "Page")} ${value}`,
          }}
        />
      );
    case "UiRangeSlider":
      return <RangeSlidersTemplatePreview/>;
    case "SpecializedCarousel":
      return (
        <SpecializedCarousel
          accessibilityLabel={ct(locale, "Preview")}
          previousLabel={ct(locale, "Previous")}
          nextLabel={ct(locale, "Next")}
          items={[
            {
              key: "one",
              content: (
                <div
                  className="flex min-h-48 items-end rounded-lg bg-cover bg-center p-5"
                  style={
                    slideImageUrl
                      ? {
                          backgroundImage: `linear-gradient(rgb(0 0 0 / .25),rgb(0 0 0 / .65)),url("${slideImageUrl}")`,
                        }
                      : undefined
                  }
                >
                  <p className="rounded-md bg-surface/85 px-3 py-2 text-sm leading-6">
                    {ct(locale, "Create an item to begin.")}
                  </p>
                </div>
              ),
            },
            {
              key: "two",
              content: (
                <div
                  className="flex min-h-48 items-end rounded-lg bg-cover bg-center p-5"
                  style={
                    slideImageUrl
                      ? {
                          backgroundImage: `linear-gradient(rgb(0 0 0 / .25),rgb(0 0 0 / .65)),url("${slideImageUrl}")`,
                        }
                      : undefined
                  }
                >
                  <p className="rounded-md bg-surface/85 px-3 py-2 text-sm leading-6">
                    {ct(locale, "Theme-aware card content.")}
                  </p>
                </div>
              ),
            },
            {
              key: "three",
              content: (
                <div
                  className="flex min-h-48 items-end rounded-lg bg-cover bg-center p-5"
                  style={
                    slideImageUrl
                      ? {
                          backgroundImage: `linear-gradient(rgb(0 0 0 / .25),rgb(0 0 0 / .65)),url("${slideImageUrl}")`,
                        }
                      : undefined
                  }
                >
                  <p className="rounded-md bg-surface/85 px-3 py-2 text-sm leading-6">
                    {ct(locale, "This alert follows the active theme.")}
                  </p>
                </div>
              ),
            },
          ]}
        />
      );
    default:
      return (
        <div className="space-y-4">
          <SpecializedShapeButton>{name}</SpecializedShapeButton>
          <p className="text-sm text-muted">
            {ct(locale, "Theme-aware card content.")}
          </p>
        </div>
      );
  }
}
