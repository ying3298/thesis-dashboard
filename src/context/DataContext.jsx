import { createContext, useContext, useReducer, useEffect, useRef, useCallback } from 'react';
import FINDINGS from '../data/findings';
import GUIDE_SECTIONS from '../data/guide';
import { DESIGN_CONSTRAINTS, HYPOTHESES } from '../data/constraints';
import DEFAULT_CLUSTERS from '../data/affinity';

/* ── ID generation ─────────────────────────────────────── */
let _id = Date.now();
const uid = () => 'item_' + (_id++);

/* ── Storage key ───────────────────────────────────────── */
const STORAGE_KEY = 'thesis-dashboard-data';

/* ── Default static data from Dashboard.jsx ────────────── */
const DEFAULT_PARTICIPANT_DETAILS = [
  { label: 'Age', value: '26' },
  { label: 'Occupation', value: 'Graphic designer' },
  { label: 'Location', value: 'London \u2192 Taiwan' },
  { label: 'Family', value: 'Parents in Taiwan' },
  { label: 'Communication', value: 'LINE / WeChat' },
  { label: 'Pet', value: 'Cat named Ding Ding (\u4E01\u4E01)' },
  { label: 'Interview date', value: 'March 2026' },
  { label: 'Duration', value: '~38 min (2 sessions)' },
  { label: 'Language', value: 'Mandarin' },
];

const DEFAULT_BIG_PICTURE = [
  {
    label: 'What she wants',
    color: 'var(--olive, #4A6741)',
    text: 'Connection without emotional exposure. Presence without surveillance. A daily thread that says "I\'m here, I\'m okay" \u2014 low-effort, ambient, neutral.',
  },
  {
    label: 'What she fears',
    color: 'var(--terracotta, #C46B4D)',
    text: 'Any shared signal becomes a monitoring system. Parents read absence as crisis. Emotional highs create expectations that make lows visible. She wants plausible deniability.',
  },
  {
    label: 'What she doesn\'t know she wants',
    color: 'var(--purple, #7A6B8A)',
    text: 'A way to see her parents\' slow daily changes \u2014 the things currently invisible until she goes home. She reads her mom through her hair, her dad through his eyes. She craves sensory evidence, not information.',
  },
];

const DEFAULT_CORE_TENSION = {
  main: 'She wants to feel connected but stay invisible.',
  sub: 'The Paired Calendar has to be present enough to create warmth, but opaque enough to preserve freedom.',
};

const DEFAULT_WANTS_FEARS = {
  wants: [
    'Connection without exposure.',
    'Presence without surveillance.',
    '"I\'m here, I\'m okay" \u2014 nothing more.',
  ],
  fears: [
    'Shared signal becomes monitoring.',
    'Absence = crisis.',
    'Happy days create expectations.',
  ],
  hiddenNeeds: [
    'See parents\' slow daily changes.',
    'Read them through senses (hair, eyes), not information.',
  ],
};

/* ── Build defaults ────────────────────────────────────── */
function buildDefaults() {
  return {
    findings: FINDINGS,
    guideSections: GUIDE_SECTIONS,
    designConstraints: DESIGN_CONSTRAINTS,
    hypotheses: HYPOTHESES,
    affinityClusters: DEFAULT_CLUSTERS,
    participantDetails: DEFAULT_PARTICIPANT_DETAILS,
    bigPicture: DEFAULT_BIG_PICTURE,
    coreTension: DEFAULT_CORE_TENSION,
    wantsFears: DEFAULT_WANTS_FEARS,
    _prev: null,
    editCount: 0,
    toastMessage: null,
    lastSaved: null,
  };
}

/* ── Load initial state ────────────────────────────────── */
function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Merge parsed data with defaults to fill any missing keys
      const defaults = buildDefaults();
      return {
        ...defaults,
        ...parsed,
        _prev: null,
        editCount: 0,
        toastMessage: null,
        lastSaved: new Date().toISOString(),
      };
    }
  } catch {
    // Invalid JSON, fall through to defaults
  }
  return buildDefaults();
}

/* ── Hypothesis status cycle ───────────────────────────── */
const HYPOTHESIS_CYCLE = ['to-test', 'testing', 'validated', 'rejected'];

