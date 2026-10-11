'use client';

import type { UiDividerProps } from '../../../ui/types';

export function UiDivider({ label }: UiDividerProps) {
  return (
    <div role="separator" className="flex items-center gap-3 text-xs text-muted">
      <span className="h-px flex-1 bg-border" />
      {label && <span>{label}</span>}
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
