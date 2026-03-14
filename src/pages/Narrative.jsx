import { useState } from 'react';
import { useData } from '../context/DataContext';
import EditableText from '../components/EditableText';
import EditableTextarea from '../components/EditableTextarea';
import AddItemButton from '../components/AddItemButton';
import DeleteButton from '../components/DeleteButton';

/* ── Milestone status config ───────────────────────────── */
const MILESTONE_STATUS = {
  completed:    { label: 'Done',        color: 'var(--olive)',      bg: 'color-mix(in srgb, var(--olive) 10%, transparent)' },
  'in-progress': { label: 'In Progress', color: 'var(--terracotta)', bg: 'color-mix(in srgb, var(--terracotta) 10%, transparent)' },
  upcoming:     { label: 'Upcoming',    color: 'var(--text-3)',     bg: 'color-mix(in srgb, var(--text-3) 8%, transparent)' },
};

/* ── Version status config ─────────────────────────────── */
const VERSION_STATUS = {
  draft:     { label: 'Draft',     color: 'var(--terracotta)' },
  revised:   { label: 'Revised',   color: 'var(--blue)' },
  submitted: { label: 'Submitted', color: 'var(--purple)' },
  final:     { label: 'Final',     color: 'var(--olive)' },
};
const STATUS_CYCLE = ['draft', 'revised', 'submitted', 'final'];

/* ── Beat labels ───────────────────────────────────────── */
const BEAT_CONFIG = [
  { key: 'onceUponATime',    label: 'Once upon a time...',    color: 'var(--olive)' },
  { key: 'everyDay',         label: 'Every day...',           color: 'var(--blue)' },
  { key: 'untilOneDay',      label: 'Until one day...',       color: 'var(--terracotta)' },
  { key: 'becauseOfThat',    label: 'Because of that...',     color: 'var(--purple)' },
  { key: 'untilFinally',     label: 'Until finally...',       color: 'var(--olive)' },
  { key: 'andEverSinceThen', label: 'And ever since then...', color: 'var(--terracotta)' },
];

