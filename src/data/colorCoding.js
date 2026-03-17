/**
 * Color-coding qualitative analysis data.
 * Neutral descriptive codes applied across 5 participant interview transcripts.
 */

const THEME_CODES = [
  {
    id: 'COMM_PATTERNS',
    label: 'Communication Patterns',
    number: 1,
    color: '#4A6741',
    bg: '#C8E6C4',
    description:
      'How they stay in touch — messaging habits, call frequency, routines, recurring behaviors, platforms used.',
  },
  {
    id: 'EMOTIONAL_EXPRESSION',
    label: 'Emotional Expression',
    number: 2,
    color: '#C46B4D',
    bg: '#F0C8BB',
    description:
      'What gets expressed and what doesn\'t — feelings shared or withheld, emotional language, moments of vulnerability or guardedness.',
  },
  {
    id: 'DISTANCE_SPACE',
    label: 'Distance & Space',
    number: 3,
    color: '#5C7A8B',
    bg: '#C4D8E2',
    description:
      'How they describe the physical separation — feelings about being far, the role distance plays, what changes or stays the same.',
  },
  {
    id: 'PHYSICAL_SENSORY',
    label: 'Physical & Sensory',
    number: 4,
    color: '#B8A04A',
    bg: '#EDE4B0',
    description:
      'Body, appearance, senses — how family members look, smell, physical features noticed, sensory associations.',
  },
  {
    id: 'TOPICS_TRIGGERS',
    label: 'Topics & Triggers',
    number: 5,
    color: '#D4874D',
    bg: '#F5D4B5',
    description:
      'What they talk about and what prompts contact — specific subjects, reasons for reaching out, shared interests.',
  },
  {
    id: 'PRIVACY_CONTROL',
    label: 'Privacy & Control',
    number: 6,
    color: '#7A6B8A',
    bg: '#D4CCE0',
    description:
      'Boundaries around sharing — what they choose not to share, filtering decisions, comfort with being known or observed.',
  },
  {
    id: 'FAMILY_DYNAMICS',
    label: 'Family Dynamics',
    number: 7,
    color: '#4A8B8B',
    bg: '#BBD9D9',
    description:
      'Roles and relationships within the family — parent-child dynamics, sibling roles, how family members relate to each other.',
  },
  {
    id: 'TIME_CHANGE',
    label: 'Time & Change',
    number: 8,
    color: '#8B6F5C',
    bg: '#DDD0C4',
    description:
      'Awareness of time passing — aging, life stages, things that changed, temporal experience across distance.',
  },
];

// Raw counts from automated color-coding pass
const CODING_DATA = {
  p1: {
    label: 'P1',
    desc: 'Graphic Designer, London',
    totalLines: 456,
    codedLines: 97,
    counts: {
      COMM_PATTERNS: 21,
      EMOTIONAL_EXPRESSION: 10,
      DISTANCE_SPACE: 4,
      PHYSICAL_SENSORY: 14,
      TOPICS_TRIGGERS: 19,
      PRIVACY_CONTROL: 1,
      FAMILY_DYNAMICS: 2,
      TIME_CHANGE: 26,
    },
    topQuotes: {
      COMM_PATTERNS:
        '「就像我發一個任務，我爸媽要去完成」',
      EMOTIONAL_EXPRESSION:
        '「我希望它一直持平。我不想讓他們知道我多開心或多難過」',
      TIME_CHANGE:
        '「日曆本身就是一種改變」',
      TOPICS_TRIGGERS:
        '「那個東西發芽了可以吃嗎？」',
      PHYSICAL_SENSORY: '「頭髮透露了一個人的生活狀態」',
    },
  },
  p2: {
    label: 'P2',
    desc: '徐翎, Netherlands',
    totalLines: 220,
    codedLines: 33,
    counts: {
      COMM_PATTERNS: 6,
      EMOTIONAL_EXPRESSION: 12,
      DISTANCE_SPACE: 0,
      PHYSICAL_SENSORY: 1,
      TOPICS_TRIGGERS: 2,
      PRIVACY_CONTROL: 0,
      FAMILY_DYNAMICS: 3,
      TIME_CHANGE: 9,
    },
    topQuotes: {
      EMOTIONAL_EXPRESSION:
        '「沒有一把傘，你知道永遠都會幫你撐著的」',
      TIME_CHANGE:
        '「我們像是在兩個不同的時間軸，台北的好像比較快」',
      FAMILY_DYNAMICS:
        '「潤滑劑跟垃圾桶…朋友的東西不會留在我身上，家人的我會帶在身體裡面」',
    },
  },
  p3: {
    label: 'P3',
    desc: '阿花/Cactus, Parsons',
    totalLines: 558,
    codedLines: 85,
    counts: {
      COMM_PATTERNS: 31,
      EMOTIONAL_EXPRESSION: 3,
      DISTANCE_SPACE: 3,
      PHYSICAL_SENSORY: 6,
      TOPICS_TRIGGERS: 20,
      PRIVACY_CONTROL: 5,
      FAMILY_DYNAMICS: 10,
      TIME_CHANGE: 7,
    },
    topQuotes: {
      COMM_PATTERNS:
        '「所有的核心邏輯都是一個報備」',
      PRIVACY_CONTROL:
        '「我跟你講了，你完全沒有辦法做到任何幫助的事情」',
      TOPICS_TRIGGERS:
        '「很表層的東西去切到你這邊在幹嘛」',
      TIME_CHANGE: '「好啊我們都還在過生活」',
    },
  },
  p4: {
    label: 'P4',
    desc: 'Follow-up Session',
    totalLines: 118,
    codedLines: 24,
    counts: {
      COMM_PATTERNS: 6,
      EMOTIONAL_EXPRESSION: 1,
      DISTANCE_SPACE: 1,
      PHYSICAL_SENSORY: 0,
      TOPICS_TRIGGERS: 0,
      PRIVACY_CONTROL: 0,
      FAMILY_DYNAMICS: 0,
      TIME_CHANGE: 16,
    },
    topQuotes: {
      TIME_CHANGE:
        '「也沒有以後了」',
      COMM_PATTERNS:
        '「the whole point其實是待在一起而不是一起做什麼」',
      DISTANCE_SPACE:
        '「更放心的去做我想做的事情，因為他不會變老」',
    },
  },
  p5: {
    label: 'P5',
    desc: 'India, MFA NYC',
    totalLines: 742,
    codedLines: 73,
    counts: {
      COMM_PATTERNS: 22,
      EMOTIONAL_EXPRESSION: 6,
      DISTANCE_SPACE: 11,
      PHYSICAL_SENSORY: 10,
      TOPICS_TRIGGERS: 10,
      PRIVACY_CONTROL: 1,
      FAMILY_DYNAMICS: 5,
      TIME_CHANGE: 8,
    },
    topQuotes: {
      DISTANCE_SPACE:
        '"I\'m at a healthy middle — not overly dependent, not detached"',
      COMM_PATTERNS:
        '"She sends me good morning every day, reels, images, stickers"',
      TIME_CHANGE:
        '"Two different worlds… you try it, it is the same thing but so different"',
      TOPICS_TRIGGERS:
        '"The cat is the easiest thing to talk about with mom"',
      PHYSICAL_SENSORY:
        '"This fragrance, that fragrance — sensory things bring them back"',
    },
  },
};

export { THEME_CODES, CODING_DATA };
