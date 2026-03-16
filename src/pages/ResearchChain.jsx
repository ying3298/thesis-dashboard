import { useState } from 'react';
import { useData, PARTICIPANT_META } from '../context/DataContext';
import EditableText from '../components/EditableText';
import EditableTextarea from '../components/EditableTextarea';

/* ── Colors ──────────────────────────────────────────── */
const P_COLORS = {
  P1: 'var(--olive)',
  P2: 'var(--terracotta)',
  P3: 'var(--blue)',
  P4: 'var(--purple)',
};

const CONFIDENCE_COLORS = {
  'High': 'var(--olive)',
  'Moderate': 'var(--blue)',
  'Moderate\u2013High': 'var(--olive)',
  'Low\u2013Moderate': 'var(--terracotta)',
  'Low': 'var(--terracotta)',
  'Very Low': '#999',
  'Strong': 'var(--olive)',
};

/* ── Small components ────────────────────────────────── */
function ConfidenceBadge({ level, style: extra = {} }) {
  const color = CONFIDENCE_COLORS[level] || 'var(--text-3)';
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
      textTransform: 'uppercase', letterSpacing: '0.08em',
      padding: '2px 8px', borderRadius: 999,
      background: `color-mix(in srgb, ${color} 14%, transparent)`,
      color, fontWeight: 700, whiteSpace: 'nowrap', ...extra,
    }}>
      {level}
    </span>
  );
}

function FlagCallout({ flag }) {
  const [open, setOpen] = useState(false);
  if (!flag) return null;
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        marginTop: 12, padding: '10px 14px',
        background: 'color-mix(in srgb, var(--terracotta) 6%, transparent)',
        border: '1px solid color-mix(in srgb, var(--terracotta) 20%, transparent)',
        borderLeft: '3px solid var(--terracotta)',
        borderRadius: 'var(--radius-sm)', cursor: 'pointer',
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: '0.78rem', fontWeight: 600, color: 'var(--terracotta)',
      }}>
        <span style={{ fontSize: 11 }}>{open ? '\u25BC' : '\u25B6'}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Honesty Flag
        </span>
        <span style={{ fontWeight: 500, color: 'var(--text-2)', fontSize: '0.8rem', fontFamily: 'var(--font-body)' }}>
          {flag.title}
        </span>
      </div>
      {open && (
        <p style={{
          margin: '8px 0 0', fontSize: '0.82rem', lineHeight: 1.6,
          color: 'var(--text-2)',
        }}>
          {flag.body}
        </p>
      )}
    </div>
  );
}

function QuoteRow({ participant, quote, proves }) {
  const color = P_COLORS[participant] || 'var(--text-3)';
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '42px 1fr',
      gap: 10, padding: '8px 0',
      borderBottom: '1px solid var(--border)',
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
        fontWeight: 700, color,
        background: `color-mix(in srgb, ${color} 10%, transparent)`,
        padding: '3px 6px', borderRadius: 6, textAlign: 'center',
        alignSelf: 'flex-start', marginTop: 2,
      }}>
        {participant}
      </span>
      <div>
        <div style={{
          fontFamily: 'var(--font-heading)', fontStyle: 'italic',
          fontSize: '0.84rem', lineHeight: 1.5, color: 'var(--text-1)',
        }}>
          {quote}
        </div>
        {proves && (
          <div style={{ fontSize: '0.78rem', color: 'var(--text-3)', marginTop: 3, lineHeight: 1.45 }}>
            {proves}
          </div>
        )}
      </div>
    </div>
  );
}

function SectionDivider({ number, label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      margin: '56px 0 24px', paddingTop: 16,
      borderTop: '2px solid var(--border)',
    }}>
      <span style={{
        fontFamily: 'var(--font-heading)', fontSize: '1.6rem',
        color: 'var(--olive)', opacity: 0.5, lineHeight: 1,
        minWidth: 28,
      }}>
        {number}
      </span>
      <h2 style={{
        fontFamily: 'var(--font-heading)', fontSize: '1.3rem',
        color: 'var(--text-1)', margin: 0, lineHeight: 1.3,
      }}>
        {label}
      </h2>
    </div>
  );
}

