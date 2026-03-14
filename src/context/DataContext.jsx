import { createContext, useContext, useReducer, useEffect, useRef, useCallback } from 'react';

/* ── P1 default data imports ──────────────────────────── */
import FINDINGS_P1 from '../data/findings';
import GUIDE_SECTIONS from '../data/guide';
import { DESIGN_CONSTRAINTS, HYPOTHESES } from '../data/constraints';
import DEFAULT_CLUSTERS_P1 from '../data/affinity';

/* ── P2 default data imports ──────────────────────────── */
import FINDINGS_P2 from '../data/findings-2';
import DEFAULT_CLUSTERS_P2 from '../data/affinity-2';

/* ── P3 default data imports ──────────────────────────── */
import FINDINGS_P3 from '../data/findings-3';
import DEFAULT_CLUSTERS_P3 from '../data/affinity-3';

/* ── P4 default data imports ──────────────────────────── */
import FINDINGS_P4 from '../data/findings-4';
import DEFAULT_CLUSTERS_P4 from '../data/affinity-4';

/* ── ID generation ─────────────────────────────────────── */
let _id = Date.now();
const uid = () => 'item_' + (_id++);

/* ── Storage key ───────────────────────────────────────── */
const STORAGE_KEY = 'thesis-dashboard-data';

/* ── Participant metadata ─────────────────────────────── */
export const PARTICIPANT_META = {
  p1: {
    id: 'p1',
    label: 'Participant #1',
    subtitle: 'Roommate',
    emoji: '\uD83D\uDC69\u200D\uD83C\uDFA8',
    location: 'London \u2192 Taiwan',
  },
  p2: {
    id: 'p2',
    label: 'Participant #2',
    subtitle: 'Classmate',
    emoji: '\uD83D\uDC69\u200D\uD83D\uDCBB',
    location: 'Eindhoven \u2192 Taipei',
  },
  p3: {
    id: 'p3',
    label: 'Participant #3',
    subtitle: 'Roommate',
    emoji: '\uD83C\uDF35',
    location: 'New York \u2192 Taiwan',
  },
  p4: {
    id: 'p4',
    label: 'Participant #4',
    subtitle: 'Friend',
    emoji: '\uD83C\uDFAC',
    location: 'Netherlands \u2192 Taiwan',
  },
};

