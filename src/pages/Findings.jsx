import { useState } from 'react';
import FINDINGS from '../data/findings';

export default function Findings() {
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
          10 key findings from Interview #1. Each one has evidence (her actual words) and a design
          implication for the Paired Calendar.
        </p>
      </header>

      {/* Findings Cards */}
      <div className="grid-cards">
        {FINDINGS.map((finding) => {
          const isOpen = expanded === finding.id;
          return (
            <div key={finding.id} className="card fade-in">
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
                  <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>
                    {finding.emoji}
                  </span>
                  <span className="card-title" style={{ margin: 0 }}>
                    {finding.title}
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
                    #{finding.id}
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
                      {finding.evidence}
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
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.92rem',
                        lineHeight: 1.65,
                        color: 'var(--text-2, #6B6B6B)',
                      }}
                    >
                      {finding.summary}
                    </p>
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
                      {'For the calendar \u2192'}
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
                      {finding.designImplication}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
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
          <p
            style={{
              margin: 0,
              fontSize: '0.95rem',
              lineHeight: 1.7,
              color: 'var(--text-2, #6B6B6B)',
            }}
          >
            She wants to{' '}
            <strong style={{ color: 'var(--olive, #4A6741)' }}>FEEL connected</strong> but stay{' '}
            <strong style={{ color: 'var(--terracotta, #C46B4D)' }}>INVISIBLE</strong>. The calendar
            has to thread this needle &mdash; present enough to create warmth, opaque enough to
            preserve freedom.
          </p>
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