/* ══════════════════════════════════════════════════════ */
export default function ResearchChain() {
  const { researchChain, dispatch } = useData();

  if (!researchChain) {
    return (
      <div style={{ padding: 40, color: 'var(--text-3)' }}>
        Reset to defaults to load research chain data.
      </div>
    );
  }

  const {
    hmwOptions, opportunity, chainHypotheses,
    designPrinciples, principleSystem,
    conceptCards, confidenceTable, flags,
    deferredToIdeation,
  } = researchChain;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem' }}>

      {/* ── Page Header ───────────────────────────────── */}
      <header className="page-header">
        <span className="page-badge" style={{ background: 'var(--olive)', color: '#fff' }}>
          Evidence Chain
        </span>
        <h1 className="page-title" style={{ fontFamily: 'var(--font-heading)' }}>
          Research \u2192 Design Chain
        </h1>
        <p className="page-subtitle" style={{
          color: 'var(--text-2)', fontFamily: 'var(--font-body)',
          maxWidth: 580, lineHeight: 1.65,
        }}>
          The data-grounded evidence chain from problem statement to design concept.
          Only research-backed links remain. Design philosophy deferred to ideation.
        </p>
        <div style={{
          display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
            textTransform: 'uppercase', letterSpacing: '0.06em',
            padding: '3px 10px', borderRadius: 999,
            background: 'color-mix(in srgb, var(--text-3) 8%, transparent)',
            color: 'var(--text-3)',
          }}>
            n=4 participants
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
            textTransform: 'uppercase', letterSpacing: '0.06em',
            padding: '3px 10px', borderRadius: 999,
            background: 'color-mix(in srgb, var(--terracotta) 10%, transparent)',
            color: 'var(--terracotta)',
          }}>
            2 honesty flags
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
            textTransform: 'uppercase', letterSpacing: '0.06em',
            padding: '3px 10px', borderRadius: 999,
            background: 'color-mix(in srgb, var(--purple) 10%, transparent)',
            color: 'var(--purple)',
          }}>
            5 deferred to ideation
          </span>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════ */}
      {/*  SECTION 1: HMW OPTIONS                       */}
      {/* ═══════════════════════════════════════════════ */}
      <SectionDivider number="1" label="How Might We \u2014 Ranked by Evidence" />

      <p style={{ fontSize: '0.85rem', color: 'var(--text-3)', marginBottom: 20, marginTop: -8, lineHeight: 1.6 }}>
        Two data-grounded HMW framings derived from the problem statement. Ranked by participant evidence strength.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {hmwOptions.map((hmw) => {
          const borderColor = hmw.rank === 1 ? 'var(--olive)'
            : hmw.rank === 2 ? 'var(--blue)' : 'var(--terracotta)';
          return (
            <div
              key={hmw.id}
              className="card"
              style={{
                padding: '1.25rem 1.5rem',
                borderLeft: `4px solid ${borderColor}`,
                position: 'relative',
              }}
            >
              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{
                  fontFamily: 'var(--font-heading)', fontSize: '1.4rem',
                  color: borderColor, opacity: 0.7, lineHeight: 1,
                }}>
                  #{hmw.rank}
                </span>
                <ConfidenceBadge level={hmw.label} />
              </div>

              {/* Statement */}
              <EditableTextarea
                value={hmw.statement}
                onSave={v => dispatch({ type: 'UPDATE_RESEARCH_CHAIN_HMW', id: hmw.id, field: 'statement', value: v })}
                placeholder="HMW statement..."
                style={{
                  fontFamily: 'var(--font-heading)', fontSize: '1.05rem',
                  lineHeight: 1.5, color: 'var(--text-1)', fontStyle: 'italic',
                  margin: '0 0 12px',
                }}
              />

              {/* Evidence table */}
              <div style={{
                background: 'color-mix(in srgb, var(--border) 30%, transparent)',
                borderRadius: 'var(--radius-sm)', overflow: 'hidden',
                marginBottom: 10,
              }}>
                {hmw.evidence.map((ev, i) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '90px 1fr',
                    fontSize: '0.78rem', lineHeight: 1.5,
                    borderBottom: i < hmw.evidence.length - 1 ? '1px solid var(--border)' : 'none',
                  }}>
                    <div style={{
                      padding: '6px 10px', fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem', fontWeight: 700,
                      color: ev.support.startsWith('4') ? 'var(--olive)'
                        : ev.support.startsWith('0') ? 'var(--terracotta)' : 'var(--blue)',
                      background: 'var(--surface)',
                      display: 'flex', alignItems: 'center',
                    }}>
                      {ev.support}
                    </div>
                    <div style={{ padding: '6px 10px', color: 'var(--text-2)' }}>
                      <span style={{ fontWeight: 500, color: 'var(--text-1)' }}>{ev.cluster}</span>
                      <span style={{ color: 'var(--text-3)' }}> &mdash; {ev.detail}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reasoning */}
              <p style={{
                fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--text-3)',
                margin: 0, fontStyle: 'italic',
              }}>
                {hmw.reasoning}
              </p>

              {/* Flag if present */}
              <FlagCallout flag={hmw.flag} />
            </div>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/*  SECTION 2: OPPORTUNITY + HYPOTHESES           */}
      {/* ═══════════════════════════════════════════════ */}
      <SectionDivider number="2" label="Opportunity & Hypotheses" />

      {/* Opportunity */}
      <div className="card" style={{
        padding: '1.5rem', marginBottom: 20,
        borderLeft: '4px solid var(--olive)',
        background: 'color-mix(in srgb, var(--olive) 3%, var(--surface))',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          textTransform: 'uppercase', letterSpacing: '0.08em',
          color: 'var(--olive)', marginBottom: 8, display: 'block',
          fontWeight: 700,
        }}>
          Opportunity Statement
        </span>
        <EditableTextarea
          value={opportunity}
          onSave={v => dispatch({ type: 'UPDATE_RESEARCH_CHAIN_FIELD', field: 'opportunity', value: v })}
          style={{
            fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--text-1)',
            margin: 0,
          }}
        />
      </div>

      {/* Hypotheses */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {chainHypotheses.map(hyp => (
          <div key={hyp.id} className="card" style={{ padding: '1.15rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{
                fontFamily: 'var(--font-heading)', fontSize: '1.2rem',
                color: 'var(--text-1)', opacity: 0.6,
              }}>
                H{hyp.label}
              </span>
              <ConfidenceBadge level={hyp.confidence} />
            </div>
            <EditableTextarea
              value={hyp.statement}
              onSave={v => dispatch({ type: 'UPDATE_RESEARCH_CHAIN_HYPOTHESIS', id: hyp.id, field: 'statement', value: v })}
              style={{
                fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-1)',
                margin: '0 0 8px',
              }}
            />
            <div style={{
              padding: '8px 12px', borderRadius: 'var(--radius-sm)',
              background: 'var(--highlight-bg)',
              borderLeft: '3px solid var(--highlight-border)',
              fontSize: '0.82rem', lineHeight: 1.55, color: 'var(--text-2)',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                textTransform: 'uppercase', letterSpacing: '0.06em',
                color: 'var(--highlight-border)', display: 'block',
                marginBottom: 3, fontWeight: 600,
              }}>
                Data Support
              </span>
              {hyp.support}
            </div>
            <FlagCallout flag={hyp.flag} />
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/*  SECTION 3: DESIGN PRINCIPLES                  */}
      {/* ═══════════════════════════════════════════════ */}
      <SectionDivider number="3" label="Design Principles" />

      <p style={{ fontSize: '0.85rem', color: 'var(--text-3)', marginBottom: 20, marginTop: -8, lineHeight: 1.6 }}>
        Two data-grounded principles derived from the chosen HMW. Each paired with participant quotes as evidence.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {designPrinciples.map((dp, idx) => (
          <div key={dp.id} className="card" style={{
            padding: '1.5rem',
            borderLeft: '4px solid var(--olive)',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <span style={{
                fontFamily: 'var(--font-heading)', fontSize: '1.6rem',
                color: 'var(--olive)', opacity: 0.5, lineHeight: 1,
              }}>
                {idx + 1}
              </span>
              <ConfidenceBadge level={dp.confidence} />
            </div>

            {/* Title */}
            <EditableText
              value={dp.title}
              onSave={v => dispatch({ type: 'UPDATE_RESEARCH_CHAIN_PRINCIPLE', id: dp.id, field: 'title', value: v })}
              tag="h3"
              style={{
                fontFamily: 'var(--font-heading)', fontSize: '1.15rem',
                fontWeight: 400, color: 'var(--text-1)', lineHeight: 1.35,
                margin: '4px 0 6px', fontStyle: 'italic',
              }}
            />

            {/* Subtitle */}
            <p style={{
              fontSize: '0.85rem', color: 'var(--text-2)', lineHeight: 1.55,
              margin: '0 0 6px',
            }}>
              {dp.subtitle}
            </p>

            {/* Derived from */}
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              color: 'var(--olive)', background: 'color-mix(in srgb, var(--olive) 8%, transparent)',
              padding: '3px 8px', borderRadius: 6,
            }}>
              {dp.derivedFrom}
            </span>

            {/* Quotes */}
            <div style={{ marginTop: 14 }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                textTransform: 'uppercase', letterSpacing: '0.06em',
                color: 'var(--text-3)', marginBottom: 6, display: 'block',
                fontWeight: 600,
              }}>
                Participant Evidence
              </span>
              {dp.quotes.map((q, i) => (
                <QuoteRow key={i} participant={q.participant} quote={q.quote} />
              ))}
            </div>

            <FlagCallout flag={dp.flag} />
          </div>
        ))}
      </div>

      {/* Principle System */}
      <div className="card" style={{
        padding: '1.25rem 1.5rem', marginTop: 20,
        background: 'color-mix(in srgb, var(--olive) 3%, var(--surface))',
        borderLeft: '4px solid var(--olive)',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          textTransform: 'uppercase', letterSpacing: '0.08em',
          color: 'var(--olive)', marginBottom: 10, display: 'block',
          fontWeight: 700,
        }}>
          How they reinforce each other
        </span>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-2)', margin: '0 0 12px', fontStyle: 'italic' }}>
          {principleSystem.intro}
        </p>

        {/* Chain */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {principleSystem.chain.map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                flexShrink: 0, width: 20,
              }}>
                <span style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: 'var(--olive)', display: 'block',
                }} />
                {i < principleSystem.chain.length - 1 && (
                  <span style={{
                    width: 1, height: 32, background: 'var(--olive)',
                    opacity: 0.3, display: 'block',
                  }} />
                )}
              </div>
              <div style={{ paddingBottom: i < principleSystem.chain.length - 1 ? 12 : 0 }}>
                <span style={{
                  fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-1)',
                  fontStyle: 'italic',
                }}>
                  {c.principle}
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-3)', display: 'block', marginTop: 2 }}>
                  {c.role}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Breaks */}
        <div style={{
          marginTop: 16, paddingTop: 12,
          borderTop: '1px solid var(--border)',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
            textTransform: 'uppercase', letterSpacing: '0.06em',
            color: 'var(--terracotta)', marginBottom: 8, display: 'block',
            fontWeight: 600,
          }}>
            Remove any one and the system breaks
          </span>
          {principleSystem.breaks.map((b, i) => (
            <div key={i} style={{
              display: 'flex', gap: 8, fontSize: '0.8rem',
              lineHeight: 1.5, marginBottom: 4,
            }}>
              <span style={{ color: 'var(--terracotta)', flexShrink: 0, fontWeight: 600 }}>\u2717</span>
              <span>
                <span style={{ color: 'var(--text-3)', textDecoration: 'line-through' }}>{b.removed}</span>
                <span style={{ color: 'var(--text-2)' }}> \u2192 {b.consequence}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/*  SECTION 4: CONCEPT CARDS                      */}
      {/* ═══════════════════════════════════════════════ */}
      <SectionDivider number="4" label="Concept Cards" />

      <p style={{ fontSize: '0.85rem', color: 'var(--text-3)', marginBottom: 20, marginTop: -8, lineHeight: 1.6 }}>
        The concept with the strongest data backing. Other concepts (Clock Experiments, AI Dialogue) deferred to ideation stage.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {conceptCards.map((card) => {
          const borderColor = card.confidence === 'Moderate\u2013High' ? 'var(--olive)'
            : card.confidence === 'Low' ? 'var(--terracotta)' : 'var(--text-3)';
          return (
            <div key={card.id} className="card" style={{
              padding: '1.5rem',
              borderLeft: `4px solid ${borderColor}`,
            }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <EditableText
                  value={card.title}
                  onSave={v => dispatch({ type: 'UPDATE_RESEARCH_CHAIN_CONCEPT', id: card.id, field: 'title', value: v })}
                  tag="h3"
                  style={{
                    fontFamily: 'var(--font-heading)', fontSize: '1.15rem',
                    fontWeight: 400, color: 'var(--text-1)', margin: 0,
                  }}
                />
                <ConfidenceBadge level={card.confidenceLabel} style={{
                  background: `color-mix(in srgb, ${borderColor} 14%, transparent)`,
                  color: borderColor,
                }} />
              </div>

              {/* Description */}
              <EditableTextarea
                value={card.description}
                onSave={v => dispatch({ type: 'UPDATE_RESEARCH_CHAIN_CONCEPT', id: card.id, field: 'description', value: v })}
                style={{
                  fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-2)',
                  margin: '0 0 14px',
                }}
              />

              {/* Principles served */}
              <div style={{ marginBottom: 14 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  color: 'var(--text-3)', marginBottom: 6, display: 'block',
                  fontWeight: 600,
                }}>
                  Principles Served
                </span>
                {card.principles.map((p, i) => {
                  const roleColor = p.role === 'Primary' ? 'var(--olive)'
                    : p.role === 'Secondary' ? 'var(--blue)'
                    : p.role === 'Weak' || p.role === 'Unknown' ? 'var(--text-3)'
                    : 'var(--purple)';
                  return (
                    <div key={i} style={{
                      display: 'flex', gap: 8, alignItems: 'baseline',
                      padding: '4px 0',
                      borderBottom: i < card.principles.length - 1 ? '1px solid var(--border)' : 'none',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                        textTransform: 'uppercase', letterSpacing: '0.06em',
                        color: roleColor, fontWeight: 700, minWidth: 58,
                      }}>
                        {p.role}
                      </span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-1)', fontWeight: 500, fontStyle: 'italic' }}>
                        {p.name}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', flex: 1 }}>
                        &mdash; {p.detail}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Proof quotes */}
              <div style={{ marginBottom: 14 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  color: 'var(--text-3)', marginBottom: 6, display: 'block',
                  fontWeight: 600,
                }}>
                  Proof Quotes
                </span>
                {card.proofQuotes.map((q, i) => (
                  <QuoteRow key={i} participant={q.participant} quote={q.quote} proves={q.proves} />
                ))}
              </div>

              {/* Assessment */}
              <div style={{
                padding: '10px 14px', borderRadius: 'var(--radius-sm)',
                background: 'var(--highlight-bg)',
                borderLeft: '3px solid var(--highlight-border)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  color: 'var(--highlight-border)', display: 'block',
                  marginBottom: 4, fontWeight: 600,
                }}>
                  Honest Assessment
                </span>
                <EditableTextarea
                  value={card.assessment}
                  onSave={v => dispatch({ type: 'UPDATE_RESEARCH_CHAIN_CONCEPT', id: card.id, field: 'assessment', value: v })}
                  style={{
                    fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--text-2)',
                    margin: 0,
                  }}
                />
              </div>

              <FlagCallout flag={card.flag} />
            </div>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/*  SECTION 5: EVIDENCE CONFIDENCE TABLE          */}
      {/* ═══════════════════════════════════════════════ */}
      <SectionDivider number="5" label="Evidence Confidence Audit" />

      <p style={{ fontSize: '0.85rem', color: 'var(--text-3)', marginBottom: 16, marginTop: -8, lineHeight: 1.6 }}>
        Every link in the chain, rated by how well it is supported by participant data.
      </p>

      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)', overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 90px 1fr',
          background: 'var(--bg)', padding: '8px 14px',
          borderBottom: '1px solid var(--border)',
          fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
          textTransform: 'uppercase', letterSpacing: '0.08em',
          color: 'var(--text-3)', fontWeight: 600,
        }}>
          <span>Chain Link</span>
          <span>Confidence</span>
          <span>Basis</span>
        </div>
        {confidenceTable.map((row, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '1fr 90px 1fr',
            padding: '8px 14px', fontSize: '0.78rem', lineHeight: 1.5,
            borderBottom: i < confidenceTable.length - 1 ? '1px solid var(--border)' : 'none',
            background: i % 2 === 0 ? 'var(--surface)' : 'color-mix(in srgb, var(--bg) 50%, var(--surface))',
          }}>
            <span style={{ color: 'var(--text-1)', fontWeight: 500 }}>{row.link}</span>
            <span><ConfidenceBadge level={row.confidence} /></span>
            <span style={{ color: 'var(--text-3)' }}>{row.basis}</span>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/*  SECTION 6: DEFERRED TO IDEATION               */}
      {/* ═══════════════════════════════════════════════ */}
      <SectionDivider number="6" label={`Deferred to Ideation \u2014 ${deferredToIdeation?.length || 0} Items`} />

      <p style={{ fontSize: '0.85rem', color: 'var(--text-3)', marginBottom: 16, marginTop: -8, lineHeight: 1.6 }}>
        Design philosophy elements removed from this chain. They belong in the ideation stage (Design Space), not in research synthesis.
      </p>

      {deferredToIdeation && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {deferredToIdeation.map((item) => (
            <div key={item.id} style={{
              padding: '12px 16px',
              background: 'color-mix(in srgb, var(--purple) 4%, var(--surface))',
              border: '1px solid color-mix(in srgb, var(--purple) 16%, transparent)',
              borderLeft: '3px solid var(--purple)',
              borderRadius: 'var(--radius-sm)',
            }}>
              <div style={{
                fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-1)',
                marginBottom: 4,
              }}>
                {item.item}
              </div>
              <p style={{
                margin: 0, fontSize: '0.82rem', lineHeight: 1.6,
                color: 'var(--text-2)',
              }}>
                {item.reason}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ═══════════════════════════════════════════════ */}
      {/*  SECTION 7: ALL FLAGS                          */}
      {/* ═══════════════════════════════════════════════ */}
      <SectionDivider number="7" label={`Honesty Flags \u2014 ${flags?.length || 0} Remaining`} />

      <p style={{ fontSize: '0.85rem', color: 'var(--text-3)', marginBottom: 16, marginTop: -8, lineHeight: 1.6 }}>
        Weak points in the remaining data-grounded chain. Named, not hidden.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {flags.map((flag, i) => (
          <div key={flag.id} style={{
            padding: '12px 16px',
            background: 'color-mix(in srgb, var(--terracotta) 4%, var(--surface))',
            border: '1px solid color-mix(in srgb, var(--terracotta) 16%, transparent)',
            borderLeft: '3px solid var(--terracotta)',
            borderRadius: 'var(--radius-sm)',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6,
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                fontWeight: 700, color: 'var(--terracotta)',
                background: 'color-mix(in srgb, var(--terracotta) 12%, transparent)',
                padding: '2px 7px', borderRadius: 4,
              }}>
                {i + 1}
              </span>
              <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-1)' }}>
                {flag.title}
              </span>
            </div>
            <p style={{
              margin: 0, fontSize: '0.82rem', lineHeight: 1.6,
              color: 'var(--text-2)',
            }}>
              {flag.body}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom spacer */}
      <div style={{ height: 80 }} />
    </div>
  );
}
