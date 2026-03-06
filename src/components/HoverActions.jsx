export default function HoverActions({ visible, actions }) {
  if (!visible) return null;

  return (
    <div className="note-actions" style={{ display: 'flex', gap: 2 }}>
      {actions.map((action, i) => (
        <button
          key={i}
          className="action-btn"
          onClick={e => { e.stopPropagation(); action.onClick(); }}
          title={action.title}
          style={action.style || {}}
        >
          {action.icon}
        </button>
      ))}
    </div>
  );
}
