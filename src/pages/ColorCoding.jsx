import { useState } from 'react';
import { THEME_CODES, CODING_DATA } from '../data/colorCoding';
import { TRANSCRIPT_DATA } from '../data/transcriptData';

const PIDS = ['p1', 'p2', 'p3', 'p4', 'p5'];

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

export default function ColorCoding() {
  const [selectedCode, setSelectedCode] = useState(null);
  const [view, setView] = useState('heatmap');
  const [selectedParticipant, setSelectedParticipant] = useState('p1');
  const [expandedQ, setExpandedQ] = useState(new Set());
  const mx = maxCount();

  const toggleQ = (idx) => {
    setExpandedQ(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const expandAll = () => {
    const turns = TRANSCRIPT_DATA[selectedParticipant]?.turns || [];
    setExpandedQ(new Set(turns.map((_, i) => i)));
  };

  const collapseAll = () => setExpandedQ(new Set());

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
          Coding Signal
        </h1>
        <p className="page-subtitle">
          6 signal codes applied across 5 interview transcripts — first-pass
          automated coding
        </p>
      </header>

      {/* ── Signal Legend ── */}
      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 20,
            marginBottom: 12,
            color: 'var(--text-1)',
          }}
        >
          Coding Signal
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 10,
          }}
        >
          {THEME_CODES.map((t) => {
            const isActive = selectedCode === t.id;
            const total = totalForTheme(t.id);
            return (
              <button
                key={t.id}
                onClick={() => setSelectedCode(isActive ? null : t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  padding: '12px 14px',
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
                    width: 14,
                    height: 14,
                    borderRadius: 3,
                    background: t.color,
                    marginTop: 2,
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
                    {t.label}
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: 11,
                        color: 'var(--text-3)',
                        marginLeft: 6,
                      }}
                    >
                      {total}
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
          { id: 'bars', label: 'Stacked Bars' },
          { id: 'transcript', label: 'Transcript' },
        ].map((v) => (
          <button
            key={v.id}
            onClick={() => {
              setView(v.id);
              if (v.id === 'transcript') setExpandedQ(new Set());
            }}
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
            Signal × Participant
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '160px repeat(5, 1fr) 56px',
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

          {THEME_CODES.map((t) => {
            const isHl = selectedCode === t.id;
            const total = totalForTheme(t.id);
            return (
              <div
                key={t.id}
                onClick={() =>
                  setSelectedCode(selectedCode === t.id ? null : t.id)
                }
                style={{
                  display: 'grid',
                  gridTemplateColumns: '160px repeat(5, 1fr) 56px',
                  gap: 2,
                  marginBottom: 2,
                  cursor: 'pointer',
                  opacity: selectedCode && !isHl ? 0.3 : 1,
                  transition: 'opacity .2s',
                }}
              >
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
                    background: isHl ? t.bg : 'var(--surface)',
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
                            : `${t.color}${Math.round(intensity * 200 + 55)
                                .toString(16)
                                .padStart(2, '0')}`,
                        borderRadius: 2,
                        transition: 'all .2s',
                      }}
                      title={`${t.label}: ${count} (${pct.toFixed(1)}% of coded)`}
                    >
                      {count > 0 ? count : '–'}
                    </div>
                  );
                })}

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

          {/* Coverage footer */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '160px repeat(5, 1fr) 56px',
              gap: 2,
              marginTop: 8,
              paddingTop: 8,
              borderTop: '1px solid var(--border)',
            }}
          >
            <div
              style={{ fontSize: 11, color: 'var(--text-3)', padding: '4px 10px' }}
            >
              Coverage
            </div>
            {PIDS.map((pid) => {
              const d = CODING_DATA[pid];
              const pct = ((d.codedLines / d.totalLines) * 100).toFixed(1);
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

      {/* ── STACKED BARS VIEW ── */}
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
            Signal Distribution
          </h2>
          {THEME_CODES.map((t) => {
            const total = totalForTheme(t.id);
            const grandTotal = THEME_CODES.reduce(
              (s, th) => s + totalForTheme(th.id),
              0
            );
            const pct = grandTotal > 0 ? (total / grandTotal) * 100 : 0;
            const isActive = selectedCode === t.id;

            return (
              <div
                key={t.id}
                onClick={() =>
                  setSelectedCode(selectedCode === t.id ? null : t.id)
                }
                style={{
                  marginBottom: 14,
                  cursor: 'pointer',
                  opacity: selectedCode && !isActive ? 0.3 : 1,
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
                  <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-1)' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 10,
                        height: 10,
                        borderRadius: 2,
                        background: t.color,
                        marginRight: 8,
                      }}
                    />
                    {t.label}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text-3)' }}>
                    {total} ({pct.toFixed(1)}%)
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    height: 26,
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {PIDS.map((pid) => {
                    const count = CODING_DATA[pid].counts[t.id] || 0;
                    const w = total > 0 ? (count / total) * 100 : 0;
                    if (count === 0) return null;
                    const pColors = ['#4472C4', '#ED7D31', '#70AD47', '#FFC000', '#5B9BD5'];
                    const idx = PIDS.indexOf(pid);
                    return (
                      <div
                        key={pid}
                        title={`${CODING_DATA[pid].label}: ${count}`}
                        style={{
                          width: `${w}%`,
                          background: pColors[idx],
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 10,
                          fontWeight: 600,
                          color: '#fff',
                          minWidth: count > 0 ? 28 : 0,
                        }}
                      >
                        {count > 2 ? CODING_DATA[pid].label : ''}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div
            style={{
              display: 'flex',
              gap: 16,
              marginTop: 16,
              justifyContent: 'center',
            }}
          >
            {PIDS.map((pid, idx) => {
              const pColors = ['#4472C4', '#ED7D31', '#70AD47', '#FFC000', '#5B9BD5'];
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
                      background: pColors[idx],
                    }}
                  />
                  {CODING_DATA[pid].label}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── TRANSCRIPT VIEW ── */}
      {view === 'transcript' && (
        <section style={{ marginBottom: 48 }}>
          {/* Participant Tabs */}
          <div style={{
            display: 'flex',
            gap: 6,
            marginBottom: 16,
            flexWrap: 'wrap',
          }}>
            {PIDS.map(pid => {
              const isActive = selectedParticipant === pid;
              return (
                <button
                  key={pid}
                  onClick={() => {
                    setSelectedParticipant(pid);
                    setExpandedQ(new Set());
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: isActive ? '2px solid var(--text-1)' : '1px solid var(--border)',
                    background: isActive ? 'var(--text-1)' : 'var(--surface)',
                    color: isActive ? '#fff' : 'var(--text-2)',
                    fontWeight: isActive ? 600 : 400,
                    fontSize: 12,
                    cursor: 'pointer',
                    transition: 'all .15s',
                  }}
                >
                  {CODING_DATA[pid].label}
                  <span style={{
                    fontSize: 10,
                    opacity: 0.7,
                    marginLeft: 6,
                  }}>
                    {CODING_DATA[pid].desc}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Compact Legend + Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
            padding: '10px 14px',
            background: 'var(--surface)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            flexWrap: 'wrap',
            gap: 8,
          }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {THEME_CODES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedCode(selectedCode === t.id ? null : t.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    fontSize: 11, background: 'none', border: 'none',
                    cursor: 'pointer', padding: '2px 4px',
                    borderRadius: 4,
                    opacity: selectedCode && selectedCode !== t.id ? 0.35 : 1,
                    transition: 'opacity .15s',
                  }}
                >
                  <span style={{
                    width: 10, height: 10, borderRadius: 2,
                    background: t.color, flexShrink: 0,
                  }} />
                  <span style={{ color: 'var(--text-2)' }}>{t.label}</span>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={expandAll}
                style={{
                  fontSize: 10, color: 'var(--text-3)', background: 'none',
                  border: 'none', cursor: 'pointer', textDecoration: 'underline',
                }}
              >
                Expand all
              </button>
              <button
                onClick={collapseAll}
                style={{
                  fontSize: 10, color: 'var(--text-3)', background: 'none',
                  border: 'none', cursor: 'pointer', textDecoration: 'underline',
                }}
              >
                Collapse all
              </button>
            </div>
          </div>

          {/* Q/A Blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(TRANSCRIPT_DATA[selectedParticipant]?.turns || []).map((turn, idx) => {
              const isOpen = expandedQ.has(idx);
              const codedCount = turn.answer.filter(a => a.signal).length;
              const hasMatchingSignal = selectedCode
                ? turn.answer.some(a => a.signal === selectedCode)
                : true;

              return (
                <div key={idx} style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  overflow: 'hidden',
                  opacity: selectedCode && !hasMatchingSignal ? 0.25 : 1,
                  transition: 'opacity .2s',
                }}>
                  {/* Question Header (clickable) */}
                  <button
                    onClick={() => toggleQ(idx)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: isOpen ? 'var(--bg)' : 'var(--surface)',
                      borderBottom: isOpen ? '1px solid var(--border)' : 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{
                      fontSize: 10,
                      color: 'var(--text-3)',
                      marginTop: 2,
                      flexShrink: 0,
                      width: 14,
                    }}>
                      {isOpen ? '\u25BC' : '\u25B6'}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 9,
                      fontWeight: 600,
                      color: 'var(--text-3)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      padding: '2px 6px',
                      background: isOpen ? 'var(--surface)' : 'var(--bg)',
                      borderRadius: 4,
                      flexShrink: 0,
                      marginTop: 1,
                    }}>
                      Q{idx + 1}
                    </span>
                    <span style={{
                      fontSize: 12,
                      color: 'var(--text-2)',
                      lineHeight: 1.5,
                      flex: 1,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: isOpen ? 'unset' : 2,
                      WebkitBoxOrient: 'vertical',
                    }}>
                      {turn.question}
                    </span>
                    <span style={{
                      fontSize: 10,
                      color: 'var(--text-3)',
                      flexShrink: 0,
                      marginTop: 2,
                      whiteSpace: 'nowrap',
                    }}>
                      {turn.answer.length} lines
                      {codedCount > 0 && (
                        <span style={{ marginLeft: 4 }}>
                          · {codedCount} coded
                        </span>
                      )}
                    </span>
                  </button>

                  {/* Answer Lines (expanded) */}
                  {isOpen && (
                    <div style={{ padding: '10px 14px 14px' }}>
                      {turn.answer.length === 0 ? (
                        <div style={{
                          fontSize: 12, color: 'var(--text-3)',
                          fontStyle: 'italic', padding: '8px 0',
                        }}>
                          (No response recorded)
                        </div>
                      ) : (
                        turn.answer.map((line, li) => {
                          const themeCode = line.signal
                            ? THEME_CODES.find(t => t.id === line.signal)
                            : null;
                          const dimmed = selectedCode && line.signal !== selectedCode;

                          return (
                            <div key={li} style={{
                              fontSize: 13,
                              lineHeight: 1.75,
                              padding: '4px 0 4px 12px',
                              color: themeCode ? themeCode.color : 'var(--text-1)',
                              borderLeft: themeCode
                                ? `3px solid ${themeCode.color}`
                                : '3px solid transparent',
                              background: themeCode
                                ? `color-mix(in srgb, ${themeCode.color} 6%, transparent)`
                                : 'transparent',
                              borderRadius: '0 4px 4px 0',
                              marginBottom: 2,
                              opacity: dimmed ? 0.2 : 1,
                              transition: 'opacity .15s',
                            }}
                              title={themeCode ? themeCode.label : ''}
                            >
                              {line.text}
                              {themeCode && (
                                <span style={{
                                  fontSize: 9,
                                  fontWeight: 600,
                                  color: themeCode.color,
                                  marginLeft: 8,
                                  opacity: 0.6,
                                  fontFamily: 'var(--font-mono)',
                                  letterSpacing: '0.04em',
                                }}>
                                  {themeCode.label}
                                </span>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Stats Footer */}
          <div style={{
            marginTop: 16,
            padding: '12px 16px',
            background: 'var(--surface)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            fontSize: 11,
            color: 'var(--text-3)',
            display: 'flex',
            gap: 16,
          }}>
            <span>
              {TRANSCRIPT_DATA[selectedParticipant]?.turns.length || 0} question blocks
            </span>
            <span>
              {(TRANSCRIPT_DATA[selectedParticipant]?.turns || [])
                .reduce((sum, t) => sum + t.answer.length, 0)} total lines
            </span>
            <span>
              {(TRANSCRIPT_DATA[selectedParticipant]?.turns || [])
                .reduce((sum, t) => sum + t.answer.filter(a => a.signal).length, 0)} coded lines
            </span>
          </div>
        </section>
      )}

      {/* ── Participant Profiles ── */}
      {view !== 'transcript' && (
        <section style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 18,
              marginBottom: 16,
              color: 'var(--text-1)',
            }}
          >
            Per-Participant Signal Profile
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
              gap: 12,
            }}
          >
            {PIDS.map((pid) => {
              const d = CODING_DATA[pid];
              const sorted = THEME_CODES.slice()
                .sort((a, b) => (d.counts[b.id] || 0) - (d.counts[a.id] || 0))
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
                    style={{ fontWeight: 700, fontSize: 14, marginBottom: 2, color: 'var(--text-1)' }}
                  >
                    {d.label}
                  </div>
                  <div
                    style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 12 }}
                  >
                    {d.desc}
                  </div>

                  {sorted.map((t) => {
                    const count = d.counts[t.id];
                    const w = d.codedLines > 0 ? (count / d.codedLines) * 100 : 0;
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
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}

                  <div style={{ marginTop: 10, fontSize: 10, color: 'var(--text-3)' }}>
                    {d.codedLines} coded / {d.totalLines} total (
                    {((d.codedLines / d.totalLines) * 100).toFixed(1)}%)
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Note ── */}
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
          style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-2)' }}
        >
          Note
        </h3>
        <p
          style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--text-2)', margin: 0 }}
        >
          First-pass automated coding using keyword matching. Finding = what we
          observe. Insight = why it happens. Color-coded .docx transcripts
          exported separately for manual review and refinement.
        </p>
      </section>
    </div>
  );
}
