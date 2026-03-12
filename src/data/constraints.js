export const DESIGN_CONSTRAINTS = [
  {
    id: 1,
    title: "Ambiguity serves two opposite needs",
    description:
      "For P1, a late rip means 'could be anything' — she wants plausible deniability. For P2, a late rip means 'I wonder if she's okay' — she wants to read emotion. Same signal, different readings. This dual-reading is a feature, not a flaw.",
    icon: "◌",
  },
  {
    id: 2,
    title: "No content creation",
    description:
      "P1's best communication is zero-content — 'let me see Ding Ding.' P2 uses practical questions as excuses. Calendar should require even less. Just turning a page. No typing, no choosing, no composing.",
    icon: "○",
  },
  {
    id: 3,
    title: "Neutral over expressive",
    description:
      "P1 wants 'flat' signals — same gesture whether ecstatic or exhausted. The sameness IS the privacy layer. P2 might read emotion into timing anyway, which is fine — ambiguity lets each person take what they need.",
    icon: "—",
  },
  {
    id: 4,
    title: "Retrospective accumulation",
    description:
      "Neither participant wants real-time emotional feedback. But both value looking back. Calendar's accumulation is most meaningful in retrospect — 30 days of rips tells a story that one rip never could.",
    icon: "◐",
  },
  {
    id: 5,
    title: "Sensory over informational",
    description:
      "P1 reads mom through hair, dad through eyes. P2 reads mom through under-eye area, dad through mouth. Both bypass verbal communication and go straight to sensory reading. Feedback should aim for texture, not notifications.",
    icon: "◎",
  },
  {
    id: 6,
    title: "Extension, not addition",
    description:
      "P2: 'My family's relationship is already like magic.' The calendar should feel like an extension of what already exists — invisible infrastructure, not a visible product. Like removing a wall, not adding a window.",
    icon: "▣",
  },
  {
    id: 7,
    title: "No added emotional labor",
    description:
      "P2 already carries the family's emotional weight — 'lubricant' and 'trash can.' The daily interaction must cost almost nothing emotionally. The calendar must not turn anyone into a remote emotional monitoring station.",
    icon: "◇",
  },
  {
    id: 8,
    title: "Guilt-free asymmetry",
    description:
      "Mom ripping at 6 AM and daughter ripping at 9 AM should feel like breathing, not like the daughter is late. No scorecard. No streak count. The timing difference IS the lived reality of two time zones.",
    icon: "◔",
  },
  {
    id: 9,
    title: "The calendar may need to be asymmetric",
    description:
      "P1 wants flat signals both ways. P2 wants emotional texture FROM parents, effort/progress signals TO parents. Different needs, same object. Each side may send a different type of trace through the same gesture.",
    icon: "⟷",
  },
  {
    id: 10,
    title: "Evening is the critical moment",
    description:
      "P2's strongest longing happens at night, lying in bed alone. If the calendar carries a trace of the other person's day, that trace is most valuable at the end of the day — transforming absence into quiet presence.",
    icon: "◑",
  },
  {
    id: 11,
    title: "The calendar must not demand more than what they already give",
    description:
      "P3 texts every 1-2 days and is satisfied. The calendar's daily rip must feel EASIER than a text, not harder. If it feels like one more obligation, the \u5831\u5099-type communicator will abandon it. The gesture must cost less than the current minimum.",
    icon: "\u25B7",
  },
  {
    id: 12,
    title: "Three communication styles, one calendar",
    description:
      "P1 wants plausible deniability. P2 wants emotional reading. P3 wants efficient \u5831\u5099. The calendar's ambiguity serves all three: P1 hides behind it, P2 reads into it, P3 uses it as the ultimate efficient check-in. This convergence validates the design.",
    icon: "\u25C6",
  },
];

