const DEFAULT_NARRATIVE = {
  /* ── Section 1: Project Description (Exhibition Book) ── */
  projectDescription: {
    versions: [
      {
        id: 'desc_v1',
        label: 'Exhibition Book Draft v1',
        date: '2026-03-14',
        status: 'draft',
        isCurrent: true,
        text: `When I moved from Taipei to New York, I gained 13 hours of distance from my mother. Not miles\u2014hours. Her morning is my night. Every communication tool we have tries to collapse this gap: faster messages, instant video, real-time sync. But for families split across time zones, real-time is a tiny window. Most of the day, one person is awake while the other sleeps.

There is another gap, too. Through interviews with people living far from their parents, I learned that closeness between parent and child is not a given. It is not something you are born into and keep forever. It is built through small, repeated gestures over time. And for many people, expressing love\u2014or even expressing need\u2014takes courage. That courage does not arrive on demand. It forms slowly, through consistency and trust. Some people need years before they can say what they feel.

Take Your Time is an ecosystem of three connected concepts for families separated by time zones. Drawing on temporal design and the distinction between Chronos (clock time) and Kairos (felt, meaningful time), each concept celebrates the gap, leverages the delay, or works with the reality that distance creates. The 13-hour difference is not dead air. It is a processing window\u2014time to reflect, time to notice, time to respond with care rather than speed.

This project embraces slowness and space. It does not ask people to perform closeness they do not yet feel. It says: take your time. Building this bond is allowed to be slow. The distance is allowed to be part of the story. And the courage to reach across it\u2014that is something worth designing for.`,
      },
    ],
  },

  /* ── Section 2: Narrative Spine (Pixar Framework) ── */
  narrativeSpine: {
    versions: [
      {
        id: 'spine_v1',
        label: 'Iteration 1',
        date: '2026-03-14',
        isCurrent: true,
        beats: {
          onceUponATime: 'The people who go abroad for study or career have to live apart with their parents and people instantly think that is the constraint of limitation connection.',
          everyDay: 'People seeking way to break this gap, instant message this gap, and that seems forming the default for how people thinking about this and tackling this.',
          untilOneDay: 'I realize from the stories I learned from different families, I find that the gap and distance can be celebrated, and can be something worth designing for.',
          becauseOfThat: 'I designed an ecosystem of three connected concepts that celebrate the gap, leverage the delay, and work with the reality that distance creates.',
          untilFinally: 'Users can gain meaningful connection because of the distance and gap\u2014not despite it.',
          andEverSinceThen: 'They can see asynchronous as one way to create unique memories and experiences with their family\u2014living together across time zones.',
        },
      },
    ],
  },

  /* ── Section 3: Case Study (1,000\u20131,500 words) ── */
  caseStudy: {
    versions: [],
  },

  /* ── Section 4: Presentation ── */
  presentation: {
    outline: '',
    versions: [],
  },

  /* ── Section 5: Channel Adaptations ── */
  channelAdaptations: [],

  /* ── Section 6: Bio ── */
  bio: {
    versions: [],
  },

  /* ── Syllabus Milestones ── */
  milestones: [
    {
      id: 'w1',
      week: 1,
      date: 'Feb 26',
      title: 'Narrative Workshop',
      status: 'completed',
      deliverables: 'Introductions & status update',
      notes: '',
    },
    {
      id: 'w2',
      week: 2,
      date: 'Mar 12',
      title: 'Gather, Collate, Generate',
      status: 'completed',
      deliverables: 'First draft project description (200 words), case study outline (10\u201320 references), sample case studies',
      notes: '',
    },
    {
      id: 'w3',
      week: 3,
      date: 'Mar 19',
      title: 'Refinement Round I',
      status: 'in-progress',
      deliverables: 'Second draft project description, 5 iterations of narrative spine',
      notes: '',
    },
    {
      id: 'w4',
      week: 4,
      date: 'Mar 26',
      title: 'Re-Generate',
      status: 'upcoming',
      deliverables: 'First draft case study, final project description, supporting images, bio',
      notes: '',
    },
    {
      id: 'w5',
      week: 5,
      date: 'Apr 2',
      title: 'Refinement Round II',
      status: 'upcoming',
      deliverables: 'Presentation outline, first drafts of 3\u20135 channel adaptations, professional bio',
      notes: '',
    },
    {
      id: 'w6',
      week: 6,
      date: 'Apr 9',
      title: 'Presentations',
      status: 'upcoming',
      deliverables: 'First full presentation draft, final channel adaptations, final professional bio',
      notes: '',
    },
    {
      id: 'w7',
      week: 7,
      date: 'Apr 16',
      title: 'Final & Celebration',
      status: 'upcoming',
      deliverables: 'Final run-throughs, final case study, all outstanding assignments. Self-assessments due Apr 20.',
      notes: '',
    },
  ],
};

export default DEFAULT_NARRATIVE;
