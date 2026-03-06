import { useState, useRef } from 'react';
import './App.css';
import { useData } from './context/DataContext';
import Dashboard from './pages/Dashboard';
import Findings from './pages/Findings';
import AffinityMap from './pages/AffinityMap';
import InterviewGuide from './pages/InterviewGuide';
import DesignSpace from './pages/DesignSpace';
import Toast from './components/Toast';
import SaveIndicator from './components/SaveIndicator';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Overview', icon: '\u25C9', color: 'var(--olive)' },
  { id: 'findings', label: 'Key Findings', icon: '\u25C8', color: 'var(--terracotta)' },
  { id: 'affinity', label: 'Affinity Map', icon: '\u25A6', color: 'var(--blue)' },
  { id: 'guide', label: 'Interview Guide', icon: '\u25C7', color: 'var(--purple)' },
  { id: 'design', label: 'Design Space', icon: '\u25B3', color: 'var(--olive)' },
];

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const { exportData, importData, resetToDefaults } = useData();
  const fileInputRef = useRef(null);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard onNavigate={setActivePage} />;
      case 'findings': return <Findings />;
      case 'affinity': return <AffinityMap />;
      case 'guide': return <InterviewGuide />;
      case 'design': return <DesignSpace />;
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
            Paired Calendar
          </div>
          <div style={{
            fontSize: 11,
            color: 'var(--text-3)',
            marginTop: 2,
          }}>
            Ying &mdash; Spring 2026
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

        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border)',
          fontSize: 10,
          color: 'var(--text-3)',
          lineHeight: 1.6,
        }}>
          <div style={{
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 4,
          }}>
            Participant #1
          </div>
          <div>26yo, graphic designer</div>
          <div>London &rarr; Taiwan</div>
          <div style={{ marginTop: 4, color: 'var(--olive)', fontWeight: 500 }}>
            Interview: March 2026
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
