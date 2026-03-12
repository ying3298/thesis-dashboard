const FINDINGS_P3 = [
  {
    id: 'p3-1',
    title: '\u5831\u5099 (Reporting) Is the Entire Communication Architecture',
    emoji: '\uD83D\uDCCB',
    summary:
      'Her word for every interaction with family is "\u5831\u5099" \u2014 report in. Not connect, not share, not catch up. Report. The whole system runs on status updates: what she\'s doing, whether she\'s alive, what happened with work. The core logic is identical whether she texts daily or goes silent for a week \u2014 only the frequency changes.',
    evidence:
      '"\u8B93\u4ED6\u5011\u77E5\u9053\u6211\u5728\u5E79\u5606\uFF0C\u6211\u6C92\u6B7B" (Let them know what I\'m doing, I\'m not dead). "\u6240\u6709\u7684\u6838\u5FC3\u908F\u8F2F\u90FD\u662F1\u500B\u5831\u5099" (The core logic of everything is reporting).',
    designImplication:
      'The calendar\'s daily rip IS the ultimate \u5831\u5099 \u2014 requires zero content, zero effort, but confirms existence. For a reporting-based communicator, this is not a downgrade. It\'s the purest possible form of what she already does.',
  },
  {
    id: 'p3-2',
    title: 'She Filters By Practicality \u2014 Only Share What They Can Act On',
    emoji: '\uD83D\uDEAB',
    summary:
      'She explicitly won\'t tell her mom about small problems (blisters, broken washing machine) because they can\'t help from Taiwan. Information without an actionable outcome isn\'t worth sharing. This filter determines what crosses the distance barrier and what stays private.',
    evidence:
      '"\u6211\u4E0D\u6703\u53BB\u8B1B\u4E00\u4E9B\uFF0C\u6211\u8DDF\u4F60\u8B1B\u4E86\uFF0C\u4F60\u5B8C\u5168\u6C92\u6709\u8FA6\u6CD5\u505A\u5230\u4EFB\u4F55\u5E6B\u52A9\u7684\u4E8B\u60C5" (I won\'t talk about things where, even if I tell you, you can\'t do anything to help).',
    designImplication:
      'The calendar bypasses this filter entirely because it doesn\'t try to transmit information. It transmits presence \u2014 which isn\'t subject to the "can you help?" test. The daily rip has no content to filter.',
  },
  {
    id: 'p3-3',
    title: 'Good News Triggers Missing, Not Loneliness',
    emoji: '\uD83C\uDF89',
    summary:
      'When asked about moments of missing family, she doesn\'t describe loneliness or evening sadness (like P2). She describes achievement moments \u2014 landing a big client, fashion week. The urge to connect is triggered by good news she wants to share, not by absence she wants to fill.',
    evidence:
      '"\u6709great progress\u7684\u6642\u5019\u6703\u5F88\u60F3\u8981\u8DDF\u4ED6\u5011...\u5F88\u60F3\u8981\u8D95\u5FEB\u6709\u559C\u8A0A\u7684\u9019\u7A2E\u611F\u89BA" (When there\'s great progress, I really want to tell them... wanting to quickly share good tidings).',
    designImplication:
      'Opposite of P2\'s evening longing. P3\'s calendar rip might carry a different emotional signature on good days. One calendar, multiple emotional registers \u2014 the ambiguity lets each person pour their own meaning into the gesture.',
  },
  {
    id: 'p3-4',
    title: '"Sticker = Mission Accomplished" \u2014 Acknowledgment Is the Goal',
    emoji: '\u2705',
    summary:
      'When she shares something (a game achievement, a work update), getting a sticker or emoji back is fully sufficient. The transaction is: I report \u2192 you acknowledge \u2192 done. No follow-up conversation needed. The loop closes with minimal effort.',
    evidence:
      '"\u9054\u6210\u4E86\u9019\u6A23" (Mission accomplished) \u2014 after receiving a sticker in response. "ok\u9054\u6210\u4E86\u9019\u6A23" is said with zero emotional residue.',
    designImplication:
      'The calendar\'s reciprocal rip functions exactly like this sticker. "I ripped \u2192 I see you ripped \u2192 done." For this participant, the minimal acknowledgment IS the connection. No more needed.',
  },
  {
    id: 'p3-5',
    title: 'Busyness Is a Natural Buffer \u2014 And She\'s Fine With It',
    emoji: '\u23F0',
    summary:
      'When busy with multiple freelance projects, she thinks about family much less. As a student she\'d share small things spontaneously; now, weeks can pass. But she feels no guilt \u2014 it\'s simply how life works. The logic of communication stays the same; only frequency changes.',
    evidence:
      '"\u6BD4\u8F03\u5FD9\u4E86...\u6BD4\u8F03\u7121\u5FC3\u65BC\u60F3\u5230\u5BB6\u4EBA\u7684" (Busier now... less inclined to think about family). "\u90A3\u500B\u908F\u8F2F\u662F\u4E00\u6A23\u7684" (The logic is the same).',
    designImplication:
      'The calendar maintains the connection thread on busy weeks when even texting feels like too much. It\'s the minimum viable \u5831\u5099 \u2014 a single physical gesture that takes 2 seconds. No composition, no decision about what to share.',
  },
  {
    id: 'p3-6',
    title: 'She Values Being the Narrator of Her Own Story',
    emoji: '\uD83C\uDFAC',
    summary:
      'She\'s satisfied with the current system specifically because she has control over what gets shared and when. She decides what\'s "big enough" to report. She doesn\'t want anyone knowing things she hasn\'t chosen to disclose. This is comfort, not distance.',
    evidence:
      '"\u6211\u53EF\u4EE5\u638C\u63A7\u90191\u4EF6\u4E8B\u60C5" (I can control this). "\u6211\u86EE\u6EFF\u610F\u73FE\u5728\u9019\u500B\u7CFB\u7D71" (I\'m quite satisfied with the current system).',
    designImplication:
      'Critical constraint confirmed: the calendar must never feel like surveillance or passive data collection. She tears the page \u2014 she initiates. The timing is the only information that flows, and she controls when she acts.',
  },
  {
    id: 'p3-7',
    title: 'Surface Changes Are the Natural Entry Point to Real Conversation',
    emoji: '\uD83D\uDC55',
    summary:
      'Family notices physical changes (new clothes, haircut) and these surface observations naturally lead to deeper conversation about work, life, and plans. Nobody asks "how are you feeling?" They ask "is that new?" The surface is the door, not the barrier.',
    evidence:
      '"\u9019\u7A2E\u5F88\u8868\u5C64\u7684\u6771\u897F\u53BB\u5207\u5230\u4F60\u9019\u908A\u5728\u5E79\u561B" (From these very surface things, we transition to what you\'re doing). Clothes \u2192 business topic \u2192 full life update.',
    designImplication:
      'The calendar\'s torn pages accumulate a visual surface change over time. Like noticing new clothes, the physical object provides a neutral entry point. "I see you ripped late yesterday" is a surface observation that opens a door.',
  },
  {
    id: 'p3-8',
    title: '"We\'re All Still Living" \u2014 The Baseline Signal',
    emoji: '\uD83D\uDC9A',
    summary:
      'When asked what the \u5831\u5099 habit gives her, she says it confirms everyone is still living their lives. Not happiness. Not emotional status. Just existence and continued forward motion. This is the fundamental layer beneath all the practical content.',
    evidence:
      '"\u597D\u554A\u6211\u5011\u90FD\u9084\u5728\u904E\u751F\u6D3B" (Good, we\'re all still living our lives). "\u67D0\u7A2E\u7A0B\u5EA6\u4E0A\u6703\u611F\u53D7\u5230" (To some degree, it makes you feel that).',
    designImplication:
      'This IS the calendar\'s value proposition for this participant, distilled to its essence. Daily proof of mutual existence. Not emotion. Not progress. Just: we\'re both here, both living. The most fundamental signal a family member needs across distance.',
  },
  {
    id: 'p3-9',
    title: 'Time Is Passing on Their Faces \u2014 But She Won\'t Say It',
    emoji: '\u231B',
    summary:
      'When imagining her mom\'s face, the first thing she notices is signs of aging \u2014 more white hair. She thinks "time is really passing." But she would never mention it. She carries this awareness of parental aging silently, like P1 and P2.',
    evidence:
      '"\u6CE8\u610F\u770B\u4E00\u4E0B\u6709\u6C92\u6709\u9019\u500B\u8B8A\u8001\u7684\u75D5\u8DE1" (Notice if there are signs of aging). "\u771F\u7684\u662F\u6642\u9593\u6709\u5728\u904E\u8036" (Time really is passing).',
    designImplication:
      'Confirmed across all three participants: the unspoken awareness of parents\' aging is universal. The calendar accumulates months, making time passage visible and shared \u2014 something everyone notices but nobody says.',
  },
];

export default FINDINGS_P3;
