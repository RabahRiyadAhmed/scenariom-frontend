import { useState, type ReactNode } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SvgUri } from "react-native-svg";
import { apiUrl, useThemeRuntime } from "@/contexts/theme-runtime-context";
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
import type { ComponentCatalogName } from "@scenariom/design-system/component-catalog";
import {
  SpecializedCarousel,
  SpecializedShapeButton,
} from "@/components/specialized-ui";
import { NineSliceButtonPoc } from "@/components/nine-slice-button-poc";
import { UniformAssetPoc } from "@/components/uniform-asset-poc";
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
const toneKey: Record<(typeof buttonTones)[number], MessageKey> = {
  primary: "componentPreview.primary",
  secondary: "componentPreview.secondary",
  accent: "uiKit.button.accent",
  info: "componentPreview.info",
  success: "componentPreview.success",
  warning: "componentPreview.warning",
  danger: "componentPreview.danger",
  pink: "componentPreview.primary",
  purple: "componentPreview.secondary",
  orange: "componentPreview.warning",
  teal: "componentPreview.info",
};
const tr = (locale: Locale, key: MessageKey) => translate(key, {}, locale);

function PreviewSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <View className="gap-3">
      <Text className="font-semibold text-foreground">{title}</Text>
      {children}
    </View>
  );
}

const customButtonAssets = [
  { file: "btn_circle_aurora-glass_01_01.svg", label: "Aurora glass" },
  { file: "btn_circle_blue-silver_02.svg", label: "Blue silver" },
  { file: "btn_circle_pastel-coral_01.svg", label: "Pastel coral" },
  { file: "btn_square_wax-seal_01_01.svg", label: "Wax seal" },
];

function CustomAssetButton({ file, label }: { file: string; label: string }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      className="active:opacity-80"
    >
      <View className="size-20 items-center justify-center">
        <SvgUri
          width={72}
          height={72}
          uri={`${apiUrl}/assets/custom/button/${file}`}
          style={{ position: "absolute" }}
        />
        <Text
          numberOfLines={2}
          className="z-10 px-2 text-center text-[10px] font-bold text-white"
          style={{
            writingDirection: "ltr",
            textShadowColor: "rgba(0,0,0,0.65)",
            textShadowRadius: 3,
            textShadowOffset: { width: 0, height: 1 },
          }}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

function CustomGradientButton({
  file,
  label,
}: {
  file: string;
  label: string;
}) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  return (
    <View
      className="h-14 w-full overflow-hidden rounded-md"
      onLayout={(event) =>
        setSize({
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height,
        })
      }
    >
      {size.width > 0 && size.height > 0 && (
        <SvgUri
          width={size.width}
          height={size.height}
          preserveAspectRatio="none"
          uri={`${apiUrl}/assets/custom/gradients/${file}`}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      )}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        className="h-14 w-full items-center justify-center"
      >
        <Text className="font-semibold text-white">{label}</Text>
      </Pressable>
    </View>
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
    <View className="flex-row flex-wrap gap-3">
      {buttonTones.slice(0, limit ?? buttonTones.length).map((tone) => (
        <UiButton
          key={`${variant}-${rounded}-${tone}`}
          tone={tone}
          variant={variant}
          rounded={rounded}
        >
          {tr(locale, toneKey[tone])}
        </UiButton>
      ))}
      {variant === "solid" && (
        <>
          <UiButton tone="neutral" variant="ghost">
            {tr(locale, "componentPreview.secondary")}
          </UiButton>
          <UiButton tone="neutral" variant="soft">
            {tr(locale, "componentPreview.secondary")}
          </UiButton>
        </>
      )}
    </View>
  );
}