/* ── Per-participant default data ─────────────────────── */
const DEFAULT_PARTICIPANT_DATA = {
  p1: {
    findings: FINDINGS_P1,
    affinityClusters: DEFAULT_CLUSTERS_P1,
    participantDetails: [
      { label: 'Age', value: '26' },
      { label: 'Occupation', value: 'Graphic designer' },
      { label: 'Location', value: 'London \u2192 Taiwan' },
      { label: 'Family', value: 'Parents in Taiwan' },
      { label: 'Communication', value: 'LINE / WeChat' },
      { label: 'Pet', value: 'Cat named Ding Ding (\u4E01\u4E01)' },
      { label: 'Interview date', value: 'March 2026' },
      { label: 'Duration', value: '~38 min (2 sessions)' },
      { label: 'Language', value: 'Mandarin' },
    ],
    bigPicture: [
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
    ],
    coreTension: {
      main: 'She wants to feel connected but stay invisible.',
      sub: 'The Paired Calendar has to be present enough to create warmth, but opaque enough to preserve freedom.',
    },
    wantsFears: {
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
    },
  },
  p2: {
    findings: FINDINGS_P2,
    affinityClusters: DEFAULT_CLUSTERS_P2,
    participantDetails: [
      { label: 'Occupation', value: 'Design student (DAE, Contextual Design)' },
      { label: 'Location', value: 'Eindhoven \u2192 Taipei' },
      { label: 'Family', value: 'Mother, father, brother, grandmother' },
      { label: 'Communication', value: 'LINE' },
      { label: 'Interview date', value: 'March 2026' },
      { label: 'Duration', value: '~43 min (1 session, 4 audio files)' },
      { label: 'Language', value: 'Mandarin' },
    ],
    bigPicture: [
      {
        label: 'What she wants',
        color: 'var(--olive, #4A6741)',
        text: 'To read her parents\' genuine emotional states \u2014 not performance. Physical presence when needed (Anywhere Door). Remove obstacles (money, distance) rather than redesign the connection.',
      },
      {
        label: 'What she fears',
        color: 'var(--terracotta, #C46B4D)',
        text: 'Mom\'s invisible emotional walls. Not being able to sense basic emotions remotely. Guilt amplified by the design. Becoming a remote emotional monitoring station.',
      },
      {
        label: 'What she doesn\'t know she wants',
        color: 'var(--purple, #7A6B8A)',
        text: 'The calendar\'s daily trace at night might transform lying in bed alone from absence into quiet presence. The asymmetry between what each side sends and receives may be the design\'s strength.',
      },
    ],
    coreTension: {
      main: 'She wants to remove the wall, not add a window.',
      sub: 'The Paired Calendar should extend what already exists \u2014 like removing an obstacle, not imposing a new system on a relationship she considers "already like magic."',
    },
    wantsFears: {
      wants: [
        'Read parents\' genuine emotions.',
        'Remove obstacles (money, distance).',
        'Connection that costs nothing emotionally.',
      ],
      fears: [
        'Mom\'s invisible emotional walls.',
        'Guilt amplified by the design.',
        'Becoming a remote monitoring station.',
      ],
      hiddenNeeds: [
        'Evening trace transforms bedtime loneliness into quiet presence.',
        'Asymmetric signals \u2014 different things sent vs received.',
      ],
    },
  },
  p3: {
    findings: FINDINGS_P3,
    affinityClusters: DEFAULT_CLUSTERS_P3,
    participantDetails: [
      { label: 'Age', value: '26' },
      { label: 'Occupation', value: 'Freelancer (Parsons Fashion Management grad)' },
      { label: 'Location', value: 'New York \u2192 Taiwan' },
      { label: 'Family', value: 'Mom, brother (\u54E5\u54E5)' },
      { label: 'Communication', value: 'LINE messages + phone calls' },
      { label: 'Side gig', value: 'PR, wine delivery, freelance styling' },
      { label: 'Interview date', value: 'March 2026' },
      { label: 'Duration', value: '~33 min (1 session)' },
      { label: 'Language', value: 'Mandarin' },
    ],
    bigPicture: [
      {
        label: 'What she wants',
        color: 'var(--olive, #4A6741)',
        text: 'Practical efficiency. A system where she can report in, get acknowledgment, and move on. No emotional overhead. She\'s satisfied with the current system \u2014 the calendar must not disrupt what already works.',
      },
      {
        label: 'What she fears',
        color: 'var(--terracotta, #C46B4D)',
        text: 'Losing control of her narrative. Being monitored or having others know things she hasn\'t chosen to disclose. Any system that demands more emotional labor than her current "report and go" pattern.',
      },
      {
        label: 'What she doesn\'t know she wants',
        color: 'var(--purple, #7A6B8A)',
        text: 'A fallback for busy weeks when even a text feels like too much. The calendar is the minimum viable \u5831\u5099 \u2014 a 2-second gesture that says "still here" without composing a single word.',
      },
    ],
    coreTension: {
      main: 'She wants connection without interruption.',
      sub: 'The \u5831\u5099 system works because it\'s on her terms. The calendar must be equally controllable \u2014 a daily action she initiates, never a demand she responds to.',
    },
    wantsFears: {
      wants: [
        'Practical \u5831\u5099 (reporting). Control. Efficiency.',
        'Acknowledgment without conversation.',
        '"We\'re all still living" \u2014 nothing more needed.',
      ],
      fears: [
        'Emotional demands or expectations.',
        'Surveillance or passive data collection.',
        'Losing agency over what gets shared.',
      ],
      hiddenNeeds: [
        'A fallback for busy weeks when even texting feels like too much.',
        'A way for her brother to instantly know when something funny happens.',
      ],
    },
  },
  p4: {
    findings: FINDINGS_P4,
    affinityClusters: DEFAULT_CLUSTERS_P4,
    participantDetails: [
      { label: 'Occupation', value: 'Animator / creative freelancer' },
      { label: 'Location', value: 'Netherlands \u2192 Taiwan' },
      { label: 'Family', value: 'Mom (\u7345\u5B50\u5EA7, smoker), grandmother (\u5976\u5976)' },
      { label: 'Communication', value: 'Phone calls every 2\u20133 months' },
      { label: 'Key detail', value: 'Lived with grandma until age 18' },
      { label: 'Interview date', value: 'March 2026' },
      { label: 'Duration', value: '~2 hours (1 session)' },
      { label: 'Language', value: 'Mandarin' },
    ],
    bigPicture: [
      {
        label: 'What he wants',
        color: 'var(--olive, #4A6741)',
        text: 'Freedom through distance. No friction, no monitoring, no demands. He wants to know his family is alive and healthy \u2014 nothing more. Any design intervention should feel like decor, not technology.',
      },
      {
        label: 'What he fears',
        color: 'var(--terracotta, #C46B4D)',
        text: 'Being watched. Family\'s attention focused on him. Any system that turns the relationship into a monitoring station \u2014 in either direction. He also fears objects that demand sustained engagement over time.',
      },
      {
        label: 'What he doesn\'t know he wants',
        color: 'var(--purple, #7A6B8A)',
        text: 'A reason-free way to stay present. He only calls with a concrete question (pad thai recipe), but he feels good every time he does. The calendar gives him a daily reason that requires no reason at all \u2014 just tear.',
      },
    ],
    coreTension: {
      main: 'He values the distance but reads faces to fill the silence.',
      sub: 'The calendar must honor the space he treasures while offering what phone calls can\'t \u2014 presence without conversation, connection without a reason.',
    },
    wantsFears: {
      wants: [
        'Freedom through distance. No daily friction.',
        'Health + big emotions only. Everything else is noise.',
        'Ambient, decorative, easy to observe, zero function.',
      ],
      fears: [
        'Being monitored or having family\'s attention fixed on him.',
        'Communication that demands a reason or topic.',
        'Objects that feel like surveillance or require sustained creativity.',
      ],
      hiddenNeeds: [
        'A reason-free way to stay present with grandma and mom.',
        'Physical, sensory connection \u2014 like smoke on a jacket \u2014 not digital data.',
      ],
    },
  },
};

