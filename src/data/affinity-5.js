export const PALETTE_P5 = [
  "#C46B4D", "#5B7065", "#5C7A8B", "#7A6B8A", "#8B6F5C",
  "#6B6B6B", "#6B8A6B", "#8B5C6F",
];

const DEFAULT_CLUSTERS_P5 = [
  {
    id: "healthy-independence",
    label: "Healthy distance — evolution, not loss",
    color: "#C46B4D",
    notes: [
      { id: "hi1", text: "\"I am not like clinging on to them or they are not like clinging on to me\" — frames the relationship as balanced, not broken", tag: "her words", special: true },
      { id: "hi2", text: "Three phases of independence: full dependence → weakened closeness (still visiting) → full independence. She sees this as \"the most natural way a child begins independence\"", tag: "her framework", special: false },
      { id: "hi3", text: "\"They have given me the enough autonomy and independence to explore my days\" — gratitude, not grief", tag: "her words", special: false },
      { id: "hi4", text: "Like P4, she values the distance. But P4 values it for freedom from friction; P5 values it as a sign of healthy parenting", tag: "cross-interview", special: true },
      { id: "hi5", text: "Designer note: Any design must feel like an extension of this healthy independence — not a tether that creates new obligation or pulls her back to an earlier phase", tag: "designer note", special: true },
    ]
  },
  {
    id: "asymmetric-parents",
    label: "Dad = shared context, Mom = topics run dry",
    color: "#5B7065",
    notes: [
      { id: "ap1", text: "Dad lived in the US when young — they share reference points: places, culture, experiences. He wants to know EVERYTHING about her American life", tag: "pattern", special: true },
      { id: "ap2", text: "\"He really enjoys, he wants to know everything that happened\" — dad is an information seeker, actively curious", tag: "her words", special: false },
      { id: "ap3", text: "\"He was like can you right down your order... and send it to me\" — asks her to photograph bedsheets and send purchase links", tag: "his behavior", special: false },
      { id: "ap4", text: "With mom: \"you run out of topics now because I can talk about my cat and my husband\" — shared context is the fuel for conversation, and it's running out", tag: "her words", special: true },
      { id: "ap5", text: "Dad sees her life as \"a passage of staying\" — he has an emotional framework for understanding her experience abroad", tag: "interpretation", special: false },
      { id: "ap6", text: "Cross-interview: P1's mom sends daily cat photos. P5's mom talks about cat. P5's dad wants everything. Three different appetites for information — the calendar must serve all of them", tag: "cross-interview", special: true },
    ]
  },
  {
    id: "mom-rituals",
    label: "Mom's rituals: good morning messages + voice calls",
    color: "#5C7A8B",
    notes: [
      { id: "mr1", text: "\"Good morning good morning good morning\" — mom sends this every single day, to her and her brother", tag: "her words", special: true },
      { id: "mr2", text: "Mom's morning = P5's evening. The time-zone confusion is sweet: \"she said good morning and I was like this is so sweet\"", tag: "timezone poetry", special: false },
      { id: "mr3", text: "Mom also sends reels, hearts, emojis. Content doesn't matter — it's the consistency", tag: "pattern", special: false },
      { id: "mr4", text: "Mom sometimes calls with no agenda: \"I miss your voice, I miss you.\" Calls ~20-25 min", tag: "her words", special: true },
      { id: "mr5", text: "Mom wakes up at 4am to align with P5's schedule — sacrifices sleep for a phone call window", tag: "mom's behavior", special: false },
      { id: "mr6", text: "Mom's need is presence, not information. The voice itself is enough", tag: "interpretation", special: true },
      { id: "mr7", text: "Designer note: Mom already has a daily ritual. The calendar rip is the same gesture in physical form — low-effort, consistent, no expectation of reply", tag: "designer note", special: true },
    ]
  },
  {
    id: "lost-home",
    label: "Childhood home gone — the physical anchor is erased",
    color: "#7A6B8A",
    notes: [
      { id: "lh1", text: "Parents moved to a new house in the two years since she last visited. She has never been to it", tag: "key fact", special: true },
      { id: "lh2", text: "\"It felt to bear that I would have like the childhood house click\" — she mourns the lost anchor", tag: "her words", special: false },
      { id: "lh3", text: "Going \"home\" now means going somewhere unfamiliar — the physical shared context is gone", tag: "interpretation", special: false },
      { id: "lh4", text: "Magic wand wish: share her NYC experiences with parents directly. \"There is absolutely no way to recreate the same thing\"", tag: "her wish", special: true },
      { id: "lh5", text: "She doesn't want to collapse distance (unlike P2's \"Anywhere Door\"). She wants shared experience — both people engaging with the same thing", tag: "cross-interview", special: true },
      { id: "lh6", text: "Designer note: A shared object (like the calendar) becomes a new anchor — a place that belongs to both of them, regardless of which house anyone lives in", tag: "designer note", special: true },
    ]
  },
  {
    id: "cat-pattern",
    label: "Cat = universal low-stakes conversation fuel",
    color: "#8B6F5C",
    notes: [
      { id: "cp1", text: "\"My cat has come like a most easy topic of discussion\" — cat is the go-to subject with mom", tag: "her words", special: true },
      { id: "cp2", text: "Mom is \"extremely varied about my cat all the time\" — the cat gives mom something to feel invested in", tag: "pattern", special: false },
      { id: "cp3", text: "Mom thinks of the cat as P5's \"baby\": \"she definitely agrees that my cat is like my [child] and my husband['s child]\"", tag: "mom's framing", special: false },
      { id: "cp4", text: "Third participant to confirm: pets serve as neutral communication infrastructure (P1: cat-as-daily-quest, P3: friend's dog updates)", tag: "cross-interview", special: true },
      { id: "cp5", text: "Designer note: The calendar's daily rip serves the same function — a topic-free reason to connect that doesn't require thinking of something to say", tag: "designer note", special: true },
    ]
  },
  {
    id: "emotional-opacity",
    label: "You can't read feelings through the phone",
    color: "#6B6B6B",
    notes: [
      { id: "eo1", text: "\"You do not actually know how they are feeling\" — she acknowledges the fundamental opacity of distance", tag: "her words", special: true },
      { id: "eo2", text: "\"There have been times when I have been sad but then you pick up the phone and then you talk about something else\" — performing okayness", tag: "her words", special: false },
      { id: "eo3", text: "When picturing mom's face, the first thing she notices is resemblance: \"we look very similar, so all I see is like you\"", tag: "identity mirroring", special: true },
      { id: "eo4", text: "She reads mom through resemblance — seeing herself reflected. P1 reads hair, P2 reads under-eyes, P4 reads eyes. Each has a different sensory channel", tag: "cross-interview", special: true },
      { id: "eo5", text: "Designer note: The calendar's ambiguity serves this — a rip says \"I'm here\" without requiring emotional disclosure. It preserves the right to hide what you're not ready to share", tag: "designer note", special: true },
    ]
  },
  {
    id: "tangible-interpretable",
    label: "Tangible signals she can interpret herself — not data",
    color: "#6B8A6B",
    notes: [
      { id: "ti1", text: "\"Something tangible that I can look out for more signals\" — she gravitates toward physical, interpretable objects", tag: "her words", special: true },
      { id: "ti2", text: "\"A kind of give you a space and something you can interpret by yourself instead of like directly point into something\" — ambiguity as feature, not bug", tag: "her words", special: true },
      { id: "ti3", text: "Cleanliness = mom's love language. When shown the Roomba concept, she immediately connected it to mom: \"my moment, I would love to clean a lot\"", tag: "association", special: false },
      { id: "ti4", text: "Placement preference: dining table or beside walking path — \"somewhere that you sit all the time.\" Visible, daily, ambient", tag: "her preference", special: false },
      { id: "ti5", text: "She doesn't want a dashboard of data about mom. She wants a trace she can read in her own way — like how she reads resemblance in mom's face", tag: "interpretation", special: false },
      { id: "ti6", text: "Cross-interview: P1 wants flat signals. P4 wants decorative non-function. P5 wants interpretable tangibility. All three resist direct information — but for different reasons", tag: "cross-interview", special: true },
      { id: "ti7", text: "Designer note: Validates the calendar's ambiguity-by-design. A torn page is a trace, not a metric. What it means is up to the person looking at it", tag: "designer note", special: true },
    ]
  },
];

export default DEFAULT_CLUSTERS_P5;
