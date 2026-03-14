const GUIDE_SECTIONS = [
  {
    id: "what-worked",
    label: "What Already Worked",
    color: "#5B7065",
    icon: "✓",
    intro:
      "Things from Interview #1 that produced the richest data. Do more of this.",
    items: [
      {
        title: "\"Picture your mom's face\" sensory prompt",
        why: "Moved her from abstract answers to vivid, specific memory. She saw hair, eyes, expression — not concepts. Sensory prompts bypass the filter people put on their own feelings.",
        fix: "Use more sensory entry points: 'What does the house smell like when you walk in?' or 'What sound do you hear first when you call?'",
        principle:
          "The body remembers what the mind edits. Start with senses, not opinions.",
        tag: "keep doing",
      },
      {
        title: "Following her word choices",
        why: "When she said 'quest' for cat photos, that single word revealed her whole framing — gamified, light, no emotional stakes. Her vocabulary is data.",
        fix: "Write down her exact words. Use them back: 'You said quest — what makes it feel like a quest?' Never paraphrase into your own language.",
        principle:
          "Their words are more precise than yours. Borrow, don't translate.",
        tag: "keep doing",
      },
      {
        title: "Asking about last specific instance",
        why: "'When was the last time you...' forces a real memory instead of a generalization. She went from 'I usually message' to a specific moment with specific feelings.",
        fix: "Always anchor in a real event: 'Think of the last time you called your mom. What day was it? What were you doing right before?'",
        principle:
          "Specifics reveal truth. Generalizations reveal self-image.",
        tag: "keep doing",
      },
      {
        title: "Letting silence do the work",
        why: "After her best answers, there was a pause where she kept going on her own. The silence gave her space to surprise herself with what she said next.",
        fix: "When she finishes a sentence, count to 5 in your head before speaking. If she adds something, it's almost always the most honest part.",
        principle:
          "Silence is a probe. Most interviewers are too uncomfortable to use it.",
        tag: "keep doing",
      },
    ],
  },
  {
    id: "what-to-fix",
    label: "What to Adjust",
    color: "#C46B4D",
    icon: "↻",
    intro:
      "Patterns from Interview #1 that narrowed the data. Small fixes, big difference.",
    items: [
      {
        title: "Introduced calendar concept too early",
        why: "Once she knew you had a calendar idea, every answer bent toward it. You lost 10 minutes of open exploration because she was now 'helping you' instead of telling her story.",
        fix: "Rule: spend 70% of the interview in her problem space before showing any solution. Don't mention the calendar until minute 20+.",
        principle:
          "The moment you show a solution, they stop describing the problem.",
        tag: "timing",
      },
      {
        title: "\"Why\" questions put her on the defensive",
        why: "'Why do you send cat photos?' makes her justify herself. She tenses up and gives a rational explanation instead of the real, messy reason.",
        fix: "Replace 'why' with 'what' or 'how': 'What happens right before you send a cat photo?' or 'How does it feel after you send it?'",
        principle:
          "'Why' asks for logic. 'What' and 'how' ask for experience.",
        tag: "phrasing",
      },
      {
        title: "Offering emotions for confirmation",
        why: "Saying 'So it sounds like that's a relief?' hands her an easy out. She'll agree even if it's not quite right because disagreeing takes more effort.",
        fix: "Ask open: 'What's the feeling there?' or 'What does that do to you?' Let her find her own word — it'll be more accurate than yours.",
        principle:
          "Never name their emotion. Let them name it. Their word will be better.",
        tag: "phrasing",
      },
      {
        title: "Jumping between topics at signs of discomfort",
        why: "When she paused or said 'I don't know,' you moved on. But 'I don't know' often means 'I haven't found the words yet.' The best data lives right past the discomfort.",
        fix: "When she says 'I don't know,' try: 'Take your time' or 'What comes to mind, even if it doesn't make sense?' Stay in the moment.",
        principle:
          "'I don't know' is the beginning of thinking, not the end of it.",
        tag: "depth",
      },
      {
        title: "Agreeing when she says \"this isn't relevant\"",
        why: "She said 'this probably isn't relevant' before her most insightful answer about her dad's jokes. People flag things as irrelevant when they feel vulnerable about sharing them.",
        fix: "When someone says 'this isn't relevant,' say: 'Actually, I'd love to hear it.' The things they almost don't say are often the most important.",
        principle:
          "What they call irrelevant is usually the most relevant thing they'll say.",
        tag: "depth",
      },
    ],
  },
  {
    id: "toolkit",
    label: "Probe Toolkit",
    color: "#5C7A8B",
    icon: "◇",
    intro:
      "Memorize 4-5 of these. Use when you're stuck or an answer feels thin.",
    items: [
      {
        title: "The Echo",
        why: "Repeating her last 2-3 words with an upward tone invites her to keep going without adding your interpretation. It's invisible — she won't even notice you're doing it.",
        fix: "She says: 'I just send the cat photo and move on.' You say: '...and move on?' Then wait.",
        principle:
          "An echo carries no direction. It just opens a door she can walk through or not.",
        tag: "go deeper",
      },
      {
        title: "The Time Machine",
        why: "Putting her in a specific moment activates sensory memory. She stops summarizing and starts reliving. Details come out that she didn't know she remembered.",
        fix: "'Go back to that evening. You're about to send the message. Where are you sitting? What's on the screen?'",
        principle:
          "People can't lie in specific moments the way they can in generalizations.",
        tag: "go deeper",
      },
      {
        title: "The Contrast",
        why: "Comparing two moments reveals what matters by showing what changed. She can feel the difference even when she can't articulate either moment alone.",
        fix: "'How is messaging your mom different from messaging your friends?' or 'What changed between calling last year and calling now?'",
        principle:
          "Meaning lives in the gap between two things, not in either thing alone.",
        tag: "go wider",
      },
      {
        title: "The Third Person",
        why: "'People like me' or 'my friends' is easier to talk about than 'me.' It gives her distance from vulnerability while still revealing her own feelings through projection.",
        fix: "'Do you think other students living abroad feel the same way?' She'll describe herself while thinking she's describing others.",
        principle:
          "The third person is a mirror that feels like a window.",
        tag: "go wider",
      },
      {
        title: "The Magic Wand",
        why: "Removing all constraints reveals desire. 'If you could...' bypasses the practical objections that usually block honest answers about what people actually want.",
        fix: "'If distance didn't exist, what would you want your daily connection with your parents to feel like?'",
        principle:
          "Constraints hide desire. Remove the constraint and the desire speaks.",
        tag: "go wider",
      },
      {
        title: "The Show Me",
        why: "Getting her to demonstrate instead of describe bypasses verbal filters. When she acts something out or shows you on her phone, you see things she'd never think to say.",
        fix: "'Can you show me on your phone how you usually send a message to your mom? Just do what you'd normally do.'",
        principle:
          "Behavior is more honest than description. Watch hands, not words.",
        tag: "go deeper",
      },
    ],
  },
  {
    id: "structure",
    label: "Interview Structure",
    color: "#7A6B8A",
    icon: "▤",
    intro:
      "Template for the next interview. Follow the energy, but know where you are.",
    items: [
      {
        title: "0–3 min: Warm up + consent",
        why: "The first minutes set the tone. If they feel like a research subject, they'll give research answers. If they feel like they're having coffee with a friend, they'll give real ones.",
        fix: "Start casual: 'How's your week been?' Get consent naturally. Don't read from a script. Make eye contact before you start recording.",
        principle:
          "The interview starts before the interview starts.",
        tag: "phase 1",
      },
      {
        title: "3–7 min: Perspectal",
        why: "Not everyone bonds with their biological parents. Some view a grandparent, aunt, or older sibling as their 'parent.' Before you ask about communication, you need to know WHO they're communicating with — and how they define that relationship. P4 taught us this: his grandma is a primary figure, not his mom alone.",
        fix: "'When I say the word \"parent,\" who comes to mind first?' Then: 'Tell me about your relationship with that person — what role do they play in your life?' If they name someone unexpected, follow it. Don't correct toward biological parents.",
        principle:
          "Let the participant define who matters. The relationship map is theirs to draw, not yours to assume.",
        tag: "phase 2",
      },
      {
        title: "7–14 min: Daily life texture",
        why: "Before asking about communication, understand their days. What does a Tuesday look like? When do they think about home? This context makes everything after richer.",
        fix: "'Walk me through yesterday, starting from when you woke up. What's the first thing you did?' Follow threads that involve family naturally.",
        principle:
          "Context before content. Understand the life before the behavior.",
        tag: "phase 3",
      },
      {
        title: "14–20 min: Communication behavior",
        why: "Now they're warmed up and you have context. Ask about how they actually talk to their parent figure — not how they think they should. Look for gaps between what they say and what they showed you.",
        fix: "'When was the last time you reached out to [person they named]? What made you do it at that moment?' Follow with echoes and time machines.",
        principle:
          "Don't ask what they do. Ask about the last time they did it.",
        tag: "phase 4",
      },
      {
        title: "20–24 min: Change and absence",
        why: "This is where it gets deep. How does distance change the relationship? What do they miss? What surprised them when they went home? This is where the calendar insight lives.",
        fix: "'What was different about [person] the last time you went home? What did you notice first?' Let silence work here.",
        principle:
          "Change is invisible from the inside. Ask about the moments they saw it from the outside.",
        tag: "phase 5",
      },
      {
        title: "24–28 min: Ideal connection → then concept",
        why: "Only NOW introduce the calendar concept. They've described their real situation for 20+ minutes. They have the vocabulary and emotional context to react honestly to the idea.",
        fix: "'If I showed you something — imagine a calendar you and [person] share, and all it shows is when each of you tore off the page...' Watch their face. Their first reaction is the data.",
        principle:
          "Show the concept when they have enough context to react honestly.",
        tag: "phase 6",
      },
      {
        title: "28–30 min: Close",
        why: "Don't just stop. Give them space to add anything. The best insight often comes in the last 2 minutes when the 'interview' pressure is off and they're just talking.",
        fix: "'Is there anything I didn't ask about that you think matters?' Then: 'One last thing — if [person] could know one thing about your daily life, what would it be?'",
        principle:
          "The closing question often gets the most honest answer in the whole interview.",
        tag: "phase 7",
      },
    ],
  },
  {
    id: "parent-side",
    label: "Parent Interview Adjustments",
    color: "#8B6F5C",
    icon: "◈",
    intro:
      "You've only heard the child side. The parent side is a different conversation entirely.",
    items: [
      {
        title: "Parents perform 'I'm fine' harder",
        why: "Parents protect their children from worry. They'll say 'everything is great' even when it's not. Their performance of being okay is a form of love — but it means you have to listen differently.",
        fix: "Don't ask 'How do you feel about the distance?' Ask: 'What time of day do you think about her most?' Concrete questions bypass the performance.",
        principle:
          "Parents will tell you what they want their child to hear, not what they actually feel.",
        tag: "watch for",
      },
      {
        title: "Ask about waiting, not just connecting",
        why: "For parents, the experience of distance is mostly waiting — waiting for a call, waiting for a message, wondering if no news is good news. The waiting is the experience, not the connecting.",
        fix: "'When she hasn't messaged in a while, what goes through your mind? At what point do you start to wonder?'",
        principle:
          "Connection is the event. Waiting is the life between events.",
        tag: "key question",
      },
      {
        title: "Asymmetry of information",
        why: "Children control what parents know. Parents know this. They fill gaps with imagination, which is often worse than reality. The calendar might change what fills those gaps.",
        fix: "'What do you know about her daily life right now? What do you imagine but don't actually know?'",
        principle:
          "Parents live in the gap between what they know and what they imagine.",
        tag: "key question",
      },
      {
        title: "Parents think about time differently",
        why: "For the child, time abroad is open-ended — life is happening now. For parents, every day is one day closer to the next visit, or one day further from the last. Time has a different shape.",
        fix: "'Do you count days? Do you know when she's coming home next? What does a month feel like to you versus what you think it feels like to her?'",
        principle:
          "Same duration, different experience. Time apart is shaped by who's waiting.",
        tag: "hypothesis to test",
      },
    ],
  },
  {
    id: "dont",
    label: "Things to Stop Doing",
    color: "#999",
    icon: "✕",
    intro:
      "Pin this somewhere visible during your next interview.",
    items: [
      {
        title: "Don't offer emotions",
        why: "When you say 'that must be hard,' you've closed the door. She'll agree and move on. But if you leave it open, she might tell you it's actually not hard — it's something more complicated that you'd never guess.",
        fix: "Replace 'that must be X' with 'what's that like?' Every time. No exceptions.",
        principle:
          "Your guess is always simpler than their truth.",
        tag: "stop",
      },
      {
        title: "Don't explain why you're asking",
        why: "'I'm asking because...' turns the interview into a collaboration where she tries to help you. You don't want help. You want her unfiltered reaction before she knows where you're going.",
        fix: "Just ask the question. If she asks why, say: 'I'm curious — there's no right answer.'",
        principle:
          "Explaining your intent shapes their response. Stay opaque.",
        tag: "stop",
      },
      {
        title: "Don't agree when they say 'this isn't relevant'",
        why: "People flag things as irrelevant when they sense vulnerability. Her dad's jokes felt 'irrelevant' to her but turned out to be one of the richest findings. She was testing if it was safe to go there.",
        fix: "When they say 'this probably isn't relevant,' say: 'I'd actually love to hear it.' Smile. Wait.",
        principle:
          "'Not relevant' is a safety check, not a content judgment.",
        tag: "stop",
      },
      {
        title: "Don't fill their silence",
        why: "Silence feels uncomfortable for the interviewer, not the participant. When you fill the gap, you steal the moment where they were about to say the thing they haven't said before.",
        fix: "When silence hits, put your pen down. Look at them warmly. Count to 7. If they don't speak, use an echo of their last words.",
        principle:
          "Your discomfort with silence is not their discomfort. Protect their thinking space.",
        tag: "stop",
      },
      {
        title: "Don't ask two questions at once",
        why: "Two questions gives them a choice, and they'll always pick the easier one. The harder question — the one you actually need answered — gets silently dropped.",
        fix: "One question. Full stop. Wait for the full answer. Then ask the next one.",
        principle:
          "One question is a door. Two questions is an escape route.",
        tag: "stop",
      },
    ],
  },
];

export default GUIDE_SECTIONS;
