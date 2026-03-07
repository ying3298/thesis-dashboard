import { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import { PALETTE } from '../data/affinity';

export default function AffinityMap() {
  const { affinityClusters: clusters, dispatch, activeParticipant, participantMeta } = useData();

  const [activeFilter, setActiveFilter] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [editingCluster, setEditingCluster] = useState(null);
  const [deletingNote, setDeletingNote] = useState(null);
  const [deletingCluster, setDeletingCluster] = useState(null);
  const [movingNote, setMovingNote] = useState(null);
  const [newClusterInput, setNewClusterInput] = useState(false);
  const [newClusterLabel, setNewClusterLabel] = useState('');
  const [dragOverCluster, setDragOverCluster] = useState(null);

  const clusterInputRef = useRef(null);

  const totalNotes = clusters.reduce((sum, c) => sum + c.notes.length, 0);

  useEffect(() => {
    if (newClusterInput && clusterInputRef.current) {
      clusterInputRef.current.focus();
    }
  }, [newClusterInput]);

  // --- Dispatch-based state management ---

  function addNote(clusterId) {
    dispatch({ type: 'ADD_NOTE', clusterId });
  }

  function deleteNote(clusterId, noteId) {
    dispatch({ type: 'DELETE_NOTE', clusterId, noteId });
    setDeletingNote(null);
  }

  function updateNote(clusterId, noteId, updates) {
    dispatch({ type: 'UPDATE_NOTE', clusterId, noteId, updates });
    dispatch({ type: 'SHOW_TOAST', message: 'Saved' });
  }

  function toggleSpecial(clusterId, noteId) {
    dispatch({ type: 'TOGGLE_SPECIAL', clusterId, noteId });
  }

  function moveNote(fromClusterId, toClusterId, noteId) {
    if (fromClusterId === toClusterId) return;
    dispatch({ type: 'MOVE_NOTE', fromClusterId, toClusterId, noteId });
    setMovingNote(null);
  }

  function addCluster(label) {
    if (!label.trim()) return;
    dispatch({ type: 'ADD_CLUSTER', label: label.trim() });
    setNewClusterInput(false);
    setNewClusterLabel('');
  }

  function deleteCluster(clusterId) {
    dispatch({ type: 'DELETE_CLUSTER', clusterId });
    setDeletingCluster(null);
  }

  function updateClusterLabel(clusterId, newLabel) {
    dispatch({ type: 'UPDATE_CLUSTER_LABEL', clusterId, label: newLabel });
    dispatch({ type: 'SHOW_TOAST', message: 'Saved' });
    setEditingCluster(null);
  }

  // --- Drag and drop ---

  function handleDragStart(e, clusterId, noteId) {
    e.dataTransfer.setData('text/plain', JSON.stringify({ clusterId, noteId }));
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragOver(e, clusterId) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverCluster(clusterId);
  }

  function handleDragLeave() {
    setDragOverCluster(null);
  }

  function handleDrop(e, toClusterId) {
    e.preventDefault();
    setDragOverCluster(null);
    try {
      const { clusterId: fromClusterId, noteId } = JSON.parse(e.dataTransfer.getData('text/plain'));
      moveNote(fromClusterId, toClusterId, noteId);
    } catch { /* ignore bad data */ }
  }

  // --- Filtered clusters ---
  const visibleClusters = activeFilter
    ? clusters.filter(c => c.id === activeFilter)
    : clusters;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Page header */}
      <header className="page-header">
        <span className="page-badge" style={{ background: 'var(--blue)', color: '#fff' }}>Research</span>
        <h1 className="page-title" style={{ fontFamily: 'var(--font-heading)' }}>Affinity Map</h1>
        <p className="page-subtitle" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)', maxWidth: 600 }}>
          {totalNotes} notes in {clusters.length} clusters from {participantMeta[activeParticipant]?.label}.
          Click notes to edit. Drag to move between clusters.
        </p>
        <p style={{ color: 'var(--text-3)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
          {clusters.length} clusters &middot; {totalNotes} notes
        </p>
      </header>

      {/* Cluster filter nav */}
      <nav
        className="cluster-nav"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          background: 'var(--bg)',
          padding: '0.75rem 0',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          borderBottom: '1px solid var(--border)',
          marginBottom: '1.5rem',
        }}
      >
        <button
          className="cluster-filter-btn"
          onClick={() => setActiveFilter(null)}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            padding: '5px 12px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            background: !activeFilter ? 'var(--text-1)' : 'var(--surface)',
            color: !activeFilter ? '#fff' : 'var(--text-2)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          All ({totalNotes})
        </button>
        {clusters.map(c => (
          <button
            key={c.id}
            className="cluster-filter-btn"
            onClick={() => setActiveFilter(activeFilter === c.id ? null : c.id)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              padding: '5px 12px',
              borderRadius: 'var(--radius-sm)',
              border: `1px solid ${activeFilter === c.id ? c.color : 'var(--border)'}`,
              background: activeFilter === c.id ? c.color : 'var(--surface)',
              color: activeFilter === c.id ? '#fff' : 'var(--text-2)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: activeFilter === c.id ? '#fff' : c.color,
              display: 'inline-block', flexShrink: 0,
            }} />
            {c.label} ({c.notes.length})
          </button>
        ))}

        {/* New cluster button/input */}
        {newClusterInput ? (
          <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <input
              ref={clusterInputRef}
              value={newClusterLabel}
              onChange={e => setNewClusterLabel(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') addCluster(newClusterLabel);
                if (e.key === 'Escape') { setNewClusterInput(false); setNewClusterLabel(''); }
              }}
              placeholder="Cluster name..."
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                padding: '5px 10px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                outline: 'none',
                width: 150,
              }}
            />
            <button
              onClick={() => addCluster(newClusterLabel)}
              style={{
                fontSize: '0.75rem', padding: '4px 8px',
                borderRadius: 'var(--radius-sm)', border: '1px solid var(--olive)',
                background: 'var(--olive)', color: '#fff', cursor: 'pointer',
              }}
            >Add</button>
            <button
              onClick={() => { setNewClusterInput(false); setNewClusterLabel(''); }}
              style={{
                fontSize: '0.75rem', padding: '4px 8px',
                borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
                background: 'var(--surface)', color: 'var(--text-2)', cursor: 'pointer',
              }}
            >Cancel</button>
          </span>
        ) : (
          <button
            onClick={() => setNewClusterInput(true)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              padding: '5px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px dashed var(--border)',
              background: 'transparent',
              color: 'var(--text-3)',
              cursor: 'pointer',
            }}
          >
            + New cluster
          </button>
        )}
      </nav>

      {/* Cluster blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {visibleClusters.map(cluster => (
          <section
            key={cluster.id}
            onDragOver={e => handleDragOver(e, cluster.id)}
            onDragLeave={handleDragLeave}
            onDrop={e => handleDrop(e, cluster.id)}
            style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              border: `1px solid ${dragOverCluster === cluster.id ? cluster.color : 'var(--border)'}`,
              padding: '1.25rem',
              transition: 'border-color 0.2s ease',
              boxShadow: dragOverCluster === cluster.id ? `0 0 0 2px ${cluster.color}22` : 'none',
            }}
          >
            {/* Cluster header */}
            <div className="cluster-header" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
              <span className="cluster-dot" style={{ width: 12, height: 12, borderRadius: '50%', background: cluster.color, flexShrink: 0 }} />

              {editingCluster === cluster.id ? (
                <input
                  autoFocus
                  defaultValue={cluster.label}
                  onBlur={e => updateClusterLabel(cluster.id, e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') { updateClusterLabel(cluster.id, e.target.value); }
                    if (e.key === 'Escape') setEditingCluster(null);
                  }}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '2px 8px',
                    outline: 'none',
                    flex: 1,
                  }}
                />
              ) : (
                <h2
                  className="cluster-title"
                  onClick={() => setEditingCluster(cluster.id)}
                  title="Click to rename"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: 'var(--text-1)',
                    cursor: 'text',
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {cluster.label}
                </h2>
              )}

              <span className="cluster-count" style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-3)',
              }}>
                {cluster.notes.length}
              </span>

              {deletingCluster === cluster.id ? (
                <span style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: '0.75rem' }}>
                  <span style={{ color: 'var(--terracotta)' }}>Delete?</span>
                  <button
                    onClick={() => deleteCluster(cluster.id)}
                    style={{
                      fontSize: '0.7rem', padding: '2px 6px',
                      background: 'var(--terracotta)', color: '#fff',
                      border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                    }}
                  >Yes</button>
                  <button
                    onClick={() => setDeletingCluster(null)}
                    style={{
                      fontSize: '0.7rem', padding: '2px 6px',
                      background: 'var(--surface)', color: 'var(--text-2)',
                      border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                    }}
                  >No</button>
                </span>
              ) : (
                <button
                  onClick={() => setDeletingCluster(cluster.id)}
                  title="Delete cluster"
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--text-3)', fontSize: '1rem',
                    opacity: 0.5, transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={e => e.target.style.opacity = 1}
                  onMouseLeave={e => e.target.style.opacity = 0.5}
                >
                  &times;
                </button>
              )}
            </div>

            {/* Note grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '0.75rem',
            }}>
              {cluster.notes.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  cluster={cluster}
                  clusters={clusters}
                  isEditing={editingNote === note.id}
                  isDeleting={deletingNote === note.id}
                  isMoving={movingNote === note.id}
                  onEdit={() => setEditingNote(note.id)}
                  onCancelEdit={() => setEditingNote(null)}
                  onSaveEdit={(updates) => { updateNote(cluster.id, note.id, updates); setEditingNote(null); }}
                  onDelete={() => setDeletingNote(note.id)}
                  onConfirmDelete={() => deleteNote(cluster.id, note.id)}
                  onCancelDelete={() => setDeletingNote(null)}
                  onToggleSpecial={() => toggleSpecial(cluster.id, note.id)}
                  onMove={() => setMovingNote(movingNote === note.id ? null : note.id)}
                  onMoveToCluster={(toId) => moveNote(cluster.id, toId, note.id)}
                  onDragStart={(e) => handleDragStart(e, cluster.id, note.id)}
                />
              ))}

              {/* Add note button */}
              <button
                className="add-note-btn"
                onClick={() => addNote(cluster.id)}
                style={{
                  minHeight: 80,
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px dashed var(--border)',
                  background: 'transparent',
                  color: 'var(--text-3)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = cluster.color; e.currentTarget.style.color = cluster.color; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-3)'; }}
              >
                + Add note
              </button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}


