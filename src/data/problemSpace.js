const DEFAULT_PROBLEM_SPACE = {
  statement: {
    title: 'Designing for distance as a condition, not a constraint',
    body: `Existing communication tools treat distance as a problem to eliminate. Faster messages, instant video, real-time sync \u2014 every tool tries to collapse the gap between families separated by time zones. But for people living 6\u201313 hours apart, real-time is a tiny window. Most of the day, one person is awake while the other sleeps.

The research reveals that the problem is not technological. All four participants have abundant access to communication tools. Yet all four describe a gap between what these tools assume they want (more connection, faster, richer) and what they actually need (presence, at their own pace, on their own terms). The tools\u2019 urgency creates emotional labor, surveillance anxiety, and guilt instead of closeness.

The 13-hour difference is not dead air. It is a processing window \u2014 time to reflect, time to notice, time to respond with care rather than speed. Distance is a permanent condition of these families\u2019 lives, and it deserves to be designed with, not against.`,
  },

  scenarios: [
    {
      id: 'sc_1',
      title: 'I want to reach out but I don\u2019t have a reason',
      description: 'He hasn\u2019t called in months. He feels fine about it, but he also misses his grandma. There\u2019s no gesture between \u201Ca full phone call\u201D and \u201Cnothing.\u201D',
      participant: 'P4',
    },
    {
      id: 'sc_2',
      title: 'I\u2019m lying in bed and thinking about them',
      description: 'She\u2019s in Eindhoven at night, knowing her mom is waking up in Taipei. She wants to feel her mom\u2019s presence without starting a conversation.',
      participant: 'P2',
    },
    {
      id: 'sc_3',
      title: 'I need to report in but I have nothing to say',
      description: 'On a busy week, even a text feels like too much. She wants a 2-second gesture that means \u201Cstill alive, still here.\u201D',
      participant: 'P3',
    },
    {
      id: 'sc_4',
      title: 'I came home and they aged',
      description: 'She returns to Taiwan and is shocked by how her parents look. She had no way to see the slow daily changes. She wants sensory evidence, not information.',
      participant: 'P1',
    },
    {
      id: 'sc_5',
      title: 'My mom hides her emotions and I can\u2019t read her',
      description: 'She knows her mom is struggling but LINE messages don\u2019t carry emotional texture. She wants signal without interrogation.',
      participant: 'P2',
    },
    {
      id: 'sc_6',
      title: 'If they can see when I\u2019m sad, they\u2019ll worry',
      description: 'She curates what she shares. Any emotional transparency becomes surveillance. She needs plausible deniability \u2014 connection without exposure.',
      participant: 'P1',
    },
  ],

  userGoals: [
    {
      id: 'goal_1',
      title: 'Know they\u2019re okay without asking',
      description: 'Ambient awareness. Not \u201Cwhat are you doing\u201D but \u201Cyou exist, I exist, we\u2019re still connected.\u201D All four participants described this need.',
    },
    {
      id: 'goal_2',
      title: 'Express care without composing',
      description: 'A gesture that says \u201CI\u2019m thinking of you\u201D without the overhead of deciding what to write, when to send, whether it\u2019s the right time.',
    },
    {
      id: 'goal_3',
      title: 'Let closeness build at its own pace',
      description: 'Not performing connection on demand, but allowing a bond to accumulate through consistency over time. Some people need years before they can say what they feel.',
    },
  ],

  inScope: [
    { id: 'in_1', text: 'Families separated by 6+ hour time zones' },
    { id: 'in_2', text: 'Asynchronous, ambient, low-effort connection' },
    { id: 'in_3', text: 'Physical and digital concepts that work with distance' },
    { id: 'in_4', text: 'Designing for emotional safety and autonomy' },
    { id: 'in_5', text: 'Supporting different attachment styles (P1\u2019s invisibility vs P2\u2019s emotional access)' },
  ],

  outOfScope: [
    { id: 'out_1', text: 'Real-time communication tools (video call, instant messaging)' },
    { id: 'out_2', text: 'General long-distance relationships (romantic, friendships)' },
    { id: 'out_3', text: 'Families in the same time zone' },
    { id: 'out_4', text: 'Clinical mental health interventions' },
    { id: 'out_5', text: 'Content creation or social media features' },
    { id: 'out_6', text: 'Solving homesickness or loneliness directly' },
  ],
};

export default DEFAULT_PROBLEM_SPACE;
