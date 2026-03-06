import { useState, useRef, useEffect } from 'react';

export default function AddItemButton({ label = '+ Add', onAdd, needsInput = false, inputPlaceholder = 'New item...', accentColor = 'var(--olive)' }) {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (showInput && inputRef.current) inputRef.current.focus();
  }, [showInput]);

  const submit = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      onAdd(trimmed);
      setInputValue('');
      setShowInput(false);
    }
  };

  const cancel = () => {
    setInputValue('');
    setShowInput(false);
  };

  if (needsInput && showInput) {
    return (
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 8 }}>
        <input
          ref={inputRef}
          className="editable-input"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') submit();
            if (e.key === 'Escape') cancel();
          }}
          placeholder={inputPlaceholder}
          style={{ flex: 1, fontSize: 13, padding: '6px 10px' }}
        />
        <button onClick={submit} style={{
          background: accentColor, color: '#FFF', border: 'none',
          borderRadius: 'var(--radius-sm)', padding: '6px 14px',
          fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-body)',
          fontWeight: 500, whiteSpace: 'nowrap',
        }}>Add</button>
        <button onClick={cancel} style={{
          background: 'var(--border)', color: 'var(--text-2)', border: 'none',
          borderRadius: 'var(--radius-sm)', padding: '6px 10px',
          fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-body)',
        }}>Cancel</button>
      </div>
    );
  }

  return (
    <button
      className="add-item-btn"
      onClick={() => needsInput ? setShowInput(true) : onAdd()}
      style={{ '--accent': accentColor }}
    >
      {label}
    </button>
  );
}