function nextHypothesisStatus(current) {
  const idx = HYPOTHESIS_CYCLE.indexOf(current);
  return HYPOTHESIS_CYCLE[(idx + 1) % HYPOTHESIS_CYCLE.length];
}

/* ── Actions that do NOT mutate data (skip undo snapshot) ─ */
const NON_MUTATING = new Set(['UNDO', 'SHOW_TOAST', 'HIDE_TOAST']);

/* ── Reducer ───────────────────────────────────────────── */
function reducer(state, action) {
  // Undo snapshot: save current state (without _prev) before any mutating action
  let nextState = state;
  if (!NON_MUTATING.has(action.type)) {
    const { _prev, ...snapshot } = state;
    nextState = { ...state, _prev: snapshot };
  }

  switch (action.type) {
    /* ── Findings ─────────────────────────────────────── */
    case 'UPDATE_FINDING': {
      const { id, field, value } = action;
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        findings: nextState.findings.map((f) =>
          f.id === id ? { ...f, [field]: value } : f
        ),
      };
    }
    case 'ADD_FINDING': {
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        findings: [
          ...nextState.findings,
          {
            id: uid(),
            title: 'New finding',
            emoji: '\uD83D\uDCA1',
            summary: '',
            evidence: '',
            designImplication: '',
          },
        ],
      };
    }
    case 'DELETE_FINDING': {
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        findings: nextState.findings.filter((f) => f.id !== action.id),
      };
    }
    case 'REORDER_FINDING': {
      const { id, direction } = action;
      const list = [...nextState.findings];
      const idx = list.findIndex((f) => f.id === id);
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (idx < 0 || swapIdx < 0 || swapIdx >= list.length) return state;
      [list[idx], list[swapIdx]] = [list[swapIdx], list[idx]];
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        findings: list,
      };
    }

    /* ── Guide Sections ───────────────────────────────── */
    case 'UPDATE_GUIDE_SECTION': {
      const { sectionId, field, value } = action;
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        guideSections: nextState.guideSections.map((s) =>
          s.id === sectionId ? { ...s, [field]: value } : s
        ),
      };
    }
    case 'UPDATE_GUIDE_ITEM': {
      const { sectionId, itemIndex, field, value } = action;
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        guideSections: nextState.guideSections.map((s) => {
          if (s.id !== sectionId) return s;
          const items = [...s.items];
          items[itemIndex] = { ...items[itemIndex], [field]: value };
          return { ...s, items };
        }),
      };
    }
    case 'ADD_GUIDE_ITEM': {
      const { sectionId } = action;
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        guideSections: nextState.guideSections.map((s) => {
          if (s.id !== sectionId) return s;
          return {
            ...s,
            items: [
              ...s.items,
              { title: 'New item', why: '', fix: '', principle: '', tag: 'new' },
            ],
          };
        }),
      };
    }
    case 'DELETE_GUIDE_ITEM': {
      const { sectionId, itemIndex } = action;
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        guideSections: nextState.guideSections.map((s) => {
          if (s.id !== sectionId) return s;
          const items = s.items.filter((_, i) => i !== itemIndex);
          return { ...s, items };
        }),
      };
    }
    case 'ADD_GUIDE_SECTION': {
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        guideSections: [
          ...nextState.guideSections,
          {
            id: uid(),
            label: action.label || 'New Section',
            color: '#6B6B6B',
            icon: '\u25CB',
            intro: '',
            items: [],
          },
        ],
      };
    }
    case 'DELETE_GUIDE_SECTION': {
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        guideSections: nextState.guideSections.filter((s) => s.id !== action.sectionId),
      };
    }

    /* ── Constraints ──────────────────────────────────── */
    case 'UPDATE_CONSTRAINT': {
      const { id, field, value } = action;
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        designConstraints: nextState.designConstraints.map((c) =>
          c.id === id ? { ...c, [field]: value } : c
        ),
      };
    }
    case 'ADD_CONSTRAINT': {
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        designConstraints: [
          ...nextState.designConstraints,
          { id: uid(), title: 'New rule', description: '', icon: '\u25CC' },
        ],
      };
    }
    case 'DELETE_CONSTRAINT': {
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        designConstraints: nextState.designConstraints.filter((c) => c.id !== action.id),
      };
    }

    /* ── Hypotheses ───────────────────────────────────── */
    case 'UPDATE_HYPOTHESIS': {
      const { id, field, value } = action;
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        hypotheses: nextState.hypotheses.map((h) =>
          h.id === id ? { ...h, [field]: value } : h
        ),
      };
    }
    case 'ADD_HYPOTHESIS': {
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        hypotheses: [
          ...nextState.hypotheses,
          { id: uid(), statement: 'New hypothesis', testHow: '', status: 'to-test' },
        ],
      };
    }
    case 'DELETE_HYPOTHESIS': {
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        hypotheses: nextState.hypotheses.filter((h) => h.id !== action.id),
      };
    }
    case 'TOGGLE_HYPOTHESIS_STATUS': {
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        hypotheses: nextState.hypotheses.map((h) =>
          h.id === action.id ? { ...h, status: nextHypothesisStatus(h.status) } : h
        ),
      };
    }

    /* ── Affinity Clusters ────────────────────────────── */
    case 'UPDATE_NOTE': {
      const { clusterId, noteId, updates } = action;
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        affinityClusters: nextState.affinityClusters.map((c) => {
          if (c.id !== clusterId) return c;
          return {
            ...c,
            notes: c.notes.map((n) => (n.id === noteId ? { ...n, ...updates } : n)),
          };
        }),
      };
    }
    case 'ADD_NOTE': {
      const { clusterId } = action;
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        affinityClusters: nextState.affinityClusters.map((c) => {
          if (c.id !== clusterId) return c;
          return {
            ...c,
            notes: [
              ...c.notes,
              { id: uid(), text: '', tag: 'new', special: false },
            ],
          };
        }),
      };
    }
    case 'DELETE_NOTE': {
      const { clusterId, noteId } = action;
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        affinityClusters: nextState.affinityClusters.map((c) => {
          if (c.id !== clusterId) return c;
          return { ...c, notes: c.notes.filter((n) => n.id !== noteId) };
        }),
      };
    }
    case 'MOVE_NOTE': {
      const { fromClusterId, toClusterId, noteId } = action;
      let movedNote = null;
      const withRemoved = nextState.affinityClusters.map((c) => {
        if (c.id !== fromClusterId) return c;
        movedNote = c.notes.find((n) => n.id === noteId);
        return { ...c, notes: c.notes.filter((n) => n.id !== noteId) };
      });
      if (!movedNote) return state;
      const withAdded = withRemoved.map((c) => {
        if (c.id !== toClusterId) return c;
        return { ...c, notes: [...c.notes, movedNote] };
      });
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        affinityClusters: withAdded,
      };
    }
    case 'TOGGLE_SPECIAL': {
      const { clusterId, noteId } = action;
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        affinityClusters: nextState.affinityClusters.map((c) => {
          if (c.id !== clusterId) return c;
          return {
            ...c,
            notes: c.notes.map((n) =>
              n.id === noteId ? { ...n, special: !n.special } : n
            ),
          };
        }),
      };
    }
    case 'ADD_CLUSTER': {
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        affinityClusters: [
          ...nextState.affinityClusters,
          {
            id: uid(),
            label: action.label || 'New cluster',
            color: '#6B6B6B',
            notes: [],
          },
        ],
      };
    }
    case 'DELETE_CLUSTER': {
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        affinityClusters: nextState.affinityClusters.filter(
          (c) => c.id !== action.clusterId
        ),
      };
    }
    case 'UPDATE_CLUSTER_LABEL': {
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        affinityClusters: nextState.affinityClusters.map((c) =>
          c.id === action.clusterId ? { ...c, label: action.label } : c
        ),
      };
    }

    /* ── Dashboard editable fields ────────────────────── */
    case 'UPDATE_PARTICIPANT': {
      const { index, field, value } = action;
      const list = [...nextState.participantDetails];
      list[index] = { ...list[index], [field]: value };
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        participantDetails: list,
      };
    }
    case 'UPDATE_BIG_PICTURE': {
      const { index, field, value } = action;
      const list = [...nextState.bigPicture];
      list[index] = { ...list[index], [field]: value };
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        bigPicture: list,
      };
    }

    /* ── Wants / Fears / Needs ────────────────────────── */
    case 'UPDATE_WANTS_FEARS': {
      const { category, lineIndex, value } = action;
      const updated = { ...nextState.wantsFears };
      updated[category] = [...updated[category]];
      updated[category][lineIndex] = value;
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        wantsFears: updated,
      };
    }
    case 'ADD_WANTS_FEARS_LINE': {
      const { category } = action;
      const updated = { ...nextState.wantsFears };
      updated[category] = [...updated[category], ''];
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        wantsFears: updated,
      };
    }
    case 'DELETE_WANTS_FEARS_LINE': {
      const { category, lineIndex } = action;
      const updated = { ...nextState.wantsFears };
      updated[category] = updated[category].filter((_, i) => i !== lineIndex);
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        wantsFears: updated,
      };
    }

    /* ── Core Tension ─────────────────────────────────── */
    case 'UPDATE_CORE_TENSION': {
      return {
        ...nextState,
        editCount: nextState.editCount + 1,
        coreTension: { ...nextState.coreTension, [action.field]: action.value },
      };
    }

    /* ── Undo ─────────────────────────────────────────── */
    case 'UNDO': {
      if (!state._prev) return state;
      return { ...state._prev, _prev: null, editCount: state.editCount, toastMessage: 'Undone' };
    }

    /* ── Reset ────────────────────────────────────────── */
    case 'RESET_ALL': {
      localStorage.removeItem(STORAGE_KEY);
      return { ...buildDefaults(), toastMessage: 'Reset to defaults' };
    }

    /* ── Import ───────────────────────────────────────── */
    case 'IMPORT_DATA': {
      const defaults = buildDefaults();
      return {
        ...defaults,
        ...action.data,
        _prev: null,
        editCount: 0,
        toastMessage: 'Data imported successfully',
        lastSaved: new Date().toISOString(),
      };
    }

    /* ── Toast ────────────────────────────────────────── */
    case 'SHOW_TOAST': {
      return { ...state, toastMessage: action.message };
    }
    case 'HIDE_TOAST': {
      return { ...state, toastMessage: null };
    }

    default:
      console.warn('Unknown action type:', action.type);
      return state;
  }
}

