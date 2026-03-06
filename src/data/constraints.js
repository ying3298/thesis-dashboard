export const DESIGN_CONSTRAINTS = [
  {
    id: 1,
    title: "Ambiguity is essential",
    description:
      "Rip timing carries texture but never a specific emotion. 'She ripped late' should prompt wondering, not conclusions. The moment you can decode a rip into a feeling, you've killed the magic.",
    icon: "◌",
  },
  {
    id: 2,
    title: "No content creation",
    description:
      "Her best communication is zero-content — 'let me see Ding Ding.' Calendar should require even less than that. Just turning a page. No typing, no choosing, no composing.",
    icon: "○",
  },
  {
    id: 3,
    title: "Neutral over expressive",
    description:
      "She wants 'flat' signals. Same gesture whether ecstatic or exhausted. The sameness IS the privacy layer. If the system reveals emotional range, she'll stop using it.",
    icon: "—",
  },
  {
    id: 4,
    title: "Retrospective accumulation",
    description:
      "She doesn't want real-time emotional feedback. But she values looking back at old journal entries. Calendar's accumulation is most meaningful in retrospect — 30 days of rips tells a story that one rip never could.",
    icon: "◐",
  },
  {
    id: 5,
    title: "Sensory over informational",
    description:
      "She reads her parents through hair, eyes, physical presence — not data. Feedback should aim for temperature, texture, weight. Not charts. Not notifications. Something you feel, not something you read.",
    icon: "◎",
  },
  {
    id: 6,
    title: "Calendar is already temporal",
    description:
      "A tear-off calendar doesn't need added change because it IS change. Each page is a different day. Amplify what's already built into the form. Don't layer new mechanics on top of something that already works.",
    icon: "▣",
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
      "Parents and children read the same signal differently. Parents may read a late rip as worry; children as 'she's busy, she's fine.' This asymmetry is a feature, not a bug.",
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
];