export default function Narrative() {
  const { narrative, dispatch } = useData();
  const [activeSpineIdx, setActiveSpineIdx] = useState(0);
  const [showDescHistory, setShowDescHistory] = useState(false);
  const [expandedMilestone, setExpandedMilestone] = useState(null);

  const { projectDescription, narrativeSpine, caseStudy, milestones } = narrative;

  const currentDesc = projectDescription.versions.find(v => v.isCurrent)
    || projectDescription.versions[projectDescription.versions.length - 1];

  const spineVersions = narrativeSpine.versions;
  const activeSpine = spineVersions[activeSpineIdx] || spineVersions[0];

  const cycleMilestoneStatus = (id, current) => {
    const order = ['upcoming', 'in-progress', 'completed'];
    const next = order[(order.indexOf(current) + 1) % order.length];
    dispatch({ type: 'UPDATE_MILESTONE', id, field: 'status', value: next });
  };

  const cycleVersionStatus = (collection, id, current) => {
    const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(current) + 1) % STATUS_CYCLE.length];
    dispatch({ type: 'UPDATE_NARRATIVE_VERSION', collection, id, field: 'status', value: next });
  };

  return (
    <div className="stagger">
      {/* Page Header */}
      <header className="page-header">
        <span className="page-badge" style={{ background: 'var(--terracotta)', color: '#fff' }}>
          Narrative
        </span>
        <h1 className="page-title">Narrative & Case Study</h1>
        <p className="page-subtitle">
          How the thesis is told. Track the evolution of your project description,
          narrative spine, and case study across drafts.
        </p>
      </header>

      {/* ── Milestone Timeline ─────────────────────────── */}
      <section style={{ marginBottom: 40 }}>
        <h2 className="section-title">Writing Timeline</h2>
        <div style={{
          display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4,
        }}>
          {milestones.map((m) => {
            const cfg = MILESTONE_STATUS[m.status] || MILESTONE_STATUS.upcoming;
            const isExpanded = expandedMilestone === m.id;
            return (
              <div key={m.id} style={{ flex: 1, minWidth: 100 }}>
                <button
                  onClick={() => setExpandedMilestone(isExpanded ? null : m.id)}
                  style={{
                    width: '100%',
                    background: cfg.bg,
                    border: `1px solid ${cfg.color}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '10px 10px 8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    opacity: m.status === 'upcoming' ? 0.65 : 1,
                  }}
                >
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginBottom: 4,
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                      fontWeight: 600, color: cfg.color, textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      W{m.week}
                    </span>
                    <span
                      onClick={(e) => { e.stopPropagation(); cycleMilestoneStatus(m.id, m.status); }}
                      style={{
                        fontSize: '0.55rem', fontFamily: 'var(--font-mono)',
                        padding: '1px 5px', borderRadius: 8,
                        background: cfg.color, color: '#fff',
                        cursor: 'pointer', fontWeight: 600,
                        textTransform: 'uppercase', letterSpacing: '0.04em',
                      }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '0.72rem', fontWeight: 600,
                    color: 'var(--text-1)', lineHeight: 1.3,
                  }}>
                    {m.title}
                  </div>
                  <div style={{
                    fontSize: '0.62rem', color: 'var(--text-3)', marginTop: 2,
                  }}>
                    {m.date}
                  </div>
                </button>

                {isExpanded && (
                  <div style={{
                    marginTop: 6, padding: '8px 10px',
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)', fontSize: '0.75rem',
                  }}>
                    <div style={{ color: 'var(--text-2)', marginBottom: 6, lineHeight: 1.5 }}>
                      {m.deliverables}
                    </div>
                    <EditableTextarea
                      value={m.notes}
                      onSave={v => dispatch({ type: 'UPDATE_MILESTONE', id: m.id, field: 'notes', value: v })}
                      placeholder="Add notes..."
                      style={{ fontSize: '0.75rem', color: 'var(--text-1)', margin: 0, lineHeight: 1.5 }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Project Description ────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <h2 className="section-title" style={{ margin: 0 }}>Project Description</h2>
          {currentDesc && (
            <span
              onClick={() => cycleVersionStatus('projectDescription', currentDesc.id, currentDesc.status)}
              className="tag-pill"
              style={{
                background: `color-mix(in srgb, ${(VERSION_STATUS[currentDesc.status] || VERSION_STATUS.draft).color} 12%, transparent)`,
                color: (VERSION_STATUS[currentDesc.status] || VERSION_STATUS.draft).color,
                cursor: 'pointer', fontWeight: 600,
              }}
            >
              {(VERSION_STATUS[currentDesc.status] || VERSION_STATUS.draft).label}
            </span>
          )}
        </div>

        {currentDesc && (
          <div className="card" style={{
            padding: '1.5rem 1.75rem',
            borderLeft: '4px solid var(--terracotta)',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 12,
            }}>
              <EditableText
                value={currentDesc.label}
                onSave={v => dispatch({
                  type: 'UPDATE_NARRATIVE_VERSION', collection: 'projectDescription',
                  id: currentDesc.id, field: 'label', value: v,
                })}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  color: 'var(--terracotta)', fontWeight: 600,
                }}
              />
              <span style={{ fontSize: '0.7rem', color: 'var(--text-3)' }}>{currentDesc.date}</span>
            </div>
            <EditableTextarea
              value={currentDesc.text}
              onSave={v => dispatch({
                type: 'UPDATE_NARRATIVE_VERSION', collection: 'projectDescription',
                id: currentDesc.id, field: 'text', value: v,
              })}
              style={{
                fontSize: '0.92rem', lineHeight: 1.75,
                color: 'var(--text-1)', margin: 0,
                whiteSpace: 'pre-wrap',
              }}
            />
          </div>
        )}

        {/* Version History Toggle */}
        {projectDescription.versions.length > 1 && (
          <button
            onClick={() => setShowDescHistory(!showDescHistory)}
            style={{
              marginTop: 10, background: 'none', border: 'none',
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              color: 'var(--text-3)', cursor: 'pointer',
              textTransform: 'uppercase', letterSpacing: '0.06em',
            }}
          >
            {showDescHistory ? '\u25BC' : '\u25B6'} Version History ({projectDescription.versions.length - 1} older)
          </button>
        )}

        {showDescHistory && projectDescription.versions
          .filter(v => v.id !== currentDesc?.id)
          .map(v => (
            <div
              key={v.id}
              className="card"
              style={{
                marginTop: 8, padding: '1rem 1.25rem',
                opacity: 0.7, borderLeft: '3px solid var(--border)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                  color: 'var(--text-3)', textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}>
                  {v.label} &middot; {v.date}
                </span>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <button
                    onClick={() => dispatch({ type: 'SET_CURRENT_VERSION', collection: 'projectDescription', id: v.id })}
                    style={{
                      background: 'none', border: '1px solid var(--olive)',
                      borderRadius: 4, padding: '2px 8px',
                      fontSize: '0.58rem', fontFamily: 'var(--font-mono)',
                      color: 'var(--olive)', cursor: 'pointer',
                      textTransform: 'uppercase', fontWeight: 600,
                    }}
                  >
                    Set as current
                  </button>
                  <DeleteButton
                    onConfirm={() => dispatch({ type: 'DELETE_NARRATIVE_VERSION', collection: 'projectDescription', id: v.id })}
                    itemLabel="version"
                  />
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--text-2)', margin: 0, whiteSpace: 'pre-wrap' }}>
                {v.text.length > 300 ? v.text.substring(0, 300) + '...' : v.text}
              </p>
            </div>
          ))}

        <AddItemButton
          label="+ Add new version"
          onAdd={() => dispatch({
            type: 'ADD_NARRATIVE_VERSION',
            collection: 'projectDescription',
            item: {
              label: `Draft v${projectDescription.versions.length + 1}`,
              date: new Date().toISOString().split('T')[0],
              text: currentDesc ? currentDesc.text : '',
              status: 'draft',
              isCurrent: false,
            },
          })}
          accentColor="var(--terracotta)"
        />
      </section>

      {/* ── Narrative Spine (Pixar Framework) ──────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">Narrative Spine</h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-3)', marginBottom: 16, marginTop: -8 }}>
          Pixar&rsquo;s &ldquo;Once Upon a Time&rdquo; framework &mdash; {spineVersions.length} iteration{spineVersions.length !== 1 ? 's' : ''}
        </p>

        {/* Version Switcher */}
        {spineVersions.length > 1 && (
          <div style={{
            display: 'flex', gap: 4, marginBottom: 16, flexWrap: 'wrap',
          }}>
            {spineVersions.map((v, i) => (
              <button
                key={v.id}
                onClick={() => setActiveSpineIdx(i)}
                style={{
                  padding: '5px 12px', borderRadius: 20,
                  border: i === activeSpineIdx ? '1.5px solid var(--terracotta)' : '1px solid var(--border)',
                  background: i === activeSpineIdx ? 'color-mix(in srgb, var(--terracotta) 8%, transparent)' : 'transparent',
                  fontSize: '0.72rem', fontWeight: i === activeSpineIdx ? 600 : 400,
                  color: i === activeSpineIdx ? 'var(--terracotta)' : 'var(--text-2)',
                  cursor: 'pointer', fontFamily: 'var(--font-body)',
                  transition: 'all 0.15s ease',
                }}
              >
                {v.label}
                {v.isCurrent && <span style={{ marginLeft: 4, fontSize: '0.6rem' }}>{'\u2605'}</span>}
              </button>
            ))}
          </div>
        )}

        {/* Active Spine — 6 beats */}
        {activeSpine && (
          <div style={{ position: 'relative' }}>
            {/* Connecting line */}
            <div style={{
              position: 'absolute', left: 15, top: 20, bottom: 20,
              width: 2, background: 'var(--border)', zIndex: 0,
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', zIndex: 1 }}>
              {BEAT_CONFIG.map(({ key, label, color }, i) => (
                <div
                  key={key}
                  className="card"
                  style={{
                    display: 'flex', gap: 14,
                    padding: '1rem 1.15rem',
                    borderLeft: `4px solid ${color}`,
                    marginLeft: 24,
                  }}
                >
                  {/* Beat dot */}
                  <div style={{
                    position: 'absolute', left: 8,
                    width: 16, height: 16, borderRadius: '50%',
                    background: color, border: '2px solid var(--surface)',
                    flexShrink: 0, marginTop: 14,
                  }} />

                  <div style={{ flex: 1 }}>
                    <span style={{
                      fontFamily: 'var(--font-heading)', fontSize: '0.95rem',
                      color, display: 'block', marginBottom: 6,
                      fontStyle: 'italic',
                    }}>
                      {label}
                    </span>
                    <EditableTextarea
                      value={activeSpine.beats[key]}
                      onSave={v => dispatch({ type: 'UPDATE_SPINE_BEAT', versionId: activeSpine.id, beat: key, value: v })}
                      placeholder={`${label}`}
                      style={{
                        fontSize: '0.88rem', lineHeight: 1.65,
                        color: 'var(--text-1)', margin: 0,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Spine meta bar */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginTop: 12, marginLeft: 24, paddingLeft: 4,
            }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {!activeSpine.isCurrent && (
                  <button
                    onClick={() => dispatch({ type: 'SET_CURRENT_VERSION', collection: 'narrativeSpine', id: activeSpine.id })}
                    style={{
                      background: 'none', border: '1px solid var(--olive)',
                      borderRadius: 4, padding: '3px 10px',
                      fontSize: '0.6rem', fontFamily: 'var(--font-mono)',
                      color: 'var(--olive)', cursor: 'pointer',
                      textTransform: 'uppercase', fontWeight: 600,
                    }}
                  >
                    Set as current
                  </button>
                )}
                {activeSpine.isCurrent && (
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                    color: 'var(--olive)', fontWeight: 600,
                    textTransform: 'uppercase',
                  }}>
                    {'\u2605 Current version'}
                  </span>
                )}
              </div>
              <DeleteButton
                onConfirm={() => {
                  dispatch({ type: 'DELETE_SPINE_VERSION', id: activeSpine.id });
                  setActiveSpineIdx(Math.max(0, activeSpineIdx - 1));
                }}
                itemLabel="iteration"
              />
            </div>
          </div>
        )}

        <AddItemButton
          label="+ Add new iteration"
          onAdd={() => dispatch({ type: 'ADD_SPINE_VERSION' })}
          accentColor="var(--terracotta)"
        />
      </section>

      {/* ── Case Study (placeholder) ───────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">Case Study</h2>
        {caseStudy.versions.length === 0 ? (
          <div style={{
            padding: '2rem', textAlign: 'center',
            border: '1.5px dashed var(--border)', borderRadius: 'var(--radius-md)',
            color: 'var(--text-3)',
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: 8, opacity: 0.5 }}>
              {'\uD83D\uDCDD'}
            </div>
            <div style={{ fontSize: '0.85rem', marginBottom: 4 }}>
              Coming Week 4 (Mar 26)
            </div>
            <div style={{ fontSize: '0.72rem' }}>
              1,000&ndash;1,500 words + supporting visuals
            </div>
          </div>
        ) : (
          <div>
            {caseStudy.versions.map(v => (
              <div key={v.id} className="card" style={{ padding: '1.25rem', marginBottom: 8 }}>
                <EditableTextarea
                  value={v.text}
                  onSave={val => dispatch({
                    type: 'UPDATE_NARRATIVE_VERSION', collection: 'caseStudy',
                    id: v.id, field: 'text', value: val,
                  })}
                  style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-1)', margin: 0 }}
                />
              </div>
            ))}
          </div>
        )}
        <AddItemButton
          label="+ Add case study draft"
          onAdd={() => dispatch({
            type: 'ADD_NARRATIVE_VERSION',
            collection: 'caseStudy',
            item: {
              label: `Case Study v${caseStudy.versions.length + 1}`,
              date: new Date().toISOString().split('T')[0],
              text: '',
              status: 'draft',
              isCurrent: true,
            },
          })}
          accentColor="var(--terracotta)"
        />
      </section>

      {/* ── Presentation & Channels (placeholder) ──────── */}
      <section>
        <h2 className="section-title">Presentation & Channels</h2>
        <div style={{
          padding: '2rem', textAlign: 'center',
          border: '1.5px dashed var(--border)', borderRadius: 'var(--radius-md)',
          color: 'var(--text-3)',
        }}>
          <div style={{ fontSize: '1.5rem', marginBottom: 8, opacity: 0.5 }}>
            {'\uD83C\uDFA4'}
          </div>
          <div style={{ fontSize: '0.85rem', marginBottom: 4 }}>
            Coming Weeks 5&ndash;6 (Apr 2&ndash;9)
          </div>
          <div style={{ fontSize: '0.72rem' }}>
            Presentation outline, 3&ndash;5 channel adaptations, professional bio
          </div>
        </div>
      </section>
    </div>
  );
}
