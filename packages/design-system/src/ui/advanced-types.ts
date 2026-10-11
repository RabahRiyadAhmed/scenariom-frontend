import type { ReactNode } from 'react';
import type { UiOption } from './types';

export type UiDatePickerProps = { label: string; value?: string; onValueChange: (isoDate: string) => void; minimumDate?: string; maximumDate?: string; disabled?: boolean; error?: string; description?: string };
export type UiDateRange = { start?: string; end?: string };
export type UiDateRangePickerProps = { label: string; value: UiDateRange; onValueChange: (value: UiDateRange) => void; startLabel: string; endLabel: string; disabled?: boolean; error?: string };
export type UiTimePickerProps = { label: string; value?: string; onValueChange: (time: string) => void; disabled?: boolean; error?: string; description?: string };
export type UiComboboxProps = { label: string; value?: string; options: UiOption[]; onValueChange: (value: string) => void; placeholder: string; searchPlaceholder: string; emptyMessage: string; closeLabel: string; disabled?: boolean; error?: string };
export type UiMultiSelectProps = { label: string; values: string[]; options: UiOption[]; onValuesChange: (values: string[]) => void; placeholder: string; closeLabel: string; removeLabel: (label: string) => string; hideSelected?: boolean; searchable?: boolean; searchPlaceholder?: string; emptyMessage?: string; disabled?: boolean; error?: string };
export type UiNumberFieldProps = { label: string; value: number; onValueChange: (value: number) => void; decreaseLabel: string; increaseLabel: string; min?: number; max?: number; step?: number; disabled?: boolean; error?: string; description?: string };
export type UiPhoneFieldProps = { label: string; countryCode: string; value: string; onCountryCodeChange: (code: string) => void; onValueChange: (value: string) => void; countryOptions: UiOption[]; placeholder?: string; disabled?: boolean; error?: string; description?: string };
export type UiColorPickerProps = { label: string; value: string; onValueChange: (value: string) => void; disabled?: boolean; description?: string };
export type UiRangeSliderProps = { label: string; value: number; onValueChange: (value: number) => void; min?: number; max?: number; step?: number; valueLabel?: string; disabled?: boolean };
export type UiFileAsset = { uri: string; name: string; mimeType?: string; size?: number };
export type UiFileUploadProps = { label: string; files: UiFileAsset[]; onFilesChange: (files: UiFileAsset[]) => void; onChoose?: () => Promise<UiFileAsset[]>; chooseLabel: string; removeLabel: (name: string) => string; accept?: string[]; multiple?: boolean; maxFiles?: number; disabled?: boolean; description?: string; error?: string; leading?: ReactNode };
