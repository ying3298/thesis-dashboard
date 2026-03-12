export const PALETTE_P3 = [
  "#C46B4D", "#5B7065", "#5C7A8B", "#7A6B8A", "#8B6F5C",
  "#6B6B6B", "#6B8A6B", "#8B5C6F", "#999", "#5C5C8B",
];

const DEFAULT_CLUSTERS_P3 = [
  {
    id: "baobei",
    label: "\u5831\u5099 (reporting) is the communication operating system",
    color: "#C46B4D",
    notes: [
      { id: "bb1", text: "She uses the word \u5831\u5099 (report in) for every family interaction \u2014 not 'chat', not 'connect', not 'catch up'", tag: "her framing", special: true },
      { id: "bb2", text: "Messages = 1-2 day cycle. Phone = every 1-2 weeks. Messages vastly preferred because: send and go.", tag: "frequency", special: false },
      { id: "bb3", text: "\"\u8B93\u4ED6\u5011\u77E5\u9053\u6211\u5728\u5E79\u5606\uFF0C\u6211\u6C92\u6B7B\" (Let them know what I'm doing, I'm not dead)", tag: "her words", special: true },
      { id: "bb4", text: "Phone calls happen only when too much has accumulated to cover in messages. Batch processing.", tag: "pattern", special: false },
      { id: "bb5", text: "The habit existed in Taiwan too. Not caused by distance \u2014 distance just changed the frequency, not the logic.", tag: "origin", special: false },
      { id: "bb6", text: "Mom initiates with practical requests: pay this bill, remember that appointment. Same \u5831\u5099 logic, opposite direction.", tag: "bidirectional", special: false },
      { id: "bb7", text: "Designer note: The calendar IS a \u5831\u5099 system. Daily rip = \"I'm here, I'm alive.\" Zero content, maximum efficiency.", tag: "designer note", special: true },
    ]
  },
  {
    id: "filter",
    label: "The practical filter: only share what they can act on",
    color: "#5B7065",
    notes: [
      { id: "f1", text: "Won't tell mom about blisters \u2014 \"if I tell you, you can't do anything to help\"", tag: "her words", special: false },
      { id: "f2", text: "Broken washing machine = not worth reporting. Small physical problems = not worth reporting.", tag: "boundary", special: false },
      { id: "f3", text: "But house being sold = definitely worth a phone call. Big life events pass the filter.", tag: "passes filter", special: false },
      { id: "f4", text: "Even in Taiwan, face-to-face allowed more detail: \"\u4F60\u53EF\u4EE5\u6BD4\u8F03\u7D30\u7684\u5206\u6790\" (you can analyze more finely)", tag: "her words", special: false },
      { id: "f5", text: "The filter is: can they DO something with this information? If no \u2192 don't share.", tag: "core logic", special: true },
      { id: "f6", text: "Designer note: The calendar bypasses this filter \u2014 it doesn't transmit information at all. It transmits presence, which isn't subject to the 'can you help?' test.", tag: "designer note", special: true },
    ]
  },
  {
    id: "good-news",
    label: "Good news triggers missing, not loneliness",
    color: "#5C7A8B",
    notes: [
      { id: "gn1", text: "Asked about missing family: she describes achievement moments, not lonely moments.", tag: "key difference", special: true },
      { id: "gn2", text: "First Fooling Richard collaboration \u2192 huge news \u2192 \"I really want to share \u559C\u8A0A (good tidings)\"", tag: "her words", special: false },
      { id: "gn3", text: "Knowing they'll be proud gives her a second wave: \"\u4ED6\u89BA\u5F97\u5514\u5495\u597D\u68D2\u5594\u96E2\u4F60\u7684\u76EE\u6A19\u9032\u4E00\u6B65\" (they'll think: great, one step closer to your goal)", tag: "her words", special: false },
      { id: "gn4", text: "Family's knowledge of her progress = \"\u958B\u5FC3\u8DDF\u5B89\u5FC3\" (happy AND at ease). She delivers both.", tag: "emotional logic", special: false },
      { id: "gn5", text: "Contrast with P2: P2's connection urge comes from evening loneliness. P3's comes from daytime achievement.", tag: "cross-interview", special: true },
      { id: "gn6", text: "Designer note: The calendar captures BOTH patterns. P2's evening rip = quiet presence. P3's rip = 'still going, still here.'", tag: "designer note", special: true },
    ]
  },
  {
    id: "minimal-emotion",
    label: "Pre-emotional communication: practical first, feelings never",
    color: "#7A6B8A",
    notes: [
      { id: "me1", text: "Mom says \"\u597D\u68D2\u55B6\" (great job). Her response: \"\u6C92\u6709\u6C92\u6709\u6BEB\u7121\u6CE2\u7014\" (no ripple at all).", tag: "her words", special: false },
      { id: "me2", text: "Sticker received = \"\u9054\u6210\u4E86\" (mission accomplished). Transaction complete. No emotional residue.", tag: "pattern", special: true },
      { id: "me3", text: "Reunions at home: \"\u8A72\u5E79\u561B\u5E79\u561B\" (just do what you need to do). Let's go eat. When are you free?", tag: "reunion style", special: false },
      { id: "me4", text: "Family doesn't do dramatic welcomes anymore: \"\u5927\u98A8\u5927\u6D6A...emotions\u6BD4\u8F03\u4F4E\u4E86\" (been through a lot... emotions are lower now)", tag: "family style", special: false },
      { id: "me5", text: "Never asks about feelings. Never gets asked about feelings. The emotional layer is entirely implicit.", tag: "absence", special: false },
      { id: "me6", text: "Contrast: P1 avoids emotion for privacy. P2 craves emotional reading. P3 simply operates in a different register \u2014 pragmatic, not emotional.", tag: "cross-interview", special: true },
    ]
  },
  {
    id: "control",
    label: "She controls the narrative",
    color: "#8B6F5C",
    notes: [
      { id: "ct1", text: "\"\u6211\u53EF\u4EE5\u638C\u63A7\u90191\u4EF6\u4E8B\u60C5\" (I can control this) \u2014 about her reporting system", tag: "her words", special: true },
      { id: "ct2", text: "\"\u6211\u86EE\u6EFF\u610F\u73FE\u5728\u9019\u500B\u7CFB\u7D71\" (I'm quite satisfied with the current system)", tag: "her words", special: false },
      { id: "ct3", text: "She initiates contact. She decides what's worth sharing. She controls the timing.", tag: "pattern", special: false },
      { id: "ct4", text: "The ideal frequency gives her space: \"\u4E0D\u6703\u8B93\u6211\u89BA\u5F97\u5F88\u81EA\u7E7F\u2026\u6703\u6709\u597D\u7684\u8DDD\u96E2\" (won't make me feel uptight... there's a good distance)", tag: "her words", special: false },
      { id: "ct5", text: "\"I have something, I say it. I don't, I don't.\" This is not avoidance \u2014 it's curated self-presentation.", tag: "interpretation", special: false },
      { id: "ct6", text: "Designer note: Calendar must let HER choose when to rip. Never a notification. Never a reminder. Never \"your mom already ripped today.\"", tag: "designer note", special: true },
    ]
  },
  {
    id: "surface-depth",
    label: "Surface changes open the door to real conversation",
    color: "#6B6B6B",
    notes: [
      { id: "sd1", text: "Family notices her new clothes \u2192 \"\u4F60\u9019\u500B\u65B0\u8CB7\u7684\" (is that new?) \u2192 work conversation \u2192 full life update.", tag: "pattern", special: true },
      { id: "sd2", text: "Fashion/clothes are accessible because her work and life overlap: \"\u5F88\u5BB9\u6613\u53EF\u4EE5\u804A\u5230\u6211\u73FE\u5728\u5B8C\u6574\u7684\u5728\u5730\u7684\u6240\u6709\u6771\u897F\" (it's easy to get to everything about my local life)", tag: "her words", special: false },
      { id: "sd3", text: "Nobody leads with \"how are you feeling?\" They lead with observable, external cues.", tag: "family style", special: false },
      { id: "sd4", text: "This mirrors P1 and P2's families: hair, eyes, under-eye area. Everyone reads surfaces first.", tag: "cross-interview", special: true },
      { id: "sd5", text: "Designer note: The calendar's torn pages ARE a surface change. A growing stack, a changing month. Neutral entry point to conversation.", tag: "designer note", special: true },
    ]
  },
  {
    id: "time-aging",
    label: "Time is passing on their faces",
    color: "#6B8A6B",
    notes: [
      { id: "ta1", text: "Imagining mom's face: first thing she'd notice = signs of aging. White hair.", tag: "response", special: false },
      { id: "ta2", text: "\"\u771F\u7684\u662F\u6642\u9593\u6709\u5728\u904E\u8036\" (Time really is passing) \u2014 her thought upon noticing.", tag: "her words", special: true },
      { id: "ta3", text: "Would she mention it to her mom? \"\u4E0D\u6703\" (No). Silent awareness.", tag: "behavior", special: false },
      { id: "ta4", text: "Same with brother: she looks at overall changes, how much he's different.", tag: "brother", special: false },
      { id: "ta5", text: "Confirmed across ALL 3 participants: noticing parental aging is universal, but always unspoken.", tag: "cross-interview", special: true },
    ]
  },
  {
    id: "brother",
    label: "Brother: close mind, distant life",
    color: "#8B5C6F",
    notes: [
      { id: "br1", text: "\"\u6211\u8DDF\u6211\u54E5mandy\u5F88\u8FD1\u4F46\u662F\u751F\u6D3B\u4E0A\u975E\u5E38\u7684\u9060\" (My brother and I are very close, but in daily life very far)", tag: "her words", special: true },
      { id: "br2", text: "She shared a Three Kingdoms game win with him. He said \"\u6211\u5E79\u5F88\u5C4C\" (damn, nice). That was the whole conversation.", tag: "interaction", special: false },
      { id: "br3", text: "Magic wand answer for brother: she wants him to instantly know when something funny happens to her.", tag: "desire", special: false },
      { id: "br4", text: "\"\u5F88\u50CF1\u500B\u77ED\u5F71\u7247\u5C31\u51FA\u73FE\u5728\u4ED6\u7684\u7CFB\u7D71\" (Like a short video just appears in his system)", tag: "her words", special: true },
      { id: "br5", text: "Different from mom: mom gets \u5831\u5099 (reports). Brother gets humor and shared moments.", tag: "asymmetry", special: false },
    ]
  },
  {
    id: "busyness",
    label: "Busyness is a natural, guilt-free buffer",
    color: "#999",
    notes: [
      { id: "bu1", text: "School era: spontaneous sharing. Freelancing era: barely any. \"\u6BD4\u8F03\u7121\u5FC3\u65BC\u60F3\u5230\u5BB6\u4EBA\" (less inclined to think about family)", tag: "contrast", special: false },
      { id: "bu2", text: "When busy, family understands silence. If she's on one project all week, \"\u4ED6\u5C31\u77E5\u9053\u4F60\u5728\u540C1\u500B\u4E8B\u60C5\" (they know you're on the same thing)", tag: "mutual understanding", special: false },
      { id: "bu3", text: "Frequency is determined by \"\u5DE5\u4F5C\u91CF\u8DDF\u9047\u5230\u7684\u4E8B\u60C5\u7684\u591A\u5BE1\" (workload and number of things encountered)", tag: "her words", special: false },
      { id: "bu4", text: "No guilt about silence. This is strikingly different from P2, who feels constant guilt.", tag: "cross-interview", special: true },
      { id: "bu5", text: "\"\u6EFF\u8DB3\u5206\u4EAB\u6168\" (satisfying the urge to share) \u2014 when free, she shares small things just to scratch that itch.", tag: "her words", special: false },
      { id: "bu6", text: "Designer note: The calendar fills the gap on silent weeks. A rip = \u5831\u5099 even when she has nothing to say.", tag: "designer note", special: true },
    ]
  },
];

export default DEFAULT_CLUSTERS_P3;