/* ── Build defaults ────────────────────────────────────── */
function buildDefaults() {
  return {
    activeParticipant: 'p1',
    participants: { ...DEFAULT_PARTICIPANT_DATA },
    guideSections: GUIDE_SECTIONS,
    designConstraints: DESIGN_CONSTRAINTS,
    hypotheses: HYPOTHESES,
    _prev: null,
    editCount: 0,
    toastMessage: null,
    lastSaved: null,
  };
}

/* ── Migrate from old single-participant format ────────── */
function migrateOldFormat(parsed) {
  if (parsed.findings && !parsed.participants) {
    const p1Data = {
      findings: parsed.findings,
      affinityClusters: parsed.affinityClusters || DEFAULT_PARTICIPANT_DATA.p1.affinityClusters,
      participantDetails: parsed.participantDetails || DEFAULT_PARTICIPANT_DATA.p1.participantDetails,
      bigPicture: parsed.bigPicture || DEFAULT_PARTICIPANT_DATA.p1.bigPicture,
      coreTension: parsed.coreTension || DEFAULT_PARTICIPANT_DATA.p1.coreTension,
      wantsFears: parsed.wantsFears || DEFAULT_PARTICIPANT_DATA.p1.wantsFears,
    };
    return {
      activeParticipant: 'p1',
      participants: {
        p1: p1Data,
        p2: DEFAULT_PARTICIPANT_DATA.p2,
      },
      guideSections: parsed.guideSections || GUIDE_SECTIONS,
      designConstraints: parsed.designConstraints || DESIGN_CONSTRAINTS,
      hypotheses: parsed.hypotheses || HYPOTHESES,
    };
  }
  return parsed;
}

