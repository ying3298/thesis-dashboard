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
    {
      id: 'hmw_3',
      rank: 3,
      label: 'Weakest',
      statement: 'How might we design a shared daily ritual that uses the time zone gap as a processing window rather than a barrier?',
      evidence: [
        { cluster: 'P2\'s Evening Longing', support: '1/4', detail: 'Only P2 has temporally-loaded experience' },
        { cluster: 'P1\'s Time Zone Default', support: '1/4', detail: 'Mentions gap as reason for async' },
        { cluster: '"Processing Window" Concept', support: '0/4', detail: 'No participant used this framing' },
      ],
      reasoning: '"Gap as processing window" is a designer reframe, not a participant insight. Participants experience the gap as constraint (P1), pain (P2), or positive space (P4). None described it as a processing opportunity.',
      flag: {
        id: 'flag_3',
        title: 'Flag 3: Processing window is designer reframe',
        body: 'Participants describe the time zone gap as a constraint or obstacle. The reframe \u2014 that the gap can be a processing window, time to reflect and respond with care \u2014 is the designer\'s interpretive move. It is compelling design philosophy but data-thin.',
      },
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
      statement: 'If the interaction accumulates into a shared artifact over time \u2014 something both people can see growing \u2014 it will create a sense of shared journey that makes the distance feel productive rather than empty.',
      support: 'P1\'s "It was always going to change" supports accumulation. P1\'s journaling habit supports retrospective value.',
      flag: {
        id: 'flag_4',
        title: 'Flag 4: "Productive distance" is aspirational',
        body: 'No participant described distance as productive. P4 appreciates separation ("a lot of space for my own development"), but that\'s valuing independence, not finding distance productive. "Makes the distance feel productive" is a design aspiration, not participant language.',
      },
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
    {
      id: 'dp_3',
      title: 'Make the gap the material.',
      subtitle: 'The time zone difference is not a barrier to design around but a structural feature to design with.',
      confidence: 'Low\u2013Moderate',
      derivedFrom: 'The 13-hour gap as temporal asymmetry + P2\'s evening longing + asynchronous turn-taking',
      quotes: [
        { participant: 'P2', quote: '"There\'s no umbrella here that you know will always hold you." \u2014 Evening longing confirms the gap is emotionally loaded.' },
        { participant: 'P1', quote: '"Because of the time difference, I\'m not sure if they\'ll pick up." \u2014 The gap shapes all behavior.' },
        { participant: 'P2', quote: '"We\'re like on two different time axes, and Taipei\'s seems to move faster."' },
        { participant: 'P4', quote: '"I quite like this distance \u2014 I have a lot of space for my own development."' },
      ],
      flag: {
        id: 'flag_5',
        title: 'Flag 5: Most philosophically driven principle',
        body: 'Participants describe the gap as a constraint (P1), a source of pain (P2), or something they appreciate (P4). None described it as material or a processing window. The reframe is the designer\'s central intellectual contribution. It is validated by absence of contradiction, not by presence of affirmation.',
      },
    },
  ],

  /* ── How Principles Reinforce Each Other ──────────────── */
  principleSystem: {
    intro: 'They form a causal chain, not a list:',
    chain: [
      { principle: 'Make the gap the material', role: 'Establishes the temporal structure \u2014 one person wakes while the other sleeps, creating natural turn-taking.' },
      { principle: 'Connection should cost less than a decision', role: 'Sets the effort threshold \u2014 within that temporal structure, each turn must be so effortless it doesn\'t feel like a decision.' },
      { principle: 'Small gestures, seen over time', role: 'Provides the return on investment \u2014 if each effortless turn contributes to something visible, the cycle sustains itself rather than decaying.' },
    ],
    breaks: [
      { removed: 'Gap as material', consequence: 'You lose the temporal structure that enables asynchronous turn-taking.' },
      { removed: 'Cost less than a decision', consequence: 'You get the too-active failure (emotional labor).' },
      { removed: 'Seen over time', consequence: 'You get the too-passive failure (engagement decay).' },
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
        { name: 'Make the gap the material', role: 'Secondary', detail: 'Asymmetric timing uses the gap as turn-taking structure.' },
      ],
      proofQuotes: [
        { participant: 'P1', quote: '"When something comes up, you just press a \'thinking of you\' button."', proves: 'The rip IS the thinking-of-you button \u2014 zero content, pure gesture.' },
        { participant: 'P1', quote: '"It was always going to change."', proves: 'The calendar\'s daily change is inherently meaningful.' },
        { participant: 'P3', quote: '"\u597D\u554A\u6211\u5011\u90FD\u9084\u5728\u904E\u751F\u6D3B" (Good, we\'re all still living.)', proves: 'The rip confirms the baseline: we\'re both still here.' },
        { participant: 'P4', quote: '"\u88DD\u98FE\u6027\u7684\u6771\u897F... \u4E0D\u662F\u529F\u80FD\u6027\u7684" (Decorative... not functional.)', proves: 'Physical calendar as ambient object \u2014 decor, not technology.' },
        { participant: 'P1', quote: '"It\'s like I publish a quest, and my parents have to complete it."', proves: 'Turn-taking ritual already exists in P1\'s cat photo loop.' },
        { participant: 'P2', quote: '"My family\'s relationship is already like magic."', proves: 'The calendar extends what exists \u2014 invisible infrastructure.' },
      ],
      assessment: 'Strongest connection to participant data and most developed mechanism. Directly embodies Principles 1 and 2 with clear evidence. Connection to Principle 3 is logical but inherits its philosophical character. Not yet tested with a real family pair.',
    },
    {
      id: 'concept_1',
      title: 'Clock Experiments (Time Dream)',
      confidence: 'Low',
      confidenceLabel: 'CONCEPTUAL',
      description: 'Exploring how to make the dual-timezone experience visible and felt. Includes the "Time Dream" prototype (iOS lock screen, four time display modes). Most experimental, least defined.',
      principles: [
        { name: 'Make the gap the material', role: 'Primary', detail: 'Direct manifestation of Principle 3.' },
        { name: 'Connection should cost less than a decision', role: 'Secondary', detail: 'A lock screen glance costs zero effort.' },
        { name: 'Small gestures, seen over time', role: 'Weak', detail: 'No accumulation mechanism described.' },
      ],
      proofQuotes: [
        { participant: 'P2', quote: '"We\'re like on two different time axes, and Taipei\'s seems to move faster."', proves: 'The dual-timeline experience is real and emotionally loaded.' },
        { participant: 'P1', quote: '"Because of the time difference, I\'m not sure if they\'ll pick up."', proves: 'The time gap governs all connection behavior.' },
        { participant: 'P4', quote: '"I quite like this distance \u2014 I have a lot of space for my own development."', proves: 'Seeing the gap could reinforce a positive relationship with distance.' },
      ],
      assessment: 'Most experimental concept. Pure embodiment of the thesis\'s philosophical position (gap as material), which makes it intellectually interesting but empirically unproven. Lacks an accumulation mechanism, risking the too-passive failure. Needs articulation of how it sustains engagement beyond novelty.',
      flag: {
        id: 'flag_6',
        title: 'Flag 6: Double-speculative',
        body: 'This concept is built primarily on Principle 3 ("Make the gap the material"), which is itself the least data-grounded principle. A concept built on a philosophical principle is doubly speculative. No participant asked to see the time gap differently \u2014 they described experiencing it. The leap from "participants experience temporal asymmetry" to "therefore, visualize it" is a design decision, not a research finding.',
      },
    },
    {
      id: 'concept_3',
      title: 'AI Composed Dialogue',
      confidence: 'Very Low',
      confidenceLabel: 'LEAST DEFINED',
      description: 'Not yet articulated. Involves AI mediation of family communication. Needs articulation of what it is, how it connects to the principles, and what research supports it.',
      principles: [
        { name: 'Connection should cost less than a decision', role: 'Potential', detail: 'AI could reduce composition burden.' },
        { name: 'Small gestures, seen over time', role: 'Unknown', detail: 'No accumulation mechanism described.' },
        { name: 'Make the gap the material', role: 'Weak', detail: 'No clear temporal design.' },
      ],
      proofQuotes: [
        { participant: 'P2', quote: '"My mom\'s walls \u2014 I can\'t see them. That\'s what scares me."', proves: 'P2 wants emotional transparency her mom won\'t provide. Could AI surface emotional texture?' },
        { participant: 'P1', quote: '"Sad things are always specific, but happy things are sometimes blurry."', proves: 'AI could help preserve and surface happy moments that memory loses.' },
        { participant: 'P3', quote: '"\u6211\u53EF\u4EE5\u638C\u63A7\u9019\u4EF6\u4E8B\u60C5" (I can control this.)', proves: 'P3 values narrative control \u2014 AI mediation could support or threaten this.' },
      ],
      assessment: 'Least defined, least evidence-backed, and most at risk of contradicting a universal participant need (anti-surveillance, 4/4). Should be presented as early-stage hypothesis, not equally developed.',
      flag: {
        id: 'flag_7',
        title: 'Flag 7: Zero participant validation + anti-surveillance risk',
        body: 'No participant asked for AI mediation. The link is inferred from the gap between what P2 wants to know (emotional state) and what P1/P3/P4 are willing to share (minimal signal). The anti-surveillance instinct is universal (4/4). Any AI that interprets or composes on behalf of family members must contend with the fact that all four participants resist systems that feel like monitoring.',
      },
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
    { link: 'Hypothesis B (accumulation)', confidence: 'Moderate', basis: '"Productive distance" is aspirational.' },
    { link: 'Principle 1 (cost less than a decision)', confidence: 'High', basis: '4/4 universal pattern.' },
    { link: 'Principle 2 (seen over time)', confidence: 'Moderate', basis: '"Small gestures" strong; "seen over time" draws mainly from P1.' },
    { link: 'Principle 3 (gap as material)', confidence: 'Low\u2013Moderate', basis: 'Philosophically compelling, data-thin. Designer\'s central reframe.' },
    { link: 'Concept: Paired Calendar', confidence: 'Moderate\u2013High', basis: 'Strongest development. Multiple participant touchpoints. Not yet tested.' },
    { link: 'Concept: Clock Experiments', confidence: 'Low', basis: 'Built on weakest principle. No accumulation. Not tested.' },
    { link: 'Concept: AI Composed Dialogue', confidence: 'Very Low', basis: 'Speculative. Undefined. May contradict anti-surveillance instinct.' },
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
    {
      id: 'flag_3',
      title: '"Gap as processing window" is a designer reframe',
      body: 'Participants experience the gap as constraint (P1), pain (P2), or positive space (P4). None described it as a processing opportunity. This is the designer\'s interpretive move.',
    },
    {
      id: 'flag_4',
      title: '"Productive distance" is aspirational language',
      body: 'No participant described distance as productive. The hypothesis predicts an outcome not yet observed.',
    },
    {
      id: 'flag_5',
      title: 'Principle 3 is the most philosophically driven',
      body: 'It is the designer\'s central intellectual contribution and what makes the thesis distinctive, but it is validated by absence of contradiction rather than presence of affirmation.',
    },
    {
      id: 'flag_6',
      title: 'Concept 1 (Clock Experiments) is double-speculative',
      body: 'Built primarily on the weakest principle and lacks an accumulation mechanism, risking the very engagement-decay failure the problem statement identifies.',
    },
    {
      id: 'flag_7',
      title: 'Concept 3 (AI Composed Dialogue) has zero participant validation',
      body: 'May contradict the universal anti-surveillance instinct (4/4). Should be presented as early-stage hypothesis.',
    },
  ],
};

export default DEFAULT_RESEARCH_CHAIN;
