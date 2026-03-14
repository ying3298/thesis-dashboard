import { useState, useRef, useEffect, Fragment } from 'react';
import { useData, PARTICIPANT_META } from '../context/DataContext';
import EditableText from '../components/EditableText';
import EditableTextarea from '../components/EditableTextarea';
import AddItemButton from '../components/AddItemButton';
import DeleteButton from '../components/DeleteButton';

/* ── Participant colors ──────────────────────────────── */
const P_COLORS = {
  p1: 'var(--olive)',
  p2: 'var(--terracotta)',
  p3: 'var(--blue)',
  p4: 'var(--purple)',
};
const P_IDS = ['p1', 'p2', 'p3', 'p4'];

/* ── Small position editor ───────────────────────────── */
function PositionDot({ pid, position, onSave, style: extraStyle = {} }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(position);
  const inputRef = useRef(null);
  useEffect(() => { setDraft(position); }, [position]);
  useEffect(() => { if (editing && inputRef.current) inputRef.current.focus(); }, [editing]);

  const meta = PARTICIPANT_META[pid];
  const save = () => {
    onSave(Math.max(0, Math.min(100, Number(draft) || 0)));
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        type="number" min={0} max={100}
        className="editable-input"
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={save}
        onKeyDown={e => {
          if (e.key === 'Enter') save();
          if (e.key === 'Escape') { setDraft(position); setEditing(false); }
        }}
        style={{
          position: 'absolute', width: 48, textAlign: 'center', fontSize: 11,
          padding: '2px 4px', zIndex: 10, ...extraStyle,
        }}
      />
    );
  }

  return (
    <div
      onClick={() => setEditing(true)}
      title={`${meta?.label} (${position}) — Click to edit`}
      style={{
        position: 'absolute',
        left: `${position}%`,
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 30, height: 30, borderRadius: '50%',
        background: P_COLORS[pid],
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, cursor: 'pointer',
        border: '2px solid var(--surface)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
        transition: 'left 0.3s ease',
        zIndex: 2,
        ...extraStyle,
      }}
    >
      {meta?.emoji}
    </div>
  );
}

/* ── Participant badge row ───────────────────────────── */
function ParticipantBadges({ pids }) {
  return (
    <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
      {pids.map(pid => (
        <span key={pid} style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          background: `color-mix(in srgb, ${P_COLORS[pid]} 12%, transparent)`,
          padding: '2px 8px', borderRadius: 10, fontSize: 11,
          fontFamily: 'var(--font-mono)', color: 'var(--text-2)',
        }}>
          {PARTICIPANT_META[pid]?.emoji} P{pid.slice(1)}
        </span>
      ))}
    </div>
  );
}

