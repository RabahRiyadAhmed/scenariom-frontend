"use client";

import { Children, cloneElement, isValidElement, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import type {
  UiAccordionProps,
  UiAlertProps,
  UiAvatarProps,
  UiBadgeProps,
  UiBreadcrumbProps,
  UiButtonProps,
  UiCardProps,
  UiCheckboxProps,
  UiCollapseProps,
  UiDropdownMenuProps,
  UiEmptyStateProps,
  UiFormFieldProps,
  UiIconButtonProps,
  UiListItemProps,
  UiListProps,
  UiModalProps,
  UiPageHeaderProps,
  UiPaginationProps,
  UiPasswordFieldProps,
  UiPopoverProps,
  UiProgressProps,
  UiRadioGroupProps,
  UiRibbonProps,
  UiSearchFieldProps,
  UiSectionProps,
  UiSelectProps,
  UiSheetProps,
  UiSkeletonProps,
  UiSpinnerProps,
  UiLoaderOverlayProps,
  UiStatCardProps,
  UiSwitchProps,
  UiTabsProps,
  UiTextareaProps,
  UiTextFieldProps,
  UiToastProps,
  UiToastViewportProps,
  UiTone,
  UiTooltipProps,
  UiVariant,
} from "./types";
export type * from "./types";
export * from "./advanced.web";
export * from "./structures.web";
export * from "./business.web";
export * from "./icons.web";
import { UiIcon } from "./icons.web";

const toneVariables: Record<UiTone, string> = {
  primary: "var(--sc-primary)",
  secondary: "var(--sc-secondary)",
  accent: "var(--sc-accent)",
  info: "var(--sc-info)",
  success: "var(--sc-success)",
  warning: "var(--sc-warning)",
  danger: "var(--sc-danger)",
  pink: "var(--sc-pink)",
  purple: "var(--sc-purple)",
  orange: "var(--sc-orange)",
  teal: "var(--sc-teal)",
  neutral: "var(--sc-muted)",
};
const toneHoverVariables: Record<UiTone, string> = {
  primary: "var(--sc-primary-hover)",
  secondary: "var(--sc-secondary-hover)",
  accent: "var(--sc-accent-hover)",
  info: "var(--sc-info-hover)",
  success: "var(--sc-success-hover)",
  warning: "var(--sc-warning-hover)",
  danger: "var(--sc-danger-hover)",
  pink: "var(--sc-pink-hover)",
  purple: "var(--sc-purple-hover)",
  orange: "var(--sc-orange-hover)",
  teal: "var(--sc-teal-hover)",
  neutral: "var(--sc-neutral-hover)",
};
const toneForeground: Record<UiTone, string> = {
  primary: "var(--sc-primary-fg, #fff)",
  secondary: "var(--sc-secondary-fg, #fff)",
  accent: "var(--sc-accent-fg, #fff)",
  info: "var(--sc-info-fg, #fff)",
  success: "var(--sc-success-fg, #fff)",
  warning: "var(--sc-warning-fg, #fff)",
  danger: "var(--sc-danger-fg, #fff)",
  pink: "var(--sc-pink-fg, #fff)",
  purple: "var(--sc-purple-fg, #fff)",
  orange: "var(--sc-orange-fg, #fff)",
  teal: "var(--sc-teal-fg, #fff)",
  neutral: "var(--sc-neutral-fg, #fff)",
};

const buttonColorClass =
  "border [background-color:var(--btn-bg)] [border-color:var(--btn-border)] [color:var(--btn-text)] hover:[background-color:var(--btn-hover-bg)] hover:[border-color:var(--btn-hover-border)] hover:[color:var(--btn-hover-text)]";

type ButtonCssVars = CSSProperties & {
  "--btn-bg": string;
  "--btn-border": string;
  "--btn-text": string;
  "--btn-hover-bg": string;
  "--btn-hover-border": string;
  "--btn-hover-text": string;
};

function buttonStyle(tone: UiTone, variant: UiVariant): ButtonCssVars {
  const color = toneVariables[tone];
  const hover = toneHoverVariables[tone];
  const fg = toneForeground[tone];
  if (variant === "outline") {
    return {
      "--btn-bg": "transparent",
      "--btn-border": color,
      "--btn-text": color,
      "--btn-hover-bg": color,
      "--btn-hover-border": color,
      "--btn-hover-text": fg,
    };
  }
  if (variant === "ghost") {
    return {
      "--btn-bg": "transparent",
      "--btn-border": "transparent",
      "--btn-text": color,
      "--btn-hover-bg": `color-mix(in srgb, ${color} 14%, var(--sc-surface))`,
      "--btn-hover-border": "transparent",
      "--btn-hover-text": color,
    };
  }
  if (variant === "soft") {
    return {
      "--btn-bg": `color-mix(in srgb, ${color} 14%, var(--sc-surface))`,
      "--btn-border": "transparent",
      "--btn-text": color,
      "--btn-hover-bg": color,
      "--btn-hover-border": color,
      "--btn-hover-text": fg,
    };
  }
  return {
    "--btn-bg": color,
    "--btn-border": color,
    "--btn-text": fg,
    "--btn-hover-bg": hover,
    "--btn-hover-border": hover,
    "--btn-hover-text": fg,
  };
}

function variantStyle(tone: UiTone, variant: UiVariant): CSSProperties {
  const color = toneVariables[tone];
  if (variant === "solid")
    return {
      background: color,
      borderColor: color,
      color: toneForeground[tone],
    };
  if (variant === "outline")
    return { background: "transparent", borderColor: color, color };
  if (variant === "ghost")
    return { background: "transparent", borderColor: "transparent", color };
  return {
    background: `color-mix(in srgb, ${color} 14%, var(--sc-surface))`,
    borderColor: "transparent",
    color,
  };
}

export function UiButton({
  children,
  tone = "primary",
  variant = "solid",
  size = "md",
  rounded,
  fullWidth,
  loading,
  disabled,
  accessibilityLabel,
  onPress,
  icon: iconName,
  iconPosition = "start",
  className,
}: UiButtonProps) {
  const sizes = {
    sm: "min-h-8 px-3 text-xs",
    md: "min-h-10 px-4 text-sm",
    lg: "min-h-12 px-5 text-base",
  };
  const icon = iconName ? <UiIcon name={iconName} size={size} /> : null;
  const loadingSpinner = loading && (
    <span className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
  );
  return (
    <button
      type="button"
      aria-label={accessibilityLabel}
      disabled={disabled || loading}
      onClick={onPress}
      style={buttonStyle(tone, variant)}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition hover:-translate-y-px hover:shadow-sm active:translate-y-0 active:shadow-none active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:opacity-50 ${buttonColorClass} ${sizes[size]} ${rounded ? "rounded-full" : "rounded-md"} ${fullWidth ? "w-full" : ""} ${className??""}`}
    >
      {loadingSpinner}
      {iconPosition === "start" && icon}
      {children}
      {iconPosition === "end" && icon}
    </button>
  );
}
export function UiCard({
  children,
  tone = "neutral",
  variant = "default",
  interactive,
  onPress,
}: UiCardProps) {
  const className=`overflow-hidden rounded-lg border border-border bg-surface shadow-sm ${interactive?'transition hover:-translate-y-1 hover:shadow-lg':''}`;
  const cardStyle=variant === "default" ? undefined : {...variantStyle(tone, variant),"--ui-card-description":"currentColor"} as CSSProperties;
  if(onPress)return <button type="button" onClick={onPress} style={cardStyle} className={`${className} block w-full text-start`}>{children}</button>;
  return (
    <section
      style={cardStyle}
      className={className}
    >
      {children}
    </section>
  );
}
export function UiCardHeader({ children }: UiSectionProps) {
  return (
    <div className="border-b border-border px-5 py-4 font-semibold">
      {children}
    </div>
  );
}
export function UiCardBody({ children }: UiSectionProps) {
  return <div className="space-y-4 p-5">{children}</div>;
}
export function UiCardFooter({ children }: UiSectionProps) {
  return (
    <div className="border-t border-border px-5 py-3 text-sm text-muted">
      {children}
    </div>
  );
}
export function UiCardTitle({children}:UiSectionProps){return <h3 className="text-lg font-semibold leading-tight">{children}</h3>}
export function UiCardDescription({children}:UiSectionProps){return <p style={{color:'var(--ui-card-description, var(--sc-muted))'}} className="mt-2 text-sm leading-6 opacity-90">{children}</p>}
export function UiCardImage({imageUrl,accessibilityLabel='',ratio='wide',fit='cover',fill=false}:import('./types').UiCardImageProps){const ratios={auto:'',wide:'aspect-video',portrait:'aspect-[3/4]',square:'aspect-square'};return <img src={imageUrl} alt={accessibilityLabel} className={`block w-full ${fill?'h-full min-h-0':ratios[ratio]} ${fit==='contain'?'object-contain':'object-cover'}`}/>}
export function UiCardOverlay({children,align='start'}:import('./types').UiCardOverlayProps){return <div className={`absolute inset-0 flex bg-black/55 p-5 text-white ${align==='center'?'items-center justify-center text-center':align==='end'?'items-end':'items-start'}`}>{children}</div>}
export function UiCardGroup({children}:UiSectionProps){return <div className="grid overflow-hidden rounded-lg border border-border md:grid-cols-3 [&>section]:rounded-none [&>section]:border-0 [&>section]:border-b md:[&>section]:border-b-0 md:[&>section]:border-e">{children}</div>}
export function UiPortlet({
  children,
  title = "Card Title",
  tone = "neutral",
  variant = "default",
}: import("./types").UiPortletProps) {
  const [open, setOpen] = useState(true);
  const [visible, setVisible] = useState(true);
  const [reloading, setReloading] = useState(false);
  if (!visible) return null;
  const decorated = variant !== "default";
  return (
    <section
      style={variant === "solid" ? variantStyle(tone, "solid") : undefined}
      className="relative overflow-hidden rounded-lg border border-border bg-surface shadow-sm"
    >
      {reloading && <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface/90"><div className="flex size-12 items-center justify-center rounded-full border border-border bg-surface shadow-sm"><UiSpinner size="md" label=""/></div></div>}
      <header
        style={variant === "header" ? variantStyle(tone, "solid") : undefined}
        className={`flex min-h-12 items-center justify-between gap-3 border-b border-border px-4 ${decorated ? "font-semibold" : ""}`}
      >
        <strong>{title}</strong>
        <span className="flex gap-1">
          <button
            type="button"
            aria-label="Reload"
            onClick={() => {
              setReloading(true);
              setTimeout(() => setReloading(false), 700);
            }}
            className="inline-flex size-7 items-center justify-center rounded text-current opacity-75 hover:bg-black/10 hover:opacity-100 dark:hover:bg-white/10"
          >
            <UiIcon name="refresh" size="md"/>
          </button>
          <button
            type="button"
            aria-label="Collapse"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-7 items-center justify-center rounded text-current opacity-75 hover:bg-black/10 hover:opacity-100 dark:hover:bg-white/10"
          >
            <UiIcon name={open ? "minus" : "plus"} size="md"/>
          </button>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setVisible(false)}
            className="inline-flex size-7 items-center justify-center rounded text-current opacity-75 hover:bg-black/10 hover:opacity-100 dark:hover:bg-white/10"
          >
            <UiIcon name="close" size="md"/>
          </button>
        </span>
      </header>
      {open && <div className="p-5 text-sm leading-6">{children}</div>}
    </section>
  );
}
export function UiBadge({
  children,
  tone = "primary",
  variant = "solid",
  pill,
  size = "sm",
}: UiBadgeProps) {
  const sizes={sm:'px-2.5 py-1 text-xs',md:'px-3 py-1.5 text-sm',lg:'px-3.5 py-2 text-base'};
  return (
    <span
      style={variantStyle(tone, variant)}
      className={`inline-flex items-center border font-semibold leading-none ${sizes[size]} ${pill ? "rounded-full" : "rounded"}`}
    >
      {children}
    </span>
  );
}

export function UiRibbon({label,tone='primary',position='right',variant='label',icon}:UiRibbonProps){
  const background=toneVariables[tone],color=toneForeground[tone];
  if(variant==='corner')return <div className={`pointer-events-none absolute top-0 h-24 w-24 overflow-hidden ${position==='left'?'left-0':'right-0'}`}><div className={`absolute top-4 w-32 py-1 text-center text-xs font-semibold shadow-md ${position==='left'?'-left-9 -rotate-45':'-right-9 rotate-45'}`} style={{background,color}}>{label}</div></div>;
  return <div className={`absolute top-4 inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold shadow-sm ${position==='left'?'left-0 rounded-e-md':'right-0 rounded-s-md'}`} style={{background,color}}>{icon??<UiIcon name="bell" size="sm"/>}{label}</div>;
}
export function UiAlert({
  children,
  title,
  tone = "primary",
  variant = "soft",
  dismissible,
  dismissLabel,
  onDismiss,
}: UiAlertProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div
      role="alert"
      style={variantStyle(tone, variant)}
      className="flex gap-3 rounded-md border p-4 text-sm"
    >
      <div className="min-w-0 flex-1">
        {title && <p className="font-semibold">{title}</p>}
        <div className={title ? "mt-1" : ""}>{children}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          aria-label={dismissLabel}
          onClick={() => {
            setVisible(false);
            onDismiss?.();
          }}
          className="self-start px-1 text-lg"
        >
          ×
        </button>
      )}
    </div>
  );
}
export function UiTextField({
  label,
  value,
  onChangeText,
  placeholder,
  description,
  error,
  secureTextEntry,
  disabled,
  inputMode = "text",
}: UiTextFieldProps) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        placeholder={placeholder}
        type={secureTextEntry ? "password" : "text"}
        inputMode={inputMode}
        disabled={disabled}
        className={`mt-2 min-h-11 w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 ${error ? "border-danger focus:ring-danger/20" : "border-border focus:border-primary focus:ring-primary/20"}`}
      />
      {error ? (
        <span className="mt-1.5 block text-xs text-danger">{error}</span>
      ) : description ? (
        <span className="mt-1.5 block text-xs text-muted">{description}</span>
      ) : null}
    </label>
  );
}
export function UiCheckbox({
  label,
  checked,
  onCheckedChange,
  disabled,
  description,
  tone = "primary",
  shape = "square",
}: UiCheckboxProps) {
  return (
    <label
      className={`flex items-start gap-3 text-sm ${disabled ? "opacity-50" : ""}`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onCheckedChange(e.target.checked)}
        style={{ accentColor: toneVariables[tone] }}
        className={`mt-0.5 size-4 ${shape === "circle" ? "rounded-full" : "rounded"}`}
      />
      <span>
        <span className="font-medium">{label}</span>
        {description && (
          <span className="mt-0.5 block text-xs text-muted">{description}</span>
        )}
      </span>
    </label>
  );
}
export function UiSwitch({
  label,
  checked,
  onCheckedChange,
  disabled,
  description,
}: UiSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={`flex w-full items-center justify-between gap-4 text-start text-sm ${disabled ? "opacity-50" : ""}`}
    >
      <span>
        <span className="font-medium">{label}</span>
        {description && (
          <span className="mt-0.5 block text-xs text-muted">{description}</span>
        )}
      </span>
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? "bg-primary" : "bg-disabled"}`}
      >
        <span
          className={`absolute start-0 top-0.5 size-5 rounded-full bg-white shadow transition ${checked ? "translate-x-5 rtl:-translate-x-5" : "translate-x-0.5 rtl:-translate-x-0.5"}`}
        />
      </span>
    </button>
  );
}
export function UiProgress({
  value = 0,
  label,
  tone = "primary",
  segments, striped, animated, size="md", vertical, bottom,
}: UiProgressProps) {
  const safe = Math.max(0, Math.min(100, value));
  const heights={xs:'h-1',sm:'h-1.5',md:'h-2',lg:'h-3',xl:'h-4',xxl:'h-6'};
  const bars=segments?.length?segments:[{value:safe,tone}];
  return (
    <div className={vertical?'flex flex-col items-center gap-2':''}>
      {label && (
        <div className="mb-2 flex justify-between text-xs">
          <span>{label}</span>
          <span className="text-muted">{safe}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={safe}
        aria-valuemin={0}
        aria-valuemax={100}
        className={`${vertical?'relative h-32 w-3':'flex w-full '+heights[size]} overflow-hidden rounded-full bg-card`}
      >
        {bars.map((bar,index)=><div key={index} className={`${vertical?'absolute inset-x-0':'h-full'} ${animated?'animate-pulse':''}`} style={{...(vertical?{height:`${Math.min(100,bar.value)}%`,[bottom?'bottom':'top']:0}:{width:`${Math.min(100,bar.value)}%`}),background:toneVariables[bar.tone??tone],backgroundImage:striped?'repeating-linear-gradient(45deg,transparent,transparent 6px,rgba(255,255,255,.25) 6px,rgba(255,255,255,.25) 12px)':undefined}} />)}
      </div>
    </div>
  );
}
export function UiTabs({ items, value, defaultValue, onValueChange, variant='tabs', justified=false, orientation='horizontal' }: UiTabsProps) {
  const [internal,setInternal]=useState(defaultValue??items[0]?.value);
  const selected=value??internal;
  const active = items.find((item) => item.value === selected) ?? items[0];
  const vertical=orientation!=='horizontal';
  const select=(next:string)=>{setInternal(next);onValueChange?.(next)};
  return (
    <div className={vertical?`flex gap-4 ${orientation==='vertical-right'?'flex-row-reverse':''}`:''}>
      <div
        role="tablist"
        className={`${vertical?'flex w-36 shrink-0 flex-col':'flex overflow-x-auto'} gap-1 ${variant==='pills'?'rounded-md bg-card p-1':''}`}
      >
        {items.map((item) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={item.value === active?.value}
            disabled={item.disabled}
            onClick={() => select(item.value)}
            style={item.value===active?.value&&variant==='pills'?variantStyle('primary','solid'):undefined}
            className={`min-h-9 whitespace-nowrap px-3 text-sm font-medium disabled:opacity-50 ${justified?'flex-1':''} ${variant==='bordered'?'border-b-2 rounded-none':variant==='tabs'?'rounded border':'rounded'} ${item.value === active?.value ? (variant==='pills'?"shadow-sm ring-2 ring-primary ring-offset-1":"border-primary bg-card text-primary shadow-sm") : (variant==='bordered'?"border-transparent text-muted":variant==='tabs'?"border-transparent text-muted":"text-muted")}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className={vertical?'min-w-0 flex-1':'pt-4'}>
        {active?.content}
      </div>
    </div>
  );
}
export function UiModal({
  open,
  onClose,
  title,
  closeLabel,
  children,
  footer,
  size='md', position='center', scrollable=false, showClose=true, closeOnOverlayClick=true, tone,
}: UiModalProps) {
  if (!open) return null;
  const sizes={sm:'max-w-sm',md:'max-w-lg',lg:'max-w-2xl',xl:'max-w-4xl',full:'max-w-[calc(100vw-2rem)]'};
  const positions={top:'items-start',bottom:'items-end',center:'items-center',right:'items-stretch justify-end'};
  return (
    <div className={`fixed inset-0 z-[120] flex justify-center p-4 ${positions[position]}`}>
      <button
        type="button"
        aria-label={closeLabel}
        onClick={closeOnOverlayClick?onClose:undefined}
        className="absolute inset-0 bg-black/55"
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative z-10 max-h-[85vh] w-full ${sizes[size]} ${position==='right'?'h-full max-h-full':''} overflow-hidden rounded-lg border border-border bg-surface shadow-2xl`}
        style={tone?variantStyle(tone,'solid'):undefined}
      >
        {(title||showClose)&&<header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-semibold">{title}</h2>
          {showClose&&<button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="text-xl"
          >
            ×
          </button>}
        </header>}
        <div className={`p-5 ${scrollable?'max-h-96 overflow-y-auto':'overflow-auto'}`}>{children}</div>
        {footer && (
          <footer className="flex flex-wrap justify-end gap-2 border-t border-border px-5 py-4">
            {footer}
          </footer>
        )}
      </section>
    </div>
  );
}
export function UiTextarea({
  label,
  value,
  onChangeText,
  placeholder,
  description,
  error,
  disabled,
  rows = 4,
  maxLength,
}: UiTextareaProps) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChangeText(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        className={`mt-2 w-full resize-y rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 ${error ? "border-danger focus:ring-danger/20" : "border-border focus:border-primary focus:ring-primary/20"}`}
      />
      {error ? (
        <span className="mt-1.5 block text-xs text-danger">{error}</span>
      ) : description ? (
        <span className="mt-1.5 block text-xs text-muted">{description}</span>
      ) : null}
    </label>
  );
}
export function UiSelect({
  label,
  value,
  options,
  onValueChange,
  placeholder = "",
  description,
  error,
  disabled,
}: UiSelectProps) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <span className="relative mt-2 block">
        <select
          value={value ?? ""}
          onChange={(event) => onValueChange(event.target.value)}
          disabled={disabled}
          className={`min-h-11 w-full appearance-none rounded-md border bg-background px-3 pe-10 outline-none focus:ring-2 ${error ? "border-danger focus:ring-danger/20" : "border-border focus:border-primary focus:ring-primary/20"}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-muted">
          <UiIcon name="chevron-down" size="sm" />
        </span>
      </span>
      {error ? (
        <span className="mt-1.5 block text-xs text-danger">{error}</span>
      ) : description ? (
        <span className="mt-1.5 block text-xs text-muted">{description}</span>
      ) : null}
    </label>
  );
}
export function UiRadioGroup({
  label,
  value,
  options,
  onValueChange,
  description,
  error,
  disabled,
  tone = "primary",
}: UiRadioGroupProps) {
  return (
    <fieldset disabled={disabled} className="space-y-3">
      <legend className="text-sm font-medium">{label}</legend>
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-start gap-3 text-sm ${option.disabled ? "opacity-50" : ""}`}
        >
          <input
            type="radio"
            checked={value === option.value}
            disabled={option.disabled}
            onChange={() => onValueChange(option.value)}
            style={{ accentColor: toneVariables[option.tone ?? tone] }}
            className="mt-0.5 size-4"
          />
          <span>
            <span className="font-medium">{option.label}</span>
            {option.description && (
              <span className="mt-0.5 block text-xs text-muted">
                {option.description}
              </span>
            )}
          </span>
        </label>
      ))}
      {error ? (
        <p className="text-xs text-danger">{error}</p>
      ) : description ? (
        <p className="text-xs text-muted">{description}</p>
      ) : null}
    </fieldset>
  );
}
export function UiAccordion({
  items,
  multiple = false,
  defaultValue = [],
  variant='default',
}: UiAccordionProps) {
  const initial=Array.isArray(defaultValue)?defaultValue:defaultValue?[defaultValue]:[];
  const [open, setOpen] = useState(initial);
  function toggle(value: string) {
    setOpen((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : multiple
          ? [...current, value]
          : [value],
    );
  }
  return (
    <div className="space-y-1">
      {items.map((item) => {
        const expanded = open.includes(item.value);
        return (
          <section key={item.value} className="overflow-hidden rounded-md border border-border bg-surface shadow-sm">
            <button
              type="button"
              disabled={item.disabled}
              aria-expanded={expanded}
              onClick={() => toggle(item.value)}
              className="flex min-h-12 w-full items-center gap-3 px-4 text-start font-semibold transition hover:bg-card disabled:opacity-50"
            >
              {variant==='default'&&<UiIcon name="info" size="sm"/>}<span className="min-w-0 flex-1">{variant==='question'?'Q. ':''}{item.title}</span>
              <span className={`transition ${expanded?'rotate-180':''}`}><UiIcon name="chevron-down" size="sm"/></span>
            </button>
            {expanded && (
              <div className="border-t border-border px-4 py-4 text-sm text-muted">
                {item.content}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
export function UiCollapse({trigger='Toggle collapse',secondTrigger,children,defaultOpen=true,horizontal=false}:UiCollapseProps){const[open,setOpen]=useState(defaultOpen);return <div><div className="mb-3 flex flex-wrap gap-2"><UiButton onPress={()=>setOpen(!open)}>{trigger}</UiButton>{secondTrigger&&<UiButton onPress={()=>setOpen(!open)}>{secondTrigger}</UiButton>}</div>{open&&<div className={horizontal?'max-w-md':''}><UiCard><UiCardBody>{children}</UiCardBody></UiCard></div>}</div>}
export function UiAvatar({
  name,
  imageUrl,
  size = "md",
  shape = "rounded",
  thumbnail = false,
  fit = "cover",
  accessibilityLabel,
}: UiAvatarProps) {
  const sizes = {
    xs: "size-6 text-[10px]",
    sm: "size-8 text-xs",
    md: "size-10 text-sm",
    lg: "size-16 text-xl",
    xl: "size-24 text-3xl",
  };
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  return (
    <span
      aria-label={accessibilityLabel ?? name}
      role="img"
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden bg-primary font-semibold text-white ${shape==='circle'?'rounded-full':'rounded-md'} ${thumbnail?'border-4 border-surface outline outline-1 outline-border':''} ${sizes[size]}`}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="" className={`size-full ${fit==='contain'?'object-contain':'object-cover'}`} />
      ) : (
        initials
      )}
    </span>
  );
}
export function UiSpinner({
  label,
  size = "md",
  tone = "primary",
  color,
  variant = "border",
  className,
}: UiSpinnerProps) {
  const sizes = {
    xs: "size-3 border-2", sm: "size-4 border-2", md: "size-6 border-2", lg: "size-9 border-[3px]", xl: "size-12 border-4",
  };
  const spinnerColor=color === 'current' ? 'currentColor' : toneVariables[color ?? tone];
  const dimension=sizes[size].split(' ')[0];
  const indicator=variant==='dots'
    ? <span className="inline-flex gap-1">{[0,1,2].map(i=><span key={i} className="size-2 animate-pulse rounded-full" style={{background:spinnerColor,animationDelay:`${i*180}ms`,animationDuration:'1.1s'}}/>)}</span>
    : variant==='grow'
      ? <span className={`${dimension} animate-pulse rounded-full`} style={{background:spinnerColor,animationDuration:'1.1s'}}/>
      : variant==='native'
        ? <span style={{borderTopColor:spinnerColor}} className={`animate-spin rounded-full border-border ${sizes[size]}`}/>
        : variant==='ring'
          ? <span style={{borderTopColor:spinnerColor}} className={`animate-spin rounded-full border-border ${sizes[size]}`}/>
          : <span style={{borderColor:spinnerColor,borderRightColor:'transparent'}} className={`animate-spin rounded-full ${sizes[size]}`}/>;
  return (
    <span role="status" className={`inline-flex items-center gap-2 text-sm text-muted ${className??''}`}>
      {indicator}
      {label}
    </span>
  );
}
export function UiLoaderOverlay({children}:UiLoaderOverlayProps){return <div className="flex min-h-40 items-center justify-center rounded-lg border border-border bg-surface/90"><UiSpinner size="lg" label={typeof children==='string'?children:undefined}/></div>}
export function UiSkeleton({
  width = "100%",
  height = 16,
  rounded = false,
  tone,
  animation = "pulse",
}: UiSkeletonProps) {
  return (
    <span
      aria-hidden
      className={`block ${animation === 'wave' ? 'animate-pulse' : animation === 'glow' ? 'animate-pulse opacity-70' : 'animate-pulse'} ${tone ? '' : 'bg-card'} ${rounded ? "rounded-full" : "rounded"}`}
      style={{ width, height, background: tone ? toneVariables[tone] : undefined, opacity: tone ? 0.32 : undefined }}
    />
  );
}
export { UiDivider } from '../components/ui/divider/divider.web';
export function UiEmptyState({
  title,
  description,
  icon,
  action,
}: UiEmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-border bg-surface px-6 py-10 text-center">
      {icon && <div className="mb-4 text-3xl text-muted">{icon}</div>}
      <h3 className="font-semibold">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-sm leading-6 text-muted">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
export function UiPageHeader({
  title,
  description,
  eyebrow,
  actions,
  children,
}: UiPageHeaderProps) {
  return (
    <header
      data-slot="page-header"
      className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"
    >
      <div className="min-w-0">
        {eyebrow && (
          <p
            data-slot="page-header-eyebrow"
            className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            {eyebrow}
          </p>
        )}
        <h1
          data-slot="page-header-title"
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {title}
        </h1>
        {description && (
          <p
            data-slot="page-header-description"
            className="mt-2 max-w-3xl text-sm leading-6 text-muted"
          >
            {description}
          </p>
        )}
        {children}
      </div>
      {actions && (
        <div
          data-slot="page-header-actions"
          className="flex shrink-0 flex-wrap gap-2"
        >
          {actions}
        </div>
      )}
    </header>
  );
}
export function UiBreadcrumb({
  items,
  accessibilityLabel,
  separator = "/",
}: UiBreadcrumbProps) {
  return (
    <nav data-slot="breadcrumb" aria-label={accessibilityLabel}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {items.map((item, index) => (
          <li
            key={`${item.label}-${index}`}
            className="flex items-center gap-2"
          >
            {index > 0 && <span aria-hidden>{separator}</span>}
            {item.current ? (
              <span aria-current="page" className="font-medium text-foreground">
                {item.label}
              </span>
            ) : (
              <button
                type="button"
                onClick={item.onPress}
                className="rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
export function UiDropdownMenu({
  trigger,
  items,
  onSelect,
  accessibilityLabel,
  closeLabel,
}: UiDropdownMenuProps) {
  const [open, setOpen] = useState(false);
  return (
    <div data-slot="dropdown-menu" className="relative inline-flex">
      <button
        data-slot="dropdown-menu-trigger"
        type="button"
        aria-label={accessibilityLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-10 items-center justify-center rounded-md border border-border bg-surface px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        {trigger}
      </button>
      {open && (
        <>
          <button
            type="button"
            aria-label={closeLabel}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div
            data-slot="dropdown-menu-content"
            role="menu"
            className="absolute end-0 top-full z-50 mt-2 min-w-52 overflow-hidden rounded-md border border-border bg-surface p-1 shadow-xl"
          >
            {items.map((item) => (
              <button
                data-slot="dropdown-menu-item"
                key={item.value}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  onSelect(item.value);
                  setOpen(false);
                }}
                className={`flex min-h-10 w-full items-start gap-3 rounded-sm px-3 py-2 text-start text-sm outline-none hover:bg-card focus-visible:bg-card disabled:opacity-50 ${item.tone === "danger" ? "text-danger" : "text-foreground"}`}
              >
                {item.icon}
                <span>
                  <span className="block font-medium">{item.label}</span>
                  {item.description && (
                    <span className="mt-0.5 block text-xs text-muted">
                      {item.description}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
export function UiPagination({
  page,
  pageCount,
  onPageChange,
  labels,
  siblingCount = 1,
}: UiPaginationProps) {
  if (pageCount <= 1) return null;
  const visible = Array.from(
    { length: pageCount },
    (_, index) => index + 1,
  ).filter(
    (value) =>
      value === 1 ||
      value === pageCount ||
      Math.abs(value - page) <= siblingCount,
  );
  return (
    <nav
      data-slot="pagination"
      aria-label={labels.page(page)}
      className="flex flex-wrap items-center justify-center gap-1"
    >
      <button
        type="button"
        aria-label={labels.previous}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="min-h-10 rounded-md border border-border px-3 text-sm disabled:opacity-50"
      >
        ‹
      </button>
      {visible.map((value, index) => (
        <span key={value} className="contents">
          {index > 0 && value - visible[index - 1] > 1 && (
            <span className="px-1 text-muted">…</span>
          )}
          <button
            type="button"
            aria-label={labels.page(value)}
            aria-current={value === page ? "page" : undefined}
            onClick={() => onPageChange(value)}
            className={`size-10 rounded-md text-sm font-medium ${value === page ? "bg-primary text-white" : "hover:bg-card"}`}
          >
            {value}
          </button>
        </span>
      ))}
      <button
        type="button"
        aria-label={labels.next}
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        className="min-h-10 rounded-md border border-border px-3 text-sm disabled:opacity-50"
      >
        ›
      </button>
    </nav>
  );
}
export function UiStatCard({
  label,
  value,
  description,
  icon,
  trend,
  tone = "primary",
}: UiStatCardProps) {
  return (
    <section
      data-slot="stat-card"
      className="rounded-lg border border-border bg-surface p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted">{label}</p>
          <div className="mt-2 text-2xl font-semibold tracking-tight">
            {value}
          </div>
        </div>
        {icon && (
          <div style={{ color: toneVariables[tone] }} className="text-xl">
            {icon}
          </div>
        )}
      </div>
      {(description || trend) && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
          {trend}
          {description && <span>{description}</span>}
        </div>
      )}
    </section>
  );
}
export function UiList({ children, divided = true }: UiListProps) {
  return (
    <div
      data-slot="list"
      className={`overflow-hidden rounded-lg border border-border bg-surface ${divided ? "divide-y divide-border" : ""}`}
    >
      {children}
    </div>
  );
}
export function UiListItem({
  title,
  description,
  leading,
  trailing,
  onPress,
  disabled,
}: UiListItemProps) {
  const body = (
    <>
      {leading}
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-foreground">{title}</span>
        {description && (
          <span className="mt-1 block text-sm text-muted">{description}</span>
        )}
      </span>
      {trailing}
    </>
  );
  return onPress ? (
    <button
      data-slot="list-item"
      type="button"
      disabled={disabled}
      onClick={onPress}
      className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-start hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/30 disabled:opacity-50"
    >
      {body}
    </button>
  ) : (
    <div
      data-slot="list-item"
      className={`flex min-h-14 items-center gap-3 px-4 py-3 ${disabled ? "opacity-50" : ""}`}
    >
      {body}
    </div>
  );
}
export function UiListGroup({children,variant='default',horizontal=false}:import('./types').UiListGroupProps){const items=Children.toArray(children);return <div className={`${horizontal?'grid grid-flow-col auto-cols-fr':'block'} overflow-hidden border border-border bg-surface ${variant==='default'?'rounded-lg':'rounded-none'}`}>{items.map((item,index)=><div key={index} className={`${horizontal?'min-w-0':'w-full'} ${index<items.length-1?(horizontal?'border-e border-border':'border-b border-border'):''}`}>{item}</div>)}</div>}
export function UiListGroupItem({children,leading,trailing,active,disabled,action,tone}:import('./types').UiListGroupItemProps){const content=<><span className="shrink-0">{leading}</span><span className="min-w-0 flex-1">{children}</span><span className="shrink-0">{trailing}</span></>;const style=tone&&tone!=='neutral'?variantStyle(tone,'soft'):undefined;const classes=`flex min-h-12 items-center gap-3 px-4 py-3 text-sm ${active?'bg-primary text-white':disabled?'cursor-not-allowed opacity-50':action?'cursor-pointer hover:bg-card':''}`;return action?<button type="button" disabled={disabled} style={active?undefined:style} className={`${classes} w-full text-start`}>{content}</button>:<div style={active?undefined:style} className={classes}>{content}</div>}
export function UiIconButton({
  icon: iconName,
  accessibilityLabel,
  onPress,
  disabled,
  loading,
  tone = "primary",
  variant = "ghost",
  size = "md",
  rounded,
}: UiIconButtonProps) {
  const sizes = { sm: "size-8", md: "size-10", lg: "size-12" };
  return (
    <button
      data-slot="icon-button"
      type="button"
      aria-label={accessibilityLabel}
      title={accessibilityLabel}
      disabled={disabled || loading}
      onClick={onPress}
      style={buttonStyle(tone, variant)}
      className={`inline-flex items-center justify-center transition hover:-translate-y-px hover:shadow-sm active:translate-y-0 active:shadow-none active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:opacity-50 ${buttonColorClass} ${sizes[size]} ${rounded ? "rounded-full" : "rounded-md"}`}
    >
      {loading ? (
        <span className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
      ) : (
        <UiIcon name={iconName} size={size} />
      )}
    </button>
  );
}
export function UiSearchField({
  label,
  value,
  onChangeText,
  onSubmit,
  placeholder,
  description,
  disabled,
  clearLabel,
  submitLabel,
}: UiSearchFieldProps) {
  return (
    <form
      data-slot="search-field"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.();
      }}
    >
      <label className="block text-sm font-medium">
        {label}
        <span className="mt-2 flex min-h-11 items-center rounded-md border border-border bg-background focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
          <span aria-hidden className="ps-3 text-muted">
            ⌕
          </span>
          <input
            type="search"
            value={value}
            onChange={(event) => onChangeText(event.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="min-w-0 flex-1 bg-transparent px-3 py-2 outline-none"
          />
          {value && (
            <button
              type="button"
              aria-label={clearLabel}
              onClick={() => onChangeText("")}
              className="self-stretch px-3 text-muted"
            >
              ×
            </button>
          )}
          <button
            type="submit"
            aria-label={submitLabel}
            className="self-stretch border-s border-border px-3 text-primary"
          >
            ↵
          </button>
        </span>
        {description && (
          <span className="mt-1.5 block text-xs text-muted">{description}</span>
        )}
      </label>
    </form>
  );
}
export function UiPasswordField({
  label,
  value,
  onChangeText,
  placeholder,
  description,
  error,
  disabled,
  showPasswordLabel,
  hidePasswordLabel,
}: UiPasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  return (
    <label data-slot="password-field" className="block text-sm font-medium">
      {label}
      <span
        className={`mt-2 flex min-h-11 items-center rounded-md border bg-background focus-within:ring-2 ${error ? "border-danger focus-within:ring-danger/20" : "border-border focus-within:border-primary focus-within:ring-primary/20"}`}
      >
        <input
          value={value}
          onChange={(event) => onChangeText(event.target.value)}
          placeholder={placeholder}
          type={visible ? "text" : "password"}
          disabled={disabled}
          className="min-w-0 flex-1 bg-transparent px-3 py-2 outline-none"
        />
        <button
          type="button"
          aria-label={visible ? hidePasswordLabel : showPasswordLabel}
          onClick={() => setVisible((current) => !current)}
          className="self-stretch px-3 text-muted"
        >
          <UiIcon name={visible ? "eye-off" : "eye"} size="md" />
        </button>
      </span>
      {error ? (
        <span className="mt-1.5 block text-xs text-danger">{error}</span>
      ) : description ? (
        <span className="mt-1.5 block text-xs text-muted">{description}</span>
      ) : null}
    </label>
  );
}
export function UiFormField({
  label,
  children,
  description,
  error,
  required,
}: UiFormFieldProps) {
  return (
    <div data-slot="form-field">
      <div data-slot="form-field-label" className="mb-2 text-sm font-medium">
        {label}
        {required && (
          <span aria-hidden className="ms-1 text-danger">
            *
          </span>
        )}
      </div>
      <div data-slot="form-field-control">{children}</div>
      {error ? (
        <p
          data-slot="form-field-error"
          role="alert"
          className="mt-1.5 text-xs text-danger"
        >
          {error}
        </p>
      ) : description ? (
        <p
          data-slot="form-field-description"
          className="mt-1.5 text-xs text-muted"
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
export { UiKbd } from '../components/ui/kbd/kbd.web';
export function UiSheet({
  open,
  onClose,
  title,
  closeLabel,
  children,
  footer,
  placement = "end",
}: UiSheetProps) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose, open]);
  if (!open) return null;
  const positions = {
    start: "inset-y-0 start-0 h-full w-full max-w-md",
    end: "inset-y-0 end-0 h-full w-full max-w-md",
    top: "inset-x-0 top-0 max-h-[85vh] w-full",
    bottom: "inset-x-0 bottom-0 max-h-[85vh] w-full",
  };
  return (
    <div data-slot="sheet" className="fixed inset-0 z-[130]">
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        className="absolute inset-0 bg-black/55"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`absolute flex flex-col overflow-hidden border border-border bg-surface shadow-2xl ${positions[placement]}`}
      >
        <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
          {title && <h2 className="font-semibold">{title}</h2>}
          <button
            type="button"
            aria-label={closeLabel}
            onClick={onClose}
            className="ms-auto text-xl"
          >
            ×
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto p-5">{children}</div>
        {footer && (
          <footer className="flex flex-wrap justify-end gap-2 border-t border-border px-5 py-4">
            {footer}
          </footer>
        )}
      </aside>
    </div>
  );
}
export function UiToast({
  open,
  onClose,
  title,
  closeLabel,
  children,
  tone = "primary",
  action,
  duration,
  time,
  variant='default',
}: UiToastProps) {
  useEffect(() => {
    if (!open || !duration) return;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [duration, onClose, open]);
  if (!open) return null;
  return (
    <div data-slot="toast" role="status" className={`w-full max-w-sm overflow-hidden rounded-lg border shadow-xl ${variant==='solid'?'border-transparent text-white':variant==='translucent'?'border-border bg-surface/85 backdrop-blur':'border-border bg-surface'}`} style={variant==='solid'?variantStyle(tone,'solid'):undefined}>
      <div className="flex items-center gap-3 border-b border-current/20 px-4 py-3">
        <span
          className="size-2 rounded-full"
          style={{ background: toneVariables[tone] }}
        />
        {title && <strong className="min-w-0 flex-1">{title}</strong>}
        {time&&<small className="text-xs opacity-80">{time}</small>}
        <button
          type="button"
          aria-label={closeLabel}
          onClick={onClose}
          className="ms-auto text-lg"
        >
          ×
        </button>
      </div>
      <div className={`px-4 py-3 text-sm ${variant==='solid'?'text-current':'text-muted'}`}>
        {children}
        {action && <div className="mt-3">{action}</div>}
      </div>
    </div>
  );
}
export function UiToastViewport({children,placement='top-end',scope='screen',className}:UiToastViewportProps){const positions:{[key:string]:string}={'top-start':'items-start justify-start','top-center':'items-start justify-center','top-end':'items-start justify-end','middle-start':'items-center justify-start','middle-center':'items-center justify-center','middle-end':'items-center justify-end','bottom-start':'items-end justify-start','bottom-center':'items-end justify-center','bottom-end':'items-end justify-end'};return <div className={`${scope==='screen'?'fixed inset-0 z-[150] pointer-events-none':'relative min-h-56'} flex p-3 ${positions[placement]} ${className??''}`}><div className="pointer-events-auto flex w-full max-w-sm flex-col gap-3">{children}</div></div>}
export function UiTooltip({
  trigger,
  content,
  accessibilityLabel,
  placement = "top",
}: UiTooltipProps) {
  const [open,setOpen]=useState(false);
  const anchor=useRef<HTMLSpanElement>(null);
  const rect=anchor.current?.getBoundingClientRect();
  const position:CSSProperties|undefined=rect?placement==='top'?{left:rect.left+rect.width/2,top:rect.top-8,transform:'translate(-50%,-100%)'}:placement==='bottom'?{left:rect.left+rect.width/2,top:rect.bottom+8,transform:'translateX(-50%)'}:placement==='left'?{left:rect.left-8,top:rect.top+rect.height/2,transform:'translate(-100%,-50%)'}:{left:rect.right+8,top:rect.top+rect.height/2,transform:'translateY(-50%)'}:undefined;
  return (
    <span
      ref={anchor}
      data-slot="tooltip"
      className="relative inline-flex"
      aria-label={accessibilityLabel}
      onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}
      onFocusCapture={()=>setOpen(true)} onBlurCapture={()=>setOpen(false)}
    >
      <span tabIndex={0} className="inline-flex">
        {trigger}
      </span>
      {open&&position&&typeof document!=="undefined"&&createPortal(<span role="tooltip" style={position} className="pointer-events-none fixed z-[200] w-max max-w-64 rounded-md bg-foreground px-2.5 py-1.5 text-xs text-background shadow-lg">{content}</span>,document.body)}
    </span>
  );
}
export function UiPopover({
  open,
  onOpenChange,
  trigger,
  children,
  accessibilityLabel,
  closeLabel,
  placement = "bottom",
}: UiPopoverProps) {
  const anchor=useRef<HTMLSpanElement>(null);
  const rect=anchor.current?.getBoundingClientRect();
  const position:CSSProperties|undefined=rect?placement==='top'?{left:rect.left+rect.width/2,top:rect.top-8,transform:'translate(-50%,-100%)'}:placement==='bottom'?{left:rect.left+rect.width/2,top:rect.bottom+8,transform:'translateX(-50%)'}:placement==='left'?{left:rect.left-8,top:rect.top+rect.height/2,transform:'translate(-100%,-50%)'}:{left:rect.right+8,top:rect.top+rect.height/2,transform:'translateY(-50%)'}:undefined;
  const press=()=>onOpenChange(!open);
  const triggerNode=isValidElement<{onPress?:()=>void;accessibilityLabel?:string}>(trigger)&&typeof trigger.type!=="string"
    ?cloneElement(trigger,{onPress:()=>{trigger.props.onPress?.();press()},accessibilityLabel:trigger.props.accessibilityLabel??accessibilityLabel})
    :<span onClick={press}>{trigger}</span>;
  return (
    <span ref={anchor} data-slot="popover" className="relative inline-flex" aria-expanded={open}>
      {triggerNode}
      {open&&position&&typeof document!=="undefined"&&createPortal(<><button type="button" aria-label={closeLabel} onClick={()=>onOpenChange(false)} className="fixed inset-0 z-[180] cursor-default bg-transparent"/><span role="dialog" style={position} className="fixed z-[190] w-72 rounded-lg border border-border bg-surface p-4 text-foreground shadow-xl">{children}</span></>,document.body)}
    </span>
  );
}
