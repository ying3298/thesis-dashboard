import { useState, useRef, useEffect } from 'react';

export default function EditableText({ value, onSave, placeholder, tag: Tag = 'span', className = '', style = {}, inputStyle = {} }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef(null);
  const draftRef = useRef(draft);
  const valueRef = useRef(value);
  const onSaveRef = useRef(onSave);

  // Keep refs in sync
  draftRef.current = draft;
  valueRef.current = value;
  onSaveRef.current = onSave;

  useEffect(() => { setDraft(value); }, [value]);
  useEffect(() => { if (editing && inputRef.current) inputRef.current.focus(); }, [editing]);

  // Save on unmount if still editing
  useEffect(() => {
    if (!editing) return;
    return () => {
      const trimmed = draftRef.current.trim();
      if (trimmed && trimmed !== valueRef.current) onSaveRef.current(trimmed);
    };
  }, [editing]);

  const save = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== value) onSave(trimmed);
    else setDraft(value);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        className="editable-input"
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={save}
        onKeyDown={e => {
          if (e.key === 'Enter') { e.preventDefault(); save(); }
          if (e.key === 'Escape') { setDraft(value); setEditing(false); }
        }}
        placeholder={placeholder}
        style={{
          font: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          fontFamily: 'inherit',
          letterSpacing: 'inherit',
          ...inputStyle,
        }}
      />
    );
  }

  return (
    <Tag
      className={`editable-text ${className}`}
      onClick={() => setEditing(true)}
      style={{ ...style, cursor: 'text' }}
      title="Click to edit"
    >
      {value || <span style={{ color: 'var(--text-3)', fontStyle: 'italic' }}>{placeholder || 'Click to add...'}</span>}
    </Tag>
  );
}