/* ── Matrix dot with its own state ────────────────────── */
function MatrixDot({ pid, pos, dispatch }) {
  const [editing, setEditing] = useState(false);
  const [draftX, setDraftX] = useState(pos.x);
  const [draftY, setDraftY] = useState(pos.y);

  useEffect(() => { setDraftX(pos.x); setDraftY(pos.y); }, [pos.x, pos.y]);

  return (
    <div
      onClick={() => setEditing(true)}
      title={`${PARTICIPANT_META[pid]?.label} (${pos.x}, ${pos.y}) — Click to edit`}
      style={{
        position: 'absolute',
        left: `${pos.x}%`, bottom: `${pos.y}%`,
        transform: 'translate(-50%, 50%)',
        width: 34, height: 34, borderRadius: '50%',
        background: P_COLORS[pid],
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, cursor: 'pointer',
        border: '2px solid var(--surface)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
        zIndex: 5, transition: 'all 0.3s ease',
      }}
    >
      {PARTICIPANT_META[pid]?.emoji}
      {editing && (
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: 'absolute', top: -48, left: '50%', transform: 'translateX(-50%)',
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 6, padding: '6px 8px', display: 'flex', gap: 4,
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)', zIndex: 20,
          }}
        >
          <input type="number" min={0} max={100} value={draftX}
            onChange={e => setDraftX(e.target.value)}
            className="editable-input"
            style={{ width: 40, fontSize: 11, textAlign: 'center', padding: '2px 4px' }}
            placeholder="x"
          />
          <input type="number" min={0} max={100} value={draftY}
            onChange={e => setDraftY(e.target.value)}
            className="editable-input"
            style={{ width: 40, fontSize: 11, textAlign: 'center', padding: '2px 4px' }}
            placeholder="y"
          />
          <button
            onClick={() => {
              dispatch({
                type: 'UPDATE_SYNTHESIS_MATRIX_NESTED',
                parent: 'participantPositions', key: pid,
                value: { x: Math.max(0, Math.min(100, Number(draftX) || 0)), y: Math.max(0, Math.min(100, Number(draftY) || 0)) },
              });
              setEditing(false);
            }}
            style={{
              background: 'var(--purple)', color: '#fff', border: 'none',
              borderRadius: 4, padding: '2px 8px', fontSize: 10, cursor: 'pointer',
            }}
          >OK</button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════ */
export default function Synthesis() {
  const { synthesis, dispatch, designConstraints } = useData();

  if (!synthesis) {
    return <div style={{ padding: 40, color: 'var(--text-3)' }}>Reset to defaults to load synthesis data.</div>;
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* ── Page Header ─────────────────────────────────── */}
      <header className="page-header">
        <span className="page-badge" style={{ background: 'var(--purple)', color: '#fff' }}>
          Synthesis
        </span>
        <h1 className="page-title" style={{ fontFamily: 'var(--font-heading)' }}>
          Cross-Interview Synthesis
        </h1>
        <p className="page-subtitle" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)', maxWidth: 580 }}>
          Patterns, tensions, and frameworks across {P_IDS.length} participants.
          Where they converge tells us what's universal; where they diverge reveals the design space.
        </p>
      </header>

      {/* ── Participant Legend ───────────────────────────── */}
      <div style={{
        display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32,
        padding: '12px 16px', background: 'var(--surface)', borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
      }}>
        {P_IDS.map(pid => {
          const meta = PARTICIPANT_META[pid];
          return (
            <div key={pid} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
              <span style={{
                width: 10, height: 10, borderRadius: '50%',
                background: P_COLORS[pid], flexShrink: 0,
              }} />
              <span>{meta?.emoji}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-2)' }}>
                P{pid.slice(1)}
              </span>
              <span style={{ color: 'var(--text-3)', fontSize: 12 }}>{meta?.subtitle}</span>
            </div>
          );
        })}
      </div>

      {/* ── 1. Spectrum Maps ─────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, marginBottom: 8 }}>
          Participant Spectrums
        </h2>
        <p style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 24 }}>
          Where each participant sits across key dimensions. Click any dot to reposition.
        </p>

        {synthesis.spectrums.map((sp) => (
          <div key={sp.id} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)', padding: '20px 24px', marginBottom: 12,
            borderLeft: '4px solid var(--purple)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <EditableText
                value={sp.label}
                onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_SPECTRUM', spectrumId: sp.id, field: 'label', value: v })}
                style={{ fontWeight: 600, fontSize: 14 }}
              />
              <DeleteButton onConfirm={() => dispatch({ type: 'DELETE_SYNTHESIS_SPECTRUM', spectrumId: sp.id })} itemLabel="spectrum" />
            </div>

            {/* Bar */}
            <div style={{ position: 'relative', margin: '28px 0 36px' }}>
              {/* Left label */}
              <div style={{
                position: 'absolute', left: 0, top: -18,
                fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
                letterSpacing: '0.06em', color: 'var(--text-3)',
              }}>
                <EditableText
                  value={sp.leftLabel}
                  onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_SPECTRUM', spectrumId: sp.id, field: 'leftLabel', value: v })}
                  style={{ fontSize: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}
                />
              </div>
              {/* Right label */}
              <div style={{
                position: 'absolute', right: 0, top: -18,
                fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
                letterSpacing: '0.06em', color: 'var(--text-3)', textAlign: 'right',
              }}>
                <EditableText
                  value={sp.rightLabel}
                  onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_SPECTRUM', spectrumId: sp.id, field: 'rightLabel', value: v })}
                  style={{ fontSize: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}
                />
              </div>

              {/* The line */}
              <div style={{ height: 2, background: 'var(--border)', borderRadius: 1, position: 'relative' }}>
                {P_IDS.map(pid => (
                  <PositionDot
                    key={pid}
                    pid={pid}
                    position={sp.positions[pid] ?? 50}
                    onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_SPECTRUM_POSITION', spectrumId: sp.id, participantId: pid, value: v })}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}

        <AddItemButton
          label="+ Add spectrum"
          onAdd={() => dispatch({ type: 'ADD_SYNTHESIS_SPECTRUM' })}
          accentColor="var(--purple)"
        />
      </section>

      {/* ── 2. 2x2 Matrix ───────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, marginBottom: 8 }}>
          Communication Matrix
        </h2>
        <p style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 24 }}>
          Four communication archetypes mapped on two axes. Click dot to edit position.
        </p>

        <div style={{ position: 'relative', maxWidth: 520, margin: '0 auto' }}>
          {/* Y-axis label */}
          <div style={{
            position: 'absolute', left: -28, top: '50%',
            transform: 'translateY(-50%) rotate(-90deg)',
            fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
            letterSpacing: '0.06em', color: 'var(--text-3)', whiteSpace: 'nowrap',
          }}>
            {synthesis.matrix.yAxisLabel}
          </div>

          {/* Y-axis ends */}
          <div style={{
            position: 'absolute', left: -8, top: 4,
            fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)',
          }}>{synthesis.matrix.yTopLabel}</div>
          <div style={{
            position: 'absolute', left: -8, bottom: 4,
            fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)',
          }}>{synthesis.matrix.yBottomLabel}</div>

          {/* X-axis label */}
          <div style={{
            textAlign: 'center', marginBottom: 6,
            fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
            letterSpacing: '0.06em', color: 'var(--text-3)', display: 'none',
          }}>
            {synthesis.matrix.xAxisLabel}
          </div>

          {/* Grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
            overflow: 'hidden', aspectRatio: '1', position: 'relative',
            marginLeft: 12,
          }}>
            {/* Quadrants: top-left, top-right, bottom-left, bottom-right */}
            {[
              { pos: 'topLeft', bg: 'rgba(74,103,65,0.04)' },
              { pos: 'topRight', bg: 'rgba(196,107,77,0.04)' },
              { pos: 'bottomLeft', bg: 'rgba(92,122,139,0.04)' },
              { pos: 'bottomRight', bg: 'rgba(122,107,138,0.04)' },
            ].map(({ pos, bg }) => (
              <div key={pos} style={{
                padding: 16, background: bg,
                borderRight: pos.includes('Left') ? '1px solid var(--border)' : 'none',
                borderBottom: pos.includes('top') ? '1px solid var(--border)' : 'none',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                alignItems: 'center', textAlign: 'center', gap: 6,
              }}>
                <EditableText
                  value={synthesis.matrix.quadrantLabels[pos]}
                  onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_MATRIX_NESTED', parent: 'quadrantLabels', key: pos, value: v })}
                  style={{ fontWeight: 600, fontSize: 13, fontFamily: 'var(--font-body)' }}
                />
                <EditableTextarea
                  value={synthesis.matrix.quadrantDescriptions[pos]}
                  onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_MATRIX_NESTED', parent: 'quadrantDescriptions', key: pos, value: v })}
                  style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.4 }}
                  rows={2}
                />
              </div>
            ))}

            {/* Participant dots overlaid */}
            {P_IDS.map(pid => {
              const pos = synthesis.matrix.participantPositions[pid];
              if (!pos) return null;
              return <MatrixDot key={pid} pid={pid} pos={pos} dispatch={dispatch} />;
            })}
          </div>

          {/* X-axis ends */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)',
            marginTop: 6, marginLeft: 12,
          }}>
            <span>{synthesis.matrix.xLeftLabel}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {synthesis.matrix.xAxisLabel}
            </span>
            <span>{synthesis.matrix.xRightLabel}</span>
          </div>
        </div>
      </section>

      {/* ── 3. Universal vs. Divergent ───────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, marginBottom: 8 }}>
          Universal vs. Divergent
        </h2>
        <p style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 24 }}>
          What all participants share, and where they meaningfully differ.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Universal */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: 'var(--olive)', marginBottom: 12,
            }}>What All Share</h3>
            {synthesis.universalInsights.map(item => (
              <div key={item.id} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderLeft: '4px solid var(--olive)', borderRadius: 'var(--radius-sm)',
                padding: '14px 16px', marginBottom: 8,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <EditableText
                    value={item.title}
                    onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_ITEM', collection: 'universalInsights', id: item.id, field: 'title', value: v })}
                    style={{ fontWeight: 600, fontSize: 14 }}
                  />
                  <DeleteButton onConfirm={() => dispatch({ type: 'DELETE_SYNTHESIS_ITEM', collection: 'universalInsights', id: item.id })} itemLabel="insight" />
                </div>
                <EditableTextarea
                  value={item.description}
                  onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_ITEM', collection: 'universalInsights', id: item.id, field: 'description', value: v })}
                  style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5, marginTop: 4 }}
                />
                <ParticipantBadges pids={item.participants} />
              </div>
            ))}
            <AddItemButton
              label="+ Add universal insight"
              onAdd={() => dispatch({ type: 'ADD_SYNTHESIS_ITEM', collection: 'universalInsights', item: { title: 'New insight', description: '', participants: ['p1', 'p2', 'p3', 'p4'] } })}
              accentColor="var(--olive)"
            />
          </div>

          {/* Divergent */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: 'var(--terracotta)', marginBottom: 12,
            }}>Where They Differ</h3>
            {synthesis.divergentInsights.map(item => (
              <div key={item.id} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderLeft: '4px solid var(--terracotta)', borderRadius: 'var(--radius-sm)',
                padding: '14px 16px', marginBottom: 8,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <EditableText
                    value={item.title}
                    onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_ITEM', collection: 'divergentInsights', id: item.id, field: 'title', value: v })}
                    style={{ fontWeight: 600, fontSize: 14 }}
                  />
                  <DeleteButton onConfirm={() => dispatch({ type: 'DELETE_SYNTHESIS_ITEM', collection: 'divergentInsights', id: item.id })} itemLabel="insight" />
                </div>
                <div style={{
                  background: 'var(--highlight-bg)', border: '1px solid var(--highlight-border)',
                  borderRadius: 'var(--radius-sm)', padding: '10px 12px', marginTop: 6,
                  fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5, fontStyle: 'italic',
                }}>
                  <EditableTextarea
                    value={item.tensionNote}
                    onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_ITEM', collection: 'divergentInsights', id: item.id, field: 'tensionNote', value: v })}
                    style={{ fontSize: 13, fontStyle: 'italic' }}
                  />
                </div>
                <ParticipantBadges pids={item.participants} />
              </div>
            ))}
            <AddItemButton
              label="+ Add divergent insight"
              onAdd={() => dispatch({ type: 'ADD_SYNTHESIS_ITEM', collection: 'divergentInsights', item: { title: 'New divergence', tensionNote: '', participants: ['p1', 'p2'] } })}
              accentColor="var(--terracotta)"
            />
          </div>
        </div>
      </section>

      {/* ── 4. Design Tensions ───────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, marginBottom: 8 }}>
          Design Tensions
        </h2>
        <p style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 24 }}>
          Opposing needs the calendar must resolve. The resolution shows how ambiguity makes it possible.
        </p>

        {synthesis.tensions.map(t => (
          <div key={t.id} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)', padding: '20px 24px', marginBottom: 12,
          }}>
            {/* Tension row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Left */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                  background: P_COLORS[t.leftParticipant],
                }} />
                <EditableText
                  value={t.left}
                  onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_ITEM', collection: 'tensions', id: t.id, field: 'left', value: v })}
                  style={{ fontSize: 14, fontWeight: 500 }}
                />
              </div>
              {/* Arrow */}
              <div style={{
                flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4,
                color: 'var(--text-3)', fontSize: 16,
              }}>
                <span style={{ width: 20, height: 1, background: 'var(--border)' }} />
                ↔
                <span style={{ width: 20, height: 1, background: 'var(--border)' }} />
              </div>
              {/* Right */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
                <EditableText
                  value={t.right}
                  onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_ITEM', collection: 'tensions', id: t.id, field: 'right', value: v })}
                  style={{ fontSize: 14, fontWeight: 500, textAlign: 'right' }}
                />
                <span style={{
                  width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                  background: P_COLORS[t.rightParticipant],
                }} />
              </div>
              <DeleteButton onConfirm={() => dispatch({ type: 'DELETE_SYNTHESIS_ITEM', collection: 'tensions', id: t.id })} itemLabel="tension" />
            </div>
            {/* Resolution */}
            <div style={{
              background: 'var(--highlight-bg)', border: '1px solid var(--highlight-border)',
              borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginTop: 12,
              fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5,
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--olive)', marginRight: 6 }}>
                Resolution
              </span>
              <EditableTextarea
                value={t.resolution}
                onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_ITEM', collection: 'tensions', id: t.id, field: 'resolution', value: v })}
                style={{ fontSize: 13, display: 'inline' }}
              />
            </div>
          </div>
        ))}

        <AddItemButton
          label="+ Add tension"
          onAdd={() => dispatch({ type: 'ADD_SYNTHESIS_ITEM', collection: 'tensions', item: { left: 'Need A', right: 'Need B', leftParticipant: 'p1', rightParticipant: 'p2', resolution: '' } })}
          accentColor="var(--purple)"
        />
      </section>

      {/* ── 5. Communication Archetypes ──────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, marginBottom: 8 }}>
          Communication Archetypes
        </h2>
        <p style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 24 }}>
          Four distinct communication styles, one calendar.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {P_IDS.map(pid => {
            const a = synthesis.archetypes[pid];
            if (!a) return null;
            const meta = PARTICIPANT_META[pid];
            return (
              <div key={pid} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderLeft: `4px solid ${P_COLORS[pid]}`, borderRadius: 'var(--radius-md)',
                padding: '20px 22px',
              }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 22 }}>{meta?.emoji}</span>
                  <div>
                    <EditableText
                      value={a.title}
                      onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_ARCHETYPE', participantId: pid, field: 'title', value: v })}
                      style={{ fontWeight: 600, fontSize: 15 }}
                    />
                    <EditableText
                      value={a.tagline}
                      onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_ARCHETYPE', participantId: pid, field: 'tagline', value: v })}
                      style={{ fontSize: 12, color: 'var(--text-3)', fontStyle: 'italic', display: 'block', marginTop: 2 }}
                    />
                  </div>
                </div>

                {/* Style */}
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-3)' }}>
                    Style
                  </span>
                  <EditableTextarea
                    value={a.style}
                    onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_ARCHETYPE', participantId: pid, field: 'style', value: v })}
                    style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5, marginTop: 2 }}
                  />
                </div>

                {/* Key quote */}
                <div style={{
                  borderLeft: `3px solid ${P_COLORS[pid]}`,
                  padding: '8px 12px', marginBottom: 10,
                  fontFamily: 'var(--font-heading)', fontStyle: 'italic',
                  fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5,
                }}>
                  <EditableTextarea
                    value={a.keyQuote}
                    onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_ARCHETYPE', participantId: pid, field: 'keyQuote', value: v })}
                    style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 13 }}
                  />
                </div>

                {/* Calendar use */}
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-3)' }}>
                    Calendar Use
                  </span>
                  <EditableTextarea
                    value={a.calendarUse}
                    onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_ARCHETYPE', participantId: pid, field: 'calendarUse', value: v })}
                    style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5, marginTop: 2 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 6. Theme Convergence Grid ────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, marginBottom: 8 }}>
          Theme Convergence
        </h2>
        <p style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 24 }}>
          Which themes appear across which participants. Click cells to toggle.
        </p>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr repeat(4, 56px)',
          gap: 1, background: 'var(--border)', borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
        }}>
          {/* Header row */}
          <div style={{ background: 'var(--bg)', padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-3)' }}>
            Theme
          </div>
          {P_IDS.map(pid => (
            <div key={pid} style={{
              background: 'var(--bg)', padding: '10px 4px', textAlign: 'center',
              fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)',
            }}>
              {PARTICIPANT_META[pid]?.emoji}<br />P{pid.slice(1)}
            </div>
          ))}

          {/* Data rows */}
          {synthesis.themes.map(theme => (
            <Fragment key={theme.id}>
              <div style={{
                background: 'var(--surface)', padding: '10px 14px',
                fontSize: 13, color: 'var(--text-1)', display: 'flex',
                alignItems: 'center', justifyContent: 'space-between',
              }}>
                <EditableText
                  value={theme.label}
                  onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_ITEM', collection: 'themes', id: theme.id, field: 'label', value: v })}
                  style={{ fontSize: 13 }}
                />
                <DeleteButton onConfirm={() => dispatch({ type: 'DELETE_SYNTHESIS_ITEM', collection: 'themes', id: theme.id })} itemLabel="theme" />
              </div>
              {P_IDS.map(pid => {
                const present = theme.participants[pid];
                return (
                  <div
                    key={theme.id + '-' + pid}
                    onClick={() => dispatch({ type: 'TOGGLE_SYNTHESIS_THEME', themeId: theme.id, participantId: pid })}
                    style={{
                      background: present
                        ? `color-mix(in srgb, ${P_COLORS[pid]} 15%, var(--surface))`
                        : 'var(--surface)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', transition: 'background 0.15s ease',
                      fontSize: 14,
                    }}
                    title={`Toggle ${PARTICIPANT_META[pid]?.label}`}
                  >
                    {present ? <span style={{ color: P_COLORS[pid] }}>●</span> : <span style={{ color: 'var(--border)' }}>—</span>}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>

        <div style={{ marginTop: 8 }}>
          <AddItemButton
            label="+ Add theme"
            onAdd={() => dispatch({ type: 'ADD_SYNTHESIS_ITEM', collection: 'themes', item: { label: 'New theme', participants: { p1: false, p2: false, p3: false, p4: false } } })}
            accentColor="var(--purple)"
          />
        </div>
      </section>

      {/* ── 7. Design Bridge ─────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, marginBottom: 8 }}>
          Design Bridge
        </h2>
        <p style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 24 }}>
          How cross-interview insights connect to design rules.
        </p>

        {synthesis.designBridge.map((db, i) => (
          <div key={db.id} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderLeft: '4px solid var(--olive)', borderRadius: 'var(--radius-md)',
            padding: '20px 24px', marginBottom: 12,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--olive)' }}>
                  Insight
                </span>
                <EditableTextarea
                  value={db.insight}
                  onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_ITEM', collection: 'designBridge', id: db.id, field: 'insight', value: v })}
                  style={{ fontSize: 14, fontWeight: 500, marginTop: 4, lineHeight: 1.5 }}
                />
              </div>
              <DeleteButton onConfirm={() => dispatch({ type: 'DELETE_SYNTHESIS_ITEM', collection: 'designBridge', id: db.id })} itemLabel="bridge" />
            </div>

            <div style={{
              background: 'var(--highlight-bg)', border: '1px solid var(--highlight-border)',
              borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginTop: 10,
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-3)' }}>
                Implication
              </span>
              <EditableTextarea
                value={db.implication}
                onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_ITEM', collection: 'designBridge', id: db.id, field: 'implication', value: v })}
                style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5, marginTop: 4 }}
              />
            </div>

            {/* Rule references */}
            <div style={{ marginTop: 8 }}>
              <EditableText
                value={db.rules}
                onSave={v => dispatch({ type: 'UPDATE_SYNTHESIS_ITEM', collection: 'designBridge', id: db.id, field: 'rules', value: v })}
                style={{
                  fontSize: 11, fontFamily: 'var(--font-mono)',
                  color: 'var(--olive)', background: 'color-mix(in srgb, var(--olive) 8%, transparent)',
                  padding: '3px 8px', borderRadius: 6,
                }}
              />
            </div>
          </div>
        ))}

        <AddItemButton
          label="+ Add bridge"
          onAdd={() => dispatch({ type: 'ADD_SYNTHESIS_ITEM', collection: 'designBridge', item: { insight: 'New insight', implication: '', rules: '' } })}
          accentColor="var(--olive)"
        />
      </section>
    </div>
  );
}
