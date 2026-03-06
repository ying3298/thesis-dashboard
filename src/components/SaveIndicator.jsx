import { useData } from '../context/DataContext';

export default function SaveIndicator() {
  const { editCount, lastSaved, canUndo, undo } = useData();

  return (
    <div className="save-indicator">
      <div className="save-indicator-status">
        <div className="save-indicator-dot" />
        <span>All changes saved</span>
      </div>
      {editCount > 0 && (
        <span>
          {editCount} edit{editCount !== 1 ? 's' : ''} this session
        </span>
      )}
      {canUndo && (
        <button
          onClick={undo}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--blue)',
            fontSize: 10,
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            padding: '2px 0',
            textAlign: 'left',
          }}
        >
          {'\u21A9'} Undo last edit
        </button>
      )}
    </div>
  );
}
