'use client';

import type { UiKbdProps } from '../../../ui/types';

export function UiKbd({ children }: UiKbdProps) {
  return (
    <kbd
      data-slot="kbd"
      className="inline-flex min-h-6 items-center rounded border border-border bg-card px-1.5 font-mono text-xs font-medium text-muted shadow-sm"
    >
      {children}
    </kbd>
  );
}
