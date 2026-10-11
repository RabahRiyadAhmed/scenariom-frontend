import { Children, cloneElement, createContext, isValidElement, useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator, Animated,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { colorTokens, foregroundTokens } from "../tokens";
import { readableColor, useUiThemeColors } from "../ui-theme";
import { ThemeTextInput as TextInput } from "./theme-text-input.native";
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
export * from "./advanced.native";
export * from "./structures.native";
export * from "./business.native";
export * from "./icons.native";
import { UiIcon } from "./icons.native";

const toneText: Record<UiTone, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  pink: "text-pink",
  purple: "text-purple",
  orange: "text-orange",
  teal: "text-teal",
  neutral: "text-muted",
};
const toneBg: Record<UiTone, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  pink: "bg-pink",
  purple: "bg-purple",
  orange: "bg-orange",
  teal: "bg-teal",
  neutral: "bg-muted",
};
const toneBorder: Record<UiTone, string> = {
  primary: "border-primary",
  secondary: "border-secondary",
  accent: "border-accent",
  info: "border-info",
  success: "border-success",
  warning: "border-warning",
  danger: "border-danger",
  pink: "border-pink",
  purple: "border-purple",
  orange: "border-orange",
  teal: "border-teal",
  neutral: "border-muted",
};
function visual(tone: UiTone, variant: UiVariant) {
  if (variant === "solid") return `${toneBg[tone]} ${toneBorder[tone]}`;
  if (variant === "outline") return `bg-transparent ${toneBorder[tone]}`;
  if (variant === "ghost") return "border-transparent bg-transparent";
  return `bg-card ${toneBorder[tone]}`;
}
function content(
  children: React.ReactNode,
  className: string,
  style?: import("react-native").TextStyle,
) {
  const parts=Children.toArray(children);
  return parts.every(item=>typeof item==='string'||typeof item==='number') ? (
    <Text className={className} style={style}>
      {children}
    </Text>
  ) : (
    <>{children}</>
  );
}
function textColor(tone: UiTone, variant: UiVariant, scheme: "light" | "dark", runtime?:Record<string,string>|null) {
  if (variant === "solid") {
    const backgroundKey=tone==='neutral'?'surface':tone;
    const background=runtime?.[backgroundKey]??(tone==='neutral'?colorTokens[scheme].surface:colorTokens[scheme][tone]);
    return readableColor(background)??foregroundTokens[scheme][tone]??"#fff";
  }
  const key = tone === "neutral" ? "muted" : tone;
  return runtime?.[key]??colorTokens[scheme][key] ?? colorTokens.light[key];
}

