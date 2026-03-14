import { useState } from 'react';
import { useData } from '../context/DataContext';
import EditableText from '../components/EditableText';
import EditableTextarea from '../components/EditableTextarea';
import AddItemButton from '../components/AddItemButton';
import DeleteButton from '../components/DeleteButton';

export default function Findings() {
  const { findings, coreTension, dispatch, activeParticipant, participantMeta } = useData();
  const [expanded, setExpanded] = useState(null);

  const toggle = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <div className="stagger">
      {/* Page Header */}
      <header className="page-header">
        <span
          className="page-badge"
          style={{
            background: 'var(--terracotta, #C46B4D)',
            color: '#fff',
          }}
        >
          Findings
        </span>
        <h1 className="page-title">What We Learned</h1>
        <p className="page-subtitle">
          {findings.length} key findings from {participantMeta[activeParticipant]?.label}. Each one has evidence (their actual words) and a
          design implication.
        </p>
      </header>

      {/* Findings Cards */}
      <div className="grid-cards">
        {findings.map((finding, index) => {
          const isOpen = expanded === finding.id;
          return (
            <div key={finding.id} className="card fade-in editable-card">
              {/* Hover action buttons */}
              <div className="card-hover-actions">
                {index > 0 && (
                  <button
                    className="action-btn"
                    title="Move up"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({ type: 'REORDER_FINDING', id: finding.id, direction: 'up' });
                    }}
                  >
                    {'\u2191'}
                  </button>
                )}
                {index < findings.length - 1 && (
                  <button
                    className="action-btn"
                    title="Move down"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({ type: 'REORDER_FINDING', id: finding.id, direction: 'down' });
                    }}
                  >
                    {'\u2193'}
                  </button>
                )}
                <DeleteButton
                  onConfirm={() => dispatch({ type: 'DELETE_FINDING', id: finding.id })}
                  itemLabel="finding"
                />
              </div>

              {/* Card Header — always visible */}
              <div
                className="card-header"
                onClick={() => toggle(finding.id)}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle(finding.id);
                  }
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <span
                    style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EditableText
                      value={finding.emoji}
                      onSave={(v) => dispatch({ type: 'UPDATE_FINDING', id: finding.id, field: 'emoji', value: v })}
                      placeholder="?"
                      style={{ fontSize: 22, lineHeight: 1 }}
                    />
                  </span>
                  <span
                    className="card-title"
                    style={{ margin: 0 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EditableText
                      value={finding.title}
                      onSave={(v) => dispatch({ type: 'UPDATE_FINDING', id: finding.id, field: 'title', value: v })}
                      placeholder="Finding title..."
                    />
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  <span
                    className="card-tag"
                    style={{
                      background: 'var(--highlight-bg, #FFFBF0)',
                      color: 'var(--terracotta, #C46B4D)',
                      border: '1px solid var(--highlight-border, #D4A843)',
                      fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                      fontSize: '0.7rem',
                    }}
                  >
                    #{typeof finding.id === 'number' ? finding.id : index + 1}
                  </span>
                  <span
                    className="card-toggle"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      background: isOpen
                        ? 'var(--terracotta, #C46B4D)'
                        : 'var(--highlight-bg, #FFFBF0)',
                      color: isOpen ? '#fff' : 'var(--text-3, #999)',
                      fontSize: '0.85rem',
                      transition: 'all 0.2s ease',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      lineHeight: 1,
                    }}
                  >
                    {'\u25BE'}
                  </span>
                </div>
              </div>

              {/* Card Body — expanded content */}
              {isOpen && (
                <div
                  className="card-body"
                  style={{
                    borderTop: '1px solid var(--border, #E8E4DE)',
                    padding: '20px 24px 24px',
                    animation: 'fadeSlideIn 0.25s ease-out',
                  }}
                >
                  {/* Evidence quote */}
                  <div style={{ marginBottom: 20 }}>
                    <h4
                      style={{
                        fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--text-3, #999)',
                        margin: '0 0 8px 0',
                      }}
                    >
                      In her words
                    </h4>
                    <blockquote
                      style={{
                        margin: 0,
                        padding: '14px 18px',
                        borderLeft: '3px solid var(--terracotta, #C46B4D)',
                        background: 'var(--highlight-bg, #FFFBF0)',
                        borderRadius: '0 var(--radius-sm, 6px) var(--radius-sm, 6px) 0',
                        fontStyle: 'italic',
                        fontSize: '0.92rem',
                        lineHeight: 1.65,
                        color: 'var(--text-1, #1A1A1A)',
                      }}
                    >
                      <EditableTextarea
                        value={finding.evidence}
                        onSave={(v) => dispatch({ type: 'UPDATE_FINDING', id: finding.id, field: 'evidence', value: v })}
                        placeholder="Add evidence quote..."
                        style={{
                          fontStyle: 'italic',
                          fontSize: '0.92rem',
                          lineHeight: 1.65,
                          color: 'var(--text-1, #1A1A1A)',
                        }}
                      />
                    </blockquote>
                  </div>

                  {/* Summary */}
                  <div style={{ marginBottom: 20 }}>
                    <h4
                      style={{
                        fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--text-3, #999)',
                        margin: '0 0 8px 0',
                      }}
                    >
                      What this means
                    </h4>
                    <div
                      style={{
                        margin: 0,
                        fontSize: '0.92rem',
                        lineHeight: 1.65,
                        color: 'var(--text-2, #6B6B6B)',
                      }}
                    >
                      <EditableTextarea
                        value={finding.summary}
                        onSave={(v) => dispatch({ type: 'UPDATE_FINDING', id: finding.id, field: 'summary', value: v })}
                        placeholder="Add summary..."
                        style={{
                          fontSize: '0.92rem',
                          lineHeight: 1.65,
                          color: 'var(--text-2, #6B6B6B)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Design implication */}
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--text-3, #999)',
                        margin: '0 0 8px 0',
                      }}
                    >
                      {'For the design \u2192'}
                    </h4>
                    <div
                      className="card-tip"
                      style={{
                        padding: '14px 18px',
                        background: 'linear-gradient(135deg, #F0F4EE 0%, #F6F5F0 100%)',
                        border: '1px solid var(--border, #E8E4DE)',
                        borderRadius: 'var(--radius-sm, 6px)',
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        color: 'var(--olive, #4A6741)',
                        fontWeight: 500,
                      }}
                    >
                      <EditableTextarea
                        value={finding.designImplication}
                        onSave={(v) => dispatch({ type: 'UPDATE_FINDING', id: finding.id, field: 'designImplication', value: v })}
                        placeholder="Add design implication..."
                        style={{
                          fontSize: '0.9rem',
                          lineHeight: 1.6,
                          color: 'var(--olive, #4A6741)',
                          fontWeight: 500,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Finding Button */}
      <div style={{ marginTop: 16 }}>
        <AddItemButton
          label="+ Add finding"
          onAdd={() => dispatch({ type: 'ADD_FINDING' })}
          accentColor="var(--terracotta)"
        />
      </div>

      {/* Synthesis Callout */}
      <section style={{ marginTop: 48, marginBottom: 24 }}>
        <div
          style={{
            padding: '24px 28px',
            background: 'var(--highlight-bg, #FFFBF0)',
            border: '1px solid var(--highlight-border, #D4A843)',
            borderRadius: 'var(--radius-md, 10px)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-heading, "Instrument Serif", serif)',
              fontSize: '1.15rem',
              fontWeight: 400,
              color: 'var(--text-1, #1A1A1A)',
              margin: '0 0 10px 0',
            }}
          >
            The Core Tension
          </h3>
          <div
            style={{
              margin: 0,
              fontSize: '0.95rem',
              lineHeight: 1.7,
              color: 'var(--text-2, #6B6B6B)',
            }}
          >
            <EditableTextarea
              value={coreTension.main}
              onSave={(v) => dispatch({ type: 'UPDATE_CORE_TENSION', field: 'main', value: v })}
              placeholder="Core tension statement..."
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.7,
                color: 'var(--text-2, #6B6B6B)',
                marginBottom: 8,
              }}
            />
            <EditableTextarea
              value={coreTension.sub}
              onSave={(v) => dispatch({ type: 'UPDATE_CORE_TENSION', field: 'sub', value: v })}
              placeholder="Supporting detail..."
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.7,
                color: 'var(--text-2, #6B6B6B)',
              }}
            />
          </div>
        </div>
      </section>

      {/* Inline keyframes for expand animation */}
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
