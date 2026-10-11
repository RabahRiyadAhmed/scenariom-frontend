import type { ReactNode } from 'react';

export type UiTone = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'danger' | 'pink' | 'purple' | 'orange' | 'teal' | 'neutral';
export type UiVariant = 'solid' | 'soft' | 'outline' | 'ghost';
export type UiSize = 'sm' | 'md' | 'lg';

export type UiIconName =
  | 'plus' | 'minus' | 'check' | 'x' | 'send' | 'trash' | 'copy' | 'mail'
  | 'info' | 'warning' | 'arrow-right' | 'arrow-left' | 'chevron-down'
  | 'chevron-up' | 'chevron-right' | 'chevron-left' | 'search'
  | 'settings' | 'user' | 'bell' | 'download' | 'upload' | 'edit'
  | 'eye' | 'eye-off' | 'lock' | 'star' | 'heart' | 'share' | 'menu'
  | 'close' | 'filter' | 'more' | 'refresh' | 'save' | 'calendar'
  | 'clock' | 'link' | 'external' | 'play' | 'pause' | 'undo';

export type UiIconPosition = 'start' | 'end';

export type UiButtonProps = {
  children: ReactNode; tone?: UiTone; variant?: UiVariant; size?: UiSize;
  rounded?: boolean; fullWidth?: boolean; loading?: boolean; disabled?: boolean;
  accessibilityLabel?: string; onPress?: () => void;
  icon?: UiIconName; iconPosition?: UiIconPosition;
  className?: string;
};
export type UiCardProps = { children: ReactNode; tone?: UiTone; variant?: 'default' | Exclude<UiVariant, 'ghost'>; interactive?: boolean; onPress?: () => void };
export type UiCardImageProps = { imageUrl: string; accessibilityLabel?: string; ratio?: 'auto'|'wide'|'portrait'|'square'; fit?: 'cover'|'contain'; fill?: boolean };
export type UiCardOverlayProps = { children: ReactNode; align?: 'start'|'center'|'end' };
export type UiPortletProps = { children?: ReactNode; title?: ReactNode; tone?: UiTone; variant?: 'default'|'solid'|'header' };
export type UiSectionProps = { children: ReactNode };
export type UiBadgeProps = { children: ReactNode; tone?: UiTone; variant?: Exclude<UiVariant, 'ghost'>; pill?: boolean; size?: 'sm'|'md'|'lg' };
export type UiRibbonProps = { label: ReactNode; tone?: UiTone; position?: 'left'|'right'; variant?: 'label'|'corner'; icon?: ReactNode };
export type UiAlertProps = { children: ReactNode; title?: string; tone?: UiTone; variant?: Exclude<UiVariant, 'ghost'>; dismissible?: boolean; dismissLabel?: string; onDismiss?: () => void };
export type UiTextFieldProps = {
  label: string; value: string; onChangeText: (value: string) => void; placeholder?: string;
  description?: string; error?: string; secureTextEntry?: boolean; disabled?: boolean;
  inputMode?: 'text' | 'email' | 'numeric' | 'tel' | 'url';
};
export type UiCheckboxProps = { label: string; checked: boolean; onCheckedChange: (checked: boolean) => void; disabled?: boolean; description?: string; tone?: Exclude<UiTone, 'neutral'>; shape?: 'square'|'circle' };
export type UiSwitchProps = UiCheckboxProps;
export type UiProgressSegment = { value: number; tone?: Exclude<UiTone, 'neutral'> };
export type UiProgressProps = { value?: number; label?: string|boolean; tone?: Exclude<UiTone, 'neutral'>; segments?: UiProgressSegment[]; striped?: boolean; animated?: boolean; size?: 'xs'|'sm'|'md'|'lg'|'xl'|'xxl'; vertical?: boolean; bottom?: boolean };
export type UiTabsItem = { value: string; label: string; content: ReactNode; disabled?: boolean };
export type UiTabsProps = { items: UiTabsItem[]; value?: string; defaultValue?: string; onValueChange?: (value: string) => void; variant?: 'tabs'|'pills'|'bordered'; justified?: boolean; orientation?: 'horizontal'|'vertical-left'|'vertical-right' };
export type UiModalProps = { open: boolean; onClose: () => void; title?: string; closeLabel?: string; children: ReactNode; footer?: ReactNode; size?: 'sm'|'md'|'lg'|'xl'|'full'; position?: 'top'|'bottom'|'center'|'right'; scrollable?: boolean; showClose?: boolean; closeOnOverlayClick?: boolean; tone?: UiTone };
export type UiTextareaProps = Omit<UiTextFieldProps, 'secureTextEntry' | 'inputMode'> & { rows?: number; maxLength?: number };
export type UiOption = { value: string; label: string; description?: string; disabled?: boolean; tone?: Exclude<UiTone, 'neutral'> };
export type UiSelectProps = {
  label: string; value?: string; options: UiOption[]; onValueChange: (value: string) => void;
  placeholder?: string; description?: string; error?: string; disabled?: boolean;
};
export type UiRadioGroupProps = {
  label?: string; value?: string; options: UiOption[]; onValueChange: (value: string) => void;
  description?: string; error?: string; disabled?: boolean; tone?: Exclude<UiTone, 'neutral'>;
};
export type UiAccordionItem = { value: string; title: string; content: ReactNode; disabled?: boolean };
export type UiAccordionProps = { items: UiAccordionItem[]; multiple?: boolean; defaultValue?: string|string[]; variant?: 'default'|'question' };
export type UiCollapseProps = { trigger?: ReactNode; secondTrigger?: ReactNode; children: ReactNode; defaultOpen?: boolean; horizontal?: boolean };
export type UiAvatarProps = { name: string; imageUrl?: string; size?: 'xs'|'sm'|'md'|'lg'|'xl'; shape?: 'rounded'|'circle'; thumbnail?: boolean; fit?: 'cover'|'contain'; accessibilityLabel?: string };
export type UiSpinnerProps = {
  label?: string;
  size?: 'xs'|'sm'|'md'|'lg'|'xl';
  tone?: Exclude<UiTone, 'neutral'>;
  /** `current` inherits the text color on web; native resolves it to white for button loaders. */
  color?: Exclude<UiTone, 'neutral'> | 'current';
  variant?: 'border'|'ring'|'grow'|'dots'|'native';
  className?: string;
};
export type UiLoaderOverlayProps = { children?: ReactNode };
export type UiSkeletonProps = { width?: number | string; height?: number; rounded?: boolean; tone?: UiTone; animation?: 'pulse'|'glow'|'wave' };
export type UiDividerProps = { label?: string };
export type UiEmptyStateProps = { title: string; description?: string; icon?: ReactNode; action?: ReactNode };
export type UiPageHeaderProps = { title: string; description?: string; eyebrow?: string; actions?: ReactNode; children?: ReactNode };
export type UiBreadcrumbItem = { label: string; onPress?: () => void; current?: boolean };
export type UiBreadcrumbProps = { items: UiBreadcrumbItem[]; accessibilityLabel: string; separator?: ReactNode };
export type UiDropdownItem = { value: string; label: string; description?: string; icon?: ReactNode; tone?: 'default' | 'danger'; disabled?: boolean };
export type UiDropdownMenuProps = {
  trigger: ReactNode; items: UiDropdownItem[]; onSelect: (value: string) => void;
  accessibilityLabel: string; closeLabel?: string;
};
export type UiPaginationLabels = { previous: string; next: string; page: (page: number) => string };
export type UiPaginationProps = { page: number; pageCount: number; onPageChange: (page: number) => void; labels: UiPaginationLabels; siblingCount?: number };
export type UiStatCardProps = { label: string; value: ReactNode; description?: string; icon?: ReactNode; trend?: ReactNode; tone?: UiTone };
export type UiListProps = { children: ReactNode; divided?: boolean };
export type UiListItemProps = { title: string; description?: string; leading?: ReactNode; trailing?: ReactNode; onPress?: () => void; disabled?: boolean };
export type UiListGroupProps = { children: ReactNode; variant?: 'default'|'flush'; horizontal?: boolean };
export type UiListGroupItemProps = { children: ReactNode; leading?: ReactNode; trailing?: ReactNode; active?: boolean; disabled?: boolean; action?: boolean; tone?: UiTone };
export type UiIconButtonProps = {
  icon: UiIconName; accessibilityLabel: string; onPress?: () => void; disabled?: boolean;
  loading?: boolean; tone?: UiTone; variant?: UiVariant; size?: UiSize; rounded?: boolean;
};
export type UiSearchFieldProps = {
  label: string; value: string; onChangeText: (value: string) => void; onSubmit?: () => void;
  placeholder?: string; description?: string; disabled?: boolean; clearLabel: string; submitLabel: string;
};
export type UiPasswordFieldProps = Omit<UiTextFieldProps, 'secureTextEntry' | 'inputMode'> & {
  showPasswordLabel: string; hidePasswordLabel: string;
};
export type UiFormFieldProps = { label: string; children: ReactNode; description?: string; error?: string; required?: boolean };
export type UiKbdProps = { children: ReactNode };
export type UiSheetProps = {
  open: boolean; onClose: () => void; title?: string; closeLabel: string; children: ReactNode;
  footer?: ReactNode; placement?: 'start' | 'end' | 'top' | 'bottom';
};
export type UiToastProps = {
  open: boolean; onClose: () => void; title?: string; closeLabel: string; children: ReactNode;
  tone?: UiTone; action?: ReactNode; duration?: number; time?: ReactNode; variant?: 'default'|'solid'|'translucent';
};
export type UiToastPlacement = 'top-start'|'top-center'|'top-end'|'middle-start'|'middle-center'|'middle-end'|'bottom-start'|'bottom-center'|'bottom-end';
export type UiToastViewportProps = { children: ReactNode; placement?: UiToastPlacement; scope?: 'container'|'screen'; className?: string };
export type UiOverlayPlacement = 'top'|'right'|'bottom'|'left';
export type UiTooltipProps = { trigger: ReactNode; content: ReactNode; accessibilityLabel: string; placement?: UiOverlayPlacement };
export type UiPopoverProps = {
  open: boolean; onOpenChange: (open: boolean) => void; trigger: ReactNode; children: ReactNode;
  accessibilityLabel: string; closeLabel: string; placement?: UiOverlayPlacement;
};
