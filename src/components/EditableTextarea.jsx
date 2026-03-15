import { useState, useRef, useEffect, useCallback } from 'react';

export default function EditableTextarea({ value, onSave, placeholder, className = '', style = {}, rows = 2 }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const textareaRef = useRef(null);
  const draftRef = useRef(draft);
  const valueRef = useRef(value);
  const onSaveRef = useRef(onSave);

  // Keep refs in sync
  draftRef.current = draft;
  valueRef.current = value;
  onSaveRef.current = onSave;

  useEffect(() => { setDraft(value); }, [value]);

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
      // Auto-size
      const ta = textareaRef.current;
      ta.style.height = 'auto';
      ta.style.height = ta.scrollHeight + 'px';
    }
  }, [editing]);

  // Save on unmount if still editing
  useEffect(() => {
    if (!editing) return;
    return () => {
      const trimmed = draftRef.current.trim();
      if (trimmed !== valueRef.current) onSaveRef.current(trimmed);
    };
  }, [editing]);

  const autoSize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const save = () => {
    const trimmed = draft.trim();
    if (trimmed !== value) onSave(trimmed);
    else setDraft(value);
    setEditing(false);
  };

  if (editing) {
    return (
      <textarea
        ref={textareaRef}
        className="editable-input"
        value={draft}
        onChange={e => { setDraft(e.target.value); autoSize(e); }}
        onBlur={save}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); save(); }
          if (e.key === 'Escape') { setDraft(value); setEditing(false); }
        }}
        placeholder={placeholder}
        rows={rows}
        style={{
          font: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          lineHeight: 'inherit',
          color: 'inherit',
          resize: 'none',
          overflow: 'hidden',
          width: '100%',
          ...style,
        }}
      />
    );
  }

  return (
    <div
      className={`editable-text ${className}`}
      onClick={() => setEditing(true)}
      style={{ ...style, cursor: 'text', whiteSpace: 'pre-wrap' }}
      title="Click to edit"
    >
      {value || <span style={{ color: 'var(--text-3)', fontStyle: 'italic' }}>{placeholder || 'Click to add...'}</span>}
    </div>
  );
}