/* ── Load initial state ────────────────────────────────── */
function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      let parsed = JSON.parse(raw);
      parsed = migrateOldFormat(parsed);
      const defaults = buildDefaults();
      const participants = { ...defaults.participants };
      for (const pid of Object.keys(participants)) {
        if (parsed.participants && parsed.participants[pid]) {
          participants[pid] = { ...defaults.participants[pid], ...parsed.participants[pid] };
        }
      }
      return {
        ...defaults,
        ...parsed,
        participants,
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
const NON_MUTATING = new Set(['UNDO', 'SHOW_TOAST', 'HIDE_TOAST', 'SWITCH_PARTICIPANT']);

/* ── Helper: update active participant's data ──────────── */
function withActiveParticipant(state, updater) {
  const pid = state.activeParticipant;
  const pData = state.participants[pid];
  return {
    ...state,
    participants: {
      ...state.participants,
      [pid]: updater(pData),
    },
  };
}

/* ── Reducer ───────────────────────────────────────────── */
function reducer(state, action) {
  let nextState = state;
  if (!NON_MUTATING.has(action.type)) {
    const { _prev, ...snapshot } = state;
    nextState = { ...state, _prev: snapshot };
  }

  switch (action.type) {
    /* ── Participant switching ────────────────────────── */
    case 'SWITCH_PARTICIPANT': {
      return { ...state, activeParticipant: action.id };
    }

    /* ── Findings (per-participant) ───────────────────── */
    case 'UPDATE_FINDING': {
      const { id, field, value } = action;
      return {
        ...withActiveParticipant(nextState, (p) => ({
          ...p,
          findings: p.findings.map((f) => (f.id === id ? { ...f, [field]: value } : f)),
        })),
        editCount: nextState.editCount + 1,
      };
    }
    case 'ADD_FINDING': {
      return {
        ...withActiveParticipant(nextState, (p) => ({
          ...p,
          findings: [
            ...p.findings,
            { id: uid(), title: 'New finding', emoji: '\uD83D\uDCA1', summary: '', evidence: '', designImplication: '' },
          ],
        })),
        editCount: nextState.editCount + 1,
      };
    }
    case 'DELETE_FINDING': {
      return {
        ...withActiveParticipant(nextState, (p) => ({
          ...p,
          findings: p.findings.filter((f) => f.id !== action.id),
        })),
        editCount: nextState.editCount + 1,
      };
    }
    case 'REORDER_FINDING': {
      const { id, direction } = action;
      return {
        ...withActiveParticipant(nextState, (p) => {
          const list = [...p.findings];
          const idx = list.findIndex((f) => f.id === id);
          const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
          if (idx < 0 || swapIdx < 0 || swapIdx >= list.length) return p;
          [list[idx], list[swapIdx]] = [list[swapIdx], list[idx]];
          return { ...p, findings: list };
        }),
        editCount: nextState.editCount + 1,
      };
    }

    /* ── Guide Sections (shared) ─────────────────────── */
    case 'UPDATE_GUIDE_SECTION': {
      const { sectionId, field, value } = action;
      return { ...nextState, editCount: nextState.editCount + 1, guideSections: nextState.guideSections.map((s) => s.id === sectionId ? { ...s, [field]: value } : s) };
    }
    case 'UPDATE_GUIDE_ITEM': {
      const { sectionId, itemIndex, field, value } = action;
      return {
        ...nextState, editCount: nextState.editCount + 1,
        guideSections: nextState.guideSections.map((s) => {
          if (s.id !== sectionId) return s;
          const items = [...s.items];
          items[itemIndex] = { ...items[itemIndex], [field]: value };
          return { ...s, items };
        }),
      };
    }
    case 'ADD_GUIDE_ITEM': {
      return {
        ...nextState, editCount: nextState.editCount + 1,
        guideSections: nextState.guideSections.map((s) => {
          if (s.id !== action.sectionId) return s;
          return { ...s, items: [...s.items, { title: 'New item', why: '', fix: '', principle: '', tag: 'new' }] };
        }),
      };
    }
    case 'DELETE_GUIDE_ITEM': {
      return {
        ...nextState, editCount: nextState.editCount + 1,
        guideSections: nextState.guideSections.map((s) => {
          if (s.id !== action.sectionId) return s;
          return { ...s, items: s.items.filter((_, i) => i !== action.itemIndex) };
        }),
      };
    }
    case 'ADD_GUIDE_SECTION': {
      return {
        ...nextState, editCount: nextState.editCount + 1,
        guideSections: [...nextState.guideSections, { id: uid(), label: action.label || 'New Section', color: '#6B6B6B', icon: '\u25CB', intro: '', items: [] }],
      };
    }
    case 'DELETE_GUIDE_SECTION': {
      return { ...nextState, editCount: nextState.editCount + 1, guideSections: nextState.guideSections.filter((s) => s.id !== action.sectionId) };
    }

    /* ── Constraints (shared) ────────────────────────── */
    case 'UPDATE_CONSTRAINT': {
      const { id, field, value } = action;
      return { ...nextState, editCount: nextState.editCount + 1, designConstraints: nextState.designConstraints.map((c) => c.id === id ? { ...c, [field]: value } : c) };
    }
    case 'ADD_CONSTRAINT': {
      return { ...nextState, editCount: nextState.editCount + 1, designConstraints: [...nextState.designConstraints, { id: uid(), title: 'New rule', description: '', icon: '\u25CC' }] };
    }
    case 'DELETE_CONSTRAINT': {
      return { ...nextState, editCount: nextState.editCount + 1, designConstraints: nextState.designConstraints.filter((c) => c.id !== action.id) };
    }

    /* ── Hypotheses (shared) ─────────────────────────── */
    case 'UPDATE_HYPOTHESIS': {
      const { id, field, value } = action;
      return { ...nextState, editCount: nextState.editCount + 1, hypotheses: nextState.hypotheses.map((h) => h.id === id ? { ...h, [field]: value } : h) };
    }
    case 'ADD_HYPOTHESIS': {
      return { ...nextState, editCount: nextState.editCount + 1, hypotheses: [...nextState.hypotheses, { id: uid(), statement: 'New hypothesis', testHow: '', status: 'to-test' }] };
    }
    case 'DELETE_HYPOTHESIS': {
      return { ...nextState, editCount: nextState.editCount + 1, hypotheses: nextState.hypotheses.filter((h) => h.id !== action.id) };
    }
    case 'TOGGLE_HYPOTHESIS_STATUS': {
      return { ...nextState, editCount: nextState.editCount + 1, hypotheses: nextState.hypotheses.map((h) => h.id === action.id ? { ...h, status: nextHypothesisStatus(h.status) } : h) };
    }

    /* ── Affinity Clusters (per-participant) ──────────── */
    case 'UPDATE_NOTE': {
      const { clusterId, noteId, updates } = action;
      return {
        ...withActiveParticipant(nextState, (p) => ({
          ...p, affinityClusters: p.affinityClusters.map((c) => {
            if (c.id !== clusterId) return c;
            return { ...c, notes: c.notes.map((n) => (n.id === noteId ? { ...n, ...updates } : n)) };
          }),
        })),
        editCount: nextState.editCount + 1,
      };
    }
    case 'ADD_NOTE': {
      return {
        ...withActiveParticipant(nextState, (p) => ({
          ...p, affinityClusters: p.affinityClusters.map((c) => {
            if (c.id !== action.clusterId) return c;
            return { ...c, notes: [...c.notes, { id: uid(), text: '', tag: 'new', special: false }] };
          }),
        })),
        editCount: nextState.editCount + 1,
      };
    }
    case 'DELETE_NOTE': {
      return {
        ...withActiveParticipant(nextState, (p) => ({
          ...p, affinityClusters: p.affinityClusters.map((c) => {
            if (c.id !== action.clusterId) return c;
            return { ...c, notes: c.notes.filter((n) => n.id !== action.noteId) };
          }),
        })),
        editCount: nextState.editCount + 1,
      };
    }
    case 'MOVE_NOTE': {
      const { fromClusterId, toClusterId, noteId } = action;
      return {
        ...withActiveParticipant(nextState, (p) => {
          let movedNote = null;
          const withRemoved = p.affinityClusters.map((c) => {
            if (c.id !== fromClusterId) return c;
            movedNote = c.notes.find((n) => n.id === noteId);
            return { ...c, notes: c.notes.filter((n) => n.id !== noteId) };
          });
          if (!movedNote) return p;
          return { ...p, affinityClusters: withRemoved.map((c) => c.id !== toClusterId ? c : { ...c, notes: [...c.notes, movedNote] }) };
        }),
        editCount: nextState.editCount + 1,
      };
    }
    case 'TOGGLE_SPECIAL': {
      const { clusterId, noteId } = action;
      return {
        ...withActiveParticipant(nextState, (p) => ({
          ...p, affinityClusters: p.affinityClusters.map((c) => {
            if (c.id !== clusterId) return c;
            return { ...c, notes: c.notes.map((n) => n.id === noteId ? { ...n, special: !n.special } : n) };
          }),
        })),
        editCount: nextState.editCount + 1,
      };
    }
    case 'ADD_CLUSTER': {
      return {
        ...withActiveParticipant(nextState, (p) => ({
          ...p, affinityClusters: [...p.affinityClusters, { id: uid(), label: action.label || 'New cluster', color: '#6B6B6B', notes: [] }],
        })),
        editCount: nextState.editCount + 1,
      };
    }
    case 'DELETE_CLUSTER': {
      return {
        ...withActiveParticipant(nextState, (p) => ({
          ...p, affinityClusters: p.affinityClusters.filter((c) => c.id !== action.clusterId),
        })),
        editCount: nextState.editCount + 1,
      };
    }
    case 'UPDATE_CLUSTER_LABEL': {
      return {
        ...withActiveParticipant(nextState, (p) => ({
          ...p, affinityClusters: p.affinityClusters.map((c) => c.id === action.clusterId ? { ...c, label: action.label } : c),
        })),
        editCount: nextState.editCount + 1,
      };
    }

    /* ── Dashboard fields (per-participant) ───────────── */
    case 'UPDATE_PARTICIPANT': {
      const { index, field, value } = action;
      return {
        ...withActiveParticipant(nextState, (p) => {
          const list = [...p.participantDetails];
          list[index] = { ...list[index], [field]: value };
          return { ...p, participantDetails: list };
        }),
        editCount: nextState.editCount + 1,
      };
    }
    case 'UPDATE_BIG_PICTURE': {
      const { index, field, value } = action;
      return {
        ...withActiveParticipant(nextState, (p) => {
          const list = [...p.bigPicture];
          list[index] = { ...list[index], [field]: value };
          return { ...p, bigPicture: list };
        }),
        editCount: nextState.editCount + 1,
      };
    }
    case 'UPDATE_WANTS_FEARS': {
      const { category, lineIndex, value } = action;
      return {
        ...withActiveParticipant(nextState, (p) => {
          const updated = { ...p.wantsFears };
          updated[category] = [...updated[category]];
          updated[category][lineIndex] = value;
          return { ...p, wantsFears: updated };
        }),
        editCount: nextState.editCount + 1,
      };
    }
    case 'ADD_WANTS_FEARS_LINE': {
      return {
        ...withActiveParticipant(nextState, (p) => {
          const updated = { ...p.wantsFears };
          updated[action.category] = [...updated[action.category], ''];
          return { ...p, wantsFears: updated };
        }),
        editCount: nextState.editCount + 1,
      };
    }
    case 'DELETE_WANTS_FEARS_LINE': {
      return {
        ...withActiveParticipant(nextState, (p) => {
          const updated = { ...p.wantsFears };
          updated[action.category] = updated[action.category].filter((_, i) => i !== action.lineIndex);
          return { ...p, wantsFears: updated };
        }),
        editCount: nextState.editCount + 1,
      };
    }
    case 'UPDATE_CORE_TENSION': {
      return {
        ...withActiveParticipant(nextState, (p) => ({
          ...p, coreTension: { ...p.coreTension, [action.field]: action.value },
        })),
        editCount: nextState.editCount + 1,
      };
    }

    /* ── Undo ─────────────────────────────────────────── */
    case 'UNDO': {
      if (!state._prev) return state;
      return { ...state._prev, _prev: null, editCount: state.editCount, toastMessage: 'Undone' };
    }

    /* ── Reset / Import ──────────────────────────────── */
    case 'RESET_ALL': {
      localStorage.removeItem(STORAGE_KEY);
      return { ...buildDefaults(), toastMessage: 'Reset to defaults' };
    }
    case 'IMPORT_DATA': {
      const defaults = buildDefaults();
      let data = migrateOldFormat(action.data);
      return { ...defaults, ...data, _prev: null, editCount: 0, toastMessage: 'Data imported successfully', lastSaved: new Date().toISOString() };
    }

    /* ── Toast ────────────────────────────────────────── */
    case 'SHOW_TOAST': return { ...state, toastMessage: action.message };
    case 'HIDE_TOAST': return { ...state, toastMessage: null };

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
    return () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current); };
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

  const pid = state.activeParticipant;
  const pData = state.participants[pid];

  const undo = useCallback(() => dispatch({ type: 'UNDO' }), [dispatch]);
  const resetToDefaults = useCallback(() => dispatch({ type: 'RESET_ALL' }), [dispatch]);
  const switchParticipant = useCallback((id) => dispatch({ type: 'SWITCH_PARTICIPANT', id }), [dispatch]);

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

  const allFindings = Object.values(state.participants).flatMap((p) => p.findings);
  const allClusters = Object.values(state.participants).flatMap((p) => p.affinityClusters);

  return {
    // Active participant's data (same API as before for pages)
    findings: pData.findings,
    affinityClusters: pData.affinityClusters,
    participantDetails: pData.participantDetails,
    bigPicture: pData.bigPicture,
    coreTension: pData.coreTension,
    wantsFears: pData.wantsFears,

    // Shared/global data
    guideSections: state.guideSections,
    designConstraints: state.designConstraints,
    hypotheses: state.hypotheses,

    // Participant management
    activeParticipant: pid,
    participantMeta: PARTICIPANT_META,
    participantList: Object.keys(state.participants),
    switchParticipant,

    // Meta
    editCount: state.editCount,
    lastSaved: state.lastSaved,
    toastMessage: state.toastMessage,
    canUndo: !!state._prev,
    dispatch,

    // Per-participant stats
    stats: {
      findingsCount: pData.findings.length,
      notesCount: pData.affinityClusters.reduce((s, c) => s + c.notes.length, 0),
      constraintsCount: state.designConstraints.length,
      hypothesesCount: state.hypotheses.length,
      clustersCount: pData.affinityClusters.length,
    },

    // Global stats
    globalStats: {
      totalFindings: allFindings.length,
      totalNotes: allClusters.reduce((s, c) => s + c.notes.length, 0),
      totalParticipants: Object.keys(state.participants).length,
      constraintsCount: state.designConstraints.length,
      hypothesesCount: state.hypotheses.length,
    },

    undo,
    resetToDefaults,
    exportData,
    importData,
  };
}
