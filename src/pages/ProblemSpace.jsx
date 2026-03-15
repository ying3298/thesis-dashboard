import { useData } from '../context/DataContext';
import EditableText from '../components/EditableText';
import EditableTextarea from '../components/EditableTextarea';
import AddItemButton from '../components/AddItemButton';
import DeleteButton from '../components/DeleteButton';

/* ── Participant badge colors ────────────────────────── */
const P_COLORS = {
  P1: 'var(--olive)',
  P2: 'var(--terracotta)',
  P3: 'var(--blue)',
  P4: 'var(--purple)',
  All: 'var(--text-2)',
};

export default function ProblemSpace() {
  const { problemSpace, dispatch } = useData();
  const { statement, scenarios, userGoals, inScope, outOfScope } = problemSpace;

  /* ── Helper: render a nav-item-style button for each section ── */
  const renderNavItem = (items, listKey) => items.map((item) => (
    <div
      key={item.id}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 10,
        padding: '8px 0',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <span style={{
        marginTop: 3, fontSize: 14,
        color: listKey === 'inScope' ? 'var(--olive)' : 'var(--terracotta)',
        flexShrink: 0,
      }}>
        {listKey === 'inScope' ? '\u2713' : '\u2717'}
      </span>
      <EditableText
        value={item.text}
        onSave={v => dispatch({ type: 'UPDATE_PROBLEM_SCOPE', list: listKey, id: item.id, value: v })}
        placeholder="Describe boundary..."
        style={{ fontSize: '0.88rem', lineHeight: 1.55, color: 'var(--text-1)', flex: 1 }}
      />
      <DeleteButton
        onConfirm={() => dispatch({ type: 'DELETE_PROBLEM_SCOPE', list: listKey, id: item.id })}
        itemLabel="item"
      />
    </div>
  ));

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Page Header */}
      <header className="page-header">
        <span className="page-badge" style={{ background: 'var(--purple)', color: '#fff' }}>
          Problem Space
        </span>
        <h1 className="page-title">Problem Space</h1>
        <p className="page-subtitle">
          What this project is about, who it serves, and where we draw the line.
          Grounded in research with 4 participants.
        </p>
      </header>

      {/* ── Problem Statement ─────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <div
          className="card"
          style={{
            padding: '2rem 2rem 1.75rem',
            borderLeft: '4px solid var(--purple)',
          }}
        >
          <EditableText
            value={statement.title}
            onSave={v => dispatch({ type: 'UPDATE_PROBLEM_STATEMENT', field: 'title', value: v })}
            tag="h2"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.35rem',
              fontWeight: 400,
              color: 'var(--text-1)',
              lineHeight: 1.35,
              marginBottom: 16,
              letterSpacing: '-0.01em',
            }}
          />
          <EditableTextarea
            value={statement.body}
            onSave={v => dispatch({ type: 'UPDATE_PROBLEM_STATEMENT', field: 'body', value: v })}
            placeholder="Describe the problem space..."
            style={{
              fontSize: '0.92rem', lineHeight: 1.75,
              color: 'var(--text-2)', margin: 0,
              whiteSpace: 'pre-wrap',
            }}
          />
        </div>
      </section>

      {/* ── Scenarios ─────────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">Scenarios</h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-3)', marginBottom: 16, marginTop: -8 }}>
          Real moments from the research &mdash; {scenarios.length} scenario{scenarios.length !== 1 ? 's' : ''}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {scenarios.map((sc, i) => {
            const pColor = P_COLORS[sc.participant] || 'var(--text-3)';
            return (
              <div
                key={sc.id}
                className="card"
                style={{
                  padding: '1.15rem 1.25rem',
                  borderLeft: `4px solid ${pColor}`,
                  position: 'relative',
                }}
              >
                <div style={{ position: 'absolute', top: 8, right: 8 }}>
                  <DeleteButton
                    onConfirm={() => dispatch({ type: 'DELETE_PROBLEM_SCENARIO', id: sc.id })}
                    itemLabel="scenario"
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                    fontWeight: 600, textTransform: 'uppercase',
                    letterSpacing: '0.06em', padding: '2px 8px',
                    borderRadius: 10,
                    background: `color-mix(in srgb, ${pColor} 12%, transparent)`,
                    color: pColor,
                    cursor: 'pointer',
                  }}
                    onClick={() => {
                      const options = ['P1', 'P2', 'P3', 'P4', 'All'];
                      const idx = options.indexOf(sc.participant);
                      const next = options[(idx + 1) % options.length];
                      dispatch({ type: 'UPDATE_PROBLEM_SCENARIO', id: sc.id, field: 'participant', value: next });
                    }}
                    title="Click to cycle participant"
                  >
                    {sc.participant || 'P?'}
                  </span>
                  <EditableText
                    value={sc.title}
                    onSave={v => dispatch({ type: 'UPDATE_PROBLEM_SCENARIO', id: sc.id, field: 'title', value: v })}
                    placeholder="Scenario title..."
                    style={{
                      fontSize: '0.92rem', fontWeight: 600,
                      color: 'var(--text-1)', lineHeight: 1.4,
                      fontStyle: 'italic',
                    }}
                  />
                </div>

                <EditableTextarea
                  value={sc.description}
                  onSave={v => dispatch({ type: 'UPDATE_PROBLEM_SCENARIO', id: sc.id, field: 'description', value: v })}
                  placeholder="Describe the scenario..."
                  style={{
                    fontSize: '0.85rem', lineHeight: 1.6,
                    color: 'var(--text-2)', margin: 0,
                  }}
                />
              </div>
            );
          })}
        </div>

        <AddItemButton
          label="+ Add scenario"
          onAdd={() => dispatch({ type: 'ADD_PROBLEM_SCENARIO' })}
          accentColor="var(--purple)"
        />
      </section>

      {/* ── User Goals ────────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">User Goals</h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-3)', marginBottom: 16, marginTop: -8 }}>
          What people actually need &mdash; distilled from all interviews
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {userGoals.map((goal, i) => (
            <div
              key={goal.id}
              className="card"
              style={{
                padding: '1.15rem 1.25rem',
                borderLeft: '4px solid var(--olive)',
                position: 'relative',
              }}
            >
              <div style={{ position: 'absolute', top: 8, right: 8 }}>
                <DeleteButton
                  onConfirm={() => dispatch({ type: 'DELETE_PROBLEM_GOAL', id: goal.id })}
                  itemLabel="goal"
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  fontWeight: 700, color: 'var(--olive)',
                  flexShrink: 0,
                }}>
                  {i + 1}.
                </span>
                <EditableText
                  value={goal.title}
                  onSave={v => dispatch({ type: 'UPDATE_PROBLEM_GOAL', id: goal.id, field: 'title', value: v })}
                  placeholder="Goal title..."
                  tag="h3"
                  style={{
                    fontSize: '0.95rem', fontWeight: 600,
                    color: 'var(--text-1)', lineHeight: 1.4,
                  }}
                />
              </div>

              <EditableTextarea
                value={goal.description}
                onSave={v => dispatch({ type: 'UPDATE_PROBLEM_GOAL', id: goal.id, field: 'description', value: v })}
                placeholder="Describe this goal..."
                style={{
                  fontSize: '0.85rem', lineHeight: 1.6,
                  color: 'var(--text-2)', margin: 0,
                  paddingLeft: 24,
                }}
              />
            </div>
          ))}
        </div>

        <AddItemButton
          label="+ Add goal"
          onAdd={() => dispatch({ type: 'ADD_PROBLEM_GOAL' })}
          accentColor="var(--olive)"
        />
      </section>

      {/* ── Boundaries ────────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">Boundaries</h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-3)', marginBottom: 20, marginTop: -8 }}>
          What this project includes and what it deliberately leaves out
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* In Scope */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              fontWeight: 600, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: 'var(--olive)',
              marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ fontSize: 12 }}>{'\u2713'}</span> In Scope
            </div>

            {renderNavItem(inScope, 'inScope')}

            <AddItemButton
              label="+ Add"
              onAdd={() => dispatch({ type: 'ADD_PROBLEM_SCOPE', list: 'inScope' })}
              accentColor="var(--olive)"
            />
          </div>

          {/* Out of Scope */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              fontWeight: 600, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: 'var(--terracotta)',
              marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ fontSize: 12 }}>{'\u2717'}</span> Out of Scope
            </div>

            {renderNavItem(outOfScope, 'outOfScope')}

            <AddItemButton
              label="+ Add"
              onAdd={() => dispatch({ type: 'ADD_PROBLEM_SCOPE', list: 'outOfScope' })}
              accentColor="var(--terracotta)"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
