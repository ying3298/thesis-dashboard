import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import EditableText from '../components/EditableText';
import EditableTextarea from '../components/EditableTextarea';
import AddItemButton from '../components/AddItemButton';
import DeleteButton from '../components/DeleteButton';

export default function InterviewGuide() {
  const { guideSections, dispatch } = useData();
  const [activeSection, setActiveSection] = useState(guideSections[0]?.id);
  const [expandedCards, setExpandedCards] = useState({});

  // When the active section is deleted, switch to the first remaining section
  useEffect(() => {
    if (guideSections.length > 0 && !guideSections.find(s => s.id === activeSection)) {
      setActiveSection(guideSections[0].id);
    }
  }, [guideSections, activeSection]);

  const section = guideSections.find(s => s.id === activeSection);

  function toggleCard(key) {
    setExpandedCards(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function expandAll() {
    if (!section) return;
    const allExpanded = section.items.every((_, idx) => expandedCards[section.id + '-' + idx]);
    if (allExpanded) {
      const next = { ...expandedCards };
      section.items.forEach((_, idx) => { next[section.id + '-' + idx] = false; });
      setExpandedCards(next);
    } else {
      const next = { ...expandedCards };
      section.items.forEach((_, idx) => { next[section.id + '-' + idx] = true; });
      setExpandedCards(next);
    }
  }

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Page header */}
      <header className="page-header">
        <span
          className="page-badge"
          style={{ background: 'var(--purple)', color: '#fff' }}
        >
          Methods
        </span>
        <h1 className="page-title" style={{ fontFamily: 'var(--font-heading)' }}>
          Interview Guide
        </h1>
        <p
          className="page-subtitle"
          style={{
            color: 'var(--text-2)',
            fontFamily: 'var(--font-body)',
            maxWidth: 560,
          }}
        >
          Tips, probes, and structure for your next interview.
          Extracted from analyzing Interview #1.
        </p>
      </header>

      {/* Section tabs */}
      <nav style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        marginBottom: '1.5rem',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid var(--border)',
        alignItems: 'center',
      }}>
        {guideSections.map(s => {
          const isActive = s.id === activeSection;
          return (
            <div
              key={s.id}
              style={{ position: 'relative', display: 'inline-flex' }}
              className="section-tab-wrapper"
            >
              <button
                onClick={() => setActiveSection(s.id)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${isActive ? s.color : 'var(--border)'}`,
                  background: isActive ? s.color : 'var(--surface)',
                  color: isActive ? '#fff' : 'var(--text-2)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  paddingRight: 24,
                }}
              >
                <span style={{ fontSize: '0.9rem' }}>{s.icon}</span>
                {s.label}
              </button>
              {/* Section delete button (visible on hover via CSS class) */}
              {guideSections.length > 1 && (
                <button
                  className="section-delete-x"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: 'DELETE_GUIDE_SECTION', sectionId: s.id });
                  }}
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: 'var(--terracotta, #C46B4D)',
                    color: '#fff',
                    border: 'none',
                    fontSize: '10px',
                    lineHeight: '16px',
                    textAlign: 'center',
                    padding: 0,
                    cursor: 'pointer',
                    opacity: 0,
                    transition: 'opacity 0.15s ease',
                    fontFamily: 'var(--font-mono)',
                    zIndex: 2,
                  }}
                  title={`Delete section "${s.label}"`}
                >
                  ×
                </button>
              )}
            </div>
          );
        })}

        {/* Add section button */}
        <AddItemButton
          label="+ Add section"
          onAdd={(label) => dispatch({ type: 'ADD_GUIDE_SECTION', label })}
          needsInput
          inputPlaceholder="Section name..."
          accentColor="var(--purple)"
        />
      </nav>

      {/* Inline style for section tab hover to reveal delete button */}
      <style>{`
        .section-tab-wrapper:hover .section-delete-x {
          opacity: 1 !important;
        }
      `}</style>

      {/* Active section content */}
      {section && (
        <div>
          {/* Section label editing + intro */}
          <div style={{ marginBottom: '0.5rem' }}>
            <EditableText
              value={section.label}
              onSave={v => dispatch({ type: 'UPDATE_GUIDE_SECTION', sectionId: section.id, field: 'label', value: v })}
              placeholder="Section name..."
              tag="h2"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.15rem',
                fontWeight: 600,
                color: section.color,
                margin: 0,
                marginBottom: '0.35rem',
              }}
            />
          </div>

          {/* Section intro + expand button */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1rem',
          }}>
            <div style={{ maxWidth: 560, flex: 1 }}>
              <EditableTextarea
                value={section.intro}
                onSave={v => dispatch({ type: 'UPDATE_GUIDE_SECTION', sectionId: section.id, field: 'intro', value: v })}
                placeholder="Add section intro text..."
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--text-2)',
                  lineHeight: 1.6,
                }}
                rows={2}
              />
            </div>
            <button
              onClick={expandAll}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-3)',
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 10px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                marginLeft: 16,
              }}
            >
              {section.items.every((_, idx) => expandedCards[section.id + '-' + idx]) ? 'Collapse all' : 'Expand all'}
            </button>
          </div>

          {/* Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {section.items.map((item, idx) => {
              const cardKey = section.id + '-' + idx;
              const isOpen = !!expandedCards[cardKey];
              return (
                <div
                  key={cardKey}
                  className="card guide-card"
                  style={{
                    background: 'var(--surface)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.15s ease',
                    position: 'relative',
                  }}
                >
                  {/* Delete button (hover to reveal) */}
                  <div
                    className="guide-card-delete"
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      zIndex: 3,
                      opacity: 0,
                      transition: 'opacity 0.15s ease',
                    }}
                  >
                    <DeleteButton
                      onConfirm={() => dispatch({ type: 'DELETE_GUIDE_ITEM', sectionId: section.id, itemIndex: idx })}
                      itemLabel="item"
                    />
                  </div>

                  {/* Card header */}
                  <button
                    className="card-header"
                    onClick={() => toggleCard(cardKey)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      width: '100%',
                      padding: '0.85rem 1rem',
                      paddingRight: '2.5rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    {/* Tag pill — editable via click (stopPropagation) */}
                    <span
                      onClick={e => e.stopPropagation()}
                      style={{ flexShrink: 0 }}
                    >
                      <EditableText
                        value={item.tag}
                        onSave={v => dispatch({ type: 'UPDATE_GUIDE_ITEM', sectionId: section.id, itemIndex: idx, field: 'tag', value: v })}
                        placeholder="tag"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.6rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          padding: '2px 8px',
                          borderRadius: 999,
                          background: section.color + '18',
                          color: section.color,
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          display: 'inline-block',
                        }}
                        inputStyle={{
                          width: 70,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          padding: '2px 8px',
                          borderRadius: 999,
                          background: section.color + '18',
                          color: section.color,
                        }}
                      />
                    </span>

                    {/* Title — editable via click (stopPropagation) */}
                    <span
                      onClick={e => e.stopPropagation()}
                      style={{ flex: 1 }}
                    >
                      <EditableText
                        value={item.title}
                        onSave={v => dispatch({ type: 'UPDATE_GUIDE_ITEM', sectionId: section.id, itemIndex: idx, field: 'title', value: v })}
                        placeholder="Item title..."
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          color: 'var(--text-1)',
                        }}
                      />
                    </span>

                    {/* Toggle */}
                    <span
                      className="card-toggle"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.1rem',
                        color: 'var(--text-3)',
                        flexShrink: 0,
                        transition: 'transform 0.2s ease',
                        transform: isOpen ? 'rotate(45deg)' : 'none',
                        width: 20,
                        textAlign: 'center',
                      }}
                    >
                      +
                    </span>
                  </button>

                  {/* Card body */}
                  {isOpen && (
                    <div
                      className="card-body"
                      style={{
                        padding: '0 1rem 1rem 1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                      }}
                    >
                      {/* Divider */}
                      <div style={{ height: 1, background: 'var(--border)', margin: '0 0 0.25rem 0' }} />

                      {/* Why text */}
                      <EditableTextarea
                        value={item.why}
                        onSave={v => dispatch({ type: 'UPDATE_GUIDE_ITEM', sectionId: section.id, itemIndex: idx, field: 'why', value: v })}
                        placeholder="Why is this important?..."
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.87rem',
                          lineHeight: 1.65,
                          color: 'var(--text-2)',
                        }}
                        rows={2}
                      />

                      {/* Principle callout */}
                      <div
                        className="card-principle"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.85rem',
                          lineHeight: 1.55,
                          color: section.color,
                          fontWeight: 500,
                          fontStyle: 'italic',
                          padding: '0.65rem 0.85rem',
                          borderRadius: 'var(--radius-sm)',
                          background: section.color + '0C',
                          borderLeft: `3px solid ${section.color}`,
                        }}
                      >
                        <EditableTextarea
                          value={item.principle || ''}
                          onSave={v => dispatch({ type: 'UPDATE_GUIDE_ITEM', sectionId: section.id, itemIndex: idx, field: 'principle', value: v })}
                          placeholder="Add design principle..."
                          style={{
                            fontFamily: 'inherit',
                            fontSize: 'inherit',
                            lineHeight: 'inherit',
                            color: 'inherit',
                            fontWeight: 'inherit',
                            fontStyle: 'inherit',
                          }}
                          rows={1}
                        />
                      </div>

                      {/* Fix / tip box */}
                      <div
                        className="card-tip"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.84rem',
                          lineHeight: 1.6,
                          color: 'var(--text-1)',
                          padding: '0.65rem 0.85rem',
                          borderRadius: 'var(--radius-sm)',
                          background: 'var(--highlight-bg)',
                          borderLeft: '3px solid var(--highlight-border)',
                        }}
                      >
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          color: 'var(--highlight-border)',
                          display: 'block',
                          marginBottom: 4,
                          fontWeight: 600,
                        }}>
                          Try this
                        </span>
                        <EditableTextarea
                          value={item.fix || ''}
                          onSave={v => dispatch({ type: 'UPDATE_GUIDE_ITEM', sectionId: section.id, itemIndex: idx, field: 'fix', value: v })}
                          placeholder="Add a tip or fix..."
                          style={{
                            fontFamily: 'inherit',
                            fontSize: 'inherit',
                            lineHeight: 'inherit',
                            color: 'inherit',
                          }}
                          rows={1}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Add item button at bottom of card list */}
            <AddItemButton
              label="+ Add item"
              onAdd={() => dispatch({ type: 'ADD_GUIDE_ITEM', sectionId: section.id })}
              accentColor={section.color}
            />
          </div>
        </div>
      )}

      {/* Hover styles for guide cards — show delete button on hover */}
      <style>{`
        .guide-card:hover .guide-card-delete {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
