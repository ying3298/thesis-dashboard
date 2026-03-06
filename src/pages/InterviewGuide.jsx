import { useState } from 'react';
import GUIDE_SECTIONS from '../data/guide';

export default function InterviewGuide() {
  const [activeSection, setActiveSection] = useState(GUIDE_SECTIONS[0].id);
  const [expandedCards, setExpandedCards] = useState({});

  const section = GUIDE_SECTIONS.find(s => s.id === activeSection);

  function toggleCard(itemTitle) {
    setExpandedCards(prev => ({ ...prev, [itemTitle]: !prev[itemTitle] }));
  }

  function expandAll() {
    if (!section) return;
    const allExpanded = section.items.every(item => expandedCards[item.title]);
    if (allExpanded) {
      setExpandedCards({});
    } else {
      const next = { ...expandedCards };
      section.items.forEach(item => { next[item.title] = true; });
      setExpandedCards(next);
    }
  }

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Page header */}
      <header className="page-header">
        <span
          className="page-badge"
          style={{ background: 'var(--purple)', color: '#fff' }}
        >
          Methods
        </span>
        <h1 className="page-title" style={{ fontFamily: 'var(--font-heading)' }}>
          Interview Guide
        </h1>
        <p
          className="page-subtitle"
          style={{
            color: 'var(--text-2)',
            fontFamily: 'var(--font-body)',
            maxWidth: 560,
          }}
        >
          Tips, probes, and structure for your next interview.
          Extracted from analyzing Interview #1.
        </p>
      </header>

      {/* Section tabs */}
      <nav style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        marginBottom: '1.5rem',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid var(--border)',
      }}>
        {GUIDE_SECTIONS.map(s => {
          const isActive = s.id === activeSection;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${isActive ? s.color : 'var(--border)'}`,
                background: isActive ? s.color : 'var(--surface)',
                color: isActive ? '#fff' : 'var(--text-2)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span style={{ fontSize: '0.9rem' }}>{s.icon}</span>
              {s.label}
            </button>
          );
        })}
      </nav>

      {/* Active section content */}
      {section && (
        <div>
          {/* Section intro */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1rem',
          }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: 'var(--text-2)',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: 560,
            }}>
              {section.intro}
            </p>
            <button
              onClick={expandAll}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-3)',
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 10px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                marginLeft: 16,
              }}
            >
              {section.items.every(item => expandedCards[item.title]) ? 'Collapse all' : 'Expand all'}
            </button>
          </div>

          {/* Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {section.items.map((item, idx) => {
              const isOpen = !!expandedCards[item.title];
              return (
                <div
                  key={item.title}
                  className="card"
                  style={{
                    background: 'var(--surface)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.15s ease',
                  }}
                >
                  {/* Card header */}
                  <button
                    className="card-header"
                    onClick={() => toggleCard(item.title)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      width: '100%',
                      padding: '0.85rem 1rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    {/* Tag pill */}
                    <span
                      className="tag-pill"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        padding: '2px 8px',
                        borderRadius: 999,
                        background: section.color + '18',
                        color: section.color,
                        fontWeight: 600,
                        flexShrink: 0,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.tag}
                    </span>

                    {/* Title */}
                    <span
                      className="card-title"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: 'var(--text-1)',
                        flex: 1,
                      }}
                    >
                      {item.title}
                    </span>

                    {/* Toggle */}
                    <span
                      className="card-toggle"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.1rem',
                        color: 'var(--text-3)',
                        flexShrink: 0,
                        transition: 'transform 0.2s ease',
                        transform: isOpen ? 'rotate(45deg)' : 'none',
                        width: 20,
                        textAlign: 'center',
                      }}
                    >
                      +
                    </span>
                  </button>

                  {/* Card body */}
                  {isOpen && (
                    <div
                      className="card-body"
                      style={{
                        padding: '0 1rem 1rem 1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                      }}
                    >
                      {/* Divider */}
                      <div style={{ height: 1, background: 'var(--border)', margin: '0 0 0.25rem 0' }} />

                      {/* Why text */}
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.87rem',
                        lineHeight: 1.65,
                        color: 'var(--text-2)',
                        margin: 0,
                      }}>
                        {item.why}
                      </p>

                      {/* Principle callout */}
                      {item.principle && (
                        <div
                          className="card-principle"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.85rem',
                            lineHeight: 1.55,
                            color: section.color,
                            fontWeight: 500,
                            fontStyle: 'italic',
                            padding: '0.65rem 0.85rem',
                            borderRadius: 'var(--radius-sm)',
                            background: section.color + '0C',
                            borderLeft: `3px solid ${section.color}`,
                          }}
                        >
                          {item.principle}
                        </div>
                      )}

                      {/* Fix / tip box */}
                      {item.fix && (
                        <div
                          className="card-tip"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.84rem',
                            lineHeight: 1.6,
                            color: 'var(--text-1)',
                            padding: '0.65rem 0.85rem',
                            borderRadius: 'var(--radius-sm)',
                            background: 'var(--highlight-bg)',
                            borderLeft: '3px solid var(--highlight-border)',
                          }}
                        >
                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            color: 'var(--highlight-border)',
                            display: 'block',
                            marginBottom: 4,
                            fontWeight: 600,
                          }}>
                            Try this
                          </span>
                          {item.fix}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
