import type { ReactNode } from 'react';

export type SpecializedDirection = 'ltr' | 'rtl';

export type SpecializedRichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  accessibilityLabel: string;
  placeholder?: string;
  disabled?: boolean;
  direction?: SpecializedDirection;
  minHeight?: number;
};

export type SpecializedDataColumn<TItem> = {
  key: string;
  label: string;
  render: (item: TItem) => ReactNode;
  width?: number;
  sortValue?: (item: TItem) => string | number;
};

export type SpecializedDataViewProps<TItem> = {
  data: TItem[];
  columns: SpecializedDataColumn<TItem>[];
  getItemKey: (item: TItem) => string;
  emptyContent: ReactNode;
  onItemPress?: (item: TItem) => void;
};
export type SpecializedAdvancedDataViewProps<TItem> = SpecializedDataViewProps<TItem> & {
  searchText: (item: TItem) => string;
  searchPlaceholder: string;
  previousLabel: string;
  nextLabel: string;
  pageLabel: (page: number, pageCount: number) => string;
  pageSize?: number;
  selectedIds?: string[];
  onSelectedIdsChange?: (ids: string[]) => void;
  selectLabel?: (item: TItem) => string;
  renderExpanded?: (item: TItem) => ReactNode;
};

export type SpecializedChartDatum = { label: string; value: number; color?: string };
export type SpecializedChartProps = {
  data: SpecializedChartDatum[];
  accessibilityLabel: string;
  valueFormatter?: (value: number) => string;
  height?: number;
};

export type SpecializedCarouselItem = { key: string; content: ReactNode; accessibilityLabel?: string };
export type SpecializedCarouselProps = {
  items: SpecializedCarouselItem[];
  accessibilityLabel: string;
  previousLabel: string;
  nextLabel: string;
};

export type SpecializedSortableItem = { id: string; content: ReactNode };
export type SpecializedSortableListProps = {
  items: SpecializedSortableItem[];
  onItemsChange: (items: SpecializedSortableItem[]) => void;
  moveUpLabel: (index: number) => string;
  moveDownLabel: (index: number) => string;
};

export type SpecializedVideoProps = {
  sourceUrl: string;
  title: string;
  aspectRatio?: '21:9' | '16:9' | '4:3' | '1:1';
};

export type SpecializedImageAsset = {
  uri: string;
  width: number;
  height: number;
  mimeType?: string;
  fileName?: string;
};

export type SpecializedImagePickerProps = {
  value?: SpecializedImageAsset;
  onChange: (asset: SpecializedImageAsset) => void;
  accessibilityLabel: string;
  chooseLabel: string;
  confirmLabel: string;
  cancelLabel: string;
  zoomLabel: string;
  aspect?: [number, number];
  disabled?: boolean;
};
export type SpecializedMediaItem = { id: string; uri: string; title: string; thumbnailUri?: string; type?: 'image' | 'video' };
export type SpecializedAudioPlayerProps = { sourceUrl: string; title: string; playLabel: string; pauseLabel: string };
export type SpecializedGalleryProps = { items: SpecializedMediaItem[]; onItemPress: (item: SpecializedMediaItem) => void; emptyContent?: ReactNode; columns?: number };
export type SpecializedLightboxProps = { open: boolean; item?: SpecializedMediaItem; onClose: () => void; closeLabel: string; previousLabel: string; nextLabel: string; onPrevious?: () => void; onNext?: () => void };
export type SpecializedDocumentViewerProps = { sourceUrl: string; title: string; openLabel: string };
export type SpecializedCameraCaptureProps = { onCapture: (asset: SpecializedImageAsset) => void; captureLabel: string; cancelLabel: string; permissionTitle: string; permissionDescription: string; requestPermissionLabel: string };
export type SpecializedVoiceRecorderProps = { onRecorded: (asset: { uri: string; duration?: number; mimeType?: string }) => void; startLabel: string; stopLabel: string; permissionDeniedMessage: string };
export type SpecializedShapeButtonProps = { children: ReactNode; accessibilityLabel?: string; disabled?: boolean; onPress?: () => void; width?: number; height?: number };
