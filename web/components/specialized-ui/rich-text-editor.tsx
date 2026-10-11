'use client';

import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/models/dom';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/code';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
import 'tinymce/plugins/wordcount';
import type { SpecializedRichTextEditorProps } from '@scenariom/design-system/specialized-types';

export function SpecializedRichTextEditor({ value, onChange, accessibilityLabel, placeholder, disabled, direction = 'ltr', minHeight = 360 }: SpecializedRichTextEditorProps) {
  return <div aria-label={accessibilityLabel} className="overflow-hidden rounded-lg border border-border bg-surface">
    <Editor
      licenseKey="gpl"
      value={value}
      disabled={disabled}
      onEditorChange={onChange}
      init={{
        branding: false,
        content_css: false,
        content_style: `body{background:var(--sc-surface,#fff);color:var(--sc-foreground,#111827);font-family:system-ui,sans-serif;font-size:14px;line-height:1.65;padding:12px} table{border-collapse:collapse;width:100%}td,th{border:1px solid #94a3b8;padding:8px}`,
        directionality: direction,
        height: minHeight,
        menubar: false,
        placeholder,
        plugins: 'advlist autolink code directionality fullscreen image link lists media preview searchreplace table wordcount',
        promotion: false,
        skin: false,
        statusbar: true,
        toolbar: 'undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | ltr rtl | link image media table | code fullscreen',
      }}
    />
  </div>;
}
