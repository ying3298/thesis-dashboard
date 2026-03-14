import { useState, useRef } from 'react';
import './App.css';
import { useData, PARTICIPANT_META } from './context/DataContext';
import Dashboard from './pages/Dashboard';
import Findings from './pages/Findings';
import AffinityMap from './pages/AffinityMap';
import InterviewGuide from './pages/InterviewGuide';
import DesignSpace from './pages/DesignSpace';
import Synthesis from './pages/Synthesis';
import Toast from './components/Toast';
import SaveIndicator from './components/SaveIndicator';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Overview', icon: '\u25C9', color: 'var(--olive)' },
  { id: 'findings', label: 'Key Findings', icon: '\u25C8', color: 'var(--terracotta)' },
  { id: 'affinity', label: 'Affinity Map', icon: '\u25A6', color: 'var(--blue)' },
  { id: 'guide', label: 'Interview Guide', icon: '\u25C7', color: 'var(--purple)' },
  { id: 'design', label: 'Design Space', icon: '\u25B3', color: 'var(--olive)' },
  { id: 'synthesis', label: 'Synthesis', icon: '\u25EC', color: 'var(--purple)' },
];

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const { exportData, importData, resetToDefaults, activeParticipant, participantList, switchParticipant } = useData();
  const fileInputRef = useRef(null);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard onNavigate={setActivePage} />;
      case 'findings': return <Findings />;
      case 'affinity': return <AffinityMap />;
      case 'guide': return <InterviewGuide />;
      case 'design': return <DesignSpace />;
      case 'synthesis': return <Synthesis />;
      default: return <Dashboard onNavigate={setActivePage} />;
    }
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => importData(ev.target.result);
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    if (window.confirm('Reset all data to defaults? Your edits will be lost.')) {
      resetToDefaults();
    }
  };

  return (
    <div className="app-layout">
      <nav className="sidebar" aria-label="Main navigation">
        <div className="sidebar-brand">
          <div style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: 'var(--olive)',
            textTransform: 'uppercase',
            marginBottom: 2,
          }}>
            Thesis Research
          </div>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 18,
            color: 'var(--text-1)',
          }}>
            Interaction Design
          </div>
          <div style={{
            fontSize: 11,
            color: 'var(--text-3)',
            marginTop: 2,
          }}>
            {PARTICIPANT_META[activeParticipant]?.label} &mdash; Spring 2026
          </div>
        </div>

        <div className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
              aria-current={activePage === item.id ? 'page' : undefined}
              style={{
                '--nav-color': item.color,
                borderLeftColor: activePage === item.id ? item.color : 'transparent',
                backgroundColor: activePage === item.id
                  ? `color-mix(in srgb, ${item.color} 8%, transparent)`
                  : 'transparent',
                color: activePage === item.id ? item.color : undefined,
              }}
            >
              <span className="nav-icon" style={{ color: item.color }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Save indicator */}
        <SaveIndicator />

        {/* Data management */}
        <div className="sidebar-data-actions">
          <button onClick={exportData} className="sidebar-action-btn">
            Export JSON
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="sidebar-action-btn">
            Import JSON
          </button>
          <button onClick={handleReset} className="sidebar-action-btn sidebar-action-btn--danger">
            Reset to defaults
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </div>

        {/* Participant Switcher */}
        <div style={{
          padding: '12px 24px 16px',
          borderTop: '1px solid var(--border)',
        }}>
          <div style={{
            fontSize: 10,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-3)',
            marginBottom: 8,
          }}>
            Participants
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {participantList.map(pid => {
              const meta = PARTICIPANT_META[pid];
              const isActive = pid === activeParticipant;
              return (
                <button
                  key={pid}
                  onClick={() => switchParticipant(pid)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: isActive ? '1.5px solid var(--olive)' : '1px solid var(--border)',
                    background: isActive
                      ? 'color-mix(in srgb, var(--olive) 8%, transparent)'
                      : 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <span style={{ fontSize: 20 }}>{meta.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 12,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--olive)' : 'var(--text-1)',
                      lineHeight: 1.3,
                    }}>
                      {meta.label}
                    </div>
                    <div style={{
                      fontSize: 10,
                      color: 'var(--text-3)',
                      lineHeight: 1.3,
                    }}>
                      {meta.subtitle} &middot; {meta.location}
                    </div>
                  </div>
                  {isActive && (
                    <span style={{
                      width: 6, height: 6,
                      borderRadius: '50%',
                      background: 'var(--olive)',
                      flexShrink: 0,
                    }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="main-content">
        {renderPage()}
      </main>

      <Toast />
    </div>
  );
}

export default App;
