import { useState } from 'react';
import { THEME_CODES, CODING_DATA } from '../data/colorCoding';

const PIDS = ['p1', 'p2', 'p3', 'p4', 'p5'];

/* ── helpers ── */
function totalForTheme(tid) {
  return PIDS.reduce((sum, pid) => sum + (CODING_DATA[pid].counts[tid] || 0), 0);
}

function maxCount() {
  let mx = 0;
  for (const pid of PIDS)
    for (const v of Object.values(CODING_DATA[pid].counts)) if (v > mx) mx = v;
  return mx;
}

function pctOfCoded(pid, tid) {
  const d = CODING_DATA[pid];
  return d.codedLines > 0 ? ((d.counts[tid] || 0) / d.codedLines) * 100 : 0;
}

/* ── main component ── */
export default function ColorCoding() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [view, setView] = useState('heatmap'); // heatmap | bars | quotes
  const mx = maxCount();

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <header className="page-header">
        <span
          className="page-badge"
          style={{ background: 'var(--purple)', color: '#fff' }}
        >
          Color Coding
        </span>
        <h1
          className="page-title"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Qualitative Color Coding
        </h1>
        <p className="page-subtitle">
          8 theme codes applied across 5 interview transcripts — first-pass
          automated coding with keyword matching
        </p>
      </header>

      {/* ── Theme Legend ── */}
      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 20,
            marginBottom: 12,
            color: 'var(--text-1)',
          }}
        >
          Theme Codes
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 10,
          }}
        >
          {THEME_CODES.map((t) => {
            const isActive = selectedTheme === t.id;
            const total = totalForTheme(t.id);
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTheme(isActive ? null : t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  padding: '10px 14px',
                  border: isActive
                    ? `2px solid ${t.color}`
                    : '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? t.bg : 'var(--surface)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all .15s',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: t.color,
                    marginTop: 6,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 13,
                      color: 'var(--text-1)',
                    }}
                  >
                    {t.number}. {t.label}
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: 11,
                        color: 'var(--text-3)',
                        marginLeft: 6,
                      }}
                    >
                      {total} passages
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: 'var(--text-2)',
                      marginTop: 2,
                      lineHeight: 1.4,
                    }}
                  >
                    {t.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── View Switcher ── */}
      <div
        style={{
          display: 'flex',
          gap: 4,
          marginBottom: 20,
          background: 'var(--surface)',
          borderRadius: 'var(--radius-md)',
          padding: 4,
          border: '1px solid var(--border)',
          width: 'fit-content',
        }}
      >
        {[
          { id: 'heatmap', label: 'Heatmap' },
          { id: 'bars', label: 'Bar Chart' },
          { id: 'quotes', label: 'Key Quotes' },
        ].map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            style={{
              padding: '6px 16px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: view === v.id ? 'var(--text-1)' : 'transparent',
              color: view === v.id ? '#fff' : 'var(--text-2)',
              fontWeight: view === v.id ? 600 : 400,
              fontSize: 12,
              cursor: 'pointer',
              transition: 'all .15s',
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* ── HEATMAP VIEW ── */}
      {view === 'heatmap' && (
        <section style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 18,
              marginBottom: 16,
              color: 'var(--text-1)',
            }}
          >
            Theme × Participant Heatmap
          </h2>

          {/* Column headers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '180px repeat(5, 1fr) 60px',
              gap: 2,
              marginBottom: 2,
            }}
          >
            <div />
            {PIDS.map((pid) => (
              <div
                key={pid}
                style={{
                  textAlign: 'center',
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--text-2)',
                  padding: '6px 4px',
                }}
              >
                {CODING_DATA[pid].label}
              </div>
            ))}
            <div
              style={{
                textAlign: 'center',
                fontSize: 10,
                fontWeight: 600,
                color: 'var(--text-3)',
                padding: '6px 4px',
              }}
            >
              Total
            </div>
          </div>

          {/* Rows */}
          {THEME_CODES.map((t) => {
            const isHighlighted = selectedTheme === t.id;
            const total = totalForTheme(t.id);
            return (
              <div
                key={t.id}
                onClick={() =>
                  setSelectedTheme(
                    selectedTheme === t.id ? null : t.id
                  )
                }
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px repeat(5, 1fr) 60px',
                  gap: 2,
                  marginBottom: 2,
                  cursor: 'pointer',
                  opacity:
                    selectedTheme && !isHighlighted ? 0.35 : 1,
                  transition: 'opacity .2s',
                }}
              >
                {/* Theme label */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 10px',
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'var(--text-1)',
                    borderRadius: '4px 0 0 4px',
                    background: isHighlighted
                      ? t.bg
                      : 'var(--surface)',
                  }}
                >
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      background: t.color,
                      flexShrink: 0,
                    }}
                  />
                  {t.label}
                </div>

                {/* Cells */}
                {PIDS.map((pid) => {
                  const count = CODING_DATA[pid].counts[t.id] || 0;
                  const pct = pctOfCoded(pid, t.id);
                  const intensity =
                    count === 0 ? 0 : Math.max(0.12, count / mx);
                  return (
                    <div
                      key={pid}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px 4px',
                        fontSize: 13,
                        fontWeight: count > 0 ? 600 : 400,
                        color:
                          intensity > 0.5
                            ? '#fff'
                            : count > 0
                              ? t.color
                              : 'var(--text-3)',
                        background:
                          count === 0
                            ? 'var(--surface)'
                            : `${t.color}${Math.round(
                                intensity * 200 + 55
                              )
                                .toString(16)
                                .padStart(2, '0')}`,
                        borderRadius: 2,
                        transition: 'all .2s',
                        position: 'relative',
                      }}
                      title={`${t.label}: ${count} passages (${pct.toFixed(1)}% of coded)`}
                    >
                      {count > 0 ? count : '–'}
                    </div>
                  );
                })}

                {/* Total */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 4px',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--text-2)',
                    background: 'var(--surface)',
                    borderRadius: '0 4px 4px 0',
                  }}
                >
                  {total}
                </div>
              </div>
            );
          })}

          {/* Footer: coverage row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '180px repeat(5, 1fr) 60px',
              gap: 2,
              marginTop: 8,
              paddingTop: 8,
              borderTop: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: 'var(--text-3)',
                padding: '4px 10px',
              }}
            >
              Coverage
            </div>
            {PIDS.map((pid) => {
              const d = CODING_DATA[pid];
              const pct = ((d.codedLines / d.totalLines) * 100).toFixed(
                1
              );
              return (
                <div
                  key={pid}
                  style={{
                    textAlign: 'center',
                    fontSize: 11,
                    color: 'var(--text-3)',
                    padding: '4px',
                  }}
                >
                  {pct}%
                  <span
                    style={{
                      fontSize: 9,
                      display: 'block',
                      color: 'var(--text-3)',
                      opacity: 0.6,
                    }}
                  >
                    {d.codedLines}/{d.totalLines}
                  </span>
                </div>
              );
            })}
            <div />
          </div>
        </section>
      )}

      {/* ── BAR CHART VIEW ── */}
      {view === 'bars' && (
        <section style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 18,
              marginBottom: 16,
              color: 'var(--text-1)',
            }}
          >
            Theme Distribution
          </h2>
          {THEME_CODES.map((t) => {
            const total = totalForTheme(t.id);
            const grandTotal = THEME_CODES.reduce(
              (s, th) => s + totalForTheme(th.id),
              0
            );
            const pct = grandTotal > 0 ? (total / grandTotal) * 100 : 0;
            const isActive = selectedTheme === t.id;

            return (
              <div
                key={t.id}
                onClick={() =>
                  setSelectedTheme(
                    selectedTheme === t.id ? null : t.id
                  )
                }
                style={{
                  marginBottom: 12,
                  cursor: 'pointer',
                  opacity:
                    selectedTheme && !isActive ? 0.35 : 1,
                  transition: 'opacity .2s',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: 'var(--text-1)',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: 8,
                        height: 8,
                        borderRadius: 2,
                        background: t.color,
                        marginRight: 8,
                      }}
                    />
                    {t.number}. {t.label}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: 'var(--text-3)',
                    }}
                  >
                    {total} ({pct.toFixed(1)}%)
                  </span>
                </div>

                {/* Stacked bar */}
                <div
                  style={{
                    display: 'flex',
                    height: 24,
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {PIDS.map((pid) => {
                    const count =
                      CODING_DATA[pid].counts[t.id] || 0;
                    const w =
                      total > 0 ? (count / total) * 100 : 0;
                    if (count === 0) return null;
                    const colors = [
                      '#4472C4',
                      '#ED7D31',
                      '#70AD47',
                      '#FFC000',
                      '#5B9BD5',
                    ];
                    const idx = PIDS.indexOf(pid);
                    return (
                      <div
                        key={pid}
                        title={`${CODING_DATA[pid].label}: ${count}`}
                        style={{
                          width: `${w}%`,
                          background: colors[idx],
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 10,
                          fontWeight: 600,
                          color: '#fff',
                          minWidth: count > 0 ? 28 : 0,
                          transition: 'width .3s',
                        }}
                      >
                        {count > 2
                          ? CODING_DATA[pid].label
                          : ''}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Legend */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginTop: 16,
              justifyContent: 'center',
            }}
          >
            {PIDS.map((pid, idx) => {
              const colors = [
                '#4472C4',
                '#ED7D31',
                '#70AD47',
                '#FFC000',
                '#5B9BD5',
              ];
              return (
                <div
                  key={pid}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 11,
                    color: 'var(--text-2)',
                  }}
                >
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      background: colors[idx],
                    }}
                  />
                  {CODING_DATA[pid].label}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── QUOTES VIEW ── */}
      {view === 'quotes' && (
        <section style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 18,
              marginBottom: 16,
              color: 'var(--text-1)',
            }}
          >
            Key Quotes by Theme
          </h2>
          {THEME_CODES.filter(
            (t) => !selectedTheme || selectedTheme === t.id
          ).map((t) => (
            <div
              key={t.id}
              style={{
                marginBottom: 28,
                padding: '16px 20px',
                background: 'var(--surface)',
                borderRadius: 'var(--radius-md)',
                borderLeft: `4px solid ${t.color}`,
              }}
            >
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: t.color,
                  marginBottom: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: t.color,
                  }}
                />
                {t.number}. {t.label}
              </h3>

              {PIDS.map((pid) => {
                const quotes = CODING_DATA[pid].topQuotes || {};
                const q = quotes[t.id];
                if (!q) return null;
                return (
                  <div
                    key={pid}
                    style={{
                      marginBottom: 10,
                      paddingLeft: 12,
                      borderLeft: '2px solid var(--border)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: 'var(--text-3)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {CODING_DATA[pid].label} —{' '}
                      {CODING_DATA[pid].desc}
                    </span>
                    <div
                      style={{
                        fontSize: 13,
                        color: 'var(--text-1)',
                        marginTop: 2,
                        lineHeight: 1.5,
                        fontStyle: 'italic',
                      }}
                    >
                      {q}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </section>
      )}

      {/* ── Participant Profiles ── */}
      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 18,
            marginBottom: 16,
            color: 'var(--text-1)',
          }}
        >
          Per-Participant Theme Profile
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 12,
          }}
        >
          {PIDS.map((pid) => {
            const d = CODING_DATA[pid];
            const sorted = THEME_CODES.slice()
              .sort(
                (a, b) =>
                  (d.counts[b.id] || 0) - (d.counts[a.id] || 0)
              )
              .filter((t) => (d.counts[t.id] || 0) > 0);

            return (
              <div
                key={pid}
                style={{
                  padding: 16,
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginBottom: 2,
                    color: 'var(--text-1)',
                  }}
                >
                  {d.label}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'var(--text-3)',
                    marginBottom: 12,
                  }}
                >
                  {d.desc}
                </div>

                {sorted.slice(0, 5).map((t, idx) => {
                  const count = d.counts[t.id];
                  const w =
                    d.codedLines > 0
                      ? (count / d.codedLines) * 100
                      : 0;
                  return (
                    <div key={t.id} style={{ marginBottom: 6 }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: 10,
                          color: 'var(--text-2)',
                          marginBottom: 2,
                        }}
                      >
                        <span>{t.label}</span>
                        <span>{count}</span>
                      </div>
                      <div
                        style={{
                          height: 6,
                          borderRadius: 3,
                          background: 'var(--border)',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${w}%`,
                            height: '100%',
                            background: t.color,
                            borderRadius: 3,
                            transition: 'width .3s',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}

                <div
                  style={{
                    marginTop: 10,
                    fontSize: 10,
                    color: 'var(--text-3)',
                  }}
                >
                  {d.codedLines} coded / {d.totalLines} total (
                  {((d.codedLines / d.totalLines) * 100).toFixed(1)}%)
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Methodology Note ── */}
      <section
        style={{
          marginBottom: 32,
          padding: '16px 20px',
          background: 'var(--highlight-bg)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--highlight-border)',
        }}
      >
        <h3
          style={{
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 8,
            color: 'var(--text-2)',
          }}
        >
          Methodology Note
        </h3>
        <p
          style={{
            fontSize: 12,
            lineHeight: 1.6,
            color: 'var(--text-2)',
            margin: 0,
          }}
        >
          This is a first-pass automated coding using keyword/phrase matching
          against the full interview transcripts. Coverage ranges from 10–21%,
          which is typical for qualitative coding where interviewer questions,
          filler speech, and transitions are not coded. The color-coded .docx
          transcripts (exported separately) serve as the primary working
          documents for review and refinement. Theme assignments should be
          validated through manual review — some passages may be miscategorized
          or missed by automated matching.
        </p>
      </section>
    </div>
  );
}
