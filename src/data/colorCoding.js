/**
 * Color-coding qualitative analysis data.
 * 6 neutral signal-level codes applied across 5 participant interview transcripts.
 */

const THEME_CODES = [
  {
    id: 'COMMON_THEME',
    label: 'Common theme',
    number: 1,
    color: '#50C878',
    bg: '#C1F0D0',
    description: 'Patterns that appear across multiple participants.',
  },
  {
    id: 'ATTENTION',
    label: 'Attention catching',
    number: 2,
    color: '#E8943A',
    bg: '#FAD9B0',
    description: 'Vivid moments, unique phrasing, notable examples.',
  },
  {
    id: 'INSIGHT',
    label: 'Huge insight',
    number: 3,
    color: '#CC66CC',
    bg: '#F0C0F0',
    description: 'The WHY — motivations, reasoning, underlying causes behind behaviors.',
  },
  {
    id: 'TOOLS',
    label: 'Tools / function',
    number: 4,
    color: '#C8B820',
    bg: '#F5F0B0',
    description: 'Specific tools, platforms, communication methods mentioned.',
  },
  {
    id: 'EMOTION',
    label: 'Emotion / feeling',
    number: 5,
    color: '#5CACEE',
    bg: '#C0E0F8',
    description: 'Emotional language, feelings expressed or described.',
  },
  {
    id: 'ISSUE',
    label: 'Issue',
    number: 6,
    color: '#E06060',
    bg: '#F8C0C0',
    description: 'Problems, pain points, difficulties, tensions.',
  },
];

const CODING_DATA = {
  p1: {
    label: 'P1',
    desc: 'Graphic Designer, London',
    totalLines: 456,
    codedLines: 114,
    counts: {
      COMMON_THEME: 12,
      ATTENTION: 14,
      INSIGHT: 4,
      TOOLS: 17,
      EMOTION: 55,
      ISSUE: 12,
    },
  },
  p2: {
    label: 'P2',
    desc: '徐翎, Netherlands',
    totalLines: 220,
    codedLines: 63,
    counts: {
      COMMON_THEME: 2,
      ATTENTION: 5,
      INSIGHT: 3,
      TOOLS: 14,
      EMOTION: 27,
      ISSUE: 12,
    },
  },
  p3: {
    label: 'P3',
    desc: '阿花/Cactus, Parsons',
    totalLines: 558,
    codedLines: 81,
    counts: {
      COMMON_THEME: 2,
      ATTENTION: 18,
      INSIGHT: 6,
      TOOLS: 23,
      EMOTION: 25,
      ISSUE: 7,
    },
  },
  p4: {
    label: 'P4',
    desc: 'Follow-up Session',
    totalLines: 118,
    codedLines: 16,
    counts: {
      COMMON_THEME: 2,
      ATTENTION: 0,
      INSIGHT: 2,
      TOOLS: 0,
      EMOTION: 9,
      ISSUE: 3,
    },
  },
  p5: {
    label: 'P5',
    desc: 'India, MFA NYC',
    totalLines: 742,
    codedLines: 68,
    counts: {
      COMMON_THEME: 14,
      ATTENTION: 2,
      INSIGHT: 4,
      TOOLS: 12,
      EMOTION: 23,
      ISSUE: 13,
    },
  },
};

export { THEME_CODES, CODING_DATA };