const CardTextColorContext=createContext<string|undefined>(undefined);

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
    sm: "min-h-8 px-3",
    md: "min-h-11 px-4",
    lg: "min-h-12 px-5",
  };
  const scheme = useColorScheme() === "dark" ? "dark" : "light";
  const runtimeColors=useUiThemeColors();
  const textColorValue = textColor(tone, variant, scheme,runtimeColors);
  const textClass = "font-semibold";
  const iconEl = iconName ? (
    <UiIcon name={iconName} size={size} tintColor={textColorValue} />
  ) : null;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled || loading}
      onPress={onPress}
      className={`flex-row items-center justify-center gap-2 border ${visual(tone, variant)} ${sizes[size]} ${rounded ? "rounded-full" : "rounded-md"} ${fullWidth ? "self-stretch" : "self-start"} ${disabled ? "opacity-50" : "active:opacity-80 active:scale-[0.95] active:shadow-sm"} ${className??""}`}
    >
      <>
        {loading && <ActivityIndicator size="small" color={textColorValue} />}
        {iconPosition === "start" && iconEl}
        {content(children, textClass, { color: textColorValue })}
        {iconPosition === "end" && iconEl}
      </>
    </Pressable>
  );
}
export function UiCard({
  children,
  tone = "neutral",
  variant = "default",
  interactive,
  onPress,
}: UiCardProps) {
  const scheme=useColorScheme()==='dark'?'dark':'light';
  const runtimeColors=useUiThemeColors();
  const cardTextColor=variant==='solid'?textColor(tone,'solid',scheme,runtimeColors):undefined;
  const cardClass=`overflow-hidden rounded-lg border shadow-sm ${variant === "default" ? "border-border bg-surface" : visual(tone, variant)} ${interactive?'active:opacity-80':''}`;
  if(onPress)return <CardTextColorContext.Provider value={cardTextColor}><Pressable accessibilityRole="button" onPress={onPress} className={cardClass}>{children}</Pressable></CardTextColorContext.Provider>;
  return (
    <CardTextColorContext.Provider value={cardTextColor}><View
      className={cardClass}
    >
      {children}
    </View></CardTextColorContext.Provider>
  );
}
export function UiCardHeader({ children }: UiSectionProps) {
  const cardTextColor=useContext(CardTextColorContext);
  return (
    <View className="border-b border-border px-5 py-4">
      {content(children, "font-semibold text-foreground",cardTextColor?{color:cardTextColor}:undefined)}
    </View>
  );
}
export function UiCardBody({ children }: UiSectionProps) {
  return <View className="gap-4 p-5">{children}</View>;
}
export function UiCardFooter({ children }: UiSectionProps) {
  const cardTextColor=useContext(CardTextColorContext);
  return (
    <View className="border-t border-border px-5 py-3">
      {content(children, "text-sm text-muted",cardTextColor?{color:cardTextColor,opacity:.82}:undefined)}
    </View>
  );
}
export function UiCardTitle({children}:UiSectionProps){const color=useContext(CardTextColorContext);return <View>{content(children,'text-lg font-semibold leading-6 text-foreground',color?{color}:undefined)}</View>}
export function UiCardDescription({children}:UiSectionProps){const color=useContext(CardTextColorContext);return <View className="mt-2">{content(children,'text-sm leading-6 text-muted',color?{color,opacity:.82}:undefined)}</View>}
export function UiCardImage({imageUrl,accessibilityLabel,ratio='wide',fit='cover',fill=false}:import('./types').UiCardImageProps){const ratios={auto:1.5,wide:16/9,portrait:3/4,square:1};return <Image accessibilityLabel={accessibilityLabel} source={{uri:imageUrl}} resizeMode={fit} style={fill?{width:'100%',height:'100%',flex:1}:{width:'100%',aspectRatio:ratios[ratio]}}/>}
export function UiCardOverlay({children,align='start'}:import('./types').UiCardOverlayProps){return <View className={`absolute inset-0 bg-black/55 p-5 ${align==='center'?'items-center justify-center':align==='end'?'justify-end':'justify-start'}`}>{children}</View>}
export function UiCardGroup({children}:UiSectionProps){return <View className="overflow-hidden rounded-lg border border-border">{children}</View>}
export function UiPortlet({
  children,
  title = "Card Title",
  tone = "neutral",
  variant = "default",
}: import("./types").UiPortletProps) {
  const [open, setOpen] = useState(true);
  const [visible, setVisible] = useState(true);
  const [reloading, setReloading] = useState(false);
  const toneClasses={neutral:'bg-surface',primary:'bg-primary',secondary:'bg-secondary',accent:'bg-accent',info:'bg-info',success:'bg-success',warning:'bg-warning',danger:'bg-danger',pink:'bg-pink',purple:'bg-purple',orange:'bg-orange',teal:'bg-teal'} as const;
  const toneClass = toneClasses[tone];
  const scheme=useColorScheme()==='dark'?'dark':'light';
  const runtimeColors=useUiThemeColors();
  const actionColor=variant==='default'?(runtimeColors?.foreground??colorTokens[scheme].foreground??'#111827'):textColor(tone,'solid',scheme,runtimeColors);
  if (!visible) return null;
  return (
    <View
      className={`relative overflow-hidden rounded-lg border border-border ${variant === "solid" ? toneClass : "bg-surface"}`}
    >
      {reloading&&<View className="absolute inset-0 z-10 items-center justify-center bg-surface/90"><View className="size-12 items-center justify-center rounded-full border border-border bg-surface shadow-sm"><UiSpinner size="md" label=""/></View></View>}
      <View
        className={`min-h-12 flex-row items-center justify-between gap-3 border-b border-border px-4 ${variant === "header" ? toneClass : ""}`}
      >
        <Text
          className="font-semibold"
          style={{color:actionColor}}
        >
          {title}
        </Text>
        <View className="flex-row">
          <Pressable
            accessibilityLabel="Reload"
            onPress={() => {
              setReloading(true);
              setTimeout(() => setReloading(false), 700);
            }}
            className="size-7 items-center justify-center rounded opacity-75 active:bg-black/10 active:opacity-100"
          >
            <UiIcon name="refresh" size="md" tintColor={actionColor}/>
          </Pressable>
          <Pressable
            accessibilityLabel="Collapse"
            onPress={() => setOpen((value) => !value)}
            className="size-7 items-center justify-center rounded opacity-75 active:bg-black/10 active:opacity-100"
          >
            <UiIcon name={open?"minus":"plus"} size="md" tintColor={actionColor}/>
          </Pressable>
          <Pressable
            accessibilityLabel="Close"
            onPress={() => setVisible(false)}
            className="size-7 items-center justify-center rounded opacity-75 active:bg-black/10 active:opacity-100"
          >
            <UiIcon name="close" size="md" tintColor={actionColor}/>
          </Pressable>
        </View>
      </View>
      {open && (
        <View className="p-5">
          <Text
            className="text-sm leading-6"
            style={{color:variant==='solid'?actionColor:(runtimeColors?.foreground??colorTokens[scheme].foreground)}}
          >
            {children}
          </Text>
        </View>
      )}
    </View>
  );
}
export function UiBadge({
  children,
  tone = "primary",
  variant = "solid",
  pill,
  size = "sm",
}: UiBadgeProps) {
  const scheme=useColorScheme()==='dark'?'dark':'light';
  const runtimeColors=useUiThemeColors();
  const sizes={sm:{box:'px-2.5 py-1',text:'text-xs'},md:{box:'px-3 py-1.5',text:'text-sm'},lg:{box:'px-3.5 py-2',text:'text-base'}};
  const text = variant === "solid" ? "" : toneText[tone];
  return (
    <View
      className={`self-start border ${sizes[size].box} ${visual(tone, variant)} ${pill ? "rounded-full" : "rounded"}`}
    >
      {content(children, `${text} ${sizes[size].text} font-semibold`,{color:textColor(tone,variant,scheme,runtimeColors)})}
    </View>
  );
}

