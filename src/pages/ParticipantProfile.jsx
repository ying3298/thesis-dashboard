import { useData, PARTICIPANT_META } from '../context/DataContext';
import EditableText from '../components/EditableText';
import EditableTextarea from '../components/EditableTextarea';
import AddItemButton from '../components/AddItemButton';

const WANTS_FEARS_CONFIG = [
  { key: 'wants',       label: 'Wants',       color: 'var(--olive)' },
  { key: 'fears',       label: 'Fears',       color: 'var(--terracotta)' },
  { key: 'hiddenNeeds', label: 'Hidden Need',  color: 'var(--blue)' },
];

function WantsCard({ label, color, lines, category, dispatch }) {
  return (
    <div
      className="card"
      style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
        borderLeft: `4px solid ${color}`,
        padding: '1rem 1.15rem',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: color,
        fontWeight: 700,
        display: 'block',
        marginBottom: '0.45rem',
      }}>
        {label}
      </span>

      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            margin: i < lines.length - 1 ? '0 0 0.25rem 0' : 0,
          }}
        >
          <EditableText
            value={line}
            onSave={v => dispatch({ type: 'UPDATE_WANTS_FEARS', category, lineIndex: i, value: v })}
            placeholder="Add text..."
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              lineHeight: 1.55,
              color: 'var(--text-1)',
              flex: 1,
            }}
          />
          <button
            className="action-btn"
            onClick={() => dispatch({ type: 'DELETE_WANTS_FEARS_LINE', category, lineIndex: i })}
            title="Delete line"
            style={{ flexShrink: 0 }}
          >
            ×
          </button>
        </div>
      ))}

      <AddItemButton
        label="+ Add"
        onAdd={() => dispatch({ type: 'ADD_WANTS_FEARS_LINE', category })}
        accentColor={color}
      />
    </div>
  );
}

export default function ParticipantProfile({ onNavigate }) {
  const {
    participantDetails, bigPicture, coreTension, wantsFears,
    dispatch, activeParticipant, stats,
  } = useData();

  const meta = PARTICIPANT_META[activeParticipant];

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Page Header */}
      <header className="page-header">
        <span className="page-badge" style={{ background: 'var(--olive)', color: '#fff' }}>
          Profile
        </span>
        <h1 className="page-title" style={{ fontFamily: 'var(--font-heading)' }}>
          <span style={{ fontSize: '1.8rem', marginRight: 12 }}>{meta?.emoji}</span>
          {meta?.label}
        </h1>
        <p className="page-subtitle" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)', maxWidth: 540 }}>
          {meta?.subtitle} &mdash; {meta?.location}
        </p>
      </header>

      {/* Stats bar */}
      <div style={{
        display: 'flex', gap: 16, marginBottom: 32,
        padding: '12px 16px', background: 'var(--surface)', borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
      }}>
        {[
          { n: stats.findingsCount, l: 'Findings' },
          { n: stats.notesCount, l: 'Notes' },
          { n: stats.clustersCount, l: 'Clusters' },
        ].map(s => (
          <div key={s.l} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: 'var(--olive)' }}>{s.n}</span>
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{s.l}</span>
          </div>
        ))}

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {onNavigate && (
            <>
              <button onClick={() => onNavigate('findings')} style={{
                fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--olive)',
                background: 'color-mix(in srgb, var(--olive) 8%, transparent)',
                border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer',
              }}>Findings →</button>
              <button onClick={() => onNavigate('affinity')} style={{
                fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--blue)',
                background: 'color-mix(in srgb, var(--blue) 8%, transparent)',
                border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer',
              }}>Affinity Map →</button>
            </>
          )}
        </div>
      </div>

      {/* Participant Details */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontSize: '1.3rem',
          color: 'var(--text-1)', marginBottom: '1rem',
        }}>
          Details
        </h2>
        <div className="card" style={{ padding: '28px 32px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '6px 32px',
          }}>
            {participantDetails.map((d, index) => (
              <div key={index} style={{ display: 'flex', gap: 8, lineHeight: 1.7 }}>
                <EditableText
                  value={d.label}
                  onSave={v => dispatch({ type: 'UPDATE_PARTICIPANT', index, field: 'label', value: v })}
                  tag="span"
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                    color: 'var(--text-3)', minWidth: 110, flexShrink: 0,
                  }}
                />
                <EditableText
                  value={d.value}
                  onSave={v => dispatch({ type: 'UPDATE_PARTICIPANT', index, field: 'value', value: v })}
                  tag="span"
                  style={{ fontSize: '0.92rem', color: 'var(--text-1)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Big Picture */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontSize: '1.3rem',
          color: 'var(--text-1)', marginBottom: '1rem',
        }}>
          The Big Picture
        </h2>
        <div className="grid-cards" style={{ gap: 16 }}>
          {bigPicture.map((item, index) => (
            <div
              key={index}
              className="card fade-in"
              style={{ borderLeft: `4px solid ${item.color}`, padding: '22px 26px' }}
            >
              <EditableText
                value={item.label}
                onSave={v => dispatch({ type: 'UPDATE_BIG_PICTURE', index, field: 'label', value: v })}
                tag="h3"
                style={{
                  fontFamily: 'var(--font-heading)', fontSize: '1.1rem',
                  fontWeight: 400, color: item.color, margin: '0 0 8px 0',
                }}
              />
              <EditableTextarea
                value={item.text}
                onSave={v => dispatch({ type: 'UPDATE_BIG_PICTURE', index, field: 'text', value: v })}
                style={{ margin: 0, fontSize: '0.93rem', lineHeight: 1.65, color: 'var(--text-2)' }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* The Core Tension */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontSize: '1.3rem',
          color: 'var(--text-1)', marginBottom: '1rem',
        }}>
          The Core Tension
        </h2>
        <div style={{
          background: 'var(--highlight-bg)',
          border: '1.5px solid var(--highlight-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem 1.75rem',
          textAlign: 'center',
        }}>
          <EditableTextarea
            value={coreTension.main}
            onSave={v => dispatch({ type: 'UPDATE_CORE_TENSION', field: 'main', value: v })}
            placeholder="Main tension..."
            style={{
              fontFamily: 'var(--font-body)', fontSize: '1.05rem',
              lineHeight: 1.7, color: 'var(--text-1)', margin: 0, textAlign: 'center',
            }}
          />
          <EditableTextarea
            value={coreTension.sub}
            onSave={v => dispatch({ type: 'UPDATE_CORE_TENSION', field: 'sub', value: v })}
            placeholder="Supporting detail..."
            style={{
              fontFamily: 'var(--font-body)', fontSize: '0.92rem',
              lineHeight: 1.7, color: 'var(--text-2)',
              margin: '0.75rem auto 0 auto', maxWidth: 520, textAlign: 'center',
            }}
          />
        </div>
      </section>

      {/* Wants / Fears / Hidden Needs */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontSize: '1.3rem',
          color: 'var(--text-1)', marginBottom: '1rem',
        }}>
          Wants / Fears / Hidden Needs
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {WANTS_FEARS_CONFIG.map(({ key, label, color }) => (
            <WantsCard
              key={key}
              label={label}
              color={color}
              lines={wantsFears[key] || []}
              category={key}
              dispatch={dispatch}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