/* --- NoteCard sub-component --- */

function NoteCard({
  note, cluster, clusters,
  isEditing, isDeleting, isMoving,
  onEdit, onCancelEdit, onSaveEdit,
  onDelete, onConfirmDelete, onCancelDelete,
  onToggleSpecial, onMove, onMoveToCluster,
  onDragStart,
}) {
  const [hovered, setHovered] = useState(false);
  const [editText, setEditText] = useState(note.text);
  const [editTag, setEditTag] = useState(note.tag);

  useEffect(() => {
    setEditText(note.text);
    setEditTag(note.tag);
  }, [note.text, note.tag, isEditing]);

  const tagColor = cluster.color;

  return (
    <div
      className="note-card"
      draggable={!isEditing}
      onDragStart={onDragStart}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: note.special ? 'var(--highlight-bg)' : '#FDFCF9',
        borderLeft: note.special ? '3px solid var(--highlight-border)' : '3px solid transparent',
        borderRadius: 'var(--radius-md)',
        border: note.special
          ? '1px solid var(--highlight-border)'
          : '1px solid var(--border)',
        borderLeftWidth: 3,
        borderLeftStyle: 'solid',
        borderLeftColor: note.special ? 'var(--highlight-border)' : 'transparent',
        padding: '0.75rem',
        cursor: isEditing ? 'default' : 'grab',
        transition: 'box-shadow 0.15s ease, transform 0.1s ease',
        boxShadow: hovered && !isEditing ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
        transform: hovered && !isEditing ? 'translateY(-1px)' : 'none',
        position: 'relative',
        minHeight: 80,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      {/* Tag */}
      {isEditing ? (
        <input
          value={editTag}
          onChange={e => setEditTag(e.target.value)}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            padding: '2px 6px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            width: '100%',
            outline: 'none',
          }}
        />
      ) : (
        <span
          className="note-tag"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: tagColor,
            fontWeight: 600,
          }}
        >
          {note.tag}
        </span>
      )}

      {/* Text */}
      {isEditing ? (
        <textarea
          value={editText}
          onChange={e => setEditText(e.target.value)}
          rows={3}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            lineHeight: 1.5,
            color: 'var(--text-1)',
            padding: '4px 6px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            resize: 'vertical',
            outline: 'none',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
      ) : (
        <p
          className="note-text"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            lineHeight: 1.5,
            color: 'var(--text-1)',
            margin: 0,
            flex: 1,
          }}
        >
          {note.text}
        </p>
      )}

      {/* Edit save/cancel */}
      {isEditing && (
        <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
          <button
            onClick={() => onSaveEdit({ text: editText, tag: editTag })}
            style={{
              fontSize: '0.7rem', padding: '3px 10px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--olive)', color: '#fff',
              border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
          >Save</button>
          <button
            onClick={onCancelEdit}
            style={{
              fontSize: '0.7rem', padding: '3px 10px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--surface)', color: 'var(--text-2)',
              border: '1px solid var(--border)', cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
          >Cancel</button>
        </div>
      )}

      {/* Delete confirmation */}
      {isDeleting && (
        <div style={{
          display: 'flex', gap: 4, alignItems: 'center',
          marginTop: 4, padding: '4px 0',
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--terracotta)', fontFamily: 'var(--font-body)' }}>
            Delete?
          </span>
          <button
            onClick={onConfirmDelete}
            style={{
              fontSize: '0.68rem', padding: '2px 8px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--terracotta)', color: '#fff',
              border: 'none', cursor: 'pointer',
            }}
          >Yes</button>
          <button
            onClick={onCancelDelete}
            style={{
              fontSize: '0.68rem', padding: '2px 8px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--surface)', color: 'var(--text-2)',
              border: '1px solid var(--border)', cursor: 'pointer',
            }}
          >No</button>
        </div>
      )}

      {/* Move dropdown */}
      {isMoving && (
        <div style={{
          position: 'absolute', right: 8, top: 36, zIndex: 10,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          padding: '4px 0',
          minWidth: 180,
        }}>
          <div style={{
            padding: '4px 10px', fontSize: '0.7rem',
            color: 'var(--text-3)', fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>
            Move to...
          </div>
          {clusters.filter(c => c.id !== cluster.id).map(c => (
            <button
              key={c.id}
              onClick={() => onMoveToCluster(c.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                width: '100%', padding: '6px 10px',
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                color: 'var(--text-1)', textAlign: 'left',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
              {c.label}
            </button>
          ))}
        </div>
      )}

      {/* Hover action buttons */}
      {hovered && !isEditing && !isDeleting && (
        <div
          className="note-actions"
          style={{
            position: 'absolute', top: 6, right: 6,
            display: 'flex', gap: 2,
          }}
        >
          <ActionBtn title="Edit" onClick={onEdit}>&#9998;</ActionBtn>
          <ActionBtn title={note.special ? 'Unmark' : 'Highlight'} onClick={onToggleSpecial}>
            {note.special ? '\u2605' : '\u2606'}
          </ActionBtn>
          <ActionBtn title="Move to..." onClick={onMove}>&nearr;</ActionBtn>
          <ActionBtn title="Delete" onClick={onDelete}>&times;</ActionBtn>
        </div>
      )}
    </div>
  );
}

function ActionBtn({ children, onClick, title }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className="action-btn"
      title={title}
      onClick={e => { e.stopPropagation(); onClick(); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 24, height: 24,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--radius-sm)',
        border: 'none',
        background: hovered ? 'var(--bg)' : 'var(--surface)',
        color: hovered ? 'var(--text-1)' : 'var(--text-3)',
        cursor: 'pointer',
        fontSize: '0.85rem',
        lineHeight: 1,
        transition: 'all 0.1s ease',
        padding: 0,
      }}
    >
      {children}
    </button>
  );
}
