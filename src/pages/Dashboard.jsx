import { useData, PARTICIPANT_META } from '../context/DataContext';

export default function Dashboard({ onNavigate, onSwitchTab }) {
  const { globalStats, allParticipants, designConstraints, hypotheses } = useData();

  const universalLinks = [
    {
      title: 'Design Space',
      page: 'design',
      description: `${designConstraints.length} design rules and ${hypotheses.length} hypotheses to test`,
      emoji: '\u2702\uFE0F',
    },
    {
      title: 'Synthesis',
      page: 'synthesis',
      description: 'Cross-participant patterns, spectrums, themes, and archetypes',
      emoji: '\u25EC',
    },
    {
      title: 'Expert Frameworks',
      page: 'experts',
      description: 'Academic voices grounding the Paired Calendar design',
      emoji: '\uD83C\uDF93',
    },
    {
      title: 'Interview Guide',
      page: 'guide',
      description: 'Probes, structure, and coaching for your next interview',
      emoji: '\uD83C\uDFA4',
    },
  ];

  return (
    <div className="stagger">
      {/* Page Header */}
      <header className="page-header">
        <span className="page-badge" style={{ background: 'var(--olive)', color: '#fff' }}>
          Overview
        </span>
        <h1 className="page-title">Research at a Glance</h1>
        <p className="page-subtitle">
          Cross-interview overview across {globalStats.totalParticipants} participants.
        </p>
      </header>

      {/* Cross-Interview Stats */}
      <div className="grid-2" style={{ marginTop: 0 }}>
        {[
          { number: globalStats.totalFindings, label: 'Total Findings' },
          { number: globalStats.totalNotes, label: 'Research Notes' },
          { number: globalStats.constraintsCount, label: 'Design Rules' },
          { number: globalStats.hypothesesCount, label: 'Hypotheses' },
        ].map(s => (
          <div className="stat-card fade-in" key={s.label}>
            <div className="stat-number">{s.number}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Participant Summary Cards */}
      <section style={{ marginTop: 40 }}>
        <h2 className="section-title">Participants</h2>
        <div className="grid-2">
          {Object.keys(allParticipants).map(pid => {
            const meta = PARTICIPANT_META[pid];
            const pData = allParticipants[pid];
            if (!meta || !pData) return null;
            return (
              <button
                key={pid}
                className="card fade-in"
                onClick={() => {
                  if (onSwitchTab) onSwitchTab(pid);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '16px 20px',
                  cursor: 'pointer',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--olive)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <span style={{
                  fontSize: 28,
                  width: 44,
                  height: 44,
                  minWidth: 44,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--highlight-bg) 0%, #F5EDE0 100%)',
                  border: '1.5px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {meta.emoji}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem',
                    color: 'var(--text-1)',
                    lineHeight: 1.3,
                  }}>
                    {meta.label}
                  </div>
                  <div style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-3)',
                    lineHeight: 1.3,
                    marginTop: 2,
                  }}>
                    {meta.subtitle} &middot; {meta.location}
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: 2,
                }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
                    color: 'var(--olive)',
                    lineHeight: 1,
                  }}>
                    {pData.findings.length}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-3)' }}>findings</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Quick Links */}
      <section style={{ marginTop: 40 }}>
        <h2 className="section-title">Explore</h2>
        <div className="grid-2">
          {universalLinks.map(link => (
            <button
              key={link.page}
              className="card fade-in"
              onClick={() => onNavigate(link.page)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
                padding: '22px 24px',
                cursor: 'pointer',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                textAlign: 'left',
                width: '100%',
                transition: 'box-shadow 0.2s ease, border-color 0.2s ease, transform 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--olive)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: 24, lineHeight: 1 }}>{link.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.1rem',
                  color: 'var(--text-1)',
                  marginBottom: 4,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span>{link.title}</span>
                  <span style={{ fontSize: '1rem', color: 'var(--text-3)' }}>{'\u2192'}</span>
                </div>
                <p style={{
                  margin: 0, fontSize: '0.85rem',
                  color: 'var(--text-3)', lineHeight: 1.5,
                }}>
                  {link.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