export const HYPOTHESES = [
  {
    id: 1,
    statement:
      "If the only signal is rip timing (no content, no emotion data), it creates sufficient ambient connection.",
    testHow:
      "Test with a working prototype over 2 weeks. Give paired participants only rip-timing data. Measure whether they feel more connected vs. baseline, using daily check-in prompts.",
    status: "to-test",
  },
  {
    id: 2,
    statement:
      "Ambiguity ('why did she rip late?') prompts organic check-ins more than explicit notifications would.",
    testHow:
      "A/B test: one group gets ambiguous rip-timing, another gets explicit 'she seems sad' notifications. Track which group initiates more voluntary contact and which contact feels more natural.",
    status: "to-test",
  },
  {
    id: 3,
    statement:
      "Monthly or yearly retrospective of rip patterns feels meaningful — like rereading a journal.",
    testHow:
      "After 30 days of use, show participants a visualization of their rip history. Interview them about what they see, what they remember, and whether looking back changes how they feel about the connection.",
    status: "to-test",
  },
  {
    id: 4,
    statement:
      "Parents and children read the same signal differently — but this asymmetry is the mechanism, not a flaw.",
    testHow:
      "Show identical rip-timing patterns to parent-child pairs separately. Ask each what they think the pattern means. Compare interpretations to map the asymmetry and whether it causes conflict or comfort.",
    status: "to-test",
  },
  {
    id: 5,
    statement:
      "Physical tactile quality of tearing paper is critical — digital-only version loses emotional weight.",
    testHow:
      "Compare physical tear-off calendar with a digital swipe equivalent over 1 week each. Interview participants on which feels more meaningful, more like a ritual, and which they'd actually keep doing.",
    status: "to-test",
  },
  {
    id: 6,
    statement:
      "Practical excuses for contact are a universal pattern. The daily rip serves this function — a reason to engage that requires no emotional justification.",
    testHow:
      "Confirmed across P1 ('sprouted food') and P2 ('installation advice'). Both use practical questions as permission slips for connection. Monitor if the rip similarly lowers the barrier.",
    status: "validated",
  },
  {
    id: 7,
    statement:
      "The two-timeline experience ('their time moves faster than mine') is widespread among children abroad. The calendar makes both timelines visible simultaneously.",
    testHow:
      "Ask future participants about temporal asymmetry unprompted. If 3+ mention it, the calendar's ability to make both daily rhythms visible becomes a core value proposition.",
    status: "testing",
  },
  {
    id: 8,
    statement:
      "Parents may express themselves differently through the calendar than through calls or messages — the father who never said 'darling daughter' in person might develop a tender ripping ritual.",
    testHow:
      "In parent-side prototype testing, track whether the physical ritual elicits expressions of care that don't occur in their messaging behavior. Compare rip patterns with message frequency/tone.",
    status: "to-test",
  },
  {
    id: 9,
    statement:
      "The calendar should be asymmetric — each side customized to what that person is comfortable sending and what the other person most needs to receive.",
    testHow:
      "Design two asymmetric calendar variants: one sends 'I'm progressing' signals (for parents), one sends 'I'm content' signals (for children). Test if asymmetric feels more natural than symmetric.",
    status: "to-test",
  },
  {
    id: 10,
    statement:
      "Children who communicate primarily through \u5831\u5099 (practical reporting) will use the calendar as an efficiency tool, not an emotional one — but both use cases are equally valid.",
    testHow:
      "Track P3-type (pragmatic) vs P2-type (emotional) users over 2 weeks. Compare rip timing patterns, follow-up communication rates, and subjective satisfaction. Hypothesis: both report high satisfaction for different reasons.",
    status: "to-test",
  },
  {
    id: 11,
    statement:
      "Silent awareness of parental aging is universal across all children abroad. The calendar's accumulating months make this shared but unspoken observation externally visible.",
    testHow:
      "Confirmed across P1, P2, and P3: all notice parents aging but none mention it. After 3+ months of calendar use, interview participants about whether the physical accumulation of torn pages changed their relationship to time passing.",
    status: "validated",
  },
];
