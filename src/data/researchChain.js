const DEFAULT_RESEARCH_CHAIN = {

  /* ── HMW Options (ranked by evidence strength) ────────── */
  hmwOptions: [
    {
      id: 'hmw_1',
      rank: 1,
      label: 'Strongest',
      statement: 'How might we create a form of connection where input feels low-effort but accumulates into something both people value over time?',
      evidence: [
        { cluster: 'Cluster A: The Effort Barrier', support: '4/4', detail: '"Low-effort" is demanded by all four communication styles' },
        { cluster: 'Cluster D: Low-Content Connection', support: '4/4', detail: 'Content isn\'t needed; presence is' },
        { cluster: 'Cluster E: Retrospective Value', support: '2/4 direct', detail: 'P1 & P2 direct, P3 & P4 inferred' },
        { cluster: 'Two-Failure Framing', support: 'Both', detail: 'Low-effort solves too-active; accumulation solves too-passive' },
      ],
      reasoning: 'The only HMW that addresses both sides of the two-failure framing in a single statement. Every participant contributed evidence to at least one half.',
    },
    {
      id: 'hmw_2',
      rank: 2,
      label: 'Moderate',
      statement: 'How might we rebuild ambient presence for families separated by time zones \u2014 without creating new emotional labor?',
      evidence: [
        { cluster: 'Cluster B: Emotional Cost', support: '4/4', detail: 'All four manage what the other side sees' },
        { cluster: 'Cluster A: Effort Barrier', support: '4/4', detail: 'All describe the effort threshold' },
        { cluster: 'Too-Active Failure', support: 'Strong', detail: 'Directly addresses emotional labor' },
        { cluster: 'Too-Passive Failure', support: 'Weak', detail: '"Ambient presence" risks friendship-lamp territory' },
      ],
      reasoning: 'Addresses one failure well (too-active) but is vague about the other (too-passive). The word "accumulates" is what separates HMW 1 from this one.',
    },
  ],

  /* ── Opportunity Statement ────────────────────────────── */
  opportunity: 'Families separated by time zones need a way to maintain connection that costs less than a message but builds more than a status light. The opportunity: design a shared object that turns tiny, repeatable gestures into visible proof that both people are still showing up \u2014 without requiring either person to decide what to say, when to say it, or how much to reveal.',

  /* ── Hypotheses ───────────────────────────────────────── */
  chainHypotheses: [
    {
      id: 'hyp_a',
      label: 'A',
      confidence: 'Strong',
      statement: 'If we provide a low-effort, ambient, daily ritual that doesn\'t require synchronous availability, it will reduce the emotional labor of staying connected and rebuild peripheral presence.',
      support: 'All 4 participants describe the effort barrier. All 4 describe wanting connection without composition. The practical excuse pattern (4/4) confirms lowering the effort barrier is the critical variable.',
    },
    {
      id: 'hyp_b',
      label: 'B',
      confidence: 'Moderate',
      statement: 'If the interaction accumulates into a shared artifact over time \u2014 something both people can see growing \u2014 it will sustain engagement where pure ambient signals decay.',
      support: 'P1\'s "It was always going to change" supports accumulation as inherently meaningful. P1\'s journaling habit supports retrospective value. P2\'s temporal longing confirms the desire to hold onto shared moments. Direct evidence from 2/4; inferred from P3 and P4.',
    },
  ],

  /* ── Design Principles ───────────────────────────────── */
  designPrinciples: [
    {
      id: 'dp_1',
      title: 'Connection should cost less than a decision.',
      subtitle: 'If the system provides the reason, the emotional labor drops below the threshold of avoidance.',
      confidence: 'High',
      derivedFrom: 'Cluster A: The Effort Barrier \u2014 4/4 participants',
      quotes: [
        { participant: 'P1', quote: '"When something comes up, you just press a \'thinking of you\' button."' },
        { participant: 'P4', quote: '"Thinking of her doesn\'t really trigger me to do anything."' },
        { participant: 'P3', quote: '"\u9054\u6210\u4E86\u9019\u6A23" (Mission accomplished) \u2014 a sticker closes the loop.' },
        { participant: 'P2', quote: 'Last call to dad was to ask about a physical structure for school \u2014 practical excuse as permission slip.' },
      ],
    },
    {
      id: 'dp_2',
      title: 'Small gestures, seen over time.',
      subtitle: 'Each small input should feel worthwhile because it contributes to something both people can see growing.',
      confidence: 'Moderate',
      derivedFrom: 'Two-failure framing (ambient tools fail because no feedback) + Cluster E (retrospective value)',
      quotes: [
        { participant: 'P1', quote: '"It was always going to change." \u2014 The calendar is already different each day.' },
        { participant: 'P1', quote: '"Happy things are sometimes blurry." \u2014 Retrospective artifacts preserve what memory loses.' },
        { participant: 'P2', quote: '"My family\'s relationship is already like magic." \u2014 Don\'t add, extend.' },
        { participant: 'P3', quote: '"\u597D\u554A\u6211\u5011\u90FD\u9084\u5728\u904E\u751F\u6D3B" (Good, we\'re all still living our lives.) \u2014 The baseline signal.' },
      ],
      flag: {
        id: 'flag_2',
        title: 'Flag 2: Retrospective accumulation is 2/4 direct',
        body: 'Direct evidence for wanting to "look back" comes from P1 (journaling, calendar insight) and P2 (temporal longing). P3 and P4 did not articulate retrospective value. Extending it to a design principle is a design judgment, not a research finding.',
      },
    },
  ],

  /* ── How Principles Reinforce Each Other ──────────────── */
  principleSystem: {
    intro: 'They form a complementary pair \u2014 one sets the threshold, the other sustains the cycle:',
    chain: [
      { principle: 'Connection should cost less than a decision', role: 'Sets the effort threshold \u2014 each interaction must be so effortless it doesn\'t feel like a decision.' },
      { principle: 'Small gestures, seen over time', role: 'Provides the return on investment \u2014 if each effortless turn contributes to something visible, the cycle sustains itself rather than decaying.' },
    ],
    breaks: [
      { removed: 'Cost less than a decision', consequence: 'You get the too-active failure (emotional labor overwhelms intent).' },
      { removed: 'Seen over time', consequence: 'You get the too-passive failure (engagement decays without visible return).' },
    ],
  },

  /* ── Concept Cards ────────────────────────────────────── */
  conceptCards: [
    {
      id: 'concept_2',
      title: 'Paired Calendar',
      confidence: 'Moderate\u2013High',
      confidenceLabel: 'STRONGEST',
      description: 'A shared physical tear-off calendar where family members contribute when the other is asleep. The 13-hour gap becomes a built-in turn-taking rhythm. Daily rip ritual as ambient presence signal. Physical calendars connected via WiFi. 30 days of rips accumulate into a shared artifact.',
      principles: [
        { name: 'Connection should cost less than a decision', role: 'Primary', detail: 'The rip is a 2-second gesture. No content creation, no composition.' },
        { name: 'Small gestures, seen over time', role: 'Primary', detail: '30 days of torn pages tell a story one rip never could.' },
      ],
      proofQuotes: [
        { participant: 'P1', quote: '"When something comes up, you just press a \'thinking of you\' button."', proves: 'The rip IS the thinking-of-you button \u2014 zero content, pure gesture.' },
        { participant: 'P1', quote: '"It was always going to change."', proves: 'The calendar\'s daily change is inherently meaningful.' },
        { participant: 'P3', quote: '"\u597D\u554A\u6211\u5011\u90FD\u9084\u5728\u904E\u751F\u6D3B" (Good, we\'re all still living.)', proves: 'The rip confirms the baseline: we\'re both still here.' },
        { participant: 'P4', quote: '"\u88DD\u98FE\u6027\u7684\u6771\u897F... \u4E0D\u662F\u529F\u80FD\u6027\u7684" (Decorative... not functional.)', proves: 'Physical calendar as ambient object \u2014 decor, not technology.' },
        { participant: 'P1', quote: '"It\'s like I publish a quest, and my parents have to complete it."', proves: 'Turn-taking ritual already exists in P1\'s cat photo loop.' },
        { participant: 'P2', quote: '"My family\'s relationship is already like magic."', proves: 'The calendar extends what exists \u2014 invisible infrastructure.' },
      ],
      assessment: 'Strongest connection to participant data and most developed mechanism. Directly embodies both data-grounded principles with clear evidence. Not yet tested with a real family pair.',
    },
  ],

  /* ── Evidence Confidence Summary ──────────────────────── */
  confidenceTable: [
    { link: 'Problem statement (two-failure framing)', confidence: 'High', basis: '"Too active" failure: 4/4 confirmed. "Too passive" failure: designer-diagnosed, 1/4 direct.' },
    { link: 'Cluster A (Effort Barrier)', confidence: 'High', basis: '4/4 independent confirmation. Bedrock finding.' },
    { link: 'Cluster B (Emotional Cost)', confidence: 'High', basis: '4/4, with genuine unresolved tension (opacity vs. transparency).' },
    { link: 'Cluster C (Invisible Change)', confidence: 'High', basis: '4/4. Universal sensory reading of parents.' },
    { link: 'Cluster D (Low-Content Connection)', confidence: 'High', basis: '4/4. All want gesture over composition.' },
    { link: 'Cluster E (Retrospective Value)', confidence: 'Moderate', basis: '2/4 direct (P1, P2). Inferred for P3, P4.' },
    { link: 'Chosen HMW', confidence: 'High', basis: 'Addresses both failures. 4/4 on effort; 2/4 on accumulation.' },
    { link: 'Hypothesis A (low-effort ritual)', confidence: 'High', basis: 'Grounded in 4/4 data.' },
    { link: 'Hypothesis B (accumulation)', confidence: 'Moderate', basis: '2/4 direct evidence. P1 strongest, P2 supporting.' },
    { link: 'Principle 1 (cost less than a decision)', confidence: 'High', basis: '4/4 universal pattern.' },
    { link: 'Principle 2 (seen over time)', confidence: 'Moderate', basis: '"Small gestures" strong; "seen over time" draws mainly from P1.' },
    { link: 'Concept: Paired Calendar', confidence: 'Moderate\u2013High', basis: 'Strongest development. Multiple participant touchpoints. Not yet tested.' },
  ],

  /* ── Honesty Flags ────────────────────────────────────── */
  flags: [
    {
      id: 'flag_1',
      title: 'The "too passive" half of the two-failure framing',
      body: 'The claim that ambient-only tools fail to sustain engagement is the weaker half. Participants confirmed emotional labor extensively (4/4). But they don\'t really use ambient tools, so they can\'t report on their failure. P4\'s prediction about disengaging from a shared lock screen is the closest direct evidence. The "too passive" critique draws more from the designer\'s analysis of existing products than from participant testimony.',
    },
    {
      id: 'flag_2',
      title: 'Retrospective accumulation is 2/4 direct',
      body: 'Direct evidence for wanting to "look back" comes from P1 (journaling, calendar insight) and P2 (temporal longing). P3 and P4 did not articulate retrospective value. Extending it to a universal design requirement is a design judgment, not a research finding.',
    },
  ],

  /* ── Deferred to Ideation ─────────────────────────────── */
  deferredToIdeation: [
    {
      id: 'defer_1',
      item: 'HMW #3: "Gap as processing window"',
      reason: 'Designer reframe, not participant language. No participant described the time zone gap as a processing opportunity. Belongs in Design Space as a design hypothesis to explore.',
    },
    {
      id: 'defer_2',
      item: 'Principle 3: "Make the gap the material"',
      reason: 'The designer\'s central intellectual contribution. Philosophically compelling but data-thin. Validated by absence of contradiction, not by presence of affirmation. Move to ideation where it can be explored as a design philosophy.',
    },
    {
      id: 'defer_3',
      item: 'Concept: Clock Experiments (Time Dream)',
      reason: 'Built primarily on Principle 3, which is itself the least data-grounded principle. Double-speculative. No participant asked to see the time gap differently. Needs ideation-stage exploration.',
    },
    {
      id: 'defer_4',
      item: 'Concept: AI Composed Dialogue',
      reason: 'Zero participant validation. May contradict the universal anti-surveillance instinct (4/4). Should be developed as an early-stage hypothesis in Design Space, not presented as a research-backed concept.',
    },
    {
      id: 'defer_5',
      item: '"Productive distance" framing',
      reason: 'No participant described distance as productive. P4 appreciates separation, but that\'s valuing independence, not finding distance productive. Aspirational language removed from Hypothesis B; the accumulation insight stands on its own data.',
    },
  ],
};

export default DEFAULT_RESEARCH_CHAIN;
