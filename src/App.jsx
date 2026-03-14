import { useState, useRef } from 'react';
import './App.css';
import { useData, PARTICIPANT_META } from './context/DataContext';
import Dashboard from './pages/Dashboard';
import Findings from './pages/Findings';
import AffinityMap from './pages/AffinityMap';
import InterviewGuide from './pages/InterviewGuide';
import DesignSpace from './pages/DesignSpace';
import Synthesis from './pages/Synthesis';
import ExpertFrameworks from './pages/ExpertFrameworks';
import Narrative from './pages/Narrative';
import ParticipantProfile from './pages/ParticipantProfile';
import Toast from './components/Toast';
import SaveIndicator from './components/SaveIndicator';

const UNIVERSAL_NAV = [
  { id: 'dashboard', label: 'Overview', icon: '\u25C9', color: 'var(--olive)' },
  { id: 'design', label: 'Design Space', icon: '\u25B3', color: 'var(--olive)' },
  { id: 'synthesis', label: 'Synthesis', icon: '\u25EC', color: 'var(--purple)' },
  { id: 'experts', label: 'Expert Frameworks', icon: '\u25C7', color: 'var(--blue)' },
  { id: 'narrative', label: 'Narrative', icon: '\u25CE', color: 'var(--terracotta)' },
  { id: 'guide', label: 'Interview Guide', icon: '\u25C8', color: 'var(--purple)' },
];

const PARTICIPANT_NAV = [
  { id: 'profile', label: 'Profile', icon: '\u25C9', color: 'var(--olive)' },
  { id: 'findings', label: 'Key Findings', icon: '\u25C8', color: 'var(--terracotta)' },
  { id: 'affinity', label: 'Affinity Map', icon: '\u25A6', color: 'var(--blue)' },
];

function App() {
  const [activeTab, setActiveTab] = useState('universal');
  const [activePage, setActivePage] = useState('dashboard');
  const { exportData, importData, resetToDefaults, activeParticipant, participantList, switchParticipant } = useData();
  const fileInputRef = useRef(null);

  const navItems = activeTab === 'universal' ? UNIVERSAL_NAV : PARTICIPANT_NAV;

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (tab === 'universal') {
      setActivePage('dashboard');
    } else {
      setActivePage('profile');
    }
  };

  const handleNavigate = (page) => {
    // Check which tab owns this page
    if (UNIVERSAL_NAV.some(n => n.id === page)) {
      setActiveTab('universal');
    } else if (PARTICIPANT_NAV.some(n => n.id === page)) {
      setActiveTab('participant');
    }
    setActivePage(page);
  };

  const handleSwitchToParticipant = (pid) => {
    switchParticipant(pid);
    setActiveTab('participant');
    setActivePage('profile');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard onNavigate={handleNavigate} onSwitchTab={handleSwitchToParticipant} />;
      case 'findings': return <Findings />;
      case 'affinity': return <AffinityMap />;
      case 'guide': return <InterviewGuide />;
      case 'design': return <DesignSpace />;
      case 'synthesis': return <Synthesis />;
      case 'experts': return <ExpertFrameworks />;
      case 'narrative': return <Narrative />;
      case 'profile': return <ParticipantProfile onNavigate={handleNavigate} />;
      default: return <Dashboard onNavigate={handleNavigate} onSwitchTab={handleSwitchToParticipant} />;
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
            Thesis Orbit
          </div>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 18,
            color: 'var(--text-1)',
          }}>
            Paired Calendar
          </div>
          <div style={{
            fontSize: 11,
            color: 'var(--text-3)',
            marginTop: 2,
          }}>
            Interaction Design — Spring 2026
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="sidebar-tab-toggle">
          <button
            className={`sidebar-tab ${activeTab === 'universal' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('universal')}
          >
            Universal
          </button>
          <button
            className={`sidebar-tab ${activeTab === 'participant' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('participant')}
          >
            Per Participant
          </button>
        </div>

        {/* Participant Switcher — only in participant tab */}
        {activeTab === 'participant' && (
          <div style={{
            padding: '0 16px 12px',
          }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {participantList.map(pid => {
                const meta = PARTICIPANT_META[pid];
                const isActive = pid === activeParticipant;
                return (
                  <button
                    key={pid}
                    onClick={() => switchParticipant(pid)}
                    title={meta.label}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 3,
                      padding: '6px 4px',
                      borderRadius: 8,
                      border: isActive ? '1.5px solid var(--olive)' : '1px solid var(--border)',
                      background: isActive
                        ? 'color-mix(in srgb, var(--olive) 8%, transparent)'
                        : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{meta.emoji}</span>
                    <span style={{
                      fontSize: 9,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--olive)' : 'var(--text-3)',
                      lineHeight: 1.2,
                    }}>
                      P{pid.replace('p', '')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="sidebar-nav">
          {navItems.map(item => (
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
      </nav>

      <main className="main-content">
        {renderPage()}
      </main>

      <Toast />
    </div>
  );
}

export default App;
