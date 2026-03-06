const FINDINGS = [
  {
    id: 1,
    title: 'Messaging = "Thinking of You" Button',
    emoji: "💬",
    summary:
      "She sends messages not for conversation, but as a gesture. The content (like 'can I eat this sprouted thing?') is just an excuse to make contact. She doesn't need a reply.",
    evidence:
      "\"When something comes up, you just press a 'thinking of you' button.\"",
    designImplication:
      "Calendar rip works like this — a minimal gesture saying 'I'm here' without demanding a reply.",
  },
  {
    id: 2,
    title: "The Cat Does the Heavy Lifting",
    emoji: "🐱",
    summary:
      "Most frequent message: 'let me see Ding Ding' (the cat). Parents send cat photos. She calls it a 'daily quest.' The cat is neutral territory — no emotional weight, no vulnerability.",
    evidence:
      "\"It's like I publish a quest, and my parents have to complete it.\"",
    designImplication:
      "Calendar needs a similarly neutral interaction layer. The rip is neutral but carries timing data.",
  },
  {
    id: 3,
    title: "Time Difference → Messaging by Default",
    emoji: "🕐",
    summary:
      "She messages instead of calling because of time zones. Not preference — necessity. She's unsure if they'll pick up.",
    evidence:
      "\"Because of the time difference, I'm not sure if they'll pick up.\"",
    designImplication:
      "Validates the async model. She already lives async.",
  },
  {
    id: 4,
    title: "Changes Only Show Up When You Go Home",
    emoji: "🏠",
    summary:
      "Changes in parents (new habits, rules, health) are invisible remotely. Messages compress reality.",
    evidence:
      "\"Their expression is very one-sided. When you go home, you find out it's not like that at all.\"",
    designImplication:
      "Accumulated rip patterns could make slow change visible over months.",
  },
  {
    id: 5,
    title: "Hair = Mom's Life State",
    emoji: "💇",
    summary:
      "When picturing her mom, she sees HAIR first. Dyed = self-care. Grey showing = too busy. For dad, it's his EYES (one can't see).",
    evidence: "\"Hair reveals something about a person's life state.\"",
    designImplication:
      "Feedback should be sensory, not informational. Texture, not notifications.",
  },
  {
    id: 6,
    title: "Dad's Jokes = Family Glue",
    emoji: "😄",
    summary:
      "His bad jokes are a family ritual. She used to find them unfunny; now she laughs. That shift represents her growth.",
    evidence:
      "\"From that one joke, I finally got my dad's humor.\"",
    designImplication:
      "Same gesture (rip) can deepen in meaning over time, like the jokes did.",
  },
  {
    id: 7,
    title: '"I Want It to Stay Flat"',
    emoji: "🫥",
    summary:
      "She does NOT want parents to see her emotional highs or lows. If they see happiness, they'll notice when it's absent. She wants plausible deniability.",
    evidence:
      "\"I want it to stay flat. I don't want them to know how happy or sad I am.\"",
    designImplication:
      "Calendar must NOT become emotional surveillance. Rip timing is ambiguous by design.",
  },
  {
    id: 8,
    title: "Food = Safe Territory",
    emoji: "🍳",
    summary:
      "When asked what she'd share, she picks food. It's daily, neutral, carries no vulnerability. She's confident about cooking.",
    evidence: "\"Food, I think.\"",
    designImplication:
      "Calendar traces should be as neutral and ambient as food — just the texture of an ordinary day.",
  },
  {
    id: 9,
    title: "The Calendar IS Already Change",
    emoji: "📅",
    summary:
      "She says the calendar doesn't need added mechanics because each day is already a different page. Day 1 ≠ Day 30 automatically.",
    evidence: "\"It was always going to change.\"",
    designImplication:
      "Amplify what's already there. Don't layer new mechanics on top.",
  },
  {
    id: 10,
    title: "Journaling: Happy Moments Are Blurry",
    emoji: "📓",
    summary:
      "She journals when low, but treasures the happy entries most. Sadness is specific; happiness is vague and forgettable.",
    evidence:
      "\"Sad things are always specific, but happy things are sometimes blurry.\"",
    designImplication:
      "365 days of quiet rips becomes precious in retrospect, like rereading a journal.",
  },
];

export default FINDINGS;