/* ── Context ───────────────────────────────────────────── */
export const DataContext = createContext();

/* ── Provider ──────────────────────────────────────────── */
export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, loadInitialState);
  const saveTimerRef = useRef(null);

  // Debounced persistence to localStorage
  useEffect(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      try {
        const { _prev, editCount, toastMessage, lastSaved, ...persistable } = state;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }
    }, 300);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [state]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

/* ── Hook ──────────────────────────────────────────────── */
export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within a DataProvider');
  const { state, dispatch } = ctx;

  const undo = useCallback(() => dispatch({ type: 'UNDO' }), [dispatch]);
  const resetToDefaults = useCallback(() => dispatch({ type: 'RESET_ALL' }), [dispatch]);

  const exportData = useCallback(() => {
    const { _prev, editCount, toastMessage, lastSaved, ...data } = state;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'thesis-dashboard-data.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [state]);

  const importData = useCallback(
    (jsonString) => {
      try {
        const data = JSON.parse(jsonString);
        dispatch({ type: 'IMPORT_DATA', data });
      } catch (e) {
        console.error('Failed to import data:', e);
        dispatch({ type: 'SHOW_TOAST', message: 'Import failed: invalid JSON' });
      }
    },
    [dispatch]
  );

  return {
    // Data slices
    findings: state.findings,
    guideSections: state.guideSections,
    designConstraints: state.designConstraints,
    hypotheses: state.hypotheses,
    affinityClusters: state.affinityClusters,
    participantDetails: state.participantDetails,
    bigPicture: state.bigPicture,
    coreTension: state.coreTension,
    wantsFears: state.wantsFears,

    // Meta
    editCount: state.editCount,
    lastSaved: state.lastSaved,
    toastMessage: state.toastMessage,
    canUndo: !!state._prev,

    // Dispatch
    dispatch,

    // Computed stats
    stats: {
      findingsCount: state.findings.length,
      notesCount: state.affinityClusters.reduce((s, c) => s + c.notes.length, 0),
      constraintsCount: state.designConstraints.length,
      hypothesesCount: state.hypotheses.length,
      clustersCount: state.affinityClusters.length,
    },

    // Convenience actions
    undo,
    resetToDefaults,
    exportData,
    importData,
  };
}
