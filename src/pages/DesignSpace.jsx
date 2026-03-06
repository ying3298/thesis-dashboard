import { DESIGN_CONSTRAINTS, HYPOTHESES } from '../data/constraints';

export default function DesignSpace() {
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
          Rules and questions that guide the Paired Calendar design.
          From Interview #1.
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
          {DESIGN_CONSTRAINTS.map(rule => (
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
                {rule.id}
              </span>

              <div>
                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--text-1)',
                  margin: '0 0 0.35rem 0',
                }}>
                  {rule.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.87rem',
                  lineHeight: 1.6,
                  color: 'var(--text-2)',
                  margin: 0,
                }}>
                  {rule.description}
                </p>
              </div>
            </div>
          ))}
        </div>
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
          {HYPOTHESES.map(h => (
            <div
              key={h.id}
              className="card"
              style={{
                background: 'var(--surface)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                padding: '1.15rem',
              }}
            >
              {/* Top row: status badge + hypothesis ID */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.65rem' }}>
                <span
                  className="tag-pill"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.58rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '2px 8px',
                    borderRadius: 999,
                    background: 'var(--terracotta)' + '18',
                    color: 'var(--terracotta)',
                    fontWeight: 700,
                  }}
                >
                  To test
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
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.92rem',
                lineHeight: 1.6,
                color: 'var(--text-1)',
                margin: '0 0 0.75rem 0',
              }}>
                {h.statement}
              </p>

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
                {h.testHow}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section: The Core Tension --- */}
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
          The Core Tension
        </h2>

        <div style={{
          background: 'var(--highlight-bg)',
          border: '1.5px solid var(--highlight-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem 1.75rem',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: 'var(--text-1)',
            margin: 0,
          }}>
            She wants to{' '}
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1.15rem' }}>
              feel connected
            </span>
            {' '}but stay{' '}
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1.15rem' }}>
              invisible
            </span>.
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.92rem',
            lineHeight: 1.7,
            color: 'var(--text-2)',
            margin: '0.75rem 0 0 0',
            maxWidth: 520,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            The Paired Calendar has to be present enough to create warmth,
            but opaque enough to preserve freedom.
          </p>
        </div>
      </section>

      {/* --- Section: Wants / Fears / Hidden Needs --- */}
      <section style={{ marginBottom: '2rem' }}>
        <h2
          className="section-title"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.3rem',
            color: 'var(--text-1)',
            marginBottom: '1rem',
          }}
        >
          What She Wants / Fears / Doesn't Know She Wants
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {/* WANTS */}
          <WantsCard
            label="Wants"
            color="var(--olive)"
            lines={[
              'Connection without exposure.',
              'Presence without surveillance.',
              '"I\'m here, I\'m okay" \u2014 nothing more.',
            ]}
          />

          {/* FEARS */}
          <WantsCard
            label="Fears"
            color="var(--terracotta)"
            lines={[
              'Shared signal becomes monitoring.',
              'Absence = crisis.',
              'Happy days create expectations.',
            ]}
          />

          {/* HIDDEN NEED */}
          <WantsCard
            label="Hidden Need"
            color="var(--blue)"
            lines={[
              'See parents\' slow daily changes.',
              'Read them through senses (hair, eyes), not information.',
            ]}
          />
        </div>
      </section>
    </div>
  );
}


/* --- Sub-component for Wants/Fears/Hidden Need cards --- */

function WantsCard({ label, color, lines }) {
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
      {/* Label */}
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

      {/* Lines */}
      {lines.map((line, i) => (
        <p
          key={i}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            lineHeight: 1.55,
            color: 'var(--text-1)',
            margin: i < lines.length - 1 ? '0 0 0.25rem 0' : 0,
          }}
        >
          {line}
        </p>
      ))}
    </div>
  );
}
