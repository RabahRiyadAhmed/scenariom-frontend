'use dom';

import { useEffect, useRef } from 'react';

type Props = {
  value: string;
  onValueChange: (value: string) => Promise<void>;
  accessibilityLabel: string;
  placeholder?: string;
  disabled?: boolean;
  direction?: 'ltr' | 'rtl';
  minHeight?: number;
  colors: { background: string; foreground: string; toolbar: string; border: string; muted: string };
  dom?: import('expo/dom').DOMProps;
};

export default function RichTextEditorDom({ value, onValueChange, accessibilityLabel, placeholder = '', disabled, direction = 'ltr', minHeight = 280, colors }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value && document.activeElement !== editorRef.current) editorRef.current.innerHTML = value;
  }, [value]);

  const command = (name: string, argument?: string) => {
    if (disabled) return;
    editorRef.current?.focus();
    document.execCommand(name, false, argument);
    void onValueChange(editorRef.current?.innerHTML ?? '');
  };

  return <main dir={direction} style={{ fontFamily: 'system-ui, sans-serif', background: colors.background, color: colors.foreground }}>
    <style>{`*{box-sizing:border-box}body{margin:0;background:${colors.background};color:${colors.foreground}}.toolbar{display:flex;flex-wrap:wrap;gap:6px;padding:8px;border-bottom:1px solid ${colors.border};background:${colors.toolbar}}.toolbar button{min-width:38px;min-height:36px;border:1px solid ${colors.border};border-radius:6px;background:${colors.background};color:${colors.foreground};font-weight:600}.editor{padding:12px;outline:none;line-height:1.65}.editor:empty:before{content:attr(data-placeholder);color:${colors.muted}}.editor table{width:100%;border-collapse:collapse}.editor td,.editor th{border:1px solid ${colors.border};padding:6px}`}</style>
    <div className="toolbar" aria-label={accessibilityLabel}>
      <button type="button" onClick={() => command('bold')} disabled={disabled}>B</button>
      <button type="button" onClick={() => command('italic')} disabled={disabled}><i>I</i></button>
      <button type="button" onClick={() => command('underline')} disabled={disabled}><u>U</u></button>
      <button type="button" onClick={() => command('insertUnorderedList')} disabled={disabled}>•</button>
      <button type="button" onClick={() => command('insertOrderedList')} disabled={disabled}>1.</button>
      <button type="button" onClick={() => command('justifyLeft')} disabled={disabled}>⇤</button>
      <button type="button" onClick={() => command('justifyCenter')} disabled={disabled}>↔</button>
      <button type="button" onClick={() => command('justifyRight')} disabled={disabled}>⇥</button>
    </div>
    <div ref={editorRef} className="editor" role="textbox" aria-label={accessibilityLabel} aria-multiline contentEditable={!disabled} suppressContentEditableWarning data-placeholder={placeholder} style={{ minHeight }} onInput={event => void onValueChange(event.currentTarget.innerHTML)}/>
  </main>;
}
