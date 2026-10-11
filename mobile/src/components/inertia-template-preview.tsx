import { useEffect, useState, type ReactNode } from "react";
import { Animated, Image, Pressable, Text, View, type LayoutChangeEvent } from "react-native";
import {
  UiAvatar,
  UiBadge,
  UiButton,
  UiCard,
  UiCardBody,
  UiCardDescription,
  UiCardTitle,
  UiIcon,
  UiList,
  UiListItem,
  UiLoaderOverlay,
  UiSpinner,
} from "@scenariom/design-system/ui/native";
import { SpecializedImagePicker, SpecializedVideo } from "@/components/specialized-ui";
import type { SpecializedImageAsset } from "@scenariom/design-system/specialized-types";
import { ListGroupsTemplatePreview } from "@/components/list-groups-template-preview";
type Kind = "spinners" | "images" | "carousel" | "lists" | "video";
const sources = [
    require("@/assets/images/template-assets/small/img-1.jpg"),
    require("@/assets/images/template-assets/small/img-2.jpg"),
    require("@/assets/images/template-assets/small/img-3.jpg"),
  ],
  avatar = Image.resolveAssetSource(
    require("@/assets/images/template-assets/users/user-1.jpg"),
  ).uri;
const tones = [
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
function Demo({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <UiCard>
      <UiCardBody>
        <UiCardTitle>{title}</UiCardTitle>
        <UiCardDescription>{description}</UiCardDescription>
        <View className="mt-5">{children}</View>
      </UiCardBody>
    </UiCard>
  );
}
function Carousel({
  controls = true,
  indicators = true,
  captions = false,
  fade = false,
  auto = false,
}: {
  controls?: boolean;
  indicators?: boolean;
  captions?: boolean;
  fade?: boolean;
  auto?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [opacity] = useState(() => new Animated.Value(1));
  const goTo = (next: number) => {
    if (!fade) return setIndex(next);
    Animated.timing(opacity, { toValue: 0.18, duration: 180, useNativeDriver: true }).start(() => {
      setIndex(next);
      Animated.timing(opacity, { toValue: 1, duration: 320, useNativeDriver: true }).start();
    });
  };
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(
      () => goTo((index + 1) % 3),
      [1800, 2600, 3400][index],
    );
    return () => clearInterval(id);
  }, [auto, index]);
  return (
    <View className="relative w-full self-stretch overflow-hidden rounded-lg bg-black" onLayout={event => {
      const nextWidth = Math.round(event.nativeEvent.layout.width);
      if (nextWidth !== width) setWidth(nextWidth);
    }}>
      {width > 0 && <Animated.View style={{ opacity }}><Image
        source={sources[index]}
        resizeMode="cover"
        style={{ width, height: Math.round(width / (16 / 9)) }}
      /></Animated.View>}
      {captions && (
        <View className="absolute inset-x-0 bottom-0 bg-black/60 p-4">
          <Text className="font-semibold text-white">
            {["First", "Second", "Third"][index]} slide label
          </Text>
          <Text className="text-sm text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </View>
      )}
      {controls && (
        <>
          <Pressable
            accessibilityLabel="Previous"
            onPress={() => goTo((index + 2) % 3)}
            className="absolute start-3 top-1/2 size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60"
          >
            <UiIcon name="chevron-left" tintColor="#fff" />
          </Pressable>
          <Pressable
            accessibilityLabel="Next"
            onPress={() => goTo((index + 1) % 3)}
            className="absolute end-3 top-1/2 size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60"
          >
            <UiIcon name="chevron-right" tintColor="#fff" />
          </Pressable>
        </>
      )}
      {indicators && (
        <View className="absolute bottom-3 self-center flex-row gap-2">
          {[0, 1, 2].map((i) => (
            <Pressable
              key={i}
              accessibilityLabel={`Slide ${i + 1}`}
              onPress={() => goTo(i)}
              className={`size-2.5 rounded-full ${i === index ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </View>
      )}
    </View>
  );
}
function Spinners() {
  const sizes = ["xl", "lg", "md", "sm", "xs"] as const;
  return (
    <View className="gap-5">
      <Demo
        title="Border spinner"
        description="Use border spinners for lightweight loading indicators."
      >
        <View className="flex-row flex-wrap items-center gap-5">
          <View className="items-center gap-2">
            <UiSpinner />
            <Text className="text-xs text-muted">border</Text>
          </View>
          <View className="items-center gap-2">
            <UiSpinner variant="ring" />
            <Text className="text-xs text-muted">ring</Text>
          </View>
        </View>
      </Demo>
      <Demo
        title="Growing spinner"
        description="Use grow spinners for a softer pulse style."
      >
        <UiSpinner variant="grow" />
      </Demo>
      <Demo
        title="Colors"
        description="Every spinner can use the global template palette."
      >
        <View className="flex-row flex-wrap gap-4">
          {tones.map((t) => (
            <View key={t} className="items-center gap-2">
              <UiSpinner tone={t} />
              <Text className="text-xs text-muted">{t}</Text>
            </View>
          ))}
        </View>
      </Demo>
      <Demo
        title="Color growing spinner"
        description="The same colors are available for grow indicators."
      >
        <View className="flex-row flex-wrap gap-4">
          {tones.map((t) => (
            <UiSpinner key={t} tone={t} variant="grow" />
          ))}
        </View>
      </Demo>
      <Demo
        title="Alignment"
        description="Spinners work inside flex layouts, centered areas and inline text."
      >
        <View className="items-center">
          <UiSpinner />
        </View>
      </Demo>
      <Demo
        title="Placement"
        description="Place a spinner at the end of a loading row or async state."
      >
        <View className="flex-row items-center rounded-md border border-border p-4">
          <Text className="font-semibold text-foreground">
            Loading customer data...
          </Text>
          <View className="ms-auto">
            <UiSpinner />
          </View>
        </View>
      </Demo>
      <Demo
        title="Size"
        description="Use size values to match compact buttons or full section loading."
      >
        <View className="gap-4">
          {sizes.map((s) => (
            <View
              key={s}
              className="flex-row items-center gap-3 rounded bg-card p-3"
            >
              <UiSpinner size={s} />
              <UiSpinner size={s} variant="grow" tone="secondary" />
              <UiSpinner size={s} variant="dots" tone="success" />
              <Text className="ms-auto text-xs uppercase text-muted">{s}</Text>
            </View>
          ))}
        </View>
      </Demo>
      <Demo
        title="Buttons spinner"
        description="Use spinners inside buttons to show an action is processing."
      >
        <View className="gap-4">
          <View className="flex-row flex-wrap gap-2">
            <UiButton disabled accessibilityLabel="Loading">
              <UiSpinner size="sm" color="current" />
            </UiButton>
            <UiButton disabled>
              <UiSpinner size="sm" color="current" />
              Loading...
            </UiButton>
          </View>
          <View className="flex-row flex-wrap gap-2">
            <UiButton disabled tone="success" accessibilityLabel="Loading">
              <UiSpinner size="sm" color="current" variant="grow" />
            </UiButton>
            <UiButton disabled tone="success">
              <UiSpinner size="sm" color="current" variant="grow" />
              Loading...
            </UiButton>
          </View>
        </View>
      </Demo>
      <Demo
        title="Dots loader"
        description="A compact loader for table cells, messages or inline fetch states."
      >
        <View className="flex-row flex-wrap gap-5">
          {tones.slice(0, 6).map((t) => (
            <UiSpinner key={t} tone={t} variant="dots" />
          ))}
        </View>
      </Demo>
      <Demo
        title="Section loader"
        description="A client-style loading wrapper for cards, panels or full-page waiting screens."
      >
        <UiLoaderOverlay>Loading</UiLoaderOverlay>
      </Demo>
    </View>
  );
}
function Pic({
  source,
  label,
  ratio = 4 / 3,
  fit = "cover",
  thumbnail = false,
}: {
  source: number;
  label: string;
  ratio?: number;
  fit?: "cover" | "contain";
  thumbnail?: boolean;
}) {
  const [containerWidth, setContainerWidth] = useState(0);
  const onLayout = (event: LayoutChangeEvent) => {
    const width = Math.round(event.nativeEvent.layout.width);
    if (width !== containerWidth) setContainerWidth(width);
  };
  return (
    <View className="w-full self-stretch py-1" onLayout={onLayout}>
      {containerWidth > 0 && <View className={`w-full overflow-hidden rounded-lg bg-card ${thumbnail ? "border-4 border-surface" : ""}`}>
        <Image
          source={source}
          resizeMode={fit}
          style={{ width: containerWidth, height: Math.round(containerWidth / ratio) }}
        />
      </View>}
      <Text className="mt-2 text-sm text-muted">{label}</Text>
    </View>
  );
}
function Images() {
  const [crop, setCrop] = useState<SpecializedImageAsset>();
  const [cropAspect, setCropAspect] = useState<[number, number] | undefined>();
  return (
    <View className="gap-5">
      <Demo
        title="Images shapes"
        description="Style images with rounded corners, circles and thumbnail frames."
      >
        <View className="gap-5">
          <Pic source={sources[0]} label="rounded" />
          <View className="items-center">
            <UiAvatar
              name="Avatar"
              imageUrl={avatar}
              size="xl"
              shape="circle"
            />
            <Text className="mt-2 text-sm text-muted">rounded circle</Text>
          </View>
          <Pic source={sources[2]} label="thumbnail" thumbnail />
        </View>
      </Demo>
      <Demo
        title="Image sizes"
        description="Use fixed wrappers for product media, avatars and preview cells."
      >
        <View className="flex-row flex-wrap items-end gap-5">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <View key={s}>
              <UiAvatar name="Avatar" imageUrl={avatar} size={s} />
              <Text className="text-sm text-muted">avatar {s}</Text>
            </View>
          ))}
        </View>
      </Demo>
      <Demo
        title="Object fit"
        description="Switch between cover and contain depending on product or banner needs."
      >
        <View className="gap-4">
          <Pic source={sources[2]} label="cover" />
          <Pic source={sources[2]} label="contain" fit="contain" />
        </View>
      </Demo>
      <Demo
        title="Ratios"
        description="Stable ratios avoid broken layouts when images have different dimensions."
      >
        <View className="gap-4">
          <Pic source={sources[1]} label="square" ratio={1} />
          <Pic source={sources[1]} label="card 4:3" />
          <Pic source={sources[1]} label="video 16:9" ratio={16 / 9} />
          <Pic source={sources[1]} label="banner 21:9" ratio={21 / 9} />
        </View>
      </Demo>
      <Demo
        title="Figure with actions"
        description="Use figures when an image needs a caption, preview action or download action."
      >
        <View className="gap-4">
          {[
            ["Preview image", "eye", "View"],
            ["Product image", "eye", "Select"],
            ["Download asset", "download", "Save"],
          ].map(([label, icon, action], i) => (
            <View key={label}>
              <Pic source={sources[i]} label={label} />
              <UiButton size="sm" icon={icon as "eye" | "download"}>
                {action}
              </UiButton>
            </View>
          ))}
        </View>
      </Demo>
      <Demo
        title="Image cropper"
        description="Central crop tool for avatars, products or banners. It exports a PNG preview from the selected crop."
      >
        <View className="mb-4 gap-2">
          <Text className="text-sm font-semibold text-foreground">Crop format</Text>
          <View className="flex-row flex-wrap gap-2">
            {[undefined, [1, 1], [4, 3], [16, 9], [3, 4], [9, 16]].map(format => {
              const typedFormat = format as [number, number] | undefined;
              const active = typedFormat ? cropAspect?.[0] === typedFormat[0] && cropAspect?.[1] === typedFormat[1] : !cropAspect;
              const label = typedFormat ? typedFormat.join(":") : "Free";
              return <Pressable key={label} onPress={() => setCropAspect(typedFormat)} className={`min-h-10 justify-center rounded-md border px-3 ${active ? "border-primary bg-primary" : "border-border bg-surface"}`}><Text className={`font-semibold ${active ? "text-white" : "text-foreground"}`}>{label}</Text></Pressable>;
            })}
          </View>
          <Text className="text-xs text-muted">Free opens the native editor without a fixed ratio. Choose a format before opening it to lock that ratio.</Text>
        </View>
        <SpecializedImagePicker
          value={crop}
          onChange={setCrop}
          accessibilityLabel="Image cropper"
          chooseLabel="Select image"
          confirmLabel="Confirm crop"
          cancelLabel="Cancel"
          zoomLabel="Zoom"
          aspect={cropAspect}
        />
      </Demo>
    </View>
  );
}
function Carousels() {
  const demos = [
    {
      title: "Slides only",
      description: "Carousel without controls or indicators.",
      props: { controls: false, indicators: false, auto: true },
    },
    {
      title: "With controls",
      description: "Add previous and next controls for manual navigation.",
      props: { indicators: false },
    },
    {
      title: "With indicators",
      description:
        "Indicators show the current slide and let users jump directly.",
      props: {},
    },
    {
      title: "With captions",
      description: "Captions can sit over the image with a readable overlay.",
      props: { captions: true, indicators: false },
    },
    {
      title: "Crossfade",
      description: "Use fade when a softer transition fits the layout better.",
      props: { fade: true, indicators: false, auto: true },
    },
    {
      title: "Individual interval",
      description:
        "Slides can define their own interval while autoplay is active.",
      props: { auto: true, fade: true, captions: true },
    },
  ];
  return (
    <View className="gap-5">
      {demos.map((x) => (
        <Demo key={x.title} title={x.title} description={x.description}>
          <Carousel {...x.props} />
        </Demo>
      ))}
    </View>
  );
}
function Videos() {
  return (
    <View className="gap-5">
      {(["21:9", "16:9", "4:3", "1:1"] as const).map((r) => (
        <Demo
          key={r}
          title={`Responsive embed video ${r}`}
          description={
            r === "21:9"
              ? "Use a wide cinema ratio for hero or banner video."
              : r === "16:9"
                ? "Default video ratio for YouTube, Vimeo and common players."
                : r === "4:3"
                  ? "Use this for older media or presentation-like content."
                  : "Square embeds fit compact dashboards and social previews."
          }
        >
          <SpecializedVideo
            sourceUrl="https://www.youtube.com/embed/jNQXAC9IVRw"
            title="Me at the zoo"
            aspectRatio={r}
          />
        </Demo>
      ))}
    </View>
  );
}
function Lists() {
  const services = [
      "Google Drive",
      "Facebook Messenger",
      "Apple Technology Company",
      "Intercom Support System",
      "Paypal Payment Gateway",
    ],
    basic = (mode?: "active" | "disabled" | "action") => (
      <UiList>
        {services.map((x, i) => (
          <UiListItem
            key={x}
            title={x}
            leading={
              <UiIcon name={i === 0 ? "save" : i === 1 ? "send" : "info"} />
            }
            disabled={mode === "disabled" && i === 0}
            onPress={mode === "action" ? () => {} : undefined}
            trailing={
              mode === "active" && i === 0 ? (
                <UiBadge>Active</UiBadge>
              ) : undefined
            }
          />
        ))}
      </UiList>
    );
  return (
    <View className="gap-5">
      <Demo title="Basic example" description="Grouped service items.">
        {basic()}
      </Demo>
      <Demo
        title="Active items"
        description="The current item is visually marked."
      >
        {basic("active")}
      </Demo>
      <Demo
        title="Disabled items"
        description="Disabled rows cannot be activated."
      >
        {basic("disabled")}
      </Demo>
      <Demo
        title="Links and buttons"
        description="Use action items for clickable menus or settings lists."
      >
        {basic("action")}
      </Demo>
      <Demo
        title="Flush"
        description="Flush lists sit edge-to-edge inside a parent card or panel."
      >
        {basic()}
      </Demo>
      <Demo
        title="Horizontal"
        description="Horizontal groups are useful for compact filters and steps."
      >
        <View className="flex-row flex-wrap gap-2">
          {[
            "Google",
            "Whatsapp",
            "Facebook",
            "Apple",
            "PayPal",
            "Intercom",
          ].map((x) => (
            <UiButton key={x} variant="outline" size="sm">
              {x}
            </UiButton>
          ))}
        </View>
      </Demo>
      <Demo
        title="Contextual classes"
        description="Semantic colors identify different states."
      >
        <UiList>
          {tones.map((t) => (
            <UiListItem
              key={t}
              title={`A simple ${t} list group item`}
              trailing={<UiBadge tone={t}>{t}</UiBadge>}
            />
          ))}
        </UiList>
      </Demo>
      <Demo
        title="Contextual action items"
        description="Semantic rows can also be actionable."
      >
        <UiList>
          {tones.slice(0, 8).map((t) => (
            <UiListItem
              key={t}
              title={`Actionable ${t} item`}
              onPress={() => {}}
              trailing={<UiBadge tone={t}>{t}</UiBadge>}
            />
          ))}
        </UiList>
      </Demo>
      <Demo
        title="Custom content"
        description="Rows accept headings, body copy and metadata."
      >
        <UiList>
          {[0, 1, 2].map((i) => (
            <UiListItem
              key={i}
              title="List group item heading"
              description="Donec id elit non mi porta gravida at eget metus."
              trailing={<Text className="text-xs text-muted">3 days ago</Text>}
            />
          ))}
        </UiList>
      </Demo>
      <Demo
        title="With badges"
        description="Counters can be placed at the end of a row."
      >
        <UiList>
          {["14", "2", "99+", "16+"].map((n, i) => (
            <UiListItem
              key={i}
              title={
                [
                  "Gmail Emails",
                  "Pending Payments",
                  "Action Needed",
                  "Messages",
                ][i]
              }
              trailing={
                <UiBadge
                  pill
                  tone={i === 2 ? "danger" : i === 3 ? "warning" : "success"}
                >
                  {n}
                </UiBadge>
              }
            />
          ))}
        </UiList>
      </Demo>
      <Demo
        title="Checkboxes and radios"
        description="Selection controls can lead each item."
      >
        <UiList>
          {[
            "First checkbox",
            "Second checkbox",
            "Third checkbox",
            "Fourth checkbox",
          ].map((x) => (
            <UiListItem
              key={x}
              title={x}
              leading={<View className="size-5 rounded border border-border" />}
            />
          ))}
        </UiList>
      </Demo>
      <Demo
        title="Numbered List"
        description="Ordered content can include counters."
      >
        <UiList>
          {[1, 2, 3].map((n) => (
            <UiListItem
              key={n}
              title="Subheading"
              description="Cras justo odio"
              leading={
                <View className="size-7 items-center justify-center rounded-full bg-card">
                  <Text className="text-foreground">{n}</Text>
                </View>
              }
              trailing={<UiBadge pill>14</UiBadge>}
            />
          ))}
        </UiList>
      </Demo>
    </View>
  );
}
export function InertiaTemplatePreview({ kind }: { kind: Kind }) {
  if (kind === "spinners") return <Spinners />;
  if (kind === "images") return <Images />;
  if (kind === "carousel") return <Carousels />;
  if (kind === "video") return <Videos />;
  return <ListGroupsTemplatePreview />;
}
