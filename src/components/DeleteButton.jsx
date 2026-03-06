import { useState } from 'react';

export default function DeleteButton({ onConfirm, itemLabel = 'this', size = 'small' }) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <span className="delete-confirm">
        <span className="delete-confirm-label">Delete {itemLabel}?</span>
        <button onClick={() => { onConfirm(); setConfirming(false); }} style={{
          background: 'var(--terracotta)', color: '#FFF', border: 'none',
          borderRadius: 4, padding: '2px 8px', fontSize: 10,
          cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 500,
        }}>Yes</button>
        <button onClick={() => setConfirming(false)} style={{
          background: 'var(--border)', color: 'var(--text-2)', border: 'none',
          borderRadius: 4, padding: '2px 8px', fontSize: 10,
          cursor: 'pointer', fontFamily: 'var(--font-body)',
        }}>No</button>
      </span>
    );
  }

  return (
    <button
      className="action-btn"
      onClick={(e) => { e.stopPropagation(); setConfirming(true); }}
      title={`Delete ${itemLabel}`}
      style={size === 'small' ? {} : { width: 'auto', height: 'auto', padding: '2px 8px' }}
    >
      ×
    </button>
  );
}