export function UiRibbon({label,tone='primary',position='right',variant='label',icon}:UiRibbonProps){
  const scheme=useColorScheme()==='dark'?'dark':'light';
  const runtime=useUiThemeColors();
  const colorKey=tone==='neutral'?'secondary':tone;
  const background=runtime?.[colorKey]??colorTokens[scheme][colorKey]??colorTokens.light[colorKey];
  const color=readableColor(background)??foregroundTokens[scheme][tone]??'#fff';
  if(variant==='corner')return <View pointerEvents="none" className={`absolute top-0 h-24 w-24 overflow-hidden ${position==='left'?'left-0':'right-0'}`}><View className="absolute top-4 w-32 items-center py-1 shadow-md" style={{backgroundColor:background,left:position==='left'?-36:undefined,right:position==='right'?-36:undefined,transform:[{rotate:position==='left'?'-45deg':'45deg'}]}}><Text className="text-xs font-semibold" style={{color}}>{label}</Text></View></View>;
  return <View className={`absolute top-4 flex-row items-center gap-2 px-3 py-2 shadow-sm ${position==='left'?'left-0 rounded-r-md':'right-0 rounded-l-md'}`} style={{backgroundColor:background}}>{icon??<UiIcon name="bell" size="sm" tintColor={color}/>}<Text className="text-sm font-semibold" style={{color}}>{label}</Text></View>;
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
  const text = variant === "solid" ? "text-white" : toneText[tone];
  return (
    <View
      accessibilityRole="alert"
      className={`flex-row gap-3 rounded-md border p-4 ${visual(tone, variant)}`}
    >
      <View className="flex-1 gap-1">
        {title && <Text className={`${text} font-semibold`}>{title}</Text>}
        {content(children, `${text} text-sm`)}
      </View>
      {dismissible && (
        <Pressable
          accessibilityLabel={dismissLabel}
          onPress={() => {
            setVisible(false);
            onDismiss?.();
          }}
        >
          <Text className={`${text} text-xl`}>×</Text>
        </Pressable>
      )}
    </View>
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
    <View>
      <Text className="mb-2 font-semibold text-foreground">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
        inputMode={inputMode}
        placeholderTextColor="var(--sc-muted)"
        className={`min-h-11 rounded-md border bg-surface px-3 text-foreground ${error ? "border-danger" : "border-border"} ${disabled ? "opacity-50" : ""}`}
      />
      {(error || description) && (
        <Text
          className={`mt-1.5 text-xs ${error ? "text-danger" : "text-muted"}`}
        >
          {error || description}
        </Text>
      )}
    </View>
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
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      onPress={() => onCheckedChange(!checked)}
      className={`flex-row items-start gap-3 ${disabled ? "opacity-50" : ""}`}
    >
      <View
        className={`mt-0.5 size-5 items-center justify-center border ${shape === "circle" ? "rounded-full" : "rounded"} ${checked ? `${toneBorder[tone]} ${toneBg[tone]}` : "border-border bg-surface"}`}
      >
        {checked && <Text className="font-bold text-white">✓</Text>}
      </View>
      <View className="flex-1">
        <Text className="font-medium text-foreground">{label}</Text>
        {description && (
          <Text className="mt-0.5 text-xs text-muted">{description}</Text>
        )}
      </View>
    </Pressable>
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
    <View
      className={`flex-row items-center justify-between gap-4 ${disabled ? "opacity-50" : ""}`}
    >
      <View className="flex-1">
        <Text className="font-medium text-foreground">{label}</Text>
        {description && (
          <Text className="mt-0.5 text-xs text-muted">{description}</Text>
        )}
      </View>
      <Switch
        value={checked}
        onValueChange={onCheckedChange}
        disabled={disabled}
        trackColor={{ false: "#9ca3af", true: "#1e3a8a" }}
      />
    </View>
  );
}
export function UiProgress({
  value = 0,
  label,
  tone = "primary",
  segments, striped, animated, size="md", vertical, bottom,
}: UiProgressProps) {
  const safe = Math.max(0, Math.min(100, value));
  const heights={xs:4,sm:6,md:8,lg:12,xl:16,xxl:24};
  const bars=segments?.length?segments:[{value:safe,tone}];
  return (
    <View className={`gap-2 ${vertical?'items-center':''}`}>
      {label && (
        <View className="flex-row justify-between">
          <Text className="text-xs text-foreground">{label}</Text>
          <Text className="text-xs text-muted">{safe}%</Text>
        </View>
      )}
      <View
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: safe }}
        className={`overflow-hidden rounded-full bg-card ${vertical?'relative h-32':'w-full flex-row'}`}
        style={vertical?{width:heights[size]}:{height:heights[size]}}
      >
        {bars.map((bar,index)=><View key={index} className={`${toneBg[bar.tone??tone]} overflow-hidden ${animated?'opacity-90':''}`} style={vertical?{position:'absolute',left:0,right:0,height:`${Math.min(100,bar.value)}%`,[bottom?'bottom':'top']:0}:{height:'100%',width:`${Math.min(100,bar.value)}%`}}>{striped&&<View pointerEvents="none" className="absolute -inset-4 flex-row justify-around">{Array.from({length:24},(_,stripe)=><View key={stripe} className="h-full w-1 bg-white/25" style={{transform:[{rotate:'28deg'}]}}/>)}</View>}</View>)}
      </View>
    </View>
  );
}
export function UiTabs({ items, value, defaultValue, onValueChange, variant='tabs', justified=false, orientation='horizontal' }: UiTabsProps) {
  const [internal,setInternal]=useState(defaultValue??items[0]?.value);
  const runtimeColors=useUiThemeColors();
  const scheme=useColorScheme()==='dark'?'dark':'light';
  const activePillColor=textColor('primary','solid',scheme,runtimeColors);
  const selected=value??internal;
  const active = items.find((item) => item.value === selected) ?? items[0];
  const vertical=orientation!=='horizontal';
  const select=(next:string)=>{setInternal(next);onValueChange?.(next)};
  return (
    <View className={vertical?`flex-row gap-4 ${orientation==='vertical-right'?'flex-row-reverse':''}`:''}>
      <ScrollView
        horizontal={!vertical}
        showsHorizontalScrollIndicator={false}
        className={vertical?'w-36 shrink-0':''}
        contentContainerClassName={`gap-1 ${vertical?'flex-col':'flex-row'} ${variant==='pills'?'rounded-md bg-card p-1':''}`}
      >
        {items.map((item) => (
          <Pressable
            key={item.value}
            accessibilityRole="tab"
            accessibilityState={{
              selected: item.value === active?.value,
              disabled: item.disabled,
            }}
            disabled={item.disabled}
            onPress={() => select(item.value)}
            className={`min-h-10 justify-center px-4 ${justified?'flex-1':''} ${variant==='bordered'?'border-b-2':variant==='tabs'?'rounded border':'rounded'} ${item.value === active?.value ? (variant==='pills'?"bg-primary border-2 border-primary":"border-primary bg-card") : (variant==='bordered'||variant==='tabs'?"border-transparent":"bg-transparent")} ${item.disabled ? "opacity-50" : ""}`}
          >
            <Text
              className={item.value===active?.value?'font-semibold':'font-medium text-muted'}
              style={item.value===active?.value?{color:variant==='pills'?activePillColor:(runtimeColors?.primary??colorTokens[scheme].primary)}:undefined}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <View className={vertical?'min-w-0 flex-1':'pt-4'}>{active?.content}</View>
    </View>
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
  const widths={sm:'max-w-sm',md:'max-w-lg',lg:'max-w-2xl',xl:'max-w-4xl',full:'max-w-full'};
  const placement=position==='top'?'justify-start':position==='bottom'?'justify-end':position==='right'?'items-end':'justify-center';
  const runtimeColors=useUiThemeColors();
  const modalColor=tone?textColor(tone,'solid',useColorScheme()==='dark'?'dark':'light',runtimeColors):undefined;
  const toneClass=tone?toneBg[tone]:'';
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={closeOnOverlayClick?onClose:()=>{}}
    >
      <Pressable onPress={closeOnOverlayClick?onClose:undefined} className={`flex-1 items-center bg-black/55 p-5 ${placement}`}>
        <Pressable onPress={()=>{}} className={`max-h-[85%] w-full ${widths[size]} overflow-hidden rounded-lg border border-border ${toneClass||'bg-surface'}`}>
          {(title||showClose)&&<View className="flex-row items-center justify-between border-b border-border px-5 py-4">
            <Text className="text-lg font-semibold text-foreground">
              {title}
            </Text>
            {showClose&&<Pressable accessibilityLabel={closeLabel} onPress={onClose}>
              <Text className="text-2xl text-foreground">×</Text>
            </Pressable>}
          </View>}
          <ScrollView contentContainerClassName="p-5">{content(children,'text-sm leading-6 text-foreground',modalColor?{color:modalColor}:undefined)}</ScrollView>
          {footer && (
            <View className="flex-row flex-wrap justify-end gap-2 border-t border-border px-5 py-4">
              {footer}
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
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
    <View>
      <Text className="mb-2 font-semibold text-foreground">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={!disabled}
        multiline
        numberOfLines={rows}
        maxLength={maxLength}
        textAlignVertical="top"
        placeholderTextColor="var(--sc-muted)"
        style={{ minHeight: rows * 22 + 24 }}
        className={`rounded-md border bg-surface px-3 py-3 text-foreground ${error ? "border-danger" : "border-border"} ${disabled ? "opacity-50" : ""}`}
      />
      {(error || description) && (
        <Text
          className={`mt-1.5 text-xs ${error ? "text-danger" : "text-muted"}`}
        >
          {error || description}
        </Text>
      )}
    </View>
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
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);
  const runtimeColors = useUiThemeColors();
  return (
    <View>
      <Text className="mb-2 font-semibold text-foreground">{label}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open, disabled }}
        disabled={disabled}
        onPress={() => setOpen(true)}
        className={`min-h-11 flex-row items-center justify-between rounded-md border bg-surface px-3 ${error ? "border-danger" : "border-border"} ${disabled ? "opacity-50" : ""}`}
      >
        <Text className={selected ? "text-foreground" : "text-muted"}>
          {selected?.label ?? placeholder}
        </Text>
        <UiIcon name="chevron-down" size="sm" tintColor={runtimeColors?.foreground} />
      </Pressable>
      {(error || description) && (
        <Text
          className={`mt-1.5 text-xs ${error ? "text-danger" : "text-muted"}`}
        >
          {error || description}
        </Text>
      )}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          onPress={() => setOpen(false)}
          className="flex-1 justify-end bg-black/55"
        >
          <View className="max-h-[70%] rounded-t-2xl bg-surface p-4">
            <Text className="mb-3 text-lg font-semibold text-foreground">
              {label}
            </Text>
            <ScrollView>
              {options.map((option) => (
                <Pressable
                  key={option.value}
                  disabled={option.disabled}
                  onPress={() => {
                    onValueChange(option.value);
                    setOpen(false);
                  }}
                  className={`min-h-12 justify-center rounded-md px-3 ${value === option.value ? "bg-card" : ""} ${option.disabled ? "opacity-50" : ""}`}
                >
                  <Text
                    className={
                      value === option.value
                        ? "font-semibold text-primary"
                        : "text-foreground"
                    }
                  >
                    {option.label}
                  </Text>
                  {option.description && (
                    <Text className="mt-0.5 text-xs text-muted">
                      {option.description}
                    </Text>
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
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
    <View className="gap-3">
      {label && <Text className="font-semibold text-foreground">{label}</Text>}
      {options.map((option) => (
        (() => { const optionTone = option.tone ?? tone; return (
        <Pressable
          key={option.value}
          accessibilityRole="radio"
          accessibilityState={{
            selected: value === option.value,
            disabled: disabled || option.disabled,
          }}
          disabled={disabled || option.disabled}
          onPress={() => onValueChange(option.value)}
          className={`flex-row items-start gap-3 ${disabled || option.disabled ? "opacity-50" : ""}`}
        >
          <View
            className={`mt-0.5 size-5 items-center justify-center rounded-full border ${value === option.value ? toneBorder[optionTone] : "border-border"}`}
          >
            {value === option.value && (
              <View className={`size-2.5 rounded-full ${toneBg[optionTone]}`} />
            )}
          </View>
          <View className="flex-1">
            <Text className="font-medium text-foreground">{option.label}</Text>
            {option.description && (
              <Text className="mt-0.5 text-xs text-muted">
                {option.description}
              </Text>
            )}
          </View>
        </Pressable>
        ); })()
      ))}
      {(error || description) && (
        <Text className={`text-xs ${error ? "text-danger" : "text-muted"}`}>
          {error || description}
        </Text>
      )}
    </View>
  );
}
export function UiAccordion({
  items,
  multiple = false,
  defaultValue = [],
  variant='default',
}: UiAccordionProps) {
  const runtimeColors=useUiThemeColors();
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
    <View className="gap-1">
      {items.map((item, index) => {
        const expanded = open.includes(item.value);
        return (
          <View
            key={item.value}
            className="overflow-hidden rounded-md border border-border bg-surface"
          >
            <Pressable
              disabled={item.disabled}
              accessibilityRole="button"
              accessibilityState={{ expanded, disabled: item.disabled }}
              onPress={() => toggle(item.value)}
              className={`min-h-12 flex-row items-center gap-3 px-4 ${item.disabled ? "opacity-50" : ""}`}
            >
              {variant==='default'&&<UiIcon name="info" size="sm" tintColor={runtimeColors?.primary}/>} 
              <Text className="flex-1 font-medium text-foreground">
                {variant==='question'?'Q. ':''}{item.title}
              </Text>
              <UiIcon name={expanded?'chevron-up':'chevron-down'} size="sm" tintColor={runtimeColors?.foreground}/>
            </Pressable>
            {expanded && (
              <View className="border-t border-border px-4 py-4">
                {content(item.content, "text-sm text-muted")}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
export function UiCollapse({trigger='Toggle collapse',secondTrigger,children,defaultOpen=true,horizontal=false}:UiCollapseProps){const[open,setOpen]=useState(defaultOpen);return <View><View className="mb-3 flex-row flex-wrap gap-2"><UiButton onPress={()=>setOpen(!open)}>{trigger}</UiButton>{secondTrigger&&<UiButton onPress={()=>setOpen(!open)}>{secondTrigger}</UiButton>}</View>{open&&<View className={horizontal?'max-w-sm':''}><UiCard><UiCardBody>{content(children,'text-sm text-muted')}</UiCardBody></UiCard></View>}</View>}
export function UiAvatar({
  name,
  imageUrl,
  size = "md",
  shape = "rounded",
  thumbnail = false,
  fit = "cover",
  accessibilityLabel,
}: UiAvatarProps) {
  const dimensions = {xs:24,sm: 32, md: 40, lg: 64,xl:96 };
  const textSizes = {xs:'text-[10px]',sm: "text-xs", md: "text-sm", lg: "text-xl",xl:'text-3xl' };
  const dimension = dimensions[size];
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? name}
      className={`items-center justify-center overflow-hidden bg-primary ${shape==='circle'?'rounded-full':'rounded-md'} ${thumbnail?'border-4 border-primary shadow-md':''}`}
      style={{ width: dimension, height: dimension }}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: dimension, height: dimension }}
          resizeMode={fit}
        />
      ) : (
        <Text className={`font-semibold text-white ${textSizes[size]}`}>
          {initials}
        </Text>
      )}
    </View>
  );
}
export function UiSpinner({
  label,
  size = "md",
  tone = "primary",
  color,
  variant = "border",
}: UiSpinnerProps) {
  const sizes = { xs:12,sm:16,md:24,lg:36,xl:48 } as const;
  const spin=useRef(new Animated.Value(0)).current;
  const grow=useRef(new Animated.Value(.62)).current;
  const dots=useRef([new Animated.Value(.35),new Animated.Value(.35),new Animated.Value(.35)]).current;
  const colors: Record<Exclude<UiTone, "neutral">, string> = {
    primary: "#1e3a8a",
    secondary: "#475569",
    accent: "#7c3aed",
    info: "#0369a1",
    success: "#16a34a",
    warning: "#d97706",
    danger: "#dc2626",
    pink: "#db2777",
    purple: "#9333ea",
    orange: "#c2410c",
    teal: "#0f766e",
  };
  useEffect(()=>{
    const animations:Animated.CompositeAnimation[]=[];
    if(variant==='border'||variant==='ring')animations.push(Animated.loop(Animated.timing(spin,{toValue:1,duration:800,useNativeDriver:true})));
    if(variant==='grow')animations.push(Animated.loop(Animated.sequence([Animated.timing(grow,{toValue:1,duration:650,useNativeDriver:true}),Animated.timing(grow,{toValue:.62,duration:650,useNativeDriver:true})])));
    if(variant==='dots')dots.forEach((dot,index)=>animations.push(Animated.loop(Animated.sequence([Animated.delay(index*220),Animated.timing(dot,{toValue:1,duration:420,useNativeDriver:true}),Animated.timing(dot,{toValue:.3,duration:420,useNativeDriver:true})]))));
    animations.forEach(animation=>animation.start());return()=>animations.forEach(animation=>animation.stop());
  },[dots,grow,spin,variant]);
  const dimension=sizes[size];
  const borderRotation=spin.interpolate({inputRange:[0,1],outputRange:['0deg','360deg']});
  const spinnerColor=color==='current'?'#ffffff':colors[color??tone];
  const borderWidth=Math.max(2,Math.round(dimension/9));
  const indicator=variant==='dots'?<View className="flex-row gap-1">{dots.map((dot,index)=><Animated.View key={index} className="size-2 rounded-full" style={{backgroundColor:spinnerColor,opacity:dot,transform:[{scale:dot}]}}/>)}</View>:variant==='grow'?<Animated.View className="rounded-full" style={{width:dimension,height:dimension,backgroundColor:spinnerColor,opacity:grow,transform:[{scale:grow}]}}/>:variant==='native'?<ActivityIndicator size={dimension} color={spinnerColor}/>:<Animated.View style={{width:dimension,height:dimension,borderRadius:dimension/2,borderWidth,borderColor:variant==='ring'?'#64748b55':spinnerColor,borderRightColor:variant==='ring'?'#64748b55':'transparent',borderTopColor:variant==='ring'?spinnerColor:spinnerColor,transform:[{rotate:borderRotation}]}}/>;
  return (
    <View
      accessibilityRole="progressbar"
      className="flex-row items-center gap-2"
    >
      {indicator}
      {label && <Text className="text-sm text-muted">{label}</Text>}
    </View>
  );
}
export function UiLoaderOverlay({children}:UiLoaderOverlayProps){return <View className="min-h-40 items-center justify-center rounded-lg border border-border bg-surface/90"><UiSpinner size="lg" label={typeof children==='string'?children:undefined}/></View>}
export function UiSkeleton({
  width = "100%",
  height = 16,
  rounded = false,
  tone,
}: UiSkeletonProps) {
  return (
    <View
      accessible={false}
      className={`${tone ? toneBg[tone] : 'bg-card'} ${rounded ? "rounded-full" : "rounded"}`}
      style={{ width: width as number, height, opacity: 0.7 }}
    />
  );
}
export { UiDivider } from '../components/ui/divider/divider.native';
export function UiEmptyState({
  title,
  description,
  icon,
  action,
}: UiEmptyStateProps) {
  return (
    <View className="items-center rounded-lg border border-dashed border-border bg-surface px-6 py-10">
      {icon && <View className="mb-4">{icon}</View>}
      <Text className="text-center font-semibold text-foreground">{title}</Text>
      {description && (
        <Text className="mt-2 text-center text-sm leading-6 text-muted">
          {description}
        </Text>
      )}
      {action && <View className="mt-5">{action}</View>}
    </View>
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
    <View className="gap-4">
      <View>
        {eyebrow && (
          <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            {eyebrow}
          </Text>
        )}
        <Text className="text-2xl font-semibold text-foreground">{title}</Text>
        {description && (
          <Text className="mt-2 text-sm leading-6 text-muted">
            {description}
          </Text>
        )}
        {children}
      </View>
      {actions && <View className="flex-row flex-wrap gap-2">{actions}</View>}
    </View>
  );
}
export function UiBreadcrumb({
  items,
  accessibilityLabel,
  separator = "/",
}: UiBreadcrumbProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      accessibilityRole="header"
      accessibilityLabel={accessibilityLabel}
      contentContainerClassName="items-center gap-2"
    >
      {items.map((item, index) => (
        <View
          key={`${item.label}-${index}`}
          className="flex-row items-center gap-2"
        >
          {index > 0 && content(separator, "text-sm text-muted")}
          {item.current ? (
            <Text
              accessibilityRole="text"
              className="font-medium text-foreground"
            >
              {item.label}
            </Text>
          ) : (
            <Pressable accessibilityRole="button" onPress={item.onPress}>
              <Text className="text-sm text-muted">{item.label}</Text>
            </Pressable>
          )}
        </View>
      ))}
    </ScrollView>
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
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen(true)}
        className="min-h-10 items-center justify-center rounded-md border border-border bg-surface px-3"
      >
        {content(trigger, "text-foreground")}
      </Pressable>
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          accessibilityLabel={closeLabel}
          onPress={() => setOpen(false)}
          className="flex-1 justify-end bg-black/55"
        >
          <View className="max-h-[70%] rounded-t-2xl bg-surface p-3">
            <ScrollView>
              {items.map((item) => (
                <Pressable
                  key={item.value}
                  accessibilityRole="menuitem"
                  disabled={item.disabled}
                  onPress={() => {
                    onSelect(item.value);
                    setOpen(false);
                  }}
                  className={`min-h-12 flex-row items-start gap-3 rounded-md px-3 py-3 ${item.disabled ? "opacity-50" : ""}`}
                >
                  {item.icon}
                  <View className="flex-1">
                    <Text
                      className={`font-medium ${item.tone === "danger" ? "text-danger" : "text-foreground"}`}
                    >
                      {item.label}
                    </Text>
                    {item.description && (
                      <Text className="mt-0.5 text-xs text-muted">
                        {item.description}
                      </Text>
                    )}
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
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
    <View
      accessibilityRole="toolbar"
      accessibilityLabel={labels.page(page)}
      className="flex-row flex-wrap items-center justify-center gap-1"
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={labels.previous}
        disabled={page <= 1}
        onPress={() => onPageChange(page - 1)}
        className={`min-h-10 justify-center rounded-md border border-border px-3 ${page <= 1 ? "opacity-50" : ""}`}
      >
        <Text className="text-foreground">‹</Text>
      </Pressable>
      {visible.map((value, index) => (
        <View key={value} className="flex-row items-center">
          {index > 0 && value - visible[index - 1] > 1 && (
            <Text className="px-1 text-muted">…</Text>
          )}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={labels.page(value)}
            accessibilityState={{ selected: value === page }}
            onPress={() => onPageChange(value)}
            className={`size-10 items-center justify-center rounded-md ${value === page ? "bg-primary" : "bg-transparent"}`}
          >
            <Text
              className={
                value === page
                  ? "font-medium text-white"
                  : "font-medium text-foreground"
              }
            >
              {value}
            </Text>
          </Pressable>
        </View>
      ))}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={labels.next}
        disabled={page >= pageCount}
        onPress={() => onPageChange(page + 1)}
        className={`min-h-10 justify-center rounded-md border border-border px-3 ${page >= pageCount ? "opacity-50" : ""}`}
      >
        <Text className="text-foreground">›</Text>
      </Pressable>
    </View>
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
    <View className="rounded-lg border border-border bg-surface p-5">
      <View className="flex-row items-start justify-between gap-4">
        <View className="flex-1">
          <Text className="text-sm text-muted">{label}</Text>
          {content(value, "mt-2 text-2xl font-semibold text-foreground")}
        </View>
        {icon && <View>{icon}</View>}
      </View>
      {(description || trend) && (
        <View className="mt-3 flex-row flex-wrap items-center gap-2">
          {trend}
          {description && <Text className={toneText[tone]}>{description}</Text>}
        </View>
      )}
    </View>
  );
}
export function UiList({ children, divided = true }: UiListProps) {
  return (
    <View
      className={`overflow-hidden rounded-lg border border-border bg-surface ${divided ? "divide-y divide-border" : ""}`}
    >
      {children}
    </View>
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
      <View className="flex-1">
        <Text className="font-medium text-foreground">{title}</Text>
        {description && (
          <Text className="mt-1 text-sm text-muted">{description}</Text>
        )}
      </View>
      {trailing}
    </>
  );
  return onPress ? (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      className={`min-h-14 flex-row items-center gap-3 px-4 py-3 ${disabled ? "opacity-50" : "active:bg-card"}`}
    >
      {body}
    </Pressable>
  ) : (
    <View
      className={`min-h-14 flex-row items-center gap-3 px-4 py-3 ${disabled ? "opacity-50" : ""}`}
    >
      {body}
    </View>
  );
}
export function UiListGroup({children,variant='default',horizontal=false}:import('./types').UiListGroupProps){
  const items=Children.toArray(children);
  const scheme=useColorScheme()==='dark'?'dark':'light';
  const runtime=useUiThemeColors();
  const borderColor=runtime?.border??colorTokens[scheme].border;
  return <View className={`${horizontal?'flex-row':'w-full'} overflow-hidden border bg-surface ${variant==='default'?'rounded-lg':'rounded-none'}`} style={{borderColor}}>
    {items.map((item,index)=><View key={index} className={horizontal?'min-w-0 flex-1':'w-full'} style={index<items.length-1?(horizontal?{borderRightWidth:1,borderRightColor:borderColor}:{borderBottomWidth:1,borderBottomColor:borderColor}):undefined}>{item}</View>)}
  </View>
}
export function UiListGroupItem({children,leading,trailing,active,disabled,action,tone}:import('./types').UiListGroupItemProps){
  const scheme=useColorScheme()==='dark'?'dark':'light';
  const runtime=useUiThemeColors();
  const toneColor=tone&&tone!=='neutral'?(runtime?.[tone]??colorTokens[scheme][tone]):undefined;
  const activeColor=runtime?.primary??colorTokens[scheme].primary;
  const backgroundColor=active?activeColor:toneColor&&/^#[0-9a-f]{6}$/i.test(toneColor)?`${toneColor}24`:undefined;
  const foreground=active?readableColor(activeColor):(toneColor??runtime?.foreground??colorTokens[scheme].foreground);
  const body=<>
    {leading?<View className="shrink-0">{leading}</View>:null}
    <View className="min-w-0 flex-1">{content(children,'text-sm', {color:foreground})}</View>
    {trailing?<View className="shrink-0">{trailing}</View>:null}
  </>;
  const classes=`min-h-12 w-full flex-row items-center gap-3 px-4 py-3 ${disabled?'opacity-50':''}`;
  return action?<Pressable accessibilityRole="button" disabled={disabled} style={{backgroundColor}} className={`${classes} ${!disabled?'active:opacity-80':''}`}>{body}</Pressable>:<View style={{backgroundColor}} className={classes}>{body}</View>
}
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
  const sizes = { sm: 32, md: 40, lg: 48 };
  const dimension = sizes[size];
  const scheme = useColorScheme() === "dark" ? "dark" : "light";
  const iconColor = textColor(tone, variant, scheme);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled || loading}
      onPress={onPress}
      className={`items-center justify-center border ${visual(tone, variant)} ${rounded ? "rounded-full" : "rounded-md"} ${disabled ? "opacity-50" : "active:opacity-80"}`}
      style={{ width: dimension, height: dimension }}
    >
      {loading ? (
        <ActivityIndicator size="small" color={iconColor} />
      ) : (
        <UiIcon name={iconName} size={size} tintColor={iconColor} />
      )}
    </Pressable>
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
    <View>
      <Text className="mb-2 font-semibold text-foreground">{label}</Text>
      <View className="min-h-11 flex-row items-center rounded-md border border-border bg-surface">
        <Text className="ps-3 text-muted">⌕</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
          placeholder={placeholder}
          editable={!disabled}
          placeholderTextColor="var(--sc-muted)"
          className="min-w-0 flex-1 px-3 text-foreground"
        />
        {value && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={clearLabel}
            onPress={() => onChangeText("")}
            className="self-stretch justify-center px-3"
          >
            <Text className="text-muted">×</Text>
          </Pressable>
        )}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={submitLabel}
          onPress={onSubmit}
          className="self-stretch justify-center border-s border-border px-3"
        >
          <Text className="text-primary">↵</Text>
        </Pressable>
      </View>
      {description && (
        <Text className="mt-1.5 text-xs text-muted">{description}</Text>
      )}
    </View>
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
    <View>
      <Text className="mb-2 font-semibold text-foreground">{label}</Text>
      <View
        className={`min-h-11 flex-row items-center rounded-md border bg-surface ${error ? "border-danger" : "border-border"}`}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={!visible}
          editable={!disabled}
          placeholderTextColor="var(--sc-muted)"
          className="min-w-0 flex-1 px-3 text-foreground"
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={visible ? hidePasswordLabel : showPasswordLabel}
          onPress={() => setVisible((current) => !current)}
          className="self-stretch justify-center px-3"
        >
          <UiIcon name={visible ? "eye-off" : "eye"} size="md" />
        </Pressable>
      </View>
      {(error || description) && (
        <Text
          className={`mt-1.5 text-xs ${error ? "text-danger" : "text-muted"}`}
        >
          {error || description}
        </Text>
      )}
    </View>
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
    <View>
      <Text className="mb-2 font-semibold text-foreground">
        {label}
        {required && <Text className="text-danger"> *</Text>}
      </Text>
      {children}
      {(error || description) && (
        <Text
          accessibilityRole={error ? "alert" : undefined}
          className={`mt-1.5 text-xs ${error ? "text-danger" : "text-muted"}`}
        >
          {error || description}
        </Text>
      )}
    </View>
  );
}
export { UiKbd } from '../components/ui/kbd/kbd.native';
export function UiSheet({
  open,
  onClose,
  title,
  closeLabel,
  children,
  footer,
  placement = "bottom",
}: UiSheetProps) {
  const horizontal = placement === "start" || placement === "end";
  return (
    <Modal
      visible={open}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        className={`flex-1 bg-black/55 ${placement === "top" ? "justify-start" : "justify-end"} ${placement === "start" ? "items-start" : placement === "end" ? "items-end" : ""}`}
      >
        <Pressable
          accessibilityLabel={closeLabel}
          onPress={onClose}
          className="absolute inset-0"
        />
        <View
          className={`border border-border bg-surface ${horizontal ? "h-full w-[88%] max-w-md" : "max-h-[85%] w-full"} ${placement === "bottom" ? "rounded-t-2xl" : placement === "top" ? "rounded-b-2xl" : ""}`}
        >
          <View className="flex-row items-center justify-between border-b border-border px-5 py-4">
            {title && (
              <Text className="font-semibold text-foreground">{title}</Text>
            )}
            <Pressable
              accessibilityLabel={closeLabel}
              onPress={onClose}
              className="ms-auto"
            >
              <Text className="text-2xl text-foreground">×</Text>
            </Pressable>
          </View>
          <ScrollView contentContainerClassName="p-5">{children}</ScrollView>
          {footer && (
            <View className="flex-row flex-wrap justify-end gap-2 border-t border-border px-5 py-4">
              {footer}
            </View>
          )}
        </View>
      </View>
    </Modal>
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
  const scheme = useColorScheme() === "dark" ? "dark" : "light";
  const runtimeColors = useUiThemeColors();
  const solid = variant === "solid";
  const foreground = runtimeColors?.foreground ?? colorTokens[scheme].foreground;
  const muted = runtimeColors?.muted ?? colorTokens[scheme].muted;
  const solidForeground = textColor(tone, "solid", scheme, runtimeColors);
  const titleColor = solid ? solidForeground : foreground;
  const detailColor = solid ? solidForeground : muted;
  useEffect(() => {
    if (!open || !duration) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose, open]);
  if (!open) return null;
  return (
    <View accessibilityRole="alert" className={`w-full max-w-sm overflow-hidden rounded-lg border shadow-xl ${solid ? `${toneBg[tone]} ${toneBorder[tone]}` : "border-border bg-surface"}`}>
      <View className={`flex-row items-center gap-3 border-b px-4 py-3 ${solid ? "border-white/25" : "border-border"}`}>
        <View className={`size-2 rounded-full ${solid ? "bg-white/80" : toneBg[tone]}`} />
        {title && (
          <Text className="min-w-0 flex-1 font-semibold" style={{ color: titleColor }}>
            {title}
          </Text>
        )}
        {time&&<Text className="text-xs" style={{ color: detailColor, opacity: solid ? .82 : 1 }}>{time}</Text>}
        <Pressable
          accessibilityLabel={closeLabel}
          onPress={onClose}
          className="ms-auto"
        >
          <Text className="text-xl" style={{ color: titleColor }}>×</Text>
        </Pressable>
      </View>
      <View className="px-4 py-3">
        {content(children, "text-sm", { color: detailColor, opacity: solid ? .9 : 1 })}
        {action && <View className="mt-3">{action}</View>}
      </View>
    </View>
  );
}
export function UiToastViewport({children,placement='top-end',scope='screen'}:UiToastViewportProps){const alignment:{[key:string]:string}={'top-start':'items-start justify-start','top-center':'items-center justify-start','top-end':'items-end justify-start','middle-start':'items-start justify-center','middle-center':'items-center justify-center','middle-end':'items-end justify-center','bottom-start':'items-start justify-end','bottom-center':'items-center justify-end','bottom-end':'items-end justify-end'};const content=<View className={`min-h-56 p-3 ${alignment[placement]}`}><View className="w-full max-w-sm gap-3">{children}</View></View>;return scope==='screen'?<Modal transparent visible animationType="fade" statusBarTranslucent><View className={`flex-1 ${alignment[placement]}`} pointerEvents="box-none"><View className="w-full max-w-sm p-3">{children}</View></View></Modal>:content}
export function UiTooltip({
  trigger,
  content: tooltipContent,
  accessibilityLabel,
  placement = "top",
}: UiTooltipProps) {
  const [open, setOpen] = useState(false);
  const [anchorRect,setAnchorRect]=useState({x:0,y:0,width:0,height:0});
  const anchor=useRef<View>(null);
  const {width:screenWidth,height:screenHeight}=useWindowDimensions();
  const scheme=useColorScheme()==='dark'?'dark':'light';
  const runtime=useUiThemeColors();
  const tooltipBackground=runtime?.foreground??colorTokens[scheme].foreground;
  const tooltipColor=readableColor(tooltipBackground)??(scheme==='dark'?'#111827':'#ffffff');
  const show=()=>anchor.current?.measureInWindow((x,y,width,height)=>{setAnchorRect({x,y,width,height});setOpen(true)});
  const triggerNode=isValidElement<{onPress?:()=>void;accessibilityLabel?:string}>(trigger)
    ?cloneElement(trigger,{onPress:()=>{trigger.props.onPress?.();show()},accessibilityLabel:trigger.props.accessibilityLabel??accessibilityLabel})
    :<Pressable accessibilityLabel={accessibilityLabel} onPress={show}>{trigger}</Pressable>;
  const bubbleWidth=Math.min(280,screenWidth-32),bubbleHeight=52;
  const centerX=anchorRect.x+anchorRect.width/2,centerY=anchorRect.y+anchorRect.height/2;
  const left=Math.max(16,Math.min(screenWidth-bubbleWidth-16,placement==='left'?anchorRect.x-bubbleWidth-8:placement==='right'?anchorRect.x+anchorRect.width+8:centerX-bubbleWidth/2));
  const top=Math.max(16,Math.min(screenHeight-bubbleHeight-16,placement==='top'?anchorRect.y-bubbleHeight-8:placement==='bottom'?anchorRect.y+anchorRect.height+8:centerY-bubbleHeight/2));
  return (
    <>
      <View ref={anchor} collapsable={false} className="self-start">{triggerNode}</View>
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <View className="flex-1 bg-black/10">
          <Pressable onPress={()=>setOpen(false)} className="absolute inset-0" />
          <View className="absolute min-h-12 justify-center rounded-md px-3 py-2 shadow-lg" style={{left,top,width:bubbleWidth,backgroundColor:tooltipBackground}}>
            {content(tooltipContent,"text-sm",{color:tooltipColor})}
          </View>
        </View>
      </Modal>
    </>
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
  const [anchorRect,setAnchorRect]=useState({x:0,y:0,width:0,height:0});
  const anchor=useRef<View>(null);
  const {width:screenWidth,height:screenHeight}=useWindowDimensions();
  const show=()=>anchor.current?.measureInWindow((x,y,width,height)=>{setAnchorRect({x,y,width,height});onOpenChange(true)});
  const triggerNode=isValidElement<{onPress?:()=>void;accessibilityLabel?:string}>(trigger)
    ?cloneElement(trigger,{onPress:()=>{trigger.props.onPress?.();open?onOpenChange(false):show()},accessibilityLabel:trigger.props.accessibilityLabel??accessibilityLabel})
    :<Pressable accessibilityLabel={accessibilityLabel} onPress={()=>open?onOpenChange(false):show()}>{trigger}</Pressable>;
  const panelWidth=Math.min(320,screenWidth-32),panelHeight=150;
  const centerX=anchorRect.x+anchorRect.width/2,centerY=anchorRect.y+anchorRect.height/2;
  const left=Math.max(16,Math.min(screenWidth-panelWidth-16,placement==='left'?anchorRect.x-panelWidth-8:placement==='right'?anchorRect.x+anchorRect.width+8:centerX-panelWidth/2));
  const top=Math.max(16,Math.min(screenHeight-panelHeight-16,placement==='top'?anchorRect.y-panelHeight-8:placement==='bottom'?anchorRect.y+anchorRect.height+8:centerY-panelHeight/2));
  return (
    <>
      <View ref={anchor} collapsable={false} className="self-start">{triggerNode}</View>
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => onOpenChange(false)}
      >
        <View className="flex-1 bg-black/20">
          <Pressable accessibilityLabel={closeLabel} onPress={()=>onOpenChange(false)} className="absolute inset-0" />
          <View className="absolute rounded-xl border border-border bg-surface p-4 shadow-xl" style={{left,top,width:panelWidth,minHeight:panelHeight}}>
            {children}
          </View>
        </View>
      </Modal>
    </>
  );
}
