import { useData } from '../context/DataContext';
import EditableText from '../components/EditableText';
import EditableTextarea from '../components/EditableTextarea';

const getQuickLinks = (stats) => [
  {
    title: 'Key Findings',
    page: 'findings',
    description: `${stats.findingsCount} insights from the interview, with design implications`,
    emoji: '\uD83D\uDD0D',
  },
  {
    title: 'Affinity Map',
    page: 'affinity',
    description: `${stats.notesCount} editable research notes in ${stats.clustersCount} clusters`,
    emoji: '\uD83D\uDCCC',
  },
  {
    title: 'Interview Guide',
    page: 'guide',
    description: 'Probes, structure, and coaching for your next interview',
    emoji: '\uD83C\uDFA4',
  },
  {
    title: 'Design Space',
    page: 'design',
    description: `${stats.constraintsCount} constraints and ${stats.hypothesesCount} hypotheses to test`,
    emoji: '\u2702\uFE0F',
  },
];

export default function Dashboard({ onNavigate }) {
  const { stats, participantDetails, bigPicture, dispatch } = useData();

  const computedStats = [
    { number: stats.findingsCount, label: 'Key Findings' },
    { number: stats.notesCount, label: 'Research Notes' },
    { number: stats.constraintsCount, label: 'Design Rules' },
    { number: stats.hypothesesCount, label: 'Hypotheses to Test' },
  ];

  const quickLinks = getQuickLinks(stats);

  return (
    <div className="stagger">
      {/* Page Header */}
      <header className="page-header">
        <span className="page-badge">Overview</span>
        <h1 className="page-title">Your Research at a Glance</h1>
        <p className="page-subtitle">
          Everything from Interview #1 with your roommate. Click any section to dig deeper.
        </p>
      </header>

      {/* Participant Card */}
      <div
        className="card fade-in"
        style={{
          display: 'flex',
          gap: '28px',
          alignItems: 'flex-start',
          padding: '28px 32px',
        }}
      >
        {/* Left — Avatar */}
        <div
          style={{
            width: 80,
            height: 80,
            minWidth: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--highlight-bg, #FFFBF0) 0%, #F5EDE0 100%)',
            border: '2px solid var(--border, #E8E4DE)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
          }}
        >
          <span role="img" aria-label="artist">
            {'\uD83D\uDC69\u200D\uD83C\uDFA8'}
          </span>
        </div>

        {/* Right — Info */}
        <div style={{ flex: 1 }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading, "Instrument Serif", serif)',
              fontSize: '1.35rem',
              fontWeight: 400,
              color: 'var(--text-1, #1A1A1A)',
              margin: '0 0 12px 0',
            }}
          >
            Participant #1 &mdash; Roommate
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '6px 32px',
            }}
          >
            {participantDetails.map((d, index) => (
              <div key={index} style={{ display: 'flex', gap: 8, lineHeight: 1.7 }}>
                <EditableText
                  value={d.label}
                  onSave={(v) =>
                    dispatch({ type: 'UPDATE_PARTICIPANT', index, field: 'label', value: v })
                  }
                  tag="span"
                  style={{
                    fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--text-3, #999)',
                    minWidth: 110,
                    flexShrink: 0,
                  }}
                />
                <EditableText
                  value={d.value}
                  onSave={(v) =>
                    dispatch({ type: 'UPDATE_PARTICIPANT', index, field: 'value', value: v })
                  }
                  tag="span"
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-1, #1A1A1A)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid-2" style={{ marginTop: 32 }}>
        {computedStats.map((s) => (
          <div className="stat-card fade-in" key={s.label}>
            <div className="stat-number">{s.number}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* The Big Picture */}
      <section style={{ marginTop: 48 }}>
        <h2 className="section-title">The Big Picture</h2>
        <div className="grid-cards" style={{ gap: 16 }}>
          {bigPicture.map((item, index) => (
            <div
              key={index}
              className="card fade-in"
              style={{
                borderLeft: `4px solid ${item.color}`,
                padding: '22px 26px',
              }}
            >
              <EditableText
                value={item.label}
                onSave={(v) =>
                  dispatch({ type: 'UPDATE_BIG_PICTURE', index, field: 'label', value: v })
                }
                tag="h3"
                style={{
                  fontFamily: 'var(--font-heading, "Instrument Serif", serif)',
                  fontSize: '1.1rem',
                  fontWeight: 400,
                  color: item.color,
                  margin: '0 0 8px 0',
                }}
              />
              <EditableTextarea
                value={item.text}
                onSave={(v) =>
                  dispatch({ type: 'UPDATE_BIG_PICTURE', index, field: 'text', value: v })
                }
                style={{
                  margin: 0,
                  fontSize: '0.93rem',
                  lineHeight: 1.65,
                  color: 'var(--text-2, #6B6B6B)',
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section style={{ marginTop: 48 }}>
        <h2 className="section-title">Explore</h2>
        <div className="grid-2">
          {quickLinks.map((link) => (
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
                border: '1px solid var(--border, #E8E4DE)',
                background: 'var(--surface, #FFFFFF)',
                textAlign: 'left',
                width: '100%',
                transition: 'box-shadow 0.2s ease, border-color 0.2s ease, transform 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--olive, #4A6741)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border, #E8E4DE)';
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: 24, lineHeight: 1 }}>{link.emoji}</span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-heading, "Instrument Serif", serif)',
                    fontSize: '1.1rem',
                    color: 'var(--text-1, #1A1A1A)',
                    marginBottom: 4,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>{link.title}</span>
                  <span
                    style={{
                      fontSize: '1rem',
                      color: 'var(--text-3, #999)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    {'\u2192'}
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.85rem',
                    color: 'var(--text-3, #999)',
                    lineHeight: 1.5,
                  }}
                >
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
