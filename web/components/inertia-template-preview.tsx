"use client";
import { useEffect, useState, type ReactNode } from "react";
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
} from "@scenariom/design-system/ui";
import { SpecializedVideo } from "@/components/specialized-ui";
import { UiCropper } from "@/components/ui-cropper";
import { ListGroupsTemplatePreview } from "@/components/list-groups-template-preview";
type Kind = "spinners" | "images" | "carousel" | "lists" | "video";
const imgs = [1, 2, 3, 4].map(
    (n) => `/assets/images/template-assets/small/img-${n}.jpg`,
  ),
  avatar = "/assets/images/template-assets/users/user-1.jpg";
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
        <div className="mt-5">{children}</div>
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
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(
      () => setIndex((v) => (v + 1) % 3),
      [1800, 2600, 3400][index],
    );
    return () => clearInterval(id);
  }, [auto, index]);
  return (
    <div className="relative overflow-hidden rounded-lg bg-black">
      <style>{"@keyframes scenariom-carousel-fade { from { opacity: .15 } to { opacity: 1 } }"}</style>
      <img
        key={index}
        src={imgs[index]}
        alt={`Slide ${index + 1}`}
        className="aspect-video w-full object-cover"
        style={fade ? { animation: "scenariom-carousel-fade 500ms ease-in-out" } : undefined}
      />
      {captions && (
        <div className="absolute inset-x-0 bottom-0 bg-black/60 p-4 text-white">
          <strong>{["First", "Second", "Third"][index]} slide label</strong>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      )}
      {controls && (
        <>
          <button
            aria-label="Previous"
            onClick={() => setIndex((index + 2) % 3)}
            className="absolute start-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white"
          >
            <UiIcon name="chevron-left" />
          </button>
          <button
            aria-label="Next"
            onClick={() => setIndex((index + 1) % 3)}
            className="absolute end-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white"
          >
            <UiIcon name="chevron-right" />
          </button>
        </>
      )}
      {indicators && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`size-2.5 rounded-full ${i === index ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
function Spinners() {
  const sizes = ["xl", "lg", "md", "sm", "xs"] as const;
  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <Demo
          title="Border spinner"
          description="Use border spinners for lightweight loading indicators."
        >
          <div className="flex flex-wrap items-center gap-5">
            <span className="inline-flex flex-col items-center gap-2">
              <UiSpinner className="m-2" />
              <span className="text-xs text-muted">border</span>
            </span>
            <span className="inline-flex flex-col items-center gap-2">
              <UiSpinner className="m-2" variant="ring" />
              <span className="text-xs text-muted">ring</span>
            </span>
          </div>
        </Demo>
        <Demo
          title="Growing spinner"
          description="Use grow spinners for a softer pulse style."
        >
          <UiSpinner className="m-2" variant="grow" />
        </Demo>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Demo
          title="Colors"
          description="Every spinner can use the global template palette."
        >
          <div className="flex flex-wrap gap-4">
            {tones.map((t) => (
              <span key={t} className="grid justify-items-center gap-2">
                <UiSpinner tone={t} />
                <small>{t}</small>
              </span>
            ))}
          </div>
        </Demo>
        <Demo
          title="Color growing spinner"
          description="The same colors are available for grow indicators."
        >
          <div className="flex flex-wrap gap-4">
            {tones.map((t) => (
              <UiSpinner key={t} tone={t} variant="grow" />
            ))}
          </div>
        </Demo>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Demo
          title="Alignment"
          description="Spinners work inside flex layouts, centered areas and inline text."
        >
          <div className="flex justify-center">
            <UiSpinner />
          </div>
        </Demo>
        <Demo
          title="Placement"
          description="Place a spinner at the end of a loading row or async state."
        >
          <div className="flex items-center rounded-md border border-border p-4">
            <strong>Loading customer data...</strong>
            <UiSpinner className="ms-auto" />
          </div>
        </Demo>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Demo
          title="Size"
          description="Use size values to match compact buttons or full section loading."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {sizes.map((s) => (
              <div
                key={s}
                className="flex items-center gap-3 rounded bg-card p-3"
              >
                <UiSpinner size={s} />
                <UiSpinner size={s} variant="grow" tone="secondary" />
                <UiSpinner size={s} variant="dots" tone="success" />
                <small className="ms-auto uppercase">{s}</small>
              </div>
            ))}
          </div>
        </Demo>
        <Demo
          title="Buttons spinner"
          description="Use spinners inside buttons to show an action is processing."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-wrap gap-2">
              <UiButton disabled accessibilityLabel="Loading">
                <UiSpinner size="sm" color="current" />
              </UiButton>
              <UiButton disabled>
                <UiSpinner size="sm" color="current" />
                Loading...
              </UiButton>
            </div>
            <div className="flex flex-wrap gap-2">
              <UiButton disabled tone="success" accessibilityLabel="Loading">
                <UiSpinner size="sm" color="current" variant="grow" />
              </UiButton>
              <UiButton disabled tone="success">
                <UiSpinner size="sm" color="current" variant="grow" />
                Loading...
              </UiButton>
            </div>
          </div>
        </Demo>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Demo
          title="Dots loader"
          description="A compact loader for table cells, messages or inline fetch states."
        >
          <div className="flex flex-wrap gap-5">
            {tones.slice(0, 6).map((t) => (
              <UiSpinner key={t} tone={t} variant="dots" />
            ))}
          </div>
        </Demo>
        <Demo
          title="Section loader"
          description="A client-style loading wrapper for cards, panels or full-page waiting screens."
        >
          <UiLoaderOverlay>Loading</UiLoaderOverlay>
        </Demo>
      </div>
    </div>
  );
}
function Images() {
  const [crop, setCrop] = useState<string | null>(null);
  const figure = (src: string, caption: string, ratio: string) => (
    <figure>
      <img
        src={src}
        alt={caption}
        className={`w-full rounded-lg object-cover ${ratio}`}
      />
      <figcaption className="mt-2 text-sm text-muted">{caption}</figcaption>
    </figure>
  );
  return (
    <div className="space-y-5">
      <Demo
        title="Images shapes"
        description="Style images with rounded corners, circles and thumbnail frames."
      >
        <div className="grid gap-5 sm:grid-cols-3">
          {figure(imgs[0], "rounded", "aspect-[4/3]")}
          <div className="text-center">
            <UiAvatar
              name="Avatar"
              imageUrl={avatar}
              size="xl"
              shape="circle"
            />
            <p className="mt-2 text-sm text-muted">rounded circle</p>
          </div>
          <figure>
            <img
              src={imgs[2]}
              alt="Thumbnail visual"
              className="aspect-[4/3] w-full rounded border-4 border-surface object-cover outline outline-border"
            />
            <figcaption className="mt-2 text-sm text-muted">
              thumbnail
            </figcaption>
          </figure>
        </div>
      </Demo>
      <div className="grid gap-5 xl:grid-cols-2">
        <Demo
          title="Image sizes"
          description="Use fixed wrappers for product media, avatars and preview cells."
        >
          <div className="flex flex-wrap items-end gap-5">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
              <div key={s}>
                <UiAvatar name="Avatar" imageUrl={avatar} size={s} />
                <p className="text-sm text-muted">avatar {s}</p>
              </div>
            ))}
          </div>
        </Demo>
        <Demo
          title="Object fit"
          description="Switch between cover and contain depending on product or banner needs."
        >
          <div className="grid grid-cols-2 gap-4">
            <div>{figure(imgs[2], "cover", "aspect-[4/3]")}</div>
            <figure>
              <img
                src={imgs[2]}
                className="aspect-[4/3] w-full rounded bg-card object-contain"
              />
              <figcaption className="mt-2 text-sm text-muted">
                contain
              </figcaption>
            </figure>
          </div>
        </Demo>
      </div>
      <Demo
        title="Ratios"
        description="Stable ratios avoid broken layouts when images have different dimensions."
      >
        <div className="grid gap-4 md:grid-cols-4">
          {figure(imgs[1], "square", "aspect-square")}
          {figure(imgs[1], "card 4:3", "aspect-[4/3]")}
          {figure(imgs[1], "video 16:9", "aspect-video")}
          {figure(imgs[1], "banner 21:9", "aspect-[21/9]")}
        </div>
      </Demo>
      <Demo
        title="Figure with actions"
        description="Use figures when an image needs a caption, preview action or download action."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            [imgs[0], "Preview image", "eye"],
            [imgs[2], "Product image", "image"],
            [imgs[1], "Download asset", "download"],
          ].map(([src, label, icon]) => (
            <figure key={label}>
              {figure(src, label, "aspect-[4/3]")}
              <UiButton
                size="sm"
                icon={icon === "image" ? "eye" : (icon as "eye" | "download")}
              >
                {icon === "download"
                  ? "Save"
                  : icon === "image"
                    ? "Select"
                    : "View"}
              </UiButton>
            </figure>
          ))}
        </div>
      </Demo>
      <Demo
        title="Image cropper"
        description="Central crop tool for avatars, products or banners. It exports a PNG preview from the selected crop."
      >
        <UiCropper alt="Crop example" onExport={setCrop} />
        {crop && (
          <div className="mt-5 max-w-xs">
            {figure(crop, "Export preview", "aspect-[4/3]")}
          </div>
        )}
      </Demo>
    </div>
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
      props: { indicators: false, auto: false },
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
    <div className="grid gap-5 lg:grid-cols-2">
      {demos.map((item) => (
        <Demo
          key={item.title}
          title={item.title}
          description={item.description}
        >
          <Carousel {...item.props} />
        </Demo>
      ))}
    </div>
  );
}
function Videos() {
  const ratios = ["21:9", "16:9", "4:3", "1:1"] as const;
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {ratios.map((r) => (
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
    </div>
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
    <div className="grid gap-5 xl:grid-cols-3">
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
        <div className="flex flex-wrap gap-2">
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
        </div>
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
              trailing={<small>3 days ago</small>}
            />
          ))}
        </UiList>
      </Demo>
      <Demo
        title="With badges"
        description="Counters can be placed at the end of a row."
      >
        <UiList>
          {[14, 2, "99+", "16+"].map((n, i) => (
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
              leading={<input type="checkbox" aria-label={x} />}
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
                <span className="flex size-7 items-center justify-center rounded-full bg-card">
                  {n}
                </span>
              }
              trailing={<UiBadge pill>14</UiBadge>}
            />
          ))}
        </UiList>
      </Demo>
    </div>
  );
}
export function InertiaTemplatePreview({ kind }: { kind: Kind }) {
  if (kind === "spinners") return <Spinners />;
  if (kind === "images") return <Images />;
  if (kind === "carousel") return <Carousels />;
  if (kind === "video") return <Videos />;
  return <ListGroupsTemplatePreview />;
}
