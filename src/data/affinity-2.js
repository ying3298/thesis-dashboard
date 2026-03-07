export const PALETTE_P2 = [
  "#C46B4D", "#5B7065", "#5C7A8B", "#7A6B8A", "#8B6F5C",
  "#6B6B6B", "#6B8A6B", "#8B5C6F", "#999", "#5C5C8B",
  "#8B8B5C", "#5C8B8B", "#8B5C5C", "#6B7A8B", "#8B7A5C",
];

const DEFAULT_CLUSTERS_P2 = [
  {
    id: "role",
    label: "She is the family's emotional infrastructure",
    color: "#C46B4D",
    notes: [
      { id: "r1", text: "She calls herself the family \"lubricant\" and \"trash can\" — absorbs energy, maintains harmony", tag: "her words", special: false },
      { id: "r2", text: "Without her there this year, family friction increased. She feels responsible.", tag: "guilt", special: false },
      { id: "r3", text: "When she visits home, first 2 weeks = warm reunion. Week 3 = six months of emotional backlog gets dumped on her.", tag: "pattern", special: false },
      { id: "r4", text: "\"Family stuff I carry inside my body. Friends' stuff doesn't stay.\"", tag: "her words", special: false },
      { id: "r5", text: "By end of her Taipei visit, she wanted to come BACK to Eindhoven. Needed to decompress alone.", tag: "behavior", special: false },
      { id: "r6", text: "Designer note: The calendar must not turn her into a remote emotional monitoring station. She already carries too much.", tag: "designer note", special: true },
    ]
  },
  {
    id: "timelines",
    label: "Two different timelines",
    color: "#5B7065",
    notes: [
      { id: "tl1", text: "\"Half a year in the Netherlands is short. Half a year in Taipei is long.\"", tag: "her words", special: false },
      { id: "tl2", text: "Her life abroad: many new experiences, but she feels she hasn't fundamentally changed.", tag: "self-perception", special: false },
      { id: "tl3", text: "Going home: family had changed a LOT. Brother's work, parents' attitudes, grandmother visibly aged.", tag: "shock", special: false },
      { id: "tl4", text: "\"We're like on two different time axes, and Taipei's seems to move faster.\"", tag: "her words", special: true },
      { id: "tl5", text: "Changes at home are invisible remotely — you can only see them in the hallway, the kitchen, face to face.", tag: "core problem", special: false },
      { id: "tl6", text: "This is the thesis emerging from a participant's mouth unprompted.", tag: "key insight", special: true },
    ]
  },
  {
    id: "reading-emotion",
    label: "How she reads her parents' emotions",
    color: "#5C7A8B",
    notes: [
      { id: "re1", text: "Mom's face → under-eye area (臥蠶). Wants to know if she's smiling.", tag: "sensory", special: false },
      { id: "re2", text: "But deeper: she wants to know if mom is GENUINELY content, not performing.", tag: "real need", special: false },
      { id: "re3", text: "\"My mom's walls — I can't see them. That's what scares me.\"", tag: "her words", special: true },
      { id: "re4", text: "Dad's face → nose and mouth area. Because dad smiles broadly. Emotion shows there.", tag: "sensory", special: false },
      { id: "re5", text: "She reads each parent through a DIFFERENT part of the face, tuned to where their emotions leak.", tag: "pattern", special: false },
      { id: "re6", text: "She said knowing parents' emotional state is THE most important thing. More than health, more than anything.", tag: "priority", special: false },
      { id: "re7", text: "\"If I can't even sense their basic emotions, what can I do?\"", tag: "her words", special: false },
    ]
  },
  {
    id: "dad-changed",
    label: "Dad changed after she left",
    color: "#7A6B8A",
    notes: [
      { id: "d1", text: "He never said \"寶貝女兒\" (darling daughter) before. Now he messages it regularly.", tag: "behavior change", special: false },
      { id: "d2", text: "He messages: take care of yourself, don't worry about money.", tag: "content", special: false },
      { id: "d3", text: "She finds this touching AND painful — he's not earning, so \"don't worry about money\" rings hollow.", tag: "contradiction", special: false },
      { id: "d4", text: "He's the family member whose attitude changed the most after she left.", tag: "observation", special: false },
      { id: "d5", text: "She promised her aunt she'd call dad every week. She hasn't kept that promise. More guilt.", tag: "guilt", special: false },
      { id: "d6", text: "Last call to dad: asked about structure/installation advice for school. Practical excuse.", tag: "behavior", special: false },
      { id: "d7", text: "Dad gave a better answer than people at her school. She told him he should do a PhD here. He was happy.", tag: "connection moment", special: false },
    ]
  },
  {
    id: "excuse-pattern",
    label: "Practical excuse to connect (confirmed)",
    color: "#8B6F5C",
    notes: [
      { id: "e1", text: "P1: \"Can I eat this sprouted thing?\" P2: \"How should I build this structure?\"", tag: "cross-interview", special: false },
      { id: "e2", text: "Both use a practical question as a permission slip for contact.", tag: "confirmed pattern", special: true },
      { id: "e3", text: "The question gives both people a role: one asks, one answers. Nobody has to be vulnerable.", tag: "why it works", special: false },
      { id: "e4", text: "Hypothesis confirmed: people find it much easier to reach out when there's a reason attached.", tag: "hypothesis", special: true },
      { id: "e5", text: "The daily rip could serve this function — a reason to engage that requires zero emotional justification.", tag: "design direction", special: true },
    ]
  },
  {
    id: "night-morning",
    label: "Night longing vs morning longing",
    color: "#6B6B6B",
    notes: [
      { id: "n1", text: "Morning: positive. \"The weather is beautiful, I wish my parents could see this.\"", tag: "morning", special: false },
      { id: "n2", text: "Evening: existential. Lying in bed, eyes closed, no one waiting for you at home.", tag: "evening", special: false },
      { id: "n3", text: "Evening longing = belonging (歸屬感) crisis. \"There's no umbrella here that will always hold you.\"", tag: "her words", special: false },
      { id: "n4", text: "Unlike studying in Taichung (2-hour train home), Eindhoven is half a globe away. Can't spontaneously return.", tag: "distance quality", special: false },
      { id: "n5", text: "First year was worst. Second year better — has friends now, doing better academically, more self-sufficient.", tag: "trajectory", special: false },
      { id: "n6", text: "Designer note: The calendar lives in the home, where evening longing is strongest. A trace of the other person's day is most valuable at night.", tag: "designer note", special: true },
    ]
  },
  {
    id: "magic-wand",
    label: "She doesn't want magic for communication",
    color: "#6B8A6B",
    notes: [
      { id: "m1", text: "Magic wand answer #1: Money. Remove the financial pressure causing family friction.", tag: "her answer", special: false },
      { id: "m2", text: "Magic wand answer #2: 任意門 (Anywhere Door). Instant physical presence.", tag: "her answer", special: false },
      { id: "m3", text: "What she explicitly did NOT want: anything that changes how she communicates with her family.", tag: "boundary", special: true },
      { id: "m4", text: "\"My family's relationship is already like magic.\"", tag: "her words", special: true },
      { id: "m5", text: "\"I don't want to use magic to change something I could understand if I just tried harder.\"", tag: "her words", special: false },
      { id: "m6", text: "She wants to remove OBSTACLES (money, distance), not redesign the CONNECTION.", tag: "key insight", special: true },
      { id: "m7", text: "Designer note: The calendar should feel like an extension of what already exists, not a new system. Like removing a wall, not adding a window.", tag: "designer note", special: true },
    ]
  },
  {
    id: "robot",
    label: "Cleaning robot response",
    color: "#8B5C6F",
    notes: [
      { id: "rb1", text: "She engaged with the concept immediately. Accepted both happy signal (clean floor) and absence signal (robot doesn't move).", tag: "reaction", special: false },
      { id: "rb2", text: "\"If it doesn't move for a long time, I'd also want to know.\" — She wants BOTH positive and negative signals.", tag: "her words", special: false },
      { id: "rb3", text: "What she'd want to know from parents: happiness. Not \"do they miss me\" — that's for romantic partners.", tag: "distinction", special: false },
      { id: "rb4", text: "Family = \"are you happy?\" Romantic = \"do you think about me?\" She draws a clear line.", tag: "framing", special: true },
      { id: "rb5", text: "What she'd send TO parents: that she's working hard, progressing. Reassurance she's not wasting the sacrifice.", tag: "asymmetry", special: false },
      { id: "rb6", text: "Contrast with P1: P1 wanted flat signals both ways. P2 wants emotional info FROM parents, effort signals TO parents.", tag: "cross-interview", special: true },
      { id: "rb7", text: "Question: Should the paired calendar be asymmetric — each side sends different types of signals?", tag: "question", special: true },
    ]
  },
  {
    id: "guilt",
    label: "Guilt is the background noise",
    color: "#999",
    notes: [
      { id: "g1", text: "Guilty she's not there to mediate family conflicts.", tag: "source", special: false },
      { id: "g2", text: "Guilty she \"tossed\" her brother to deal with the adults alone.", tag: "source", special: false },
      { id: "g3", text: "Guilty she doesn't call her dad enough.", tag: "source", special: false },
      { id: "g4", text: "Sent flowers to mom's office after a family blow-up. Care from across the ocean, but also guilt repair.", tag: "behavior", special: false },
      { id: "g5", text: "She said the interview felt like \"a path of self-reflection\" — and broke down crying.", tag: "observation", special: false },
      { id: "g6", text: "She became emotionally vulnerable very quickly. This topic is an open wound.", tag: "interviewer note", special: false },
      { id: "g7", text: "Designer note: The calendar must not amplify guilt. Mom ripping early ≠ daughter is late. Breathing, not scorekeeping.", tag: "designer note", special: true },
    ]
  },
  {
    id: "calls",
    label: "Phone calls serve different functions",
    color: "#5C5C8B",
    notes: [
      { id: "ca1", text: "Short call with mom: life updates, keeping it light. Purpose: make each other's burden lighter.", tag: "function", special: false },
      { id: "ca2", text: "Long call with brother: 2 hours, processing conflict, writing an apology letter for him to copy-paste to mom.", tag: "function", special: false },
      { id: "ca3", text: "\"That call isn't to make things heavier. It's to make things lighter.\"", tag: "her words", special: false },
      { id: "ca4", text: "But in practice, family DOES pile on — especially during in-person visits. The lightening/loading boundary is fragile.", tag: "tension", special: false },
      { id: "ca5", text: "Mom exploded on a call: \"All three of you 許 kids don't love me.\" Then regret, then the daughter ordered flowers.", tag: "incident", special: false },
      { id: "ca6", text: "Designer note: The daily rip is inherently \"lightening\" — it carries no baggage. You can't dump six months of problems through a torn page.", tag: "designer note", special: true },
    ]
  },
];

export default DEFAULT_CLUSTERS_P2;
