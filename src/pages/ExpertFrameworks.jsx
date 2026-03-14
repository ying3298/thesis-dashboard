import { useState } from 'react';
import { useData } from '../context/DataContext';
import EditableText from '../components/EditableText';
import EditableTextarea from '../components/EditableTextarea';
import DeleteButton from '../components/DeleteButton';
import AddItemButton from '../components/AddItemButton';

export default function ExpertFrameworks() {
  const { experts, designConstraints, dispatch } = useData();
  const [expandedId, setExpandedId] = useState(null);

  const toggle = (id) => setExpandedId(prev => (prev === id ? null : id));

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Page Header */}
      <header className="page-header">
        <span className="page-badge" style={{ background: 'var(--blue)', color: '#fff' }}>
          Frameworks
        </span>
        <h1 className="page-title" style={{ fontFamily: 'var(--font-heading)' }}>
          Expert Frameworks
        </h1>
        <p
          className="page-subtitle"
          style={{
            color: 'var(--text-2)',
            fontFamily: 'var(--font-body)',
            maxWidth: 540,
          }}
        >
          Academic voices that ground the Paired Calendar design.
          {' '}{experts.length} experts across communication, sociology, and design.
        </p>
      </header>

      {/* Expert Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {experts.map((expert, idx) => {
          const isOpen = expandedId === expert.id;
          return (
            <div
              key={expert.id}
              className="card"
              style={{
                background: 'var(--surface)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                borderLeft: '4px solid var(--blue)',
                position: 'relative',
              }}
            >
              {/* Card Header — always visible */}
              <div
                onClick={() => toggle(expert.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.15rem',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                {/* Number */}
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.6rem',
                  color: 'var(--blue)',
                  lineHeight: 1,
                  flexShrink: 0,
                  minWidth: 28,
                  textAlign: 'center',
                  opacity: 0.8,
                }}>
                  {idx + 1}
                </span>

                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Name */}
                  <h3 style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'var(--text-1)',
                    margin: '0 0 0.2rem 0',
                  }}>
                    {expert.name}
                  </h3>

                  {/* Field */}
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    color: 'var(--text-3)',
                    margin: 0,
                  }}>
                    {expert.field}
                  </p>

                  {/* Concept pills — always visible */}
                  {expert.concepts && expert.concepts.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
                      {expert.concepts.map((c, i) => (
                        <span
                          key={i}
                          className="tag-pill"
                          style={{
                            background: 'color-mix(in srgb, var(--blue) 10%, transparent)',
                            color: 'var(--blue)',
                            fontSize: '0.6rem',
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Toggle chevron */}
                <span style={{
                  fontSize: 16,
                  color: 'var(--text-3)',
                  transition: 'transform 0.2s ease',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  flexShrink: 0,
                  marginTop: 2,
                }}>
                  +
                </span>
              </div>

              {/* Expanded body */}
              {isOpen && (
                <div style={{ padding: '0 1.15rem 1.15rem', paddingLeft: 'calc(28px + 2rem)' }}>
                  {/* Editable name & field */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 4 }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                        textTransform: 'uppercase', letterSpacing: '0.06em',
                        color: 'var(--text-3)', minWidth: 50,
                      }}>Name</span>
                      <EditableText
                        value={expert.name}
                        onSave={v => dispatch({ type: 'UPDATE_EXPERT', id: expert.id, field: 'name', value: v })}
                        style={{ fontSize: '0.9rem', color: 'var(--text-1)', fontWeight: 600 }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                        textTransform: 'uppercase', letterSpacing: '0.06em',
                        color: 'var(--text-3)', minWidth: 50,
                      }}>Field</span>
                      <EditableText
                        value={expert.field}
                        onSave={v => dispatch({ type: 'UPDATE_EXPERT', id: expert.id, field: 'field', value: v })}
                        style={{ fontSize: '0.85rem', color: 'var(--text-2)' }}
                      />
                    </div>
                  </div>

                  {/* Key Quote */}
                  <div style={{
                    borderLeft: '3px solid var(--highlight-border)',
                    background: 'var(--highlight-bg)',
                    padding: '0.75rem 1rem',
                    borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                    marginBottom: 16,
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                      color: 'var(--highlight-border)', display: 'block',
                      marginBottom: 4, fontWeight: 600,
                    }}>Key Quote</span>
                    <EditableTextarea
                      value={expert.keyQuote}
                      onSave={v => dispatch({ type: 'UPDATE_EXPERT', id: expert.id, field: 'keyQuote', value: v })}
                      placeholder="Key quote..."
                      style={{
                        fontStyle: 'italic', fontSize: '0.88rem',
                        lineHeight: 1.65, color: 'var(--text-1)', margin: 0,
                      }}
                    />
                  </div>

                  {/* Relevant Works */}
                  <div style={{ marginBottom: 16 }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                      color: 'var(--text-3)', display: 'block',
                      marginBottom: 4, fontWeight: 600,
                    }}>Relevant Works</span>
                    <EditableTextarea
                      value={expert.works}
                      onSave={v => dispatch({ type: 'UPDATE_EXPERT', id: expert.id, field: 'works', value: v })}
                      placeholder="Works and publications..."
                      style={{
                        fontSize: '0.85rem', lineHeight: 1.6,
                        color: 'var(--text-2)', margin: 0,
                      }}
                    />
                  </div>

                  {/* Connection to Paired Calendar */}
                  <div style={{ marginBottom: 16 }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                      color: 'var(--blue)', display: 'block',
                      marginBottom: 4, fontWeight: 600,
                    }}>Connection to Paired Calendar</span>
                    <EditableTextarea
                      value={expert.connection}
                      onSave={v => dispatch({ type: 'UPDATE_EXPERT', id: expert.id, field: 'connection', value: v })}
                      placeholder="How this expert's work connects..."
                      style={{
                        fontSize: '0.88rem', lineHeight: 1.65,
                        color: 'var(--text-1)', margin: 0,
                      }}
                    />
                  </div>

                  {/* Supports Rules */}
                  {expert.supportsRules && expert.supportsRules.length > 0 && (
                    <div>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                        textTransform: 'uppercase', letterSpacing: '0.06em',
                        color: 'var(--olive)', display: 'block',
                        marginBottom: 6, fontWeight: 600,
                      }}>Supports Design Rules</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {expert.supportsRules.map((rule, i) => (
                          <span
                            key={i}
                            className="tag-pill"
                            style={{
                              background: 'color-mix(in srgb, var(--olive) 10%, transparent)',
                              color: 'var(--olive)',
                              fontSize: '0.58rem',
                              fontWeight: 600,
                            }}
                          >
                            {rule}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Delete */}
              <div className="hover-actions" style={{ position: 'absolute', top: 8, right: 8 }}>
                <DeleteButton
                  onConfirm={() => dispatch({ type: 'DELETE_EXPERT', id: expert.id })}
                  itemLabel="expert"
                />
              </div>
            </div>
          );
        })}
      </div>

      <AddItemButton
        label="+ Add expert"
        onAdd={() => dispatch({ type: 'ADD_EXPERT' })}
        accentColor="var(--blue)"
      />
    </div>
  );
}
