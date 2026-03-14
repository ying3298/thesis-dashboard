import { useData } from '../context/DataContext';
import EditableText from '../components/EditableText';
import EditableTextarea from '../components/EditableTextarea';
import AddItemButton from '../components/AddItemButton';
import DeleteButton from '../components/DeleteButton';

/* ── Hypothesis status config ─────────────────────────── */
const STATUS_CONFIG = {
  'to-test':   { label: 'To test',    color: 'var(--terracotta)' },
  'testing':   { label: 'Testing',    color: 'var(--blue)' },
  'validated': { label: 'Validated',  color: 'var(--olive)' },
  'rejected':  { label: 'Rejected',   color: 'var(--text-3)' },
};

export default function DesignSpace() {
  const { designConstraints, hypotheses, dispatch } = useData();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Page header */}
      <header className="page-header">
        <span
          className="page-badge"
          style={{ background: 'var(--olive)', color: '#fff' }}
        >
          Design
        </span>
        <h1 className="page-title" style={{ fontFamily: 'var(--font-heading)' }}>
          Design Space
        </h1>
        <p
          className="page-subtitle"
          style={{
            color: 'var(--text-2)',
            fontFamily: 'var(--font-body)',
            maxWidth: 540,
          }}
        >
          Rules and questions that guide the design.
          Universal rules and hypotheses across all interviews.
        </p>
      </header>

      {/* --- Section: Design Rules --- */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2
          className="section-title"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.3rem',
            color: 'var(--text-1)',
            marginBottom: '1rem',
          }}
        >
          Design Rules
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {designConstraints.map((rule, idx) => (
            <div
              key={rule.id}
              className="card"
              style={{
                background: 'var(--surface)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                borderLeft: '4px solid var(--olive)',
                padding: '1rem 1.15rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
                position: 'relative',
              }}
            >
              {/* Number */}
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.6rem',
                color: 'var(--olive)',
                lineHeight: 1,
                flexShrink: 0,
                minWidth: 28,
                textAlign: 'center',
                opacity: 0.8,
              }}>
                {idx + 1}
              </span>

              <div style={{ flex: 1 }}>
                {/* Title */}
                <EditableText
                  value={rule.title}
                  onSave={v => dispatch({ type: 'UPDATE_CONSTRAINT', id: rule.id, field: 'title', value: v })}
                  placeholder="Rule title..."
                  tag="h3"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'var(--text-1)',
                    margin: '0 0 0.35rem 0',
                  }}
                />

                {/* Description */}
                <EditableTextarea
                  value={rule.description}
                  onSave={v => dispatch({ type: 'UPDATE_CONSTRAINT', id: rule.id, field: 'description', value: v })}
                  placeholder="Rule description..."
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.87rem',
                    lineHeight: 1.6,
                    color: 'var(--text-2)',
                    margin: 0,
                  }}
                />
              </div>

              {/* Delete */}
              <div className="hover-actions" style={{ position: 'absolute', top: 8, right: 8 }}>
                <DeleteButton
                  onConfirm={() => dispatch({ type: 'DELETE_CONSTRAINT', id: rule.id })}
                  itemLabel="rule"
                />
              </div>
            </div>
          ))}
        </div>

        <AddItemButton
          label="+ Add rule"
          onAdd={() => dispatch({ type: 'ADD_CONSTRAINT' })}
          accentColor="var(--olive)"
        />
      </section>

      {/* --- Section: Hypotheses to Test --- */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2
          className="section-title"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.3rem',
            color: 'var(--text-1)',
            marginBottom: '1rem',
          }}
        >
          Hypotheses to Test
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {hypotheses.map(h => {
            const status = STATUS_CONFIG[h.status] || STATUS_CONFIG['to-test'];
            return (
              <div
                key={h.id}
                className="card"
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  padding: '1.15rem',
                  position: 'relative',
                }}
              >
                {/* Top row: status badge + hypothesis ID */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.65rem' }}>
                  <span
                    className="tag-pill hypothesis-status-toggle"
                    onClick={() => dispatch({ type: 'TOGGLE_HYPOTHESIS_STATUS', id: h.id })}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.58rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      padding: '2px 8px',
                      borderRadius: 999,
                      background: status.color + '18',
                      color: status.color,
                      fontWeight: 700,
                      cursor: 'pointer',
                      userSelect: 'none',
                      transition: 'transform 0.1s ease',
                    }}
                    title="Click to cycle status"
                  >
                    {status.label}
                  </span>

                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    color: 'var(--text-1)',
                    opacity: 0.7,
                  }}>
                    H{h.id}
                  </span>
                </div>

                {/* Statement */}
                <EditableTextarea
                  value={h.statement}
                  onSave={v => dispatch({ type: 'UPDATE_HYPOTHESIS', id: h.id, field: 'statement', value: v })}
                  placeholder="Hypothesis statement..."
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                    color: 'var(--text-1)',
                    margin: '0 0 0.75rem 0',
                  }}
                />

                {/* How to test callout */}
                <div
                  className="card-tip"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.83rem',
                    lineHeight: 1.6,
                    color: 'var(--text-2)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--highlight-bg)',
                    borderLeft: '3px solid var(--highlight-border)',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--highlight-border)',
                    display: 'block',
                    marginBottom: 4,
                    fontWeight: 600,
                  }}>
                    How to test
                  </span>
                  <EditableTextarea
                    value={h.testHow}
                    onSave={v => dispatch({ type: 'UPDATE_HYPOTHESIS', id: h.id, field: 'testHow', value: v })}
                    placeholder="How to test this hypothesis..."
                    style={{
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      lineHeight: 'inherit',
                      color: 'inherit',
                      margin: 0,
                    }}
                  />
                </div>

                {/* Delete */}
                <div className="hover-actions" style={{ position: 'absolute', top: 8, right: 8 }}>
                  <DeleteButton
                    onConfirm={() => dispatch({ type: 'DELETE_HYPOTHESIS', id: h.id })}
                    itemLabel="hypothesis"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <AddItemButton
          label="+ Add hypothesis"
          onAdd={() => dispatch({ type: 'ADD_HYPOTHESIS' })}
          accentColor="var(--terracotta)"
        />
      </section>

    </div>
  );
}
