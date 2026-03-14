export const PALETTE_P4 = [
  "#C46B4D", "#5B7065", "#5C7A8B", "#7A6B8A", "#8B6F5C",
  "#6B6B6B", "#6B8A6B", "#8B5C6F", "#999",
];

const DEFAULT_CLUSTERS_P4 = [
  {
    id: "distance-positive",
    label: "Distance = personal space, not absence",
    color: "#C46B4D",
    notes: [
      { id: "dp1", text: "\"\u6211\u86EE\u559C\u6B61\u9019\u7A2E\u8DDD\u96E2\" (I quite like this distance) \u2014 said without hesitation", tag: "his words", special: true },
      { id: "dp2", text: "No daily friction with mom: no small arguments, no life clashes. Distance removed irritation.", tag: "pattern", special: false },
      { id: "dp3", text: "\"\u6211\u6709\u5F88\u591A\u81EA\u5DF1\u7684\u7A7A\u9593\u505A\u81EA\u5DF1\u7684\u767C\u5C55\" (I have a lot of space for my own development)", tag: "his words", special: false },
      { id: "dp4", text: "Didn't feel a dramatic reunion when returning home: \"\u6C92\u6709\u771F\u7684\u89BA\u5F97\u8AAA\u5594\u771F\u7684\u597D\u4E45\u4E0D\u898B\" (Didn't really feel 'wow, it's been so long')", tag: "reunion style", special: false },
      { id: "dp5", text: "Cross-interview: P1 wants to stay invisible. P2 wants the wall removed. P3 wants control. P4 sees no wall at all \u2014 distance IS the relationship.", tag: "cross-interview", special: true },
      { id: "dp6", text: "Designer note: The calendar must be distance-positive. It doesn't shrink the gap \u2014 it makes the gap beautiful.", tag: "designer note", special: true },
    ]
  },
  {
    id: "date-memory",
    label: "The 'date' memory: love as a short, beautiful journey",
    color: "#5B7065",
    notes: [
      { id: "dm1", text: "Wednesday afternoons: mom picks him up from school, drives to the beach. Once or twice a month.", tag: "memory", special: false },
      { id: "dm2", text: "He calls these \"\u7D04\u6703\" (dates) \u2014 a romantic word for a parent-child outing", tag: "his framing", special: true },
      { id: "dm3", text: "\"\u53BB1\u500B\u5F88\u7F8E\u597D\u7684\u30011\u500B\u65C5\u7A0B\u7684\u90A3\u7A2E\u611F\u89BA\uFF0C\u53EA\u8981\u77ED\u77ED\u7684\" (A feeling of a beautiful journey, just short)", tag: "his words", special: false },
      { id: "dm4", text: "\"\u4F60\u4E5F\u6703\u671F\u5F85\u4E0B\u4E00\u6B21\" (You'd look forward to the next one)", tag: "his words", special: false },
      { id: "dm5", text: "This framing isn't about frequency \u2014 it's about quality. Rare = precious.", tag: "interpretation", special: false },
      { id: "dm6", text: "Designer note: Calendar rips can carry this quality. Each day's rip is a tiny 'date' \u2014 anticipated, brief, meaningful.", tag: "designer note", special: true },
    ]
  },
  {
    id: "eye-reading",
    label: "Reading emotions through eyes, not words",
    color: "#5C7A8B",
    notes: [
      { id: "er1", text: "First thing he notices in both mom's and grandma's face: eyes", tag: "pattern", special: true },
      { id: "er2", text: "Grandma's eyes transmit mood: \"\u6B7B\u6389\u7684\u773C\u795E\" (dead eyes) when she's unhappy", tag: "his words", special: false },
      { id: "er3", text: "\"\u6211\u90FD\u8981\u7528\u900F\u904E\u9019\u4E9B\u6771\u897F\u53BB\u731C\u6E2C\" (I have to guess through these things)", tag: "his words", special: false },
      { id: "er4", text: "\"\u56E0\u70BA\u6211\u5011\u4E0D\u592A\u6703\u8B1B\u592A\u591A\u5FC3\u88E1\u7684\u8A71\" (We don't really say what's on our minds)", tag: "his words", special: true },
      { id: "er5", text: "He had a real-time realization during the interview: \"\u6211\u7A81\u7136\u8B1B\u51FA\u9019\u53E5\u8A71\" (I suddenly said this) \u2014 he discovered his own pattern live", tag: "self-discovery", special: false },
      { id: "er6", text: "Cross-interview: All participants read family through physical cues (P1: hair/eyes, P2: under-eye area, P3: overall appearance). P4 is the most explicit about WHY: no one talks about feelings.", tag: "cross-interview", special: true },
    ]
  },
  {
    id: "grandma-phone",
    label: "Grandma's warmth doesn't survive the phone",
    color: "#7A6B8A",
    notes: [
      { id: "gp1", text: "In person: warm, cooks for him, picks wild greens, drinks at night", tag: "in person", special: false },
      { id: "gp2", text: "On phone: \"\u6BD4\u8F03\u51B7\u6DE1\" (colder), brief, rushes to hang up", tag: "on phone", special: true },
      { id: "gp3", text: "He's not upset about it: \"\u4ED6\u8AAA\u4ED6\u559C\u6B61\u5C31\u559C\u6B61\u4E0D\u559C\u6B61\u4F60\uFF0C\u6211\u4E5F\u6C92\u8FA6\u6CD5\" (If she likes you she likes you, if not, nothing I can do)", tag: "acceptance", special: false },
      { id: "gp4", text: "Grandma once wanted to lean on him as support, but realized \"\u6211\u53EF\u80FD\u4E5F\u6C92\u6709\u90A3\u9EBC\u9760\u7684\u4F4F\" (I might not be that reliable)", tag: "relationship shift", special: false },
      { id: "gp5", text: "Now grandma's stance: \"\u6211\u958B\u5FC3\u5C31\u597D\" (As long as I'm happy)", tag: "current state", special: false },
      { id: "gp6", text: "Designer note: Calendar works for people like grandma who can't do digital warmth. A rip is simpler than a phone call.", tag: "designer note", special: true },
    ]
  },
  {
    id: "reason-to-call",
    label: "You need a reason to call \u2014 the Pad Thai Rule",
    color: "#8B6F5C",
    notes: [
      { id: "rc1", text: "Last call to grandma: asking how to make pad thai (\u6253\u62CB\u8C6C)", tag: "trigger", special: false },
      { id: "rc2", text: "Thinking of family while cooking doesn't trigger contact: \"\u90FD\u4E0D\u592A\u6703\u89F8\u767C\u6211\u4EFB\u4F55\u4E8B\" (doesn't trigger me to do anything)", tag: "pattern", special: true },
      { id: "rc3", text: "Phone calls usually end the same way: \"\u4F60\u5728\u5E79\u55CE\u2026\u5C11\u559D\u4E00\u9EDE\u2026\u8D95\u5FEB\u7761\u89BA\" (What are you doing\u2026 drink less\u2026 go to sleep)", tag: "routine", special: false },
      { id: "rc4", text: "He does feel good after calling: \"\u901A\u5E38\u662F\u9084\u4E0D\u932F\u958B\u5FC3\" (Usually quite happy afterwards)", tag: "outcome", special: false },
      { id: "rc5", text: "Cross-interview: P3 needs a reason too, but P3's reason is \"\u5831\u5099\" (reporting). P4 needs a concrete question. Different triggers, same barrier.", tag: "cross-interview", special: true },
      { id: "rc6", text: "Designer note: Calendar eliminates the need for a reason. No question needed. Just rip.", tag: "designer note", special: true },
    ]
  },
  {
    id: "health-emotions",
    label: "Health and big emotions only \u2014 everything else is noise",
    color: "#6B6B6B",
    notes: [
      { id: "he1", text: "For grandma: wants to know drinking amount and sleep time", tag: "health concern", special: false },
      { id: "he2", text: "For emotions: \"\u54ED\u518D\u8DDF\u6211\u8B1B\" (Tell me if she cries) \u2014 not laughter, only distress", tag: "threshold", special: true },
      { id: "he3", text: "\"\u958B\u5FC3\u5C31\u662F\u958B\u5FC3\uFF0C\u6C92\u6709\u4EC0\u9EBC\u9700\u8981\u7E7C\u7E8C\u5EF6\u4F38\u7684\" (Happy is just happy, nothing to follow up on)", tag: "his logic", special: false },
      { id: "he4", text: "Does NOT want a robot vacuum in grandma's house monitoring HIM: \"\u4ED6\u5011\u4E0D\u9700\u8981\u77E5\u9053\u592A\u591A\u4E8B\u60C5\" (They don't need to know too much)", tag: "boundary", special: true },
      { id: "he5", text: "\"\u6211\u6C92\u6709\u5F88\u5E0C\u671B\u4ED6\u5011\u628A\u592A\u591A\u7684\u95DC\u6CE8\u653E\u5728\u6211\u8EAB\u4E0A\" (I don't want them focusing too much attention on me)", tag: "his words", special: false },
      { id: "he6", text: "Designer note: Calendar sends the thinnest signal possible. Not health. Not emotion. Just: 'still here.'", tag: "designer note", special: true },
    ]
  },
  {
    id: "decorative-ambient",
    label: "Decorative, ambient, non-functional",
    color: "#6B8A6B",
    notes: [
      { id: "da1", text: "Ideal object: visual, small impact, easy to notice but easy to ignore", tag: "his preference", special: true },
      { id: "da2", text: "\"\u88DD\u98FE\u6027\u7684\u6771\u897F\" (Decorative things) \u2014 explicitly non-functional", tag: "his words", special: false },
      { id: "da3", text: "No sound: \"\u4E0D\u7528\u51FA\u8072\u97F3\" (No need for sound). Visual only.", tag: "boundary", special: false },
      { id: "da4", text: "He imagines decorative lamps, ornaments \u2014 \"\u5B8C\u5168\u7121\u7528\u7684\u6771\u897F\" (completely useless things)", tag: "his words", special: false },
      { id: "da5", text: "Smell could work as a subtle layer: flowers, something ambient", tag: "open to", special: false },
      { id: "da6", text: "Cross-interview: P1 also wants subtlety. P4 goes further \u2014 he wants the object to have NO function at all. Pure decoration that happens to carry a signal.", tag: "cross-interview", special: true },
    ]
  },
  {
    id: "sensory-memory",
    label: "Sensory memory: smoke and Thai sauce",
    color: "#8B5C6F",
    notes: [
      { id: "sm1", text: "Cigarette smoke on clothes \u2192 mom. \"\u597D\u805E\u7684\u4E00\u7A2E\u5473\u9053\" (a pleasant kind of smell) \u2014 he likes what others might find unpleasant", tag: "his framing", special: true },
      { id: "sm2", text: "Thai sauce packets, certain vegetables \u2192 grandma. Because grandma cooks Thai food and picks wild greens from the sidewalk", tag: "association", special: false },
      { id: "sm3", text: "These triggers are involuntary \u2014 he doesn't choose to remember, it just happens", tag: "pattern", special: false },
      { id: "sm4", text: "\"\u86EE\u5E38\u60F3\u5230\" (Think of her quite often) \u2014 through cooking, not through intentional contact", tag: "frequency", special: false },
      { id: "sm5", text: "Designer note: Calendar creates a new sensory trigger. Over months, the growing stack of torn pages becomes a physical marker of time shared across distance.", tag: "designer note", special: true },
    ]
  },
  {
    id: "multi-person-casual",
    label: "Multi-person support and casual communication",
    color: "#999",
    notes: [
      { id: "mc1", text: "He immediately flagged: \"\u5982\u679C\u6211\u6709\u5976\u5976\u8DDF\u5ABD\u5ABD\uFF0C\u6211\u8981\u600E\u9EBC\u9078\u64C7\" (If I have grandma AND mom, how do I choose?)", tag: "key concern", special: true },
      { id: "mc2", text: "Shared lock screen reaction: \"\u5F88\u96A8\u6027\u7684\u4E00\u7A2E\u6E9D\u901A\" (very casual communication)", tag: "his words", special: false },
      { id: "mc3", text: "\"\u628A\u50B3\u8A0A\u606F\u9019\u4EF6\u4E8B\u60C5\u8B8A\u5F97\u5F88\u81EA\u7136\" (Makes messaging feel natural)", tag: "his assessment", special: false },
      { id: "mc4", text: "But predicted his own disengagement: \"\u6211\u5230\u5F8C\u9762\u5C31\u4E0D\u6703\u5BEB\u4EFB\u4F55\u6771\u897F\" (Eventually I'll stop writing anything)", tag: "honest prediction", special: true },
      { id: "mc5", text: "Designer note: Calendar solves both concerns. Multi-person: one calendar per relationship. Disengagement: ripping takes zero creativity, unlike drawing.", tag: "designer note", special: true },
    ]
  },
];

export default DEFAULT_CLUSTERS_P4;