function GroupButton({
  label,
  active,
  first,
  last,
  onPress,
}: {
  label: string;
  active?: boolean;
  first?: boolean;
  last?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={`min-h-10 items-center justify-center px-4 ${active ? "bg-primary" : "bg-surface"} ${first ? "rounded-s-md" : ""} ${last ? "rounded-e-md" : ""} ${!first ? "border-s border-border" : ""}`}
    >
      <Text
        className={`text-sm font-semibold ${active ? "text-white" : "text-foreground"}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function ButtonPreview({ locale }: { locale: Locale }) {
  return (
    <View className="gap-8">
      <PreviewSection title={tr(locale, "componentPreview.buttons.default")}>
        <ButtonList variant="solid" locale={locale} />
      </PreviewSection>
      <PreviewSection title={tr(locale, "componentPreview.buttons.rounded")}>
        <ButtonList variant="solid" locale={locale} rounded limit={10} />
      </PreviewSection>
      <PreviewSection title={tr(locale, "componentPreview.buttons.outline")}>
        <ButtonList variant="outline" locale={locale} />
      </PreviewSection>
      <PreviewSection
        title={tr(locale, "componentPreview.buttons.outlineRounded")}
      >
        <ButtonList variant="outline" locale={locale} rounded limit={10} />
      </PreviewSection>
      <PreviewSection title={tr(locale, "componentPreview.buttons.soft")}>
        <ButtonList variant="soft" locale={locale} />
      </PreviewSection>
      <PreviewSection
        title={tr(locale, "componentPreview.buttons.softRounded")}
      >
        <ButtonList variant="soft" locale={locale} rounded limit={10} />
      </PreviewSection>
      <PreviewSection title={tr(locale, "componentPreview.buttons.labels")}>
        <View className="gap-4">
          <View className="flex-row flex-wrap gap-3">
            <UiButton tone="success" icon="check">
              {tr(locale, "componentPreview.success")}
            </UiButton>
            <UiButton tone="danger" icon="x">
              {tr(locale, "componentPreview.danger")}
            </UiButton>
            <UiButton tone="info" icon="arrow-right">
              {tr(locale, "componentPreview.info")}
            </UiButton>
            <UiButton tone="warning" icon="warning">
              {tr(locale, "componentPreview.warning")}
            </UiButton>
          </View>
          <View className="flex-row flex-wrap gap-3">
            <UiButton tone="success" rounded icon="check" iconPosition="end">
              {tr(locale, "componentPreview.success")}
            </UiButton>
            <UiButton tone="danger" rounded icon="x" iconPosition="end">
              {tr(locale, "componentPreview.danger")}
            </UiButton>
            <UiButton tone="info" rounded icon="arrow-right" iconPosition="end">
              {tr(locale, "componentPreview.info")}
            </UiButton>
            <UiButton tone="warning" rounded icon="warning" iconPosition="end">
              {tr(locale, "componentPreview.warning")}
            </UiButton>
          </View>
        </View>
      </PreviewSection>
      <PreviewSection title={tr(locale, "componentPreview.buttons.actions")}>
        <View className="gap-5">
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">
              {tr(locale, "componentPreview.buttons.actionButtons")}
            </Text>
            <View className="flex-row flex-wrap gap-3">
              <UiButton tone="primary" onPress={() => undefined} icon="plus">
                {tr(locale, "componentPreview.create")}
              </UiButton>
              <UiButton tone="success" icon="save">
                {tr(locale, "componentPreview.save")}
              </UiButton>
              <UiButton tone="info" icon="send">
                {tr(locale, "componentPreview.send")}
              </UiButton>
              <UiButton tone="danger" icon="trash">
                {tr(locale, "componentPreview.delete")}
              </UiButton>
            </View>
          </View>
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">
              {tr(locale, "componentPreview.buttons.outlinedTools")}
            </Text>
            <View className="flex-row flex-wrap gap-3">
              <UiButton tone="primary" variant="outline" icon="copy">
                {tr(locale, "componentPreview.copy")}
              </UiButton>
              <UiButton tone="success" variant="outline" icon="check">
                {tr(locale, "componentPreview.approve")}
              </UiButton>
              <UiButton tone="danger" variant="outline" icon="x">
                {tr(locale, "componentPreview.reject")}
              </UiButton>
            </View>
          </View>
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">
              {tr(locale, "componentPreview.buttons.loadingStates")}
            </Text>
            <View className="flex-row flex-wrap gap-3">
              <UiButton tone="primary" loading>
                {tr(locale, "componentPreview.loading")}
              </UiButton>
              <UiButton tone="secondary" loading disabled>
                {tr(locale, "componentPreview.saving")}
              </UiButton>
            </View>
          </View>
        </View>
      </PreviewSection>
      <PreviewSection
        title={tr(locale, "componentPreview.buttons.sizesStates")}
      >
        <View className="gap-5">
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">
              {tr(locale, "componentPreview.buttons.sizes")}
            </Text>
            <View className="flex-row flex-wrap items-center gap-3">
              <UiButton tone="pink" size="lg">
                {tr(locale, "componentPreview.primary")}
              </UiButton>
              <UiButton tone="primary">
                {tr(locale, "componentPreview.default")}
              </UiButton>
              <UiButton tone="info" size="sm">
                {tr(locale, "componentPreview.secondary")}
              </UiButton>
            </View>
          </View>
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">
              {tr(locale, "componentPreview.buttons.disabled")}
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {(["primary", "success", "info", "warning"] as const).map(
                (tone) => (
                  <UiButton key={tone} tone={tone} disabled>
                    {tr(locale, toneKey[tone])}
                  </UiButton>
                ),
              )}
            </View>
          </View>
        </View>
      </PreviewSection>
      <PreviewSection title={tr(locale, "componentPreview.buttons.icons")}>
        <View className="gap-4">
          <View className="flex-row flex-wrap gap-3">
            {(["success", "danger", "info", "warning", "purple"] as const).map(
              (tone) => (
                <UiIconButton
                  key={tone}
                  tone={tone}
                  variant="outline"
                  accessibilityLabel={`${tone} action`}
                  icon="star"
                />
              ),
            )}
          </View>
          <View className="flex-row flex-wrap gap-3">
            <UiButton tone="success" icon="heart">
              {tr(locale, "componentPreview.approve")}
            </UiButton>
            <UiButton tone="secondary" icon="share">
              {tr(locale, "componentPreview.copy")}
            </UiButton>
            <UiButton tone="info" icon="upload">
              {tr(locale, "componentPreview.send")}
            </UiButton>
            <UiButton tone="warning">
              {tr(locale, "componentPreview.warning")}
            </UiButton>
          </View>
        </View>
      </PreviewSection>
      <PreviewSection title={tr(locale, "componentPreview.buttons.group")}>
        <View className="gap-4">
          <View className="flex-row overflow-hidden rounded-md border border-border">
            {[
              tr(locale, "componentPreview.previous"),
              tr(locale, "componentPreview.section"),
              tr(locale, "componentPreview.next"),
            ].map((label, index, arr) => (
              <GroupButton
                key={label}
                label={label}
                first={index === 0}
                last={index === arr.length - 1}
              />
            ))}
          </View>
          <View className="flex-row overflow-hidden rounded-md border border-border">
            {["1", "2", "3", "4"].map((label, index, arr) => (
              <GroupButton
                key={label}
                label={label}
                active={label === "2"}
                first={index === 0}
                last={index === arr.length - 1}
              />
            ))}
            <GroupButton
              label={`${tr(locale, "componentPreview.next")} ⌄`}
              last
            />
          </View>
        </View>
      </PreviewSection>
      <PreviewSection title={tr(locale, "componentPreview.buttons.block")}>
        <View className="gap-3">
          <UiButton tone="primary" fullWidth>
            {tr(locale, "componentPreview.primary")}
          </UiButton>
          <UiButton tone="pink" fullWidth>
            {tr(locale, "componentPreview.primary")}
          </UiButton>
          <UiButton tone="success" fullWidth>
            {tr(locale, "componentPreview.success")}
          </UiButton>
          <UiButton tone="danger" fullWidth disabled icon="trash">
            {tr(locale, "componentPreview.delete")}
          </UiButton>
        </View>
      </PreviewSection>
      <PreviewSection title={tr(locale, "componentPreview.buttons.assets")}>
        <View className="gap-4">
          <View className="flex-row flex-wrap gap-4">
            {customButtonAssets.map((asset) => (
              <CustomAssetButton
                key={asset.file}
                file={asset.file}
                label={tr(locale, "componentPreview.buttons.assets")}
              />
            ))}
          </View>
          <CustomGradientButton
            file="gr_forest-canopy_01.svg"
            label={tr(locale, "componentPreview.primary")}
          />
        </View>
      </PreviewSection>
      <PreviewSection title={tr(locale, "componentPreview.buttons.assets")}>
        <NineSliceButtonPoc />
      </PreviewSection>
    </View>
  );
}

const nativeTemplateImages=[require('@/assets/images/template-assets/small/img-1.jpg'),require('@/assets/images/template-assets/small/img-2.jpg'),require('@/assets/images/template-assets/small/img-3.jpg'),require('@/assets/images/template-assets/small/img-4.jpg'),require('@/assets/images/template-assets/small/img-5.jpg'),require('@/assets/images/template-assets/small/img-6.jpg'),require('@/assets/images/template-assets/small/img-7.jpg')].map(item=>Image.resolveAssetSource(item).uri);
const nativeUsers=[require('@/assets/images/template-assets/users/user-2.jpg'),require('@/assets/images/template-assets/users/user-3.jpg'),require('@/assets/images/template-assets/users/user-4.jpg'),require('@/assets/images/template-assets/users/user-5.jpg'),require('@/assets/images/template-assets/users/user-6.jpg'),require('@/assets/images/template-assets/users/user-7.jpg'),require('@/assets/images/template-assets/users/user-8.jpg')].map(item=>Image.resolveAssetSource(item).uri);
const nativeMarket=[require('@/assets/images/market-assets/furniture/banner/3.jpg'),require('@/assets/images/market-assets/furniture/banner/4.jpg')];
const nativePreviewTones=['primary','success','info','warning','danger','purple','pink','orange','teal'] as const;
const nativeDemoCopy='Some quick example text to build on the card title and make up the bulk of the card content.';
function NativeDemoCard({index=0,tone,variant='default',image=true,title='Card title'}:{index?:number;tone?:typeof nativePreviewTones[number];variant?:'default'|'solid'|'outline';image?:boolean;title?:string}){return <UiCard tone={tone} variant={variant}>{image&&<Image source={{uri:nativeTemplateImages[index%7]}} className="h-36 w-full" resizeMode="cover"/>}<UiCardHeader>{title}</UiCardHeader><UiCardBody><Text className="text-sm leading-6 text-muted">{nativeDemoCopy}</Text><UiButton size="sm">Button</UiButton></UiCardBody><UiCardFooter>Last updated 3 mins ago</UiCardFooter></UiCard>}
function NativeSection({title,children}:{title?:string;children:ReactNode}){return <View className="gap-4">{title&&<Text className="font-semibold text-foreground">{title}</Text>}<View className="gap-5">{children}</View></View>}
function CardsTemplatePreview(){return <View className="gap-8"><NativeSection>{Array.from({length:4},(_,i)=><NativeDemoCard key={`top-${i}`} index={i}/>)}</NativeSection><NativeSection>{Array.from({length:2},(_,i)=><NativeDemoCard key={`special2-${i}`} image={false} title="Special title treatment"/>)}</NativeSection><NativeSection>{Array.from({length:3},(_,i)=><NativeDemoCard key={`special3-${i}`} image={false} title="Special title treatment"/>)}</NativeSection><NativeSection>{['Featured','Quote','Featured'].map((title,i)=><NativeDemoCard key={`featured-${i}`} image={false} title={title}/>)}</NativeSection><NativeSection title="Image caps">{Array.from({length:3},(_,i)=><NativeDemoCard key={`caps-${i}`} index={i+4}/>)}</NativeSection><NativeSection>{nativePreviewTones.map(tone=><NativeDemoCard key={tone} tone={tone} variant="solid" image={false}/>)}</NativeSection><NativeSection>{nativePreviewTones.slice(0,3).map(tone=><NativeDemoCard key={`text-${tone}`} tone={tone} image={false} title={`${tone} card title`}/>)}</NativeSection><NativeSection title="Card Group">{Array.from({length:3},(_,i)=><NativeDemoCard key={`group-${i}`} index={i}/>)}</NativeSection><NativeSection title="Navigation">{Array.from({length:2},(_,i)=><NativeDemoCard key={`nav-${i}`} image={false} title={i?'Pills navigation':'Tabs navigation'}/>)}</NativeSection><NativeSection title="Horizontal Card">{Array.from({length:2},(_,i)=><NativeDemoCard key={`horizontal-${i}`} index={i+1}/>)}</NativeSection><NativeSection title="Card styles">{nativePreviewTones.slice(0,3).flatMap(tone=>(['solid','outline'] as const).map(variant=><NativeDemoCard key={`${tone}-${variant}`} tone={tone} variant={variant} image={false}/>))}</NativeSection><NativeSection title="Grid Cards">{Array.from({length:6},(_,i)=><NativeDemoCard key={`grid-${i}`} index={i} image={i%3!==1}/>)}</NativeSection></View>}
function AvatarsTemplatePreview(){const sizes=['xs','sm','md','lg','xl'] as const;const labelled=(label:string,node:ReactNode)=><View className="items-center gap-2">{node}<Text className="text-xs text-muted">{label}</Text></View>;return <View className="gap-6"><UiCard><UiCardHeader>Sizing - Images</UiCardHeader><UiCardBody><View className="flex-row flex-wrap items-end gap-6">{sizes.map((size,i)=>labelled(`size=\"${size}\"`,<UiAvatar key={`image-${i}`} name={`User ${i+2}`} imageUrl={nativeUsers[i]} size={size}/>))}</View></UiCardBody></UiCard><UiCard><UiCardHeader>Rounded circle</UiCardHeader><UiCardBody><View className="flex-row flex-wrap items-end gap-6">{(['md','lg','xl'] as const).map((size,i)=>labelled(`size=\"${size}\" circle`,<UiAvatar key={`circle-${i}`} name="Profile user" imageUrl={nativeUsers[1]} size={size} shape="circle"/>))}</View></UiCardBody></UiCard><UiCard><UiCardHeader>Sizing - Background color</UiCardHeader><UiCardBody><View className="flex-row flex-wrap items-end gap-6">{sizes.map((size,i)=>labelled(`size=\"${size}\"`,<UiAvatar key={`initial-${i}`} name={['Extra Small','Small Medium','Medium Demo','Large Demo','Extra Large'][i]} size={size}/>))}</View></UiCardBody></UiCard><UiCard><UiCardHeader>Rounded circle background</UiCardHeader><UiCardBody><View className="flex-row flex-wrap items-end gap-6">{(['md','lg','xl'] as const).map((size,i)=>labelled(`size=\"${size}\" circle`,<UiAvatar key={`initial-circle-${i}`} name={['Medium Demo','Large Demo','Extra Large'][i]} size={size} shape="circle"/>))}</View></UiCardBody></UiCard><UiCard><UiCardHeader>Image shapes</UiCardHeader><UiCardBody><View className="gap-5"><View><Image source={nativeMarket[0]} className="h-40 w-full rounded-lg" resizeMode="cover"/><Text className="mt-2 text-xs text-muted">Image fills its fixed container</Text></View><View className="flex-row flex-wrap items-end gap-6">{labelled('shape="rounded"',<UiAvatar name="Rounded avatar" imageUrl={nativeUsers[3]} size="lg"/>)}{labelled('shape="circle"',<UiAvatar name="Circle avatar" imageUrl={nativeUsers[5]} size="lg" shape="circle"/>)}</View><View><Image source={nativeMarket[1]} className="h-40 w-full rounded-lg border-4 border-surface" resizeMode="cover"/><Text className="mt-2 text-xs text-muted">Thumbnail constrained by its container</Text></View>{labelled('thumbnail circle',<UiAvatar name="Circle thumbnail" imageUrl={nativeUsers[6]} size="lg" shape="circle" thumbnail/>)}</View></UiCardBody></UiCard></View>}
function BadgeTemplatePreview(){const tones=['primary','secondary','accent','success','info','warning','danger','pink','purple','orange','teal','neutral'] as const;const scripts=['English','العربية','日本語','한국어','Русский'];return <View className="gap-6">{(['solid','soft','outline'] as const).map(variant=><UiCard key={variant}><UiCardHeader>{variant[0].toUpperCase()+variant.slice(1)} badges</UiCardHeader><UiCardBody><View className="flex-row flex-wrap items-center gap-3">{tones.map(tone=><UiBadge key={tone} tone={tone} variant={variant} size="md">{tone}</UiBadge>)}</View></UiCardBody></UiCard>)}<UiCard><UiCardHeader>Sizes and strength</UiCardHeader><UiCardBody><View className="flex-row flex-wrap items-center gap-3"><UiBadge size="sm" variant="soft">Low · sm</UiBadge><UiBadge size="md">Medium · md</UiBadge><UiBadge size="lg" tone="danger">Strong · lg</UiBadge><UiBadge pill tone="success">Pill status</UiBadge></View></UiCardBody></UiCard><UiCard><UiCardHeader>Fonts and scripts</UiCardHeader><UiCardBody><View className="flex-row flex-wrap gap-3">{scripts.map((value,i)=><UiBadge key={value} tone={tones[i]} variant="soft" size="lg">{value}</UiBadge>)}</View></UiCardBody></UiCard></View>}
function AvatarLaboratoryNative(){
  const sizes=['xs','sm','md','lg','xl'] as const;
  const names=['Extra small','Small','Medium','Large','Extra large'];
  const row=(circle:boolean,images:boolean)=><View className="flex-row flex-wrap items-end gap-5">{sizes.map((size,index)=><View key={`${circle}-${images}-${size}`} className="items-center gap-2"><UiAvatar name={names[index]} imageUrl={images?nativeUsers[index]:undefined} size={size} shape={circle?'circle':'rounded'}/><Text className="text-xs text-muted">{size} · {circle?'circle':'rounded'}</Text></View>)}</View>;
  return <View className="gap-6"><UiCard><UiCardHeader>Image avatars · five exact sizes</UiCardHeader><UiCardBody>{row(false,true)}</UiCardBody></UiCard><UiCard><UiCardHeader>Circle image avatars</UiCardHeader><UiCardBody>{row(true,true)}</UiCardBody></UiCard><UiCard><UiCardHeader>Initials · rounded and circle</UiCardHeader><UiCardBody><View className="gap-6">{row(false,false)}{row(true,false)}</View></UiCardBody></UiCard><UiCard><UiCardHeader>Container image behavior</UiCardHeader><UiCardBody><View className="gap-5"><View><Image source={nativeMarket[0]} className="h-44 w-full rounded-lg" resizeMode="cover"/><Text className="mt-2 text-xs text-muted">cover · fills the fixed container</Text></View><View><Image source={nativeMarket[1]} className="h-44 w-full rounded-lg border-4 border-primary" resizeMode="contain"/><Text className="mt-2 text-xs text-muted">contain · preserves the whole image</Text></View><View className="flex-row gap-5"><UiAvatar name="Thumbnail rounded" imageUrl={nativeUsers[5]} size="xl" thumbnail/><UiAvatar name="Thumbnail circle" imageUrl={nativeUsers[6]} size="xl" shape="circle" thumbnail/></View></View></UiCardBody></UiCard></View>;
}
function BadgeLaboratoryNative(){
  const tones=['primary','secondary','accent','success','info','warning','danger','pink','purple','orange','teal','neutral'] as const;
  const samples=[{lang:'en',text:'Published'},{lang:'fr',text:'Brouillon'},{lang:'ar',text:'قيد الكتابة'},{lang:'zh',text:'已发布'},{lang:'ja',text:'公開済み'},{lang:'ko',text:'게시됨'},{lang:'ru',text:'Опубликовано'},{lang:'tr',text:'Yayınlandı'},{lang:'hy',text:'Հրապարակված'},{lang:'syr',text:'ܦܪܝܣܐ'}];
  const [variant,setVariant]=useState<'solid'|'soft'|'outline'>('solid');
  const [size,setSize]=useState<'sm'|'md'|'lg'>('md');
  const [script,setScript]=useState(0);
  const [font,setFont]=useState('sans');
  const fontFamily=font==='serif'?'serif':font==='mono'?'monospace':undefined;
  return <View className="gap-6"><UiCard><UiCardHeader>Interactive badge laboratory</UiCardHeader><UiCardBody><View className="gap-4"><UiSelect label="Language / script" value={String(script)} options={samples.map((item,index)=>({value:String(index),label:`${item.lang.toUpperCase()} · ${item.text}`}))} onValueChange={value=>setScript(Number(value))}/><UiSelect label="Font family" value={font} options={[{value:'sans',label:'Sans-serif'},{value:'serif',label:'Serif'},{value:'mono',label:'Monospace'}]} onValueChange={setFont}/><UiSelect label="Variant" value={variant} options={['solid','soft','outline'].map(value=>({value,label:value}))} onValueChange={value=>setVariant(value as typeof variant)}/><UiSelect label="Size" value={size} options={['sm','md','lg'].map(value=>({value,label:value}))} onValueChange={value=>setSize(value as typeof size)}/><View className="flex-row flex-wrap gap-3">{tones.map(tone=><UiBadge key={tone} tone={tone} variant={variant} size={size}><Text style={{fontFamily}}>{samples[script].text} · {tone}</Text></UiBadge>)}</View></View></UiCardBody></UiCard>{(['solid','soft','outline'] as const).map(item=><UiCard key={item}><UiCardHeader>{item[0].toUpperCase()+item.slice(1)} · all tones</UiCardHeader><UiCardBody><View className="flex-row flex-wrap gap-3">{tones.map(tone=><UiBadge key={tone} tone={tone} variant={item} size="md">{tone}</UiBadge>)}</View></UiCardBody></UiCard>)}<UiCard><UiCardHeader>Sizes, pills and overflow</UiCardHeader><UiCardBody><View className="flex-row flex-wrap items-center gap-3"><UiBadge size="sm" variant="soft">Low · sm</UiBadge><UiBadge size="md">Medium · md</UiBadge><UiBadge size="lg" tone="danger">Strong · lg</UiBadge><UiBadge pill tone="success">Pill status</UiBadge><UiBadge tone="warning" variant="outline" size="lg">A very long editorial workflow status</UiBadge><UiBadge pill tone="danger" size="lg">99+</UiBadge></View></UiCardBody></UiCard><UiCard><UiCardHeader>Writing systems</UiCardHeader><UiCardBody><View className="flex-row flex-wrap gap-3">{samples.map((item,index)=><UiBadge key={item.lang} tone={tones[index%tones.length]} variant="soft" size="lg"><Text>{item.text}</Text></UiBadge>)}</View></UiCardBody></UiCard></View>;
}
function PortletsTemplatePreview(){const tones=['neutral','primary','success','info','warning','danger','accent','pink','purple','orange','teal','secondary','neutral'] as const;return <View className="gap-6"><View className="gap-5"><UiPortlet>{nativeDemoCopy}</UiPortlet><UiPortlet tone="primary" variant="solid">{nativeDemoCopy}</UiPortlet><UiPortlet tone="success" variant="solid">{nativeDemoCopy}</UiPortlet></View><View className="gap-5">{tones.map((tone,i)=><UiPortlet key={`${tone}-${i}`} tone={tone} variant="header">{nativeDemoCopy}</UiPortlet>)}</View></View>}

export function ComponentPreview({
  name,
  locale = "en",
}: {
  name: ComponentCatalogName;
  locale?: Locale;
}) {
  const { themes, themeSlug } = useThemeRuntime();
  const activeTheme = themes.find((item) => item.slug === themeSlug);
  const slidePath = activeTheme?.extraData?.slideImagePath as
    string | undefined;
  const slideImageUrl = slidePath ? `${apiUrl}${slidePath}` : undefined;
  const [value, setValue] = useState("Example value");
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
      return <AvatarLaboratoryNative/>;
    case "UiBadge":
      return <BadgeLaboratoryNative/>;
    case "UiCard":
      return <CardTemplatePreview/>;
    case "UiImages": return <InertiaTemplatePreview kind="images"/>;
    case "UiPortlet":
      return <PortletsTemplatePreview/>;
    case "UiDivider":
      return <UiDivider label={tr(locale, "componentPreview.section")} />;
    case "UiKbd":
      return (
        <View className="flex-row gap-1">
          <UiKbd>Ctrl</UiKbd>
          <UiKbd>K</UiKbd>
        </View>
      );
    case "UiList":
      return (
        <UiList>
          <UiListItem
            title={tr(locale, "componentPreview.firstItem")}
            description={tr(locale, "componentPreview.listRow")}
          />
          <UiListItem
            title={tr(locale, "componentPreview.secondItem")}
            description={tr(locale, "componentPreview.anotherRow")}
          />
        </UiList>
      );
    case "UiProgress":
      return <ProgressTemplatePreview/>;
    case "UiSkeleton":
      return (
        <View className="w-full gap-3">
          <UiSkeleton height={18} />
          <UiSkeleton width="70%" height={18} />
        </View>
      );
    case "UiSpinner":
      return <UiSpinner label={tr(locale, "componentPreview.loading")} />;
    case "UiStatCard":
      return (
        <UiStatCard
          label={tr(locale, "componentPreview.projects")}
          value="24"
          description={tr(locale, "componentPreview.thisMonth")}
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
          title={tr(locale, "componentPreview.emptyTitle")}
          description={tr(locale, "componentPreview.emptyDescription")}
          action={<UiButton>{tr(locale, "componentPreview.create")}</UiButton>}
        />
      );
    case "UiCheckbox":
      return (
        <UiCheckbox
          label={tr(locale, "componentPreview.enableOption")}
          checked={checked}
          onCheckedChange={setChecked}
        />
      );
    case "UiSwitch":
      return (
        <UiSwitch
          label={tr(locale, "componentPreview.publication")}
          checked={checked}
          onCheckedChange={setChecked}
        />
      );
    case "UiTextField":
      return (
        <UiTextField
          label={tr(locale, "componentPreview.title")}
          value={value}
          onChangeText={setValue}
        />
      );
    case "UiTextarea":
      return (
        <UiTextarea
          label={tr(locale, "componentPreview.description")}
          value={value}
          onChangeText={setValue}
        />
      );
    case "UiPasswordField":
      return (
        <UiPasswordField
          label={tr(locale, "componentPreview.password")}
          value={value}
          onChangeText={setValue}
          showPasswordLabel={tr(locale, "componentPreview.show")}
          hidePasswordLabel={tr(locale, "componentPreview.hide")}
        />
      );
    case "UiSearchField":
      return (
        <UiSearchField
          label={tr(locale, "componentPreview.search")}
          value={value}
          onChangeText={setValue}
          clearLabel={tr(locale, "componentPreview.clear")}
          submitLabel={tr(locale, "componentPreview.search")}
        />
      );
    case "UiSelect":
      return (
        <UiSelect
          label={tr(locale, "componentPreview.status")}
          value={value}
          onValueChange={setValue}
          options={[
            { value: "draft", label: tr(locale, "componentPreview.draft") },
            { value: "ready", label: tr(locale, "componentPreview.ready") },
          ]}
        />
      );
    case "UiRadioGroup":
      return (
        <UiRadioGroup
          label={tr(locale, "componentPreview.visibility")}
          value={value}
          onValueChange={setValue}
          options={[
            { value: "private", label: tr(locale, "componentPreview.private") },
            { value: "public", label: tr(locale, "componentPreview.public") },
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
            previous: tr(locale, "componentPreview.previous"),
            next: tr(locale, "componentPreview.next"),
            page: (value) => `Page ${value}`,
          }}
        />
      );
    case "UiRangeSlider":
      return <RangeSlidersTemplatePreview/>;
    case "SpecializedCarousel":
      return (
        <SpecializedCarousel
          accessibilityLabel={tr(locale, "componentPreview.preview")}
          previousLabel={tr(locale, "componentPreview.previous")}
          nextLabel={tr(locale, "componentPreview.next")}
          items={[
            {
              key: "one",
              content: (
                <View className="relative min-h-48 justify-end overflow-hidden rounded-lg p-5">
                  {slideImageUrl ? <Image source={{ uri: slideImageUrl }} resizeMode="cover" className="absolute inset-0 h-full w-full opacity-55" /> : null}
                  <Text className="rounded-md bg-surface p-3 leading-6 text-foreground">
                    {tr(locale, "componentPreview.emptyDescription")}
                  </Text>
                </View>
              ),
            },
            {
              key: "two",
              content: (
                <View className="relative min-h-48 justify-end overflow-hidden rounded-lg p-5">
                  {slideImageUrl ? <Image source={{ uri: slideImageUrl }} resizeMode="cover" className="absolute inset-0 h-full w-full opacity-55" /> : null}
                  <Text className="rounded-md bg-surface p-3 leading-6 text-foreground">
                    {tr(locale, "componentPreview.cardContent")}
                  </Text>
                </View>
              ),
            },
            {
              key: "three",
              content: (
                <View className="relative min-h-48 justify-end overflow-hidden rounded-lg p-5">
                  {slideImageUrl ? <Image source={{ uri: slideImageUrl }} resizeMode="cover" className="absolute inset-0 h-full w-full opacity-55" /> : null}
                  <Text className="rounded-md bg-surface p-3 leading-6 text-foreground">
                    {tr(locale, "componentPreview.alertBody")}
                  </Text>
                </View>
              ),
            },
          ]}
        />
      );
    default:
      return (
        <View className="items-center gap-4">
          <SpecializedShapeButton>{name}</SpecializedShapeButton>
          <Text className="text-center leading-6 text-muted">
            The dedicated route and theme boundary are active. This advanced
            scenario is ready for platform-specific refinement.
          </Text>
        </View>
      );
  }
}
