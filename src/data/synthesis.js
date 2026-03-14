const DEFAULT_SYNTHESIS = {

  /* ── Section 1: Participant Spectrum Maps ────────────── */
  spectrums: [
    {
      id: 'emotional-pragmatic',
      label: 'Emotional ↔ Pragmatic',
      leftLabel: 'Emotional',
      rightLabel: 'Pragmatic',
      positions: { p1: 40, p2: 15, p3: 85, p4: 65 },
    },
    {
      id: 'distance-negative-positive',
      label: 'Distance = Loss ↔ Distance = Freedom',
      leftLabel: 'Distance = Loss',
      rightLabel: 'Distance = Freedom',
      positions: { p1: 45, p2: 20, p3: 60, p4: 90 },
    },
    {
      id: 'guilt',
      label: 'High guilt ↔ No guilt',
      leftLabel: 'High guilt',
      rightLabel: 'No guilt',
      positions: { p1: 35, p2: 10, p3: 90, p4: 70 },
    },
    {
      id: 'transparency',
      label: 'Wants transparency ↔ Wants opacity',
      leftLabel: 'Wants transparency',
      rightLabel: 'Wants opacity',
      positions: { p1: 75, p2: 20, p3: 55, p4: 80 },
    },
    {
      id: 'effort',
      label: 'High effort ↔ Low effort communication',
      leftLabel: 'High effort',
      rightLabel: 'Low effort',
      positions: { p1: 60, p2: 35, p3: 80, p4: 90 },
    },
  ],

  /* ── Section 2: 2x2 Matrix ──────────────────────────── */
  matrix: {
    xAxisLabel: 'Emotional Transparency',
    yAxisLabel: 'Communication Effort',
    xLeftLabel: 'Low',
    xRightLabel: 'High',
    yBottomLabel: 'Low',
    yTopLabel: 'High',
    quadrantLabels: {
      topLeft: 'Silent Carriers',
      topRight: 'Open Laborers',
      bottomLeft: 'Efficient Reporters',
      bottomRight: 'Ambient Observers',
    },
    quadrantDescriptions: {
      topLeft: 'Invests energy in staying connected but hides emotional state behind neutral gestures.',
      topRight: 'Carries emotional weight openly, translates feelings for the family, invests heavily.',
      bottomLeft: 'Reports in, gets acknowledgment, moves on. No emotional overhead needed.',
      bottomRight: 'Observes, absorbs, but invests minimal active effort. Reads rather than writes.',
    },
    participantPositions: {
      p1: { x: 25, y: 55 },
      p2: { x: 75, y: 80 },
      p3: { x: 30, y: 20 },
      p4: { x: 40, y: 15 },
    },
  },

  /* ── Section 3: Universal vs. Divergent ─────────────── */
  universalInsights: [
    {
      id: 'u1',
      title: 'Sensory reading of parents',
      description: 'All 4 read parents through physical features, not words. P1: hair. P2: under-eye area. P3: overall appearance. P4: eyes.',
      participants: ['p1', 'p2', 'p3', 'p4'],
    },
    {
      id: 'u2',
      title: 'Practical excuse pattern',
      description: 'All need a "reason" to call. P1: sprouted food. P2: installation advice. P3: work updates (報備). P4: pad thai recipe.',
      participants: ['p1', 'p2', 'p3', 'p4'],
    },
    {
      id: 'u3',
      title: 'Silent awareness of parental aging',
      description: 'All notice parents aging but none bring it up. Changes are invisible until you go home — then suddenly visible.',
      participants: ['p1', 'p2', 'p3', 'p4'],
    },
    {
      id: 'u4',
      title: 'Anti-surveillance instinct',
      description: 'All resist any system that feels like monitoring — in either direction. Privacy is sacred, even across love.',
      participants: ['p1', 'p2', 'p3', 'p4'],
    },
    {
      id: 'u5',
      title: 'Calendar as minimum viable connection',
      description: 'All would benefit from a daily gesture that costs less than a text message. A rip, not a composition.',
      participants: ['p1', 'p2', 'p3', 'p4'],
    },
  ],
  divergentInsights: [
    {
      id: 'd1',
      title: 'What they want to see from the other side',
      tensionNote: 'P2 wants emotional transparency; P1 and P4 want opacity. Same object, opposite readings.',
      participants: ['p1', 'p2', 'p4'],
    },
    {
      id: 'd2',
      title: 'Guilt as a driver',
      tensionNote: 'P2\'s guilt fuels connection. P3 has zero guilt and is equally satisfied. Guilt is not required for caring.',
      participants: ['p2', 'p3'],
    },
    {
      id: 'd3',
      title: 'Distance as loss vs. freedom',
      tensionNote: 'P2 would teleport home instantly. P4 treasures the space. Both valid — design must not take sides.',
      participants: ['p2', 'p4'],
    },
    {
      id: 'd4',
      title: 'Evening longing vs. no temporal pattern',
      tensionNote: 'P2\'s critical moment is lying in bed at night. P3 and P4 have no emotionally-loaded time of day.',
      participants: ['p2', 'p3', 'p4'],
    },
    {
      id: 'd5',
      title: 'Who the "parent" really is',
      tensionNote: 'P1-P3 orient toward mom. P4\'s primary figure is grandma. The "parent" in Paired Calendar may not always be a biological parent.',
      participants: ['p1', 'p2', 'p3', 'p4'],
    },
  ],

  /* ── Section 4: Design Tensions ─────────────────────── */
  tensions: [
    {
      id: 't1',
      left: 'P1 wants to hide emotion',
      right: 'P2 wants to read it',
      leftParticipant: 'p1',
      rightParticipant: 'p2',
      resolution: 'The calendar\'s ambiguity serves both: P1 hides behind the neutral gesture, P2 reads meaning into the timing.',
    },
    {
      id: 't2',
      left: 'P3 wants efficiency',
      right: 'P2 carries emotional labor',
      leftParticipant: 'p3',
      rightParticipant: 'p2',
      resolution: 'Same daily rip, different meaning. P3 sees it as reporting; P2 sees it as presence. Both are satisfied.',
    },
    {
      id: 't3',
      left: 'P4 wants decorative / non-functional',
      right: 'P2 wants functional emotional reading',
      leftParticipant: 'p4',
      rightParticipant: 'p2',
      resolution: 'Physical calendar-as-object (P4) can carry digital trace (P2). Decor on one side, data on the other.',
    },
    {
      id: 't4',
      left: 'P1 fears surveillance from parents',
      right: 'P4 fears being watched by family',
      leftParticipant: 'p1',
      rightParticipant: 'p4',
      resolution: 'Convergence: both need "plausible deniability." The gesture must never feel like a check-in or status report.',
    },
    {
      id: 't5',
      left: 'P2 wants to remove the wall',
      right: 'P4 wants to keep the wall',
      leftParticipant: 'p2',
      rightParticipant: 'p4',
      resolution: 'The calendar doesn\'t remove or build walls — it passes a note under the door. Presence without intrusion.',
    },
  ],

  /* ── Section 5: Communication Archetype Cards ───────── */
  archetypes: {
    p1: {
      title: 'The Privacy-Seeking Minimalist',
      tagline: 'Connected but invisible.',
      style: 'Low-content, neutral signals. Cat-mediated contact. Plausible deniability.',
      keyQuote: '"When something comes up, you just press a \'thinking of you\' button."',
      calendarUse: 'Uses the rip as a flat, daily gesture — same whether ecstatic or exhausted. Hides behind consistency.',
    },
    p2: {
      title: 'The Emotional Translator',
      tagline: 'Wants to remove the wall, not add a window.',
      style: 'High emotional investment. Reads parents through physical cues. Carries guilt and longing.',
      keyQuote: '"My family\'s relationship is already like magic."',
      calendarUse: 'Reads meaning into timing. The evening trace transforms bedtime loneliness into quiet presence.',
    },
    p3: {
      title: 'The Efficient Reporter',
      tagline: 'Connection without interruption.',
      style: 'Practical 報備 system. Filters by usefulness. Controls her narrative. Achievement-triggered.',
      keyQuote: '"We\'re all still living — nothing more needed."',
      calendarUse: 'The calendar is minimum viable 報備. A 2-second gesture that says "still here" without composing a word.',
    },
    p4: {
      title: 'The Distance Enjoyer',
      tagline: 'Values the distance but reads faces to fill the silence.',
      style: 'Calls every 2-3 months with a reason. Reads through eyes. Wants decorative, ambient, zero-function.',
      keyQuote: '"I quite like this distance — I have a lot of space for my own development."',
      calendarUse: 'The calendar gives him a daily reason that requires no reason at all. Just tear. Decor, not technology.',
    },
  },

  /* ── Section 6: Theme Convergence Map ───────────────── */
  themes: [
    { id: 'th1', label: 'Sensory reading of parents', participants: { p1: true, p2: true, p3: true, p4: true } },
    { id: 'th2', label: 'Practical excuse to call', participants: { p1: true, p2: true, p3: true, p4: true } },
    { id: 'th3', label: 'Silent aging awareness', participants: { p1: true, p2: true, p3: true, p4: true } },
    { id: 'th4', label: 'Anti-surveillance instinct', participants: { p1: true, p2: true, p3: true, p4: true } },
    { id: 'th5', label: 'Guilt / emotional labor', participants: { p1: true, p2: true, p3: false, p4: false } },
    { id: 'th6', label: 'Evening longing', participants: { p1: false, p2: true, p3: false, p4: false } },
    { id: 'th7', label: 'Distance = freedom', participants: { p1: false, p2: false, p3: true, p4: true } },
    { id: 'th8', label: 'Temporal asymmetry', participants: { p1: true, p2: true, p3: false, p4: false } },
    { id: 'th9', label: 'Cat / pet mediation', participants: { p1: true, p2: false, p3: false, p4: false } },
    { id: 'th10', label: 'Brother as relay', participants: { p1: false, p2: true, p3: true, p4: false } },
    { id: 'th11', label: 'Grandma as primary figure', participants: { p1: false, p2: false, p3: false, p4: true } },
    { id: 'th12', label: 'Decorative / ambient want', participants: { p1: false, p2: false, p3: false, p4: true } },
    { id: 'th13', label: '報備 (reporting) pattern', participants: { p1: false, p2: false, p3: true, p4: false } },
    { id: 'th14', label: 'Achievement-triggered contact', participants: { p1: false, p2: false, p3: true, p4: false } },
  ],

  /* ── Section 7: Design Bridge ───────────────────────── */
  designBridge: [
    {
      id: 'db1',
      insight: 'The calendar\'s ambiguity is the core design feature, not a limitation.',
      implication: 'Same neutral gesture serves privacy-seekers (P1, P4) and emotion-readers (P2). Do not resolve this tension — design around it.',
      rules: 'Rule #1: Ambiguity, Rule #3: Neutral over expressive',
    },
    {
      id: 'db2',
      insight: 'Four communication styles converge on "less than a text message."',
      implication: 'The daily rip must cost less effort than the minimum any participant currently invests. Zero content creation.',
      rules: 'Rule #2: No content creation, Rule #11: Must not demand more',
    },
    {
      id: 'db3',
      insight: 'Sensory over informational is universal.',
      implication: 'Feedback should feel like texture, not data. The physical form factor is not decoration — it IS the interface.',
      rules: 'Rule #5: Sensory over informational',
    },
    {
      id: 'db4',
      insight: 'Guilt-free asymmetry makes the calendar livable.',
      implication: 'No streaks, no scorecard. Different rip times across time zones must feel like breathing, not like someone is late.',
      rules: 'Rule #8: Guilt-free asymmetry',
    },
    {
      id: 'db5',
      insight: 'The calendar extends what exists — it doesn\'t replace it.',
      implication: 'P2: "already like magic." P3: already has 報備. P4: already has pad thai calls. The calendar adds a layer beneath, not on top.',
      rules: 'Rule #6: Extension, not addition',
    },
  ],
};

export default DEFAULT_SYNTHESIS;
